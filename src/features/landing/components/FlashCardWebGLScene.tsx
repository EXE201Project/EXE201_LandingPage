import { Rotate3d } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Material, Mesh, Object3D, Texture, WebGLRenderer } from "three";

type FlashCardWebGLSceneProps = {
  frontImage: string;
  backImage: string;
  cardName: string;
};

type CardSide = "front" | "back";

export function FlashCardWebGLScene({ frontImage, backImage, cardName }: FlashCardWebGLSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flipCardRef = useRef<() => void>(() => undefined);
  const [ready, setReady] = useState(false);
  const [visibleSide, setVisibleSide] = useState<CardSide>("front");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setReady(false);
    setVisibleSide("front");
    let renderer: WebGLRenderer | undefined;
    const textures: Texture[] = [];
    let resizeObserver: ResizeObserver | undefined;
    let frame = 0;
    let disposed = false;
    let removeInteractions = () => undefined;

    void import("three").then((THREE) => {
      if (disposed || !canvasRef.current) return;
      const host = canvas.parentElement;
      if (!host) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeaf8ff);

      const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 50);
      camera.position.set(0, 0.15, 6.7);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x7ba7d4, 2.7));
      const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
      keyLight.position.set(3.6, 5.4, 4.8);
      keyLight.castShadow = true;
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0x14b8e5, 14, 12);
      rimLight.position.set(-3.4, 1.4, 3.2);
      scene.add(rimLight);

      const cardRig = new THREE.Group();
      cardRig.rotation.set(-0.08, -0.18, -0.015);
      scene.add(cardRig);

      let loadedTextures = 0;
      const loadTexture = (source: string) => {
        const texture = new THREE.TextureLoader().load(
          source,
          () => {
            loadedTextures += 1;
            if (!disposed && loadedTextures === 2) setReady(true);
          },
          undefined,
          () => {
            if (!disposed) setReady(false);
          },
        );
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer?.capabilities.getMaxAnisotropy() ?? 1;
        textures.push(texture);
        return texture;
      };

      const frontTexture = loadTexture(frontImage);
      const backTexture = loadTexture(backImage);

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(4.45, 2.82, 0.14, 4, 3, 1),
        new THREE.MeshPhysicalMaterial({
          color: 0xf8fcff,
          metalness: 0.08,
          roughness: 0.24,
          clearcoat: 1,
          clearcoatRoughness: 0.14,
        }),
      );
      body.castShadow = true;
      cardRig.add(body);

      const createFace = (texture: Texture, z: number, rotationY: number) => {
        const face = new THREE.Mesh(
          new THREE.PlaneGeometry(4.31, 2.68),
          new THREE.MeshStandardMaterial({ map: texture, roughness: 0.44, metalness: 0.02 }),
        );
        face.position.z = z;
        face.rotation.y = rotationY;
        cardRig.add(face);
      };
      createFace(frontTexture, 0.071, 0);
      createFace(backTexture, -0.071, Math.PI);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 6),
        new THREE.ShadowMaterial({ color: 0x0a2c62, opacity: 0.17 }),
      );
      floor.position.set(0, -1.55, -0.8);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(2.25, 2.38, 72),
        new THREE.MeshBasicMaterial({ color: 0x35c8ef, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
      );
      halo.position.set(0, 0, -0.95);
      scene.add(halo);

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
      let moved = false;
      let previousX = 0;
      let previousY = 0;
      let targetRotationX = -0.08;
      let targetRotationY = -0.18;
      let lastSide: CardSide = "front";

      const syncVisibleSide = () => {
        const side: CardSide = Math.cos(targetRotationY) >= 0 ? "front" : "back";
        if (side !== lastSide) {
          lastSide = side;
          setVisibleSide(side);
        }
      };

      const flipCard = () => {
        targetRotationY += Math.PI;
        syncVisibleSide();
      };
      flipCardRef.current = flipCard;

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        moved = false;
        previousX = event.clientX;
        previousY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
        canvas.classList.add("is-dragging");
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        const deltaX = event.clientX - previousX;
        const deltaY = event.clientY - previousY;
        if (Math.abs(deltaX) + Math.abs(deltaY) > 3) moved = true;
        targetRotationY += deltaX * 0.01;
        targetRotationX = THREE.MathUtils.clamp(targetRotationX + deltaY * 0.005, -0.38, 0.28);
        previousX = event.clientX;
        previousY = event.clientY;
        syncVisibleSide();
      };
      const releasePointer = (event: PointerEvent) => {
        dragging = false;
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
        canvas.classList.remove("is-dragging");
      };
      const onPointerUp = (event: PointerEvent) => {
        if (!moved) flipCard();
        releasePointer(event);
      };
      const onPointerCancel = (event: PointerEvent) => releasePointer(event);

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerCancel);

      removeInteractions = () => {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerCancel);
      };

      const timer = new THREE.Timer();
      const render = () => {
        if (disposed || !renderer) return;
        timer.update();
        const easing = reducedMotion ? 1 : 0.12;
        cardRig.rotation.x = THREE.MathUtils.lerp(cardRig.rotation.x, targetRotationX, easing);
        cardRig.rotation.y = THREE.MathUtils.lerp(cardRig.rotation.y, targetRotationY, easing);
        if (!dragging && !reducedMotion) cardRig.position.y = Math.sin(timer.getElapsed() * 1.15) * 0.04;
        renderer.render(scene, camera);
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
        textures.forEach((texture) => texture.dispose());
        renderer?.dispose();
      };
    }).catch(() => setReady(false));

    return () => {
      disposed = true;
      flipCardRef.current = () => undefined;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      removeInteractions();
    };
  }, [backImage, frontImage]);

  const sideLabel = visibleSide === "front" ? "mặt trước" : "mặt sau";

  return (
    <div className={`flashcard-webgl${ready ? " is-ready" : ""}`} aria-label={`Flash Card ${cardName} 3D, đang xem ${sideLabel}`}>
      <div className="flashcard-webgl-posters">
        <img src={frontImage} alt={`Mặt trước Flash Card ${cardName}`} />
        <img src={backImage} alt={`Mặt sau Flash Card ${cardName}`} />
      </div>
      <canvas ref={canvasRef} className="flashcard-webgl-canvas" aria-hidden="true" />
      <div className="flashcard-webgl-badge" aria-live="polite">Đang xem {sideLabel}</div>
      <div className="flashcard-webgl-hint" aria-hidden="true"><Rotate3d size={15} /> Kéo để lật thẻ</div>
      <button
        type="button"
        className="flashcard-webgl-flip"
        onClick={() => flipCardRef.current()}
        aria-label={`Lật sang ${visibleSide === "front" ? "mặt sau" : "mặt trước"}`}
      >
        <Rotate3d size={17} aria-hidden="true" />
        <span>Lật thẻ</span>
      </button>
    </div>
  );
}
