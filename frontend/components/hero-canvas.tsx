import { useEffect, useRef } from "react";

const cssColor = (name: string, fallback: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (disposed || !host.isConnected) return;
      try {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ink = new THREE.Color(cssColor("--ink", "#10181e"));
        const accent = new THREE.Color(cssColor("--vermilion", "#0e5e8a"));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.z = 30;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        host.appendChild(renderer.domElement);

        const COUNT = 110, RANGE_X = 44, RANGE_Y = 16, RANGE_Z = 10, LINK = 6.5;
        const positions = new Float32Array(COUNT * 3);
        const velocities: [number, number, number][] = [];
        for (let i = 0; i < COUNT; i++) {
          positions[i * 3] = (Math.random() - 0.5) * RANGE_X;
          positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE_Y;
          positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE_Z;
          velocities.push([(Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.01]);
        }
        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const points = new THREE.Points(
          pointGeometry,
          new THREE.PointsMaterial({ color: accent, size: 0.28, transparent: true, opacity: 0.85 }),
        );
        scene.add(points);

        const linePositions = new Float32Array(COUNT * COUNT * 6);
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        const lines = new THREE.LineSegments(
          lineGeometry,
          new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0.14 }),
        );
        scene.add(lines);

        const resize = () => {
          const { clientWidth: w, clientHeight: h } = host;
          if (!w || !h) return;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        resize();

        let mouseX = 0, mouseY = 0;
        const onMove = (e: MouseEvent) => {
          const rect = host.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        host.parentElement?.addEventListener("mousemove", onMove);

        let raf = 0;
        const frame = () => {
          for (let i = 0; i < COUNT; i++) {
            const x = positions[i * 3] + velocities[i][0];
            const y = positions[i * 3 + 1] + velocities[i][1];
            const z = positions[i * 3 + 2] + velocities[i][2];
            if (Math.abs(x) > RANGE_X / 2) velocities[i][0] *= -1;
            if (Math.abs(y) > RANGE_Y / 2) velocities[i][1] *= -1;
            if (Math.abs(z) > RANGE_Z / 2) velocities[i][2] *= -1;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
          }
          pointGeometry.attributes.position.needsUpdate = true;
          let linkCount = 0;
          for (let i = 0; i < COUNT; i++) {
            for (let j = i + 1; j < COUNT; j++) {
              const dx = positions[i * 3] - positions[j * 3];
              const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
              const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
              if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
                linePositions[linkCount * 6] = positions[i * 3];
                linePositions[linkCount * 6 + 1] = positions[i * 3 + 1];
                linePositions[linkCount * 6 + 2] = positions[i * 3 + 2];
                linePositions[linkCount * 6 + 3] = positions[j * 3];
                linePositions[linkCount * 6 + 4] = positions[j * 3 + 1];
                linePositions[linkCount * 6 + 5] = positions[j * 3 + 2];
                linkCount++;
              }
            }
          }
          lineGeometry.setDrawRange(0, linkCount * 2);
          lineGeometry.attributes.position.needsUpdate = true;
          camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
          camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.03;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
          if (!reduceMotion) raf = requestAnimationFrame(frame);
        };
        frame();

        cleanup = () => {
          cancelAnimationFrame(raf);
          observer.disconnect();
          host.parentElement?.removeEventListener("mousemove", onMove);
          pointGeometry.dispose();
          lineGeometry.dispose();
          points.material.dispose();
          lines.material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // WebGL unavailable: the hero renders without the decorative canvas.
      }
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return <div className="hero-canvas" ref={ref} aria-hidden="true" />;
}
