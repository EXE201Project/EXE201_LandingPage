import { Rotate3d, ScanLine, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Material, Mesh, Object3D, WebGLRenderer } from "three";

export function HeroMoleculeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer | undefined;
    let frame = 0;
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let removeInteractions = () => undefined;
    let readySignaled = false;

    void import("three").then((THREE) => {
      if (disposed || !canvasRef.current) return;

      const host = canvas.parentElement;
      if (!host) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeaf8ff);
      scene.fog = new THREE.Fog(0xeaf8ff, 10, 18);

      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0, 3.8, 9.7);
      camera.lookAt(0, -0.2, 0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x8dbce2, 2.35));
      const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
      keyLight.position.set(4, 7, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0x31c8ff, 18, 14);
      rimLight.position.set(-4, 2, 3);
      scene.add(rimLight);
      const purpleLight = new THREE.PointLight(0x7b2dba, 11, 10);
      purpleLight.position.set(3, 0, -3);
      scene.add(purpleLight);

      const product = new THREE.Group();
      product.rotation.set(-0.06, 0.16, 0);
      scene.add(product);

      const cardBase = new THREE.Mesh(
        new THREE.BoxGeometry(5.65, 0.18, 3.65, 2, 1, 2),
        new THREE.MeshPhysicalMaterial({
          color: 0xf7fbff,
          metalness: 0.12,
          roughness: 0.3,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
        }),
      );
      cardBase.position.y = -1.56;
      cardBase.castShadow = true;
      cardBase.receiveShadow = true;
      product.add(cardBase);

      const textureLoader = new THREE.TextureLoader();
      const cardTexture = textureLoader.load("/assets/flashcards/front-kmno4.jpg");
      cardTexture.colorSpace = THREE.SRGBColorSpace;
      cardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const cardFace = new THREE.Mesh(
        new THREE.PlaneGeometry(5.42, 3.42),
        new THREE.MeshStandardMaterial({
          map: cardTexture,
          roughness: 0.48,
          metalness: 0.05,
        }),
      );
      cardFace.rotation.x = -Math.PI / 2;
      cardFace.rotation.z = Math.PI;
      cardFace.position.y = -1.455;
      cardFace.receiveShadow = true;
      product.add(cardFace);

      const dishGroup = new THREE.Group();
      dishGroup.position.set(-1.68, -1.08, -0.18);
      dishGroup.scale.setScalar(1.12);
      product.add(dishGroup);

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd9f5ff,
        transmission: 0.82,
        transparent: true,
        opacity: 0.68,
        roughness: 0.08,
        metalness: 0,
        thickness: 0.45,
        side: THREE.DoubleSide,
      });
      const dishWall = new THREE.Mesh(
        new THREE.CylinderGeometry(1.02, 0.9, 0.32, 48, 1, true),
        glassMaterial,
      );
      dishWall.position.y = 0.18;
      dishGroup.add(dishWall);
      const dishBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.91, 0.91, 0.08, 48),
        glassMaterial,
      );
      dishGroup.add(dishBottom);

      const crystalGeometry = new THREE.OctahedronGeometry(0.075, 0);
      const crystalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x6c12a8,
        emissive: 0x26003f,
        emissiveIntensity: 0.36,
        roughness: 0.22,
        metalness: 0.2,
        clearcoat: 0.75,
      });
      for (let index = 0; index < 72; index += 1) {
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        const angle = index * 2.399963;
        const radius = 0.08 + 0.76 * Math.sqrt((index + 1) / 72);
        crystal.position.set(
          Math.cos(angle) * radius,
          0.09 + ((index * 17) % 7) * 0.025,
          Math.sin(angle) * radius,
        );
        crystal.rotation.set(index * 0.31, index * 0.17, index * 0.23);
        crystal.scale.setScalar(0.72 + ((index * 13) % 9) / 20);
        crystal.castShadow = true;
        dishGroup.add(crystal);
      }

      const molecule = new THREE.Group();
      molecule.position.set(1.22, 0.62, -0.12);
      product.add(molecule);

      const mnMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x7026a5,
        emissive: 0x250038,
        emissiveIntensity: 0.45,
        roughness: 0.16,
        metalness: 0.26,
        clearcoat: 1,
      });
      const oxygenMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf04444,
        emissive: 0x4a0505,
        emissiveIntensity: 0.32,
        roughness: 0.18,
        clearcoat: 1,
      });
      const potassiumMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x12a9a0,
        emissive: 0x003b38,
        emissiveIntensity: 0.4,
        roughness: 0.18,
        clearcoat: 1,
      });
      const bondMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xcce6f8,
        metalness: 0.72,
        roughness: 0.22,
        clearcoat: 0.8,
      });

      const centralAtom = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 40), mnMaterial);
      centralAtom.castShadow = true;
      molecule.add(centralAtom);

      const oxygenPositions = [
        new THREE.Vector3(0, 1.28, 0),
        new THREE.Vector3(1.08, -0.42, 0.7),
        new THREE.Vector3(-1.08, -0.42, 0.7),
        new THREE.Vector3(0, -0.42, -1.2),
      ];

      const createBond = (start: InstanceType<typeof THREE.Vector3>, end: InstanceType<typeof THREE.Vector3>) => {
        const direction = new THREE.Vector3().subVectors(end, start);
        const bond = new THREE.Mesh(
          new THREE.CylinderGeometry(0.075, 0.075, direction.length(), 18),
          bondMaterial,
        );
        bond.position.copy(start).add(end).multiplyScalar(0.5);
        bond.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.clone().normalize(),
        );
        bond.castShadow = true;
        molecule.add(bond);
      };

      oxygenPositions.forEach((position) => {
        createBond(new THREE.Vector3(), position);
        const atom = new THREE.Mesh(new THREE.SphereGeometry(0.3, 36, 36), oxygenMaterial);
        atom.position.copy(position);
        atom.castShadow = true;
        molecule.add(atom);
      });

      const potassium = new THREE.Mesh(new THREE.SphereGeometry(0.34, 36, 36), potassiumMaterial);
      potassium.position.set(-1.18, -1.05, -0.72);
      potassium.castShadow = true;
      molecule.add(potassium);

      const createAtomLabel = (text: string, position: InstanceType<typeof THREE.Vector3>, size = 0.58) => {
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 128;
        labelCanvas.height = 128;
        const context = labelCanvas.getContext("2d");
        if (!context) return;
        context.fillStyle = "#ffffff";
        context.font = "700 52px Plus Jakarta Sans, Arial, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.shadowColor = "rgba(10, 44, 98, 0.58)";
        context.shadowBlur = 8;
        context.fillText(text, 64, 66);
        const labelTexture = new THREE.CanvasTexture(labelCanvas);
        labelTexture.colorSpace = THREE.SRGBColorSpace;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, depthTest: false }));
        sprite.position.copy(position);
        sprite.scale.set(size, size, size);
        sprite.renderOrder = 7;
        molecule.add(sprite);
      };

      createAtomLabel("Mn", new THREE.Vector3(0, 0, 0.43), 0.62);
      createAtomLabel("K", new THREE.Vector3(-1.18, -1.05, -0.37), 0.52);

      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(1.45, 0.72, 3.5, 48, 1, true),
        new THREE.MeshBasicMaterial({
          color: 0x38d3ff,
          transparent: true,
          opacity: 0.075,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      beam.position.set(1.2, -0.02, -0.1);
      product.add(beam);

      const scanRingMaterial = new THREE.MeshBasicMaterial({
        color: 0x31c8ff,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
      });
      [0.82, 1.15, 1.48].forEach((radius, index) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.018, 10, 80),
          scanRingMaterial,
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(1.2, -1.34 + index * 0.025, -0.1);
        product.add(ring);
      });

      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(5.8, 80),
        new THREE.MeshBasicMaterial({
          color: 0xbfe8ff,
          transparent: true,
          opacity: 0.2,
          depthWrite: false,
        }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.7;
      scene.add(floor);

      const resize = () => {
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        renderer?.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let dragging = false;
      let previousX = 0;
      let previousY = 0;
      let targetZoom = camera.position.z;

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        previousX = event.clientX;
        previousY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
        canvas.classList.add("is-dragging");
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        const deltaX = event.clientX - previousX;
        const deltaY = event.clientY - previousY;
        product.rotation.y += deltaX * 0.008;
        product.rotation.x = THREE.MathUtils.clamp(product.rotation.x + deltaY * 0.005, -0.42, 0.32);
        previousX = event.clientX;
        previousY = event.clientY;
      };
      const onPointerUp = (event: PointerEvent) => {
        dragging = false;
        canvas.releasePointerCapture(event.pointerId);
        canvas.classList.remove("is-dragging");
      };
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        targetZoom = THREE.MathUtils.clamp(targetZoom + event.deltaY * 0.004, 7.2, 11.8);
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("wheel", onWheel, { passive: false });

      removeInteractions = () => {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("wheel", onWheel);
      };

      const timer = new THREE.Timer();
      const render = () => {
        if (disposed || !renderer) return;
        timer.update();
        const elapsed = timer.getElapsed();
        if (!dragging && !reducedMotion) {
          product.rotation.y += 0.0015;
          molecule.position.y = 0.62 + Math.sin(elapsed * 1.25) * 0.08;
          beam.material.opacity = 0.06 + Math.sin(elapsed * 1.6) * 0.018;
        }
        camera.position.z += (targetZoom - camera.position.z) * 0.08;
        renderer.render(scene, camera);
        if (!readySignaled) {
          readySignaled = true;
          setReady(true);
        }
        frame = requestAnimationFrame(render);
      };
      render();

      const disposeObject = (object: Object3D) => {
        const mesh = object as Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.filter(Boolean).forEach((material) => (material as Material).dispose());
      };

      const baseCleanup = removeInteractions;
      removeInteractions = () => {
        baseCleanup();
        scene.traverse(disposeObject);
        cardTexture.dispose();
        renderer?.dispose();
      };
    }).catch(() => {
      setReady(false);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      removeInteractions();
    };
  }, []);

  return (
    <div className={`hero-webgl-scene${ready ? " is-ready" : ""}`} aria-label="Mô hình KMnO₄ 3D có thể xoay và phóng to">
      <img
        src="/assets/brand/hero-approved-user.jpg"
        alt="Flash Card KMnO₄ và mô hình phân tử AR 3D"
        className="hero-webgl-poster"
      />
      <canvas ref={canvasRef} className="hero-webgl-canvas" aria-hidden="true" />
      <div className="hero-webgl-status" aria-hidden="true">
        <span><ScanLine size={16} /> WebGL AR</span>
        <strong>KMnO₄</strong>
      </div>
      <div className="hero-webgl-help" aria-hidden="true">
        <span><Rotate3d size={15} /> Kéo để xoay</span>
        <span><ZoomIn size={15} /> Cuộn để phóng</span>
      </div>
    </div>
  );
}
