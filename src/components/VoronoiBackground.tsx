import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function createPointTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, "rgba(212, 255, 246, 0.95)");
  gradient.addColorStop(0.45, "rgba(168, 255, 232, 0.7)");
  gradient.addColorStop(1, "rgba(168, 255, 232, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function createPoint(
  u: number,
  v: number,
  a: number,
  b: number,
  c: number,
) {
  const x =
    Math.sin(a * v) * Math.cos(b * u) +
    Math.cos(c * v) * Math.sin(b * u);
  const y =
    Math.cos(a * v) * Math.cos(b * u) +
    Math.sin(c * v) * Math.sin(b * u);
  const z =
    Math.sin(a * v) * Math.cos(b * u) +
    Math.sin(c * v) * Math.sin(b * u);

  return { x, y, z };
}

export default function VoronoiBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const size = {
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    };
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const pointTexture = createPointTexture();
    const steps = size.width < 768 ? 10 : 12;
    const particlesCount = steps * steps;
    const basePositions = new Float32Array(particlesCount * 3);
    const positions = new Float32Array(particlesCount * 3);
    const phases = new Float32Array(particlesCount);
    const amplitudes = new Float32Array(particlesCount);
    const drift = new Float32Array(particlesCount);
    const a = 1.7;
    const b = 1.15;
    const c = 2.4;
    const uMin = -Math.PI;
    const uMax = Math.PI;
    const vMin = -Math.PI;
    const vMax = Math.PI;
    const uStep = (uMax - uMin) / steps;
    const vStep = (vMax - vMin) / steps;
    const scale = size.width < 768 ? 3.9 : 4.4;

    for (let i = 0; i < steps; i++) {
      for (let j = 0; j < steps; j++) {
        const index = i * steps + j;
        const u = uMin + i * uStep;
        const v = vMin + j * vStep;
        const point = createPoint(u, v, a, b, c);
        const offset = index * 3;

        basePositions[offset] = point.x * scale;
        basePositions[offset + 1] = point.y * scale;
        basePositions[offset + 2] = point.z * scale;

        positions[offset] = basePositions[offset];
        positions[offset + 1] = basePositions[offset + 1];
        positions[offset + 2] = basePositions[offset + 2];

        phases[index] = u * 0.7 + v * 0.45;
        amplitudes[index] = 0.07 + ((i + j) % 6) * 0.012;
        drift[index] = 0.55 + ((i * 3 + j) % 9) * 0.05;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd7fff5,
      size: size.width < 768 ? 0.095 : 0.075,
      transparent: true,
      opacity: 0.28,
      map: pointTexture ?? undefined,
      alphaMap: pointTexture ?? undefined,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    const field = new THREE.Group();
    field.add(points);
    scene.add(field);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xb8d8d2,
      transparent: true,
      opacity: 0.055,
      depthWrite: false,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particlesCount * particlesCount * 6);
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setDrawRange(0, 0);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    field.add(lines);

    const highlightPointGeometry = new THREE.BufferGeometry();
    const highlightPointPositions = new Float32Array(particlesCount * 3);
    highlightPointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(highlightPointPositions, 3),
    );
    highlightPointGeometry.setDrawRange(0, 0);
    const highlightPointMaterial = new THREE.PointsMaterial({
      color: 0xdffff7,
      size: size.width < 768 ? 0.125 : 0.1,
      transparent: true,
      opacity: 0.62,
      map: pointTexture ?? undefined,
      alphaMap: pointTexture ?? undefined,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const highlightPoints = new THREE.Points(
      highlightPointGeometry,
      highlightPointMaterial,
    );
    field.add(highlightPoints);

    const highlightLineGeometry = new THREE.BufferGeometry();
    const highlightLinePositions = new Float32Array(
      particlesCount * particlesCount * 6,
    );
    highlightLineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(highlightLinePositions, 3),
    );
    highlightLineGeometry.setDrawRange(0, 0);
    const highlightLineMaterial = new THREE.LineBasicMaterial({
      color: 0xcfffee,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const highlightLines = new THREE.LineSegments(
      highlightLineGeometry,
      highlightLineMaterial,
    );
    field.add(highlightLines);

    camera.position.z = 7.5;

    const mouse = new THREE.Vector2(8, 8);
    const worldMouse = new THREE.Vector3();
    const localMouse = new THREE.Vector3();
    const fieldInverseMatrix = new THREE.Matrix4();
    const lineMidpoint = new THREE.Vector3();
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const elapsed = performance.now() * 0.00025;
      const positions = geometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      let highlightLineIdx = 0;
      let highlightPointIdx = 0;

      worldMouse.set(mouse.x, mouse.y, 0.15);
      worldMouse.unproject(camera);
      const dir = worldMouse.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      worldMouse.copy(camera.position).add(dir.multiplyScalar(distance));

      field.rotation.y = elapsed * 0.72 + Math.sin(elapsed * 1.3) * 0.08;
      field.rotation.x = Math.sin(elapsed * 1.7) * 0.11;
      field.rotation.z = Math.cos(elapsed * 0.9) * 0.04;
      field.position.x = Math.sin(elapsed * 0.55) * 0.18;
      field.position.y = Math.cos(elapsed * 0.45) * 0.12;
      field.updateMatrixWorld(true);
      fieldInverseMatrix.copy(field.matrixWorld).invert();
      localMouse.copy(worldMouse).applyMatrix4(fieldInverseMatrix);

      const highlightRadius = 1.45;

      for (let i = 0; i < particlesCount; i++) {
        const offset = i * 3;
        const phase = phases[i];
        const wave = elapsed * drift[i] + phase;
        const twist = elapsed * 1.45 + phase * 0.7;
        const baseX = basePositions[offset];
        const baseY = basePositions[offset + 1];
        const baseZ = basePositions[offset + 2];
        const morph =
          Math.sin(elapsed * 0.8 + baseX * 0.32) * 0.18 +
          Math.cos(elapsed * 1.1 + baseY * 0.28) * 0.12;

        positions[offset] =
          baseX +
          Math.sin(elapsed * 0.55 + baseY * 0.42) * 0.2 +
          Math.sin(wave) * amplitudes[i] * 0.95 +
          Math.cos(twist) * amplitudes[i] * 0.35 +
          morph * Math.sin(phase * 1.6);
        positions[offset + 1] =
          baseY +
          Math.cos(elapsed * 0.7 + baseZ * 0.35) * 0.16 +
          Math.cos(wave * 1.12) * amplitudes[i] * 1.15 +
          Math.sin(twist) * amplitudes[i] * 0.45 +
          morph * Math.cos(phase * 1.2);
        positions[offset + 2] =
          baseZ +
          Math.sin(elapsed * 0.62 + (baseX + baseY) * 0.24) * 0.22 +
          Math.sin(wave * 0.82) * amplitudes[i] * 1.45 +
          morph * Math.sin(phase * 2.1);

        const distToMouse = Math.sqrt(
          Math.pow(positions[offset] - localMouse.x, 2) +
            Math.pow(positions[offset + 1] - localMouse.y, 2) +
            Math.pow(positions[offset + 2] - localMouse.z, 2),
        );

        if (distToMouse < highlightRadius) {
          highlightPointPositions[highlightPointIdx++] = positions[offset];
          highlightPointPositions[highlightPointIdx++] = positions[offset + 1];
          highlightPointPositions[highlightPointIdx++] = positions[offset + 2];
        }

        for (let j = i + 1; j < particlesCount; j++) {
          const dx = positions[offset] - positions[j * 3];
          const dy = positions[offset + 1] - positions[j * 3 + 1];
          const dz = positions[offset + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 1.26) {
            linePositions[lineIdx++] = positions[offset];
            linePositions[lineIdx++] = positions[offset + 1];
            linePositions[lineIdx++] = positions[offset + 2];
            linePositions[lineIdx++] = positions[j * 3];
            linePositions[lineIdx++] = positions[j * 3 + 1];
            linePositions[lineIdx++] = positions[j * 3 + 2];

            lineMidpoint.set(
              (positions[offset] + positions[j * 3]) * 0.5,
              (positions[offset + 1] + positions[j * 3 + 1]) * 0.5,
              (positions[offset + 2] + positions[j * 3 + 2]) * 0.5,
            );
            if (lineMidpoint.distanceTo(localMouse) < highlightRadius) {
              highlightLinePositions[highlightLineIdx++] = positions[offset];
              highlightLinePositions[highlightLineIdx++] =
                positions[offset + 1];
              highlightLinePositions[highlightLineIdx++] =
                positions[offset + 2];
              highlightLinePositions[highlightLineIdx++] = positions[j * 3];
              highlightLinePositions[highlightLineIdx++] =
                positions[j * 3 + 1];
              highlightLinePositions[highlightLineIdx++] =
                positions[j * 3 + 2];
            }
          }
        }
      }

      points.material.opacity = 0.2;

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      highlightPointGeometry.attributes.position.needsUpdate = true;
      highlightLineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx / 3);
      highlightPointGeometry.setDrawRange(0, highlightPointIdx / 3);
      highlightLineGeometry.setDrawRange(0, highlightLineIdx / 3);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const nextWidth = container.clientWidth || window.innerWidth;
      const nextHeight = container.clientHeight || window.innerHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      highlightPointGeometry.dispose();
      highlightPointMaterial.dispose();
      highlightLineGeometry.dispose();
      highlightLineMaterial.dispose();
      field.remove(points);
      field.remove(lines);
      field.remove(highlightPoints);
      field.remove(highlightLines);
      scene.remove(field);
      pointTexture?.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
