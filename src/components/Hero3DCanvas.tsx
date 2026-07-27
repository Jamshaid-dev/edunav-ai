"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  scrollYProgress?: any;
}

export default function Hero3DCanvas({ scrollYProgress }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    // Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Core AI Crystal
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(core);

    // Outer Tech Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerShield = new THREE.Mesh(outerGeo, outerMat);
    masterGroup.add(outerShield);

    // Orbital Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x0284c7 })
    );
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.015, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x6366f1 })
    );
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
    scene.add(pointLight);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop linked with Scroll Progress
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Base idle rotations
      core.rotation.y = t * 0.4;
      core.rotation.x = t * 0.2;
      outerShield.rotation.y = -t * 0.3;
      ring1.rotation.z = t * 0.2;
      ring2.rotation.x = t * 0.3;

      // Scroll-driven extra rotation & transformations
      const progress = scrollYProgress ? scrollYProgress.get() : 0;
      masterGroup.rotation.y = t * 0.2 + progress * Math.PI * 4;
      masterGroup.rotation.z = progress * Math.PI * 2;

      // Gentle floating
      masterGroup.position.y = Math.sin(t * 1.5) * 0.1;

      // Smooth cursor parallax
      masterGroup.rotation.y += (mouseX * 0.3 - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (mouseY * 0.2 - masterGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!currentRef) return;
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollYProgress]);

  return <div ref={mountRef} className="h-full w-full" />;
}