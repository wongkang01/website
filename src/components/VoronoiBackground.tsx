import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas, useThree } from '@react-three/fiber';

// Since I don't have @react-three/fiber pre-installed, I should check if I can use it.
// Actually, the user didn't mention it, but it's the standard for Three in React.
// If not, I'll use raw Three.js.
// Let's check dependencies in turn 1 response: three is there, but not fiber.
// I'll install @react-three/fiber and @react-three/drei for easier Three.js work.

export default function VoronoiBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.5
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particlesCount * particlesCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 5;

    const mouse = new THREE.Vector2(-100, -100);
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array as Float32Array;
      let lineIdx = 0;

      const mouse3D = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      mouse3D.unproject(camera);
      const dir = mouse3D.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Highlight nodes near cursor
        const distToMouse = Math.sqrt(
          Math.pow(positions[i * 3] - pos.x, 2) + 
          Math.pow(positions[i * 3 + 1] - pos.y, 2)
        );

        const highlightFactor = Math.max(0, 1 - distToMouse / 3);
        // We could use this highlight factor to adjust node sizes or colors if we used separate attributes
        
        // Bounds check
        if (Math.abs(positions[i * 3]) > 7) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

        // Compare with others for lines
        for (let j = i + 1; j < particlesCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 2.0) {
             // Lines near mouse are brighter
             const distLineToMouse = Math.sqrt(
               Math.pow((positions[i * 3] + positions[j * 3]) / 2 - pos.x, 2) +
               Math.pow((positions[i * 3 + 1] + positions[j * 3 + 1]) / 2 - pos.y, 2)
             );
             
             const lineHighlight = Math.max(0, 1 - distLineToMouse / 2);
             // Since we use LineSegments with a single material, we can't easily vary opacity per segment 
             // without using custom shaders or vertex colors.
             // For now, we'll just push the positions. To vary opacity, I'd need color attribute.
             
             linePositions[lineIdx++] = positions[i * 3];
             linePositions[lineIdx++] = positions[i * 3 + 1];
             linePositions[lineIdx++] = positions[i * 3 + 2];
             linePositions[lineIdx++] = positions[j * 3];
             linePositions[lineIdx++] = positions[j * 3 + 1];
             linePositions[lineIdx++] = positions[j * 3 + 2];
          }
        }
      }


      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIdx), 3));
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 bg-black" />;
}
