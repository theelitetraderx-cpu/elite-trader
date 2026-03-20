"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function FloatingElement() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    updateSize();

    // --- DETAILED COIN TEXTURE ---
    const createPremiumTexture = (symbol, color1, color2) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, color1);
      grad.addColorStop(0.5, '#ffffff');
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 30;
      ctx.beginPath(); ctx.arc(512, 512, 480, 0, Math.PI * 2); ctx.stroke();
      
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.font = 'bold 600px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(symbol, 512, 512);
      
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const btcTexture = createPremiumTexture('₿', '#f7931a', '#92400e');
    const bnbTexture = createPremiumTexture('BNB', '#f3ba2f', '#78350f');

    // --- LIQUID METAL SURFACE ---
    const waveGeometry = new THREE.PlaneGeometry(40, 40, 64, 64);
    const waveMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6,
    });
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 2.5;
    waveMesh.position.y = -5;
    scene.add(waveMesh);

    // --- COINS ---
    const createCoin = (texture, radius) => {
        const group = new THREE.Group();
        const geometry = new THREE.CylinderGeometry(radius, radius, 0.3, 64);
        const sideMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
        const faceMat = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.5, roughness: 0.2 });
        const mesh = new THREE.Mesh(geometry, [sideMat, faceMat, faceMat]);
        mesh.rotation.x = Math.PI / 2;
        group.add(mesh);
        return group;
    };

    const btcCoin = createCoin(btcTexture, 2.5);
    btcCoin.position.set(0, 1, 0);
    scene.add(btcCoin);

    const bnbCoin = createCoin(bnbTexture, 1.4);
    bnbCoin.position.set(-8, -2, -6);
    scene.add(bnbCoin);

    // --- LIGHTING (CRITICAL FIX) ---
    // Ambient light for general visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Hemisphere light for natural gradients
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
    scene.add(hemiLight);

    // Directional light for highlights
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    camera.position.set(0, 0, 15);

    // --- ANIMATION ---
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Wave
      const pos = waveGeometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 0.4 + time) * 0.5);
      }
      pos.needsUpdate = true;

      // Coins
      btcCoin.position.y = 1 + Math.sin(time) * 0.4;
      btcCoin.rotation.y += 0.01;
      bnbCoin.rotation.y += 0.015;

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', updateSize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateSize);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center relative bg-transparent"
    />
  );
}
