import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

function createPointTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.7)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

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
      38,
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
    const steps = size.width < 768 ? 9 : 11;
    const particlesCount = steps * steps;
    const CURVE_SEGMENTS = 8;
    const BASE_TINT = 0x7a90b5;
    const positions = new Float32Array(particlesCount * 3);
    const paramU = new Float32Array(particlesCount);
    const paramV = new Float32Array(particlesCount);
    const phases = new Float32Array(particlesCount);
    const amplitudes = new Float32Array(particlesCount);
    const drift = new Float32Array(particlesCount);
    const a = 1.65;
    const b = 1.12;
    const c = 2.35;
    const uMin = -Math.PI;
    const uMax = Math.PI;
    const vMin = -Math.PI;
    const vMax = Math.PI;
    const uStep = (uMax - uMin) / steps;
    const vStep = (vMax - vMin) / steps;
    const scale = size.width < 768 ? 4.3 : 4.9;

    for (let i = 0; i < steps; i++) {
      for (let j = 0; j < steps; j++) {
        const index = i * steps + j;
        const u = uMin + i * uStep;
        const v = vMin + j * vStep;
        const point = createPoint(u, v, a, b, c);
        const offset = index * 3;

        positions[offset] = point.x * scale;
        positions[offset + 1] = point.y * scale;
        positions[offset + 2] = point.z * scale;

        paramU[index] = u;
        paramV[index] = v;
        phases[index] = u * 0.7 + v * 0.45;
        amplitudes[index] = 0.07 + ((i + j) % 6) * 0.012;
        drift[index] = 0.55 + ((i * 3 + j) % 9) * 0.05;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: BASE_TINT,
      size: size.width < 768 ? 0.095 : 0.075,
      transparent: true,
      opacity: 0.55,
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

    const stripCapsFromLineMaterial = (mat: LineMaterial) => {
      mat.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <clipping_planes_fragment>",
          "#include <clipping_planes_fragment>\n\t\t\tif ( abs( vUv.y ) > 1.0 ) discard;",
        );
      };
      mat.customProgramCacheKey = () => "lineNoCaps";
    };

    const lineMaterial = new LineMaterial({
      color: BASE_TINT,
      linewidth: 2.5,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      resolution: new THREE.Vector2(size.width, size.height),
    });
    stripCapsFromLineMaterial(lineMaterial);

    const lineGeometry = new LineSegmentsGeometry();
    const linePositions = new Float32Array(
      particlesCount * particlesCount * 6 * CURVE_SEGMENTS,
    );
    lineGeometry.setPositions(linePositions);
    lineGeometry.instanceCount = 0;
    const lines = new LineSegments2(lineGeometry, lineMaterial);
    lines.frustumCulled = false;
    field.add(lines);

    const highlightPointGeometry = new THREE.BufferGeometry();
    const highlightPointPositions = new Float32Array(particlesCount * 3);
    const highlightPointColors = new Float32Array(particlesCount * 3);
    highlightPointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(highlightPointPositions, 3),
    );
    highlightPointGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(highlightPointColors, 3),
    );
    highlightPointGeometry.setDrawRange(0, 0);
    const highlightPointMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: size.width < 768 ? 0.18 : 0.14,
      transparent: true,
      opacity: 1,
      map: pointTexture ?? undefined,
      alphaMap: pointTexture ?? undefined,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      vertexColors: true,
    });
    const highlightPoints = new THREE.Points(
      highlightPointGeometry,
      highlightPointMaterial,
    );
    field.add(highlightPoints);

    const highlightLineGeometry = new LineSegmentsGeometry();
    const highlightLinePositions = new Float32Array(
      particlesCount * particlesCount * 6 * CURVE_SEGMENTS,
    );
    const highlightLineColors = new Float32Array(
      particlesCount * particlesCount * 6 * CURVE_SEGMENTS,
    );
    highlightLineGeometry.setPositions(highlightLinePositions);
    highlightLineGeometry.setColors(highlightLineColors);
    highlightLineGeometry.instanceCount = 0;
    const highlightLineMaterial = new LineMaterial({
      color: 0xffffff,
      linewidth: 4,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      resolution: new THREE.Vector2(size.width, size.height),
    });
    stripCapsFromLineMaterial(highlightLineMaterial);
    const highlightLines = new LineSegments2(
      highlightLineGeometry,
      highlightLineMaterial,
    );
    highlightLines.frustumCulled = false;
    field.add(highlightLines);

    camera.position.z = 5.9;

    const mouse = new THREE.Vector2(8, 8);
    const worldMouse = new THREE.Vector3();
    const localMouse = new THREE.Vector3();
    const ndcMouse = new THREE.Vector3();
    const dirMouse = new THREE.Vector3();
    const distsToMouse = new Float32Array(particlesCount);
    const accentR = 1;
    const accentG = 1;
    const accentB = 1;
    const curveSamples = new Float32Array((CURVE_SEGMENTS + 1) * 3);
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const elapsed = performance.now() * 0.000084;
      const positions = geometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      let highlightLineIdx = 0;
      let highlightPointIdx = 0;

      ndcMouse.set(mouse.x, mouse.y, 0.5);
      ndcMouse.unproject(camera);
      dirMouse.copy(ndcMouse).sub(camera.position).normalize();
      const distance = -camera.position.z / dirMouse.z;
      worldMouse.copy(camera.position).addScaledVector(dirMouse, distance);
      localMouse.copy(worldMouse);

      const highlightRadius = 1.8;
      const animatedA = a + Math.sin(elapsed * 1.2) * 0.14;
      const animatedB = b + Math.cos(elapsed * 0.95) * 0.11;
      const animatedC = c + Math.sin(elapsed * 0.8) * 0.16;
      const animatedScale = scale + Math.sin(elapsed * 0.7) * 0.08;

      for (let i = 0; i < particlesCount; i++) {
        const offset = i * 3;
        const phase = phases[i];
        const wave = elapsed * drift[i];
        const u =
          paramU[i] +
          wave * 0.48 +
          Math.sin(elapsed * 0.82 + phase * 1.1) * 0.16 +
          Math.cos(elapsed * 0.55 + phase * 0.7) * amplitudes[i] * 0.35;
        const v =
          paramV[i] +
          wave * 0.4 +
          Math.cos(elapsed * 0.68 + phase * 0.9) * 0.16 +
          Math.sin(elapsed * 0.5 + phase * 1.3) * amplitudes[i] * 0.35;
        const point = createPoint(
          u,
          v,
          animatedA + Math.sin(phase + elapsed * 0.42) * 0.04,
          animatedB + Math.cos(phase * 1.2 + elapsed * 0.35) * 0.035,
          animatedC + Math.sin(phase * 0.8 + elapsed * 0.48) * 0.06,
        );
        const swirl =
          Math.sin(u * 0.7 + elapsed * 0.62) * 0.1 +
          Math.cos(v * 0.8 - elapsed * 0.54) * 0.08;

        positions[offset] =
          point.x * animatedScale +
          Math.sin(v + elapsed * 0.78) * amplitudes[i] * 0.42 +
          swirl * Math.cos(phase);
        positions[offset + 1] =
          point.y * animatedScale * 0.92 +
          Math.cos(u - elapsed * 0.66) * amplitudes[i] * 0.45 +
          swirl * Math.sin(phase * 0.8);
        positions[offset + 2] =
          point.z * animatedScale +
          Math.sin(u + v + elapsed * 0.58) * amplitudes[i] * 0.5 +
          swirl * Math.cos(phase * 1.4);

        const distToMouse = Math.sqrt(
          Math.pow(positions[offset] - localMouse.x, 2) +
            Math.pow(positions[offset + 1] - localMouse.y, 2) +
            Math.pow(positions[offset + 2] - localMouse.z, 2),
        );
        distsToMouse[i] = distToMouse;

        if (distToMouse < highlightRadius) {
          const t = 1 - distToMouse / highlightRadius;
          const intensity = t * t;
          highlightPointPositions[highlightPointIdx] = positions[offset];
          highlightPointPositions[highlightPointIdx + 1] =
            positions[offset + 1];
          highlightPointPositions[highlightPointIdx + 2] =
            positions[offset + 2];
          highlightPointColors[highlightPointIdx] = accentR * intensity;
          highlightPointColors[highlightPointIdx + 1] = accentG * intensity;
          highlightPointColors[highlightPointIdx + 2] = accentB * intensity;
          highlightPointIdx += 3;
        }
      }

      for (let i = 0; i < particlesCount; i++) {
        const offset = i * 3;
        const distI = distsToMouse[i];
        for (let j = i + 1; j < particlesCount; j++) {
          const jOffset = j * 3;
          const ax = positions[offset];
          const ay = positions[offset + 1];
          const az = positions[offset + 2];
          const bx = positions[jOffset];
          const by = positions[jOffset + 1];
          const bz = positions[jOffset + 2];
          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 1.52) {
            const mx = (ax + bx) * 0.5;
            const my = (ay + by) * 0.5;
            const mz = (az + bz) * 0.5;
            const mLen = Math.sqrt(mx * mx + my * my + mz * mz) || 1;
            const bow = dist * 0.35;
            const cx = mx + (mx / mLen) * bow;
            const cy = my + (my / mLen) * bow;
            const cz = mz + (mz / mLen) * bow;

            for (let s = 0; s <= CURVE_SEGMENTS; s++) {
              const t = s / CURVE_SEGMENTS;
              const u = 1 - t;
              const w0 = u * u;
              const w1 = 2 * u * t;
              const w2 = t * t;
              const so = s * 3;
              curveSamples[so] = w0 * ax + w1 * cx + w2 * bx;
              curveSamples[so + 1] = w0 * ay + w1 * cy + w2 * by;
              curveSamples[so + 2] = w0 * az + w1 * cz + w2 * bz;
            }

            for (let s = 0; s < CURVE_SEGMENTS; s++) {
              const so = s * 3;
              const eo = (s + 1) * 3;
              linePositions[lineIdx++] = curveSamples[so];
              linePositions[lineIdx++] = curveSamples[so + 1];
              linePositions[lineIdx++] = curveSamples[so + 2];
              linePositions[lineIdx++] = curveSamples[eo];
              linePositions[lineIdx++] = curveSamples[eo + 1];
              linePositions[lineIdx++] = curveSamples[eo + 2];
            }

            const distJ = distsToMouse[j];
            if (distI < highlightRadius || distJ < highlightRadius) {
              const ti = distI < highlightRadius ? 1 - distI / highlightRadius : 0;
              const tj = distJ < highlightRadius ? 1 - distJ / highlightRadius : 0;
              const intensity1 = ti * ti;
              const intensity2 = tj * tj;

              for (let s = 0; s < CURVE_SEGMENTS; s++) {
                const so = s * 3;
                const eo = (s + 1) * 3;
                const t0 = s / CURVE_SEGMENTS;
                const t1 = (s + 1) / CURVE_SEGMENTS;
                const ints0 = intensity1 * (1 - t0) + intensity2 * t0;
                const ints1 = intensity1 * (1 - t1) + intensity2 * t1;

                highlightLinePositions[highlightLineIdx] = curveSamples[so];
                highlightLinePositions[highlightLineIdx + 1] =
                  curveSamples[so + 1];
                highlightLinePositions[highlightLineIdx + 2] =
                  curveSamples[so + 2];
                highlightLineColors[highlightLineIdx] = accentR * ints0;
                highlightLineColors[highlightLineIdx + 1] = accentG * ints0;
                highlightLineColors[highlightLineIdx + 2] = accentB * ints0;
                highlightLineIdx += 3;

                highlightLinePositions[highlightLineIdx] = curveSamples[eo];
                highlightLinePositions[highlightLineIdx + 1] =
                  curveSamples[eo + 1];
                highlightLinePositions[highlightLineIdx + 2] =
                  curveSamples[eo + 2];
                highlightLineColors[highlightLineIdx] = accentR * ints1;
                highlightLineColors[highlightLineIdx + 1] = accentG * ints1;
                highlightLineColors[highlightLineIdx + 2] = accentB * ints1;
                highlightLineIdx += 3;
              }
            }
          }
        }
      }

      points.material.opacity = 0.2;

      geometry.attributes.position.needsUpdate = true;
      highlightPointGeometry.attributes.position.needsUpdate = true;
      highlightPointGeometry.attributes.color.needsUpdate = true;
      highlightPointGeometry.setDrawRange(0, highlightPointIdx / 3);

      (
        lineGeometry.attributes
          .instanceStart as THREE.InterleavedBufferAttribute
      ).data.needsUpdate = true;
      lineGeometry.instanceCount = lineIdx / 6;

      (
        highlightLineGeometry.attributes
          .instanceStart as THREE.InterleavedBufferAttribute
      ).data.needsUpdate = true;
      (
        highlightLineGeometry.attributes
          .instanceColorStart as THREE.InterleavedBufferAttribute
      ).data.needsUpdate = true;
      highlightLineGeometry.instanceCount = highlightLineIdx / 6;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const nextWidth = container.clientWidth || window.innerWidth;
      const nextHeight = container.clientHeight || window.innerHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      lineMaterial.resolution.set(nextWidth, nextHeight);
      highlightLineMaterial.resolution.set(nextWidth, nextHeight);
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
