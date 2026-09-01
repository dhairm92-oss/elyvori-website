import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  opacity?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ opacity = 0.85 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 2.5, 50);
    goldPointLight.position.set(4, 4, 4);
    scene.add(goldPointLight);

    const bluePointLight = new THREE.PointLight(0x0468d7, 1.8, 50);
    bluePointLight.position.set(-4, -3, 3);
    scene.add(bluePointLight);

    // Floating Gold Spheres
    const spheres: THREE.Mesh[] = [];
    const sphereCount = 9;
    const goldMaterial = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      shininess: 90,
      specular: 0xfff0aa,
      reflectivity: 0.9,
    });

    const blueMaterial = new THREE.MeshPhongMaterial({
      color: 0x0468d7,
      shininess: 80,
      specular: 0x99ccff,
      reflectivity: 0.8,
    });

    for (let i = 0; i < sphereCount; i++) {
      const radius = Math.random() * 0.28 + 0.12;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const isBlue = i === 1 || i === 5;
      const sphere = new THREE.Mesh(geometry, isBlue ? blueMaterial : goldMaterial);

      sphere.position.set(
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 4
      );

      sphere.userData = {
        speedY: Math.random() * 0.004 + 0.002,
        speedRot: Math.random() * 0.01 + 0.005,
        offset: Math.random() * Math.PI * 2,
        initialX: sphere.position.x,
      };

      scene.add(sphere);
      spheres.push(sphere);
    }

    // Glowing Crescent (Geometric Torus approximation with gold wire)
    const crescentGroup = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(2.2, 0.025, 16, 120, Math.PI * 1.3);
    const crescentMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.35,
    });
    const crescent = new THREE.Mesh(torusGeo, crescentMat);
    crescent.rotation.z = Math.PI * 0.45;
    crescentGroup.add(crescent);

    // Inner orbital ring
    const innerTorus = new THREE.TorusGeometry(1.6, 0.015, 16, 100, Math.PI * 1.6);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x37beff,
      transparent: true,
      opacity: 0.22,
    });
    const innerRing = new THREE.Mesh(innerTorus, innerMat);
    innerRing.rotation.x = Math.PI * 0.3;
    innerRing.rotation.y = Math.PI * 0.2;
    crescentGroup.add(innerRing);

    crescentGroup.position.z = -2;
    scene.add(crescentGroup);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      spheres.forEach((s) => {
        s.position.y += Math.sin(time + s.userData.offset) * 0.0025;
        s.position.x = s.userData.initialX + Math.cos(time * 0.5 + s.userData.offset) * 0.15;
        s.rotation.y += s.userData.speedRot;
      });

      crescentGroup.rotation.y = Math.sin(time * 0.4) * 0.2 + mouseX * 0.2;
      crescentGroup.rotation.x = Math.cos(time * 0.3) * 0.15 - mouseY * 0.2;

      // Subtle camera pan with mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-background-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 transition-opacity duration-700"
      style={{ opacity }}
    />
  );
};
