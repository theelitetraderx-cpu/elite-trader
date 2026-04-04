"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { createClient } from '@/utils/supabase/client';
import { User, LogOut, ChevronDown } from 'lucide-react';
import './PillNav.css';

const supabase = createClient();

const PillNav = ({
  logo = '/elite-logo.png',
  logoAlt = 'The Elite Trader',
  items = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/#courses' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Community', href: '/community' },
    { label: 'Dashboard', href: '/dashboard', authRequired: true }
  ],
  className = '',
  ease = 'power3.out',
  initialLoadAnimation = true
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentHash, setCurrentHash] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    
    // Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('isLoggedIn');
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.left = `50%`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        if (tlRefs.current[index]) tlRefs.current[index].kill();
        
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.6, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.6, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 20), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.6, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    // Use ResizeObserver for more reliable layout
    const resizeObserver = new ResizeObserver(() => layout());
    if (navItemsRef.current) resizeObserver.observe(navItemsRef.current);

    layout();

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0, opacity: 0 });
        gsap.to(logo, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      }

      if (navItems) {
        gsap.set(navItems, { scaleX: 0, opacity: 0, transformOrigin: 'center left' });
        gsap.to(navItems, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power4.out"
        });
      }
    }

    return () => resizeObserver.disconnect();
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.4,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.8,
      ease: "power2.inOut",
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 7, duration: 0.4, ease: "power2.out" });
        gsap.to(lines[1], { rotation: -45, y: -7, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.4, ease: "power2.out" });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          }
        );
        
        const links = menu.querySelectorAll('.mobile-menu-link');
        gsap.fromTo(links, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, delay: 0.2, duration: 0.5, ease: "back.out(1.2)" }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    setUser(null);
    router.push('/');
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href) || (currentHash && href.includes(currentHash));
  };
  const navItems = items.filter(item => !item.authRequired || (item.authRequired && user));

  return (
    <div className={`pill-nav-container ${className}`}>
      <nav className="pill-nav" aria-label="Primary">
        <Link
          className="pill-logo"
          href="/"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </Link>

        <div className="pill-nav-items" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href || `item-${i}`} role="none">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`pill ${active ? 'is-active' : ''}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="desktop-actions ml-2">
            {user ? (
                <div className="relative flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-black font-bold text-xs uppercase shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      {user.user_metadata?.first_name?.[0] || user.user_metadata?.full_name?.[0] || user.user_metadata?.name?.[0] || user.email?.[0] || 'U'}
                    </div>
                    <span className="text-[13px] font-bold text-white uppercase tracking-widest sm:block">
                      {user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || 'Trader'}
                    </span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
            ) : (
                <>
                    <Link href="/login" className="text-[13px] font-bold text-slate-400 hover:text-gold-500 uppercase tracking-widest transition-colors px-4 py-2">
                        Log In
                    </Link>
                    <Link href="/register" className="text-[13px] font-bold text-black bg-gold-500 hover:bg-gold-400 uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-lg shadow-gold-900/40">
                        Register
                    </Link>
                </>
            )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover" ref={mobileMenuRef}>
        <ul className="mobile-menu-list">
          {navItems.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              <Link
                href={item.href}
                className={`mobile-menu-link ${isActive(item.href) ? 'is-active' : ''}`}
                onClick={() => toggleMobileMenu()}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
              {user ? (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-black font-bold text-lg uppercase">
                        {user.user_metadata?.first_name?.[0] || user.user_metadata?.full_name?.[0] || user.user_metadata?.name?.[0] || user.email?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg leading-none uppercase">
                          {user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || 'Member'}
                        </p>
                        <p className="text-slate-500 text-xs mt-1 lowercase">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { handleSignOut(); toggleMobileMenu(); }}
                      className="text-xl font-bold text-red-400 uppercase tracking-widest text-left flex items-center gap-2"
                    >
                      <LogOut size={20} /> Sign Out
                    </button>
                  </>
              ) : (
                  <>
                    <Link href="/login" onClick={() => toggleMobileMenu()} className="text-xl font-bold text-gold-500 uppercase tracking-widest">
                        Log In
                    </Link>
                    <Link href="/register" onClick={() => toggleMobileMenu()} className="text-xl font-bold bg-gold-500 text-black py-4 rounded-3xl uppercase tracking-widest text-center">
                        Register Now
                    </Link>
                  </>
              )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
