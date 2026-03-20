import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

interface SwapCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  customClass?: string;
}

export const SwapCard = forwardRef<HTMLDivElement, SwapCardProps>(
  ({ children, customClass, ...rest }, ref) => (
    <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}>
      {children}
    </div>
  )
);
SwapCard.displayName = 'SwapCard';

interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | 'smooth';
  children: React.ReactNode;
}

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 400,
  height = 500,
  cardDistance = 30,
  verticalDistance = 35,
  delay = 3000,
  pauseOnHover = false,
  onCardClick = () => {},
  skewAmount = 2,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement>(null);

  const [computedSize, setComputedSize] = useState({ width, height });

  useEffect(() => {
    const resize = () => {
      if (!container.current) return;
      const availableWidth = container.current.clientWidth;
      const maxCardWidth = Math.min(width, availableWidth * 0.92);
      const scale = maxCardWidth / width;
      const newHeight = Math.round(height * scale);
      const newWidth = Math.round(maxCardWidth);

      setComputedSize((prev) => {
        if (prev.width === newWidth && prev.height === newHeight) {
          return prev;
        }
        return { width: newWidth, height: newHeight };
      });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [container, width, height]);

  useEffect(() => {
    const total = refs.length;
    const distanceScale = Math.max(0.65, computedSize.width / width);
    const scaledCardDistance = cardDistance * distanceScale;
    const scaledVerticalDistance = verticalDistance * distanceScale;

    // Initial placement
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, scaledCardDistance, scaledVerticalDistance, total), skewAmount);
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;
      
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
        }
      });
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        opacity: 0,
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, scaledCardDistance, scaledVerticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, scaledCardDistance, scaledVerticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          opacity: 1,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
    };

    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      if (!node) return;
      
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
      };
    }
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs, childArr]);

  const rendered = useMemo(() => 
    childArr.map((child, i) => {
      if (!isValidElement(child)) return child;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const element = child as React.ReactElement<any>;
      return cloneElement(element, {
        key: i,
        ref: refs[i],
        style: {
          width: computedSize.width,
          height: computedSize.height,
          ...(element.props.style ?? {})
        },
        onClick: (e: React.MouseEvent) => {
          element.props.onClick?.(e);
          onCardClick?.(i);
        }
      });
    }),
    [childArr, refs, width, height, onCardClick, computedSize.width, computedSize.height]
  );

  return (
    <div ref={container} className="card-swap-container">
      {rendered}
    </div>
  );
};

export default CardSwap;
