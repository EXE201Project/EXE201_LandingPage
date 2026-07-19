import { Flame, RefreshCw, Rotate3d, RotateCcw, ScanLine, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Material, Mesh, Object3D, WebGLRenderer } from "three";

type ReactionStatus = "idle" | "running" | "complete";

export function HeroMoleculeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetViewRef = useRef<() => void>(() => undefined);
  const startReactionRef = useRef<() => void>(() => undefined);
  const [ready, setReady] = useState(false);
  const [reactionStatus, setReactionStatus] = useState<ReactionStatus>("idle");

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
      const manganateMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2f8f63,
        emissive: 0x082d1b,
        emissiveIntensity: 0.28,
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.55,
      });
      const manganeseDioxideMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x251e2b,
        emissive: 0x08060a,
        emissiveIntensity: 0.16,
        roughness: 0.48,
        metalness: 0.08,
      });
      const crystals: Mesh[] = [];
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
        crystals.push(crystal);
      }

      const heatMaterial = new THREE.MeshBasicMaterial({
        color: 0xff7a1a,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const heatRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.82, 0.055, 16, 80),
        heatMaterial,
      );
      heatRing.rotation.x = Math.PI / 2;
      heatRing.position.set(1.45, -0.88, 0.08);
      heatRing.visible = false;
      product.add(heatRing);

      const heatLight = new THREE.PointLight(0xff6b1a, 0, 4.2);
      heatLight.position.set(1.45, -0.18, 0.08);
      product.add(heatLight);

      const gasAtomGeometry = new THREE.SphereGeometry(0.105, 20, 20);
      const gasAtomMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf04444,
        emissive: 0x4a0505,
        emissiveIntensity: 0.34,
        roughness: 0.18,
        clearcoat: 1,
        transparent: true,
        opacity: 0.96,
        depthWrite: false,
      });
      const gasBondGeometry = new THREE.CylinderGeometry(0.028, 0.028, 0.2, 12);
      const gasBondMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8ebf8,
        metalness: 0.52,
        roughness: 0.24,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
      });
      const oxygenGas: InstanceType<typeof THREE.Group>[] = [];

      for (let index = 0; index < 10; index += 1) {
        const oxygenPair = new THREE.Group();
        const atomA = new THREE.Mesh(gasAtomGeometry, gasAtomMaterial);
        const atomB = new THREE.Mesh(gasAtomGeometry, gasAtomMaterial);
        const gasBond = new THREE.Mesh(gasBondGeometry, gasBondMaterial);
        atomA.position.x = -0.1;
        atomB.position.x = 0.1;
        gasBond.rotation.z = Math.PI / 2;
        oxygenPair.add(atomA, atomB, gasBond);
        oxygenPair.renderOrder = 7;
        atomA.renderOrder = 7;
        atomB.renderOrder = 7;
        gasBond.renderOrder = 7;
        oxygenPair.visible = false;
        oxygenPair.userData.seed = index;
        oxygenPair.scale.setScalar(0.66 + (index % 3) * 0.08);
        product.add(oxygenPair);
        oxygenGas.push(oxygenPair);
      }
      const reactionApparatus = new THREE.Group();
      reactionApparatus.position.set(0, -0.08, 0.05);
      reactionApparatus.visible = false;
      product.add(reactionApparatus);

      const apparatusGlass = new THREE.MeshPhysicalMaterial({
        color: 0xdaf5ff,
        transmission: 0.82,
        transparent: true,
        opacity: 0.3,
        roughness: 0.08,
        thickness: 0.32,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x2ca9dd,
        transparent: true,
        opacity: 0.36,
        roughness: 0.24,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const waterSurfaceMaterial = new THREE.MeshBasicMaterial({
        color: 0x71d9f5,
        transparent: true,
        opacity: 0.56,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const standMaterial = new THREE.MeshStandardMaterial({ color: 0x243750, metalness: 0.68, roughness: 0.3 });
      const apparatusEdgeMaterial = new THREE.LineBasicMaterial({
        color: 0x278fc4,
        transparent: true,
        opacity: 0.72,
      });
      const deliveryTubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xf8fafc,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
      });
      const deliveryTubeOutlineMaterial = new THREE.MeshBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
      });

      const trough = new THREE.Mesh(new THREE.BoxGeometry(2.65, 1.05, 1.55), apparatusGlass);
      trough.position.set(-1.18, -0.45, 0.05);
      reactionApparatus.add(trough);
      const troughEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(2.65, 1.05, 1.55)),
        apparatusEdgeMaterial,
      );
      troughEdges.position.copy(trough.position);
      reactionApparatus.add(troughEdges);
      const troughWater = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.72, 1.4), waterMaterial);
      troughWater.position.set(-1.18, -0.5, 0.05);
      troughWater.renderOrder = 1;
      reactionApparatus.add(troughWater);
      const troughWaterSurface = new THREE.Mesh(new THREE.PlaneGeometry(2.48, 1.38), waterSurfaceMaterial);
      troughWaterSurface.rotation.x = -Math.PI / 2;
      troughWaterSurface.position.set(-1.18, -0.135, 0.05);
      troughWaterSurface.renderOrder = 2;
      reactionApparatus.add(troughWaterSurface);

      const pseudoRandom = (value: number) => {
        const sine = Math.sin(value * 12.9898) * 43758.5453;
        return sine - Math.floor(sine);
      };
      const waterParticlePositions = new Float32Array(360 * 3);
      for (let index = 0; index < 360; index += 1) {
        waterParticlePositions[index * 3] = -2.33 + pseudoRandom(index + 1) * 2.3;
        waterParticlePositions[index * 3 + 1] = -0.82 + pseudoRandom(index + 301) * 0.64;
        waterParticlePositions[index * 3 + 2] = -0.58 + pseudoRandom(index + 701) * 1.26;
      }
      const waterParticleGeometry = new THREE.BufferGeometry();
      waterParticleGeometry.setAttribute("position", new THREE.BufferAttribute(waterParticlePositions, 3));
      const waterParticles = new THREE.Points(
        waterParticleGeometry,
        new THREE.PointsMaterial({ color: 0x8be8ff, size: 0.03, transparent: true, opacity: 0.32, depthWrite: false }),
      );
      waterParticles.renderOrder = 2;
      reactionApparatus.add(waterParticles);

      const collectionJar = new THREE.Group();
      collectionJar.position.set(-1.18, 0.02, 0.08);
      reactionApparatus.add(collectionJar);
      const jarWall = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.5, 1.5, 36, 1, true), apparatusGlass);
      jarWall.position.y = 0.08;
      collectionJar.add(jarWall);
      const jarTop = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.05, 36), apparatusGlass);
      jarTop.position.y = 0.84;
      collectionJar.add(jarTop);
      [0.84].forEach((y) => {
        const rim = new THREE.Mesh(
          new THREE.TorusGeometry(y > 0 ? 0.46 : 0.49, 0.018, 10, 48),
          new THREE.MeshBasicMaterial({ color: 0x278fc4, transparent: true, opacity: 0.64 }),
        );
        rim.rotation.x = Math.PI / 2;
        rim.position.y = y;
        collectionJar.add(rim);
      });

      const collectedWater = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.46, 1.22, 36), waterMaterial);
      collectedWater.position.y = 0.16;
      collectedWater.renderOrder = 1;
      collectionJar.add(collectedWater);
      const collectedWaterSurface = new THREE.Mesh(new THREE.CircleGeometry(0.43, 36), waterSurfaceMaterial);
      collectedWaterSurface.rotation.x = -Math.PI / 2;
      collectedWaterSurface.position.y = 0.77;
      collectionJar.add(collectedWaterSurface);
      const collectedGasMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xcdf5ff,
        transparent: true,
        opacity: 0.2,
        roughness: 0.05,
        depthWrite: false,
      });
      const collectedGas = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.2, 36), collectedGasMaterial);
      collectedGas.scale.y = 0.02;
      collectedGas.position.y = 0.76;
      collectionJar.add(collectedGas);

      const tubeGroup = new THREE.Group();
      tubeGroup.position.set(0.82, 0.36, 0.08);
      tubeGroup.rotation.z = -1.22;
      reactionApparatus.add(tubeGroup);
      const testTube = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.34, 2.15, 32, 1, true), apparatusGlass);
      tubeGroup.add(testTube);
      const testTubeEnd = new THREE.Mesh(new THREE.SphereGeometry(0.34, 28, 20), apparatusGlass);
      testTubeEnd.scale.y = 0.58;
      testTubeEnd.position.y = 1.05;
      tubeGroup.add(testTubeEnd);
      const stopper = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 0.24, 28),
        new THREE.MeshStandardMaterial({ color: 0x9b6a3f, roughness: 0.7 }),
      );
      stopper.position.y = -1.02;
      tubeGroup.add(stopper);
      const stopperChannel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.72, 16),
        deliveryTubeMaterial,
      );
      stopperChannel.position.y = -1.02;
      stopperChannel.renderOrder = 6;
      tubeGroup.add(stopperChannel);

      const dustCount = 420;
      const dustPositions = new Float32Array(dustCount * 3);
      const productDustColors = new Float32Array(dustCount * 3);
      const greenDust = new THREE.Color(0x3b9a68);
      const darkDust = new THREE.Color(0x2a202d);
      for (let index = 0; index < dustCount; index += 1) {
        const angle = pseudoRandom(index + 1101) * Math.PI * 2;
        const radius = Math.sqrt(pseudoRandom(index + 1401));
        dustPositions[index * 3] = 0.1 + Math.cos(angle) * radius * 0.1;
        dustPositions[index * 3 + 1] = 0.67 + pseudoRandom(index + 1701) * 0.22;
        dustPositions[index * 3 + 2] = Math.sin(angle) * radius * 0.12;
        const productColor = index % 3 === 0 ? greenDust : darkDust;
        productDustColors[index * 3] = productColor.r;
        productDustColors[index * 3 + 1] = productColor.g;
        productDustColors[index * 3 + 2] = productColor.b;
      }
      const permanganateDustGeometry = new THREE.BufferGeometry();
      permanganateDustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
      const permanganateDustMaterial = new THREE.PointsMaterial({
        color: 0x7318a8,
        size: 0.03,
        transparent: true,
        opacity: 0.9,
        depthWrite: true,
      });
      const permanganateDust = new THREE.Points(permanganateDustGeometry, permanganateDustMaterial);
      tubeGroup.add(permanganateDust);

      const productDustGeometry = permanganateDustGeometry.clone();
      productDustGeometry.setAttribute("color", new THREE.BufferAttribute(productDustColors, 3));
      const productDustMaterial = new THREE.PointsMaterial({
        size: 0.032,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        depthWrite: true,
      });
      const productDust = new THREE.Points(productDustGeometry, productDustMaterial);
      tubeGroup.add(productDust);

      const granuleCount = 320;
      const granuleGeometry = new THREE.IcosahedronGeometry(0.022, 0);
      const reactantGranuleMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.96,
        roughness: 0.72,
        metalness: 0.01,
        vertexColors: true,
      });
      const productGranuleMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        roughness: 0.88,
        metalness: 0.01,
        vertexColors: true,
      });
      const reactantGranules = new THREE.InstancedMesh(granuleGeometry, reactantGranuleMaterial, granuleCount);
      const productGranules = new THREE.InstancedMesh(granuleGeometry, productGranuleMaterial, granuleCount);
      const granuleTransform = new THREE.Object3D();
      const granuleBasePositions = new Float32Array(granuleCount * 3);
      const granuleBaseRotations = new Float32Array(granuleCount * 3);
      const granuleScales = new Float32Array(granuleCount * 3);
      const granulePhases = new Float32Array(granuleCount);
      const reactantColors = [new THREE.Color(0x330742), new THREE.Color(0x4d0e65), new THREE.Color(0x6a1987), new THREE.Color(0x81269c)];
      const productColors = [new THREE.Color(0x17201b), new THREE.Color(0x242c27), new THREE.Color(0x31533f), new THREE.Color(0x111612)];

      for (let index = 0; index < granuleCount; index += 1) {
        const longitudinal = pseudoRandom(index + 2201);
        const angle = pseudoRandom(index + 2501) * Math.PI * 2;
        const pileProfile = 0.46 + Math.sin(longitudinal * Math.PI) * 0.54;
        const radius = Math.sqrt(pseudoRandom(index + 2801)) * 0.145 * pileProfile;
        granuleBasePositions[index * 3] = 0.11 + Math.cos(angle) * radius * 0.72;
        granuleBasePositions[index * 3 + 1] = 0.56 + longitudinal * 0.4;
        granuleBasePositions[index * 3 + 2] = Math.sin(angle) * radius;
        granuleBaseRotations[index * 3] = pseudoRandom(index + 3101) * Math.PI;
        granuleBaseRotations[index * 3 + 1] = pseudoRandom(index + 3401) * Math.PI;
        granuleBaseRotations[index * 3 + 2] = pseudoRandom(index + 3701) * Math.PI;
        const scale = 0.48 + pseudoRandom(index + 4001) * 0.72;
        granuleScales[index * 3] = scale;
        granuleScales[index * 3 + 1] = scale * (0.78 + pseudoRandom(index + 4301) * 0.38);
        granuleScales[index * 3 + 2] = scale * (0.82 + pseudoRandom(index + 4601) * 0.34);
        granulePhases[index] = pseudoRandom(index + 4901) * Math.PI * 2;
        reactantGranules.setColorAt(index, reactantColors[index % reactantColors.length]);
        productGranules.setColorAt(index, productColors[index % productColors.length]);
      }

      const updateGranuleFlow = (time: number, agitation: number) => {
        for (let index = 0; index < granuleCount; index += 1) {
          const phase = granulePhases[index];
          const surfaceLift = index % 23 === 0
            ? Math.max(Math.sin(time * 5.2 + phase), 0) * 0.055 * agitation
            : 0;
          const flow = Math.sin(time * 3.6 + phase) * agitation;
          granuleTransform.position.set(
            granuleBasePositions[index * 3] - surfaceLift + flow * 0.008,
            granuleBasePositions[index * 3 + 1] + Math.sin(time * 2.4 + phase) * 0.011 * agitation,
            granuleBasePositions[index * 3 + 2] + Math.cos(time * 3.1 + phase) * 0.008 * agitation,
          );
          granuleTransform.rotation.set(
            granuleBaseRotations[index * 3] + time * 0.16 * agitation,
            granuleBaseRotations[index * 3 + 1] + flow * 0.3,
            granuleBaseRotations[index * 3 + 2] - time * 0.12 * agitation,
          );
          granuleTransform.scale.set(
            granuleScales[index * 3],
            granuleScales[index * 3 + 1],
            granuleScales[index * 3 + 2],
          );
          granuleTransform.updateMatrix();
          reactantGranules.setMatrixAt(index, granuleTransform.matrix);
          productGranules.setMatrixAt(index, granuleTransform.matrix);
        }
        reactantGranules.instanceMatrix.needsUpdate = true;
        productGranules.instanceMatrix.needsUpdate = true;
      };

      updateGranuleFlow(0, 0);
      if (reactantGranules.instanceColor) reactantGranules.instanceColor.needsUpdate = true;
      if (productGranules.instanceColor) productGranules.instanceColor.needsUpdate = true;
      reactantGranules.castShadow = true;
      productGranules.castShadow = true;
      tubeGroup.add(reactantGranules, productGranules);
      const reactionCrystals = crystals;

      const tubeLocalToApparatus = (localY: number) => new THREE.Vector3(0, localY, 0)
        .applyAxisAngle(new THREE.Vector3(0, 0, 1), tubeGroup.rotation.z)
        .add(tubeGroup.position);
      const deliveryCurve = new THREE.CatmullRomCurve3([
        // J-shaped path: leave the stopper horizontally, dip below the jar mouth,
        // then turn upward inside the inverted collection jar.
        tubeLocalToApparatus(-1.36),
        new THREE.Vector3(-0.66, -0.12, 0.08),
        new THREE.Vector3(-0.84, -0.22, 0.08),
        new THREE.Vector3(-0.96, -0.62, 0.08),
        new THREE.Vector3(-1.06, -0.76, 0.08),
        new THREE.Vector3(-1.18, -0.68, 0.08),
        new THREE.Vector3(-1.18, -0.36, 0.08),
        new THREE.Vector3(-1.18, 0.2, 0.08),
      ]);
      deliveryCurve.curveType = "centripetal";
      const deliveryTubeOutline = new THREE.Mesh(
        new THREE.TubeGeometry(deliveryCurve, 88, 0.12, 16, false),
        deliveryTubeOutlineMaterial,
      );
      deliveryTubeOutline.renderOrder = 5;
      reactionApparatus.add(deliveryTubeOutline);
      const deliveryTube = new THREE.Mesh(
        new THREE.TubeGeometry(deliveryCurve, 88, 0.078, 16, false),
        deliveryTubeMaterial,
      );
      deliveryTube.renderOrder = 6;
      reactionApparatus.add(deliveryTube);

      const standBase = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.16, 0.72), standMaterial);
      standBase.position.set(1.32, -1.05, -0.35);
      reactionApparatus.add(standBase);
      const standRod = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 2.15, 18), standMaterial);
      standRod.position.set(1.65, -0.05, -0.35);
      reactionApparatus.add(standRod);
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.08, 0.1), standMaterial);
      clamp.position.set(1.24, 0.5, -0.22);
      clamp.rotation.z = -0.18;
      reactionApparatus.add(clamp);

      const burner = new THREE.Group();
      burner.position.set(1.45, -0.7, 0.08);
      reactionApparatus.add(burner);
      const burnerBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.3, 0.38, 28),
        new THREE.MeshStandardMaterial({ color: 0x315a79, metalness: 0.55, roughness: 0.28 }),
      );
      burner.add(burnerBody);
      const outerFlameMaterial = new THREE.MeshBasicMaterial({ color: 0x168be8, transparent: true, opacity: 0.82 });
      const innerFlameMaterial = new THREE.MeshBasicMaterial({ color: 0xff9c32, transparent: true, opacity: 0.9 });
      const outerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.64, 28), outerFlameMaterial);
      outerFlame.position.y = 0.48;
      burner.add(outerFlame);
      const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.38, 24), innerFlameMaterial);
      innerFlame.position.y = 0.42;
      burner.add(innerFlame);
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
      const timer = new THREE.Timer();
      const reactionDuration = 4.2;
      let reactionStartedAt: number | null = null;
      let reactionCompletionSignaled = false;
      let dragging = false;
      let previousX = 0;
      let previousY = 0;
      let targetZoom = camera.position.z;

      const resetReactionScene = () => {
        reactionCrystals.forEach((crystal) => {
          crystal.material = crystalMaterial;
        });
        oxygenGas.forEach((oxygenPair) => {
          oxygenPair.visible = false;
        });
        heatRing.visible = false;
        heatMaterial.opacity = 0;
        heatLight.intensity = 0;
        dishGroup.visible = true;
        molecule.visible = true;
        beam.visible = true;
        molecule.scale.setScalar(1);
        molecule.position.y = 0.62;
        reactionApparatus.visible = false;
        reactionApparatus.scale.setScalar(1);
        collectedWater.scale.y = 1;
        collectedWater.position.y = 0.16;
        collectedWaterSurface.position.y = 0.77;
        collectedGas.scale.y = 0.02;
        collectedGas.position.y = 0.76;
        troughWaterSurface.position.y = -0.135;
        waterParticles.position.y = 0;
        permanganateDustMaterial.opacity = 0.28;
        productDustMaterial.opacity = 0;
        reactantGranuleMaterial.opacity = 0.96;
        productGranuleMaterial.opacity = 0;
        updateGranuleFlow(0, 0);
      };

      startReactionRef.current = () => {
        resetReactionScene();
        dishGroup.visible = false;
        molecule.visible = false;
        beam.visible = false;
        reactionApparatus.visible = true;
        reactionApparatus.scale.setScalar(0.88);
        product.rotation.set(-0.06, 0.08, 0);
        targetZoom = 9.7;
        reactionStartedAt = timer.getElapsed();
        reactionCompletionSignaled = false;
        setReactionStatus("running");
      };

      resetViewRef.current = () => {
        product.rotation.set(-0.06, 0.16, 0);
        targetZoom = 9.7;
      };

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
        if (!event.ctrlKey && !event.metaKey) return;
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

      const render = () => {
        if (disposed || !renderer) return;
        timer.update();
        const elapsed = timer.getElapsed();
        const reactionProgress = reactionStartedAt === null
          ? 0
          : reducedMotion
            ? 1
            : THREE.MathUtils.clamp((elapsed - reactionStartedAt) / reactionDuration, 0, 1);

        if (!dragging && !reducedMotion && reactionStartedAt === null) product.rotation.y += 0.0015;

        if (reactionStartedAt !== null) {
          const conversion = THREE.MathUtils.smoothstep(reactionProgress, 0.18, 0.82);
          permanganateDustMaterial.opacity = Math.max(0.28 - conversion * 0.34, 0);
          productDustMaterial.opacity = Math.min(conversion * 0.3, 0.28);
          reactantGranuleMaterial.opacity = Math.max(0.96 - conversion * 1.12, 0);
          productGranuleMaterial.opacity = Math.min(conversion * 1.04, 0.96);
          permanganateDust.rotation.y += reducedMotion ? 0 : 0.002;
          productDust.rotation.y -= reducedMotion ? 0 : 0.0015;
          const convertedCount = Math.floor(conversion * reactionCrystals.length);
          reactionCrystals.forEach((crystal, index) => {
            if (index < convertedCount) {
              crystal.material = index % 3 === 0 ? manganateMaterial : manganeseDioxideMaterial;
            }
          });

          const heating = reactionProgress < 0.88;
          updateGranuleFlow(elapsed, reducedMotion ? 0 : heating ? 0.92 : 0.06);
          heatRing.visible = heating;
          heatMaterial.opacity = heating ? 0.28 + Math.sin(elapsed * 10) * 0.1 : 0;
          heatRing.scale.setScalar(0.9 + Math.sin(elapsed * 7.5) * 0.08);
          heatLight.intensity = heating ? 7 + Math.sin(elapsed * 8) * 2 : 0;
          outerFlame.visible = heating;
          innerFlame.visible = heating;
          outerFlame.scale.set(1 + Math.sin(elapsed * 9) * 0.08, 0.9 + Math.sin(elapsed * 11) * 0.12, 1);
          innerFlame.scale.set(0.94, 0.88 + Math.sin(elapsed * 12) * 0.1, 0.94);
          reactionApparatus.scale.setScalar(0.88 + Math.min(reactionProgress / 0.18, 1) * 0.12);

          const gasCollected = THREE.MathUtils.smoothstep(reactionProgress, 0.28, 0.94) * 0.72;
          const waterScale = Math.max(1 - gasCollected, 0.28);
          collectedWater.scale.y = waterScale;
          collectedWater.position.y = -0.45 + (1.22 * waterScale) / 2;
          collectedWaterSurface.position.y = -0.45 + 1.22 * waterScale;
          troughWaterSurface.position.y = -0.135 + Math.sin(elapsed * 2.2) * 0.008;
          waterParticles.position.y = Math.sin(elapsed * 1.8) * 0.008;
          waterParticles.rotation.y += reducedMotion ? 0 : 0.00045;
          collectedGas.scale.y = Math.max(gasCollected, 0.02);
          collectedGas.position.y = 0.76 - (1.2 * Math.max(gasCollected, 0.02)) / 2;
          collectedGasMaterial.opacity = 0.2 + gasCollected * 0.34;

          oxygenGas.forEach((oxygenPair, index) => {
            const delay = 0.18 + index * 0.045;
            const localProgress = THREE.MathUtils.clamp((reactionProgress - delay) / 0.58, 0, 1);
            oxygenPair.visible = reactionProgress < 0.995 && localProgress > 0 && localProgress < 0.96;
            const oxygenPosition = localProgress < 0.84
              ? deliveryCurve.getPointAt(localProgress / 0.84)
              : new THREE.Vector3(
                -1.18 + Math.sin(index * 1.7 + localProgress * 5) * 0.1,
                0.2 + ((localProgress - 0.84) / 0.16) * 0.38,
                0.08 + Math.cos(index * 1.31 + localProgress * 4) * 0.08,
              );
            oxygenPair.position.copy(oxygenPosition).add(reactionApparatus.position);
            oxygenPair.rotation.set(localProgress * 2.2, localProgress * 3.4 + index, index * 0.3);
            const gasScale = (0.38 + (index % 3) * 0.05) * Math.sin(Math.PI * localProgress);
            oxygenPair.scale.setScalar(Math.max(gasScale, 0.06));
          });

          molecule.position.y = 0.62 + Math.sin(elapsed * 1.9) * 0.08 + conversion * 0.28;
          molecule.scale.setScalar(1 - conversion * 0.14);
          molecule.rotation.y += reducedMotion ? 0 : 0.008 + conversion * 0.012;
          beam.material.opacity = 0.07 + Math.sin(elapsed * 2.8) * 0.02 + conversion * 0.04;

          if (reactionProgress >= 1 && !reactionCompletionSignaled) {
            reactionCompletionSignaled = true;
            setReactionStatus("complete");
          }
        } else if (!reducedMotion) {
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
      resetViewRef.current = () => undefined;
      startReactionRef.current = () => undefined;
      removeInteractions();
    };
  }, []);

  return (
    <div className={`hero-webgl-scene${ready ? " is-ready" : ""}`} aria-label="Mô hình KMnO₄ 3D có thể xoay, phóng to và mô phỏng phản ứng nhiệt phân">
      <img
        src="/assets/brand/hero-approved-user.jpg"
        alt="Flash Card KMnO₄ và mô hình phân tử AR 3D"
        className="hero-webgl-poster"
      />
      <canvas ref={canvasRef} className="hero-webgl-canvas" aria-hidden="true" />
      {reactionStatus !== "idle" && (
        <div className={`hero-reaction-equation is-${reactionStatus}`} role="status" aria-live="polite">
          <span>{reactionStatus === "running" ? "Đang gia nhiệt" : "Phản ứng hoàn tất"}</span>
          <strong>
            2KMnO<sub>4</sub> <b aria-hidden="true">→</b> K<sub>2</sub>MnO<sub>4</sub> + MnO<sub>2</sub> + O<sub>2</sub>
          </strong>
          <small>{reactionStatus === "running" ? "Dẫn O₂ qua nước vào bình thu" : "O₂ đã đẩy nước khỏi bình thu"}</small>
          <div className="hero-reaction-progress" aria-hidden="true"><span /></div>
        </div>
      )}
      <div className="hero-webgl-status" aria-hidden="true">
        <span><ScanLine size={16} /> WebGL AR</span>
        <strong>KMnO₄</strong>
      </div>
      <div className="hero-webgl-help" aria-hidden="true">
        <span><Rotate3d size={15} /> Kéo ngang để xoay</span>
        <span><ZoomIn size={15} /> Ctrl + cuộn để phóng</span>
      </div>
      <button
        type="button"
        className={`hero-webgl-reaction is-${reactionStatus}`}
        onClick={() => startReactionRef.current()}
        disabled={!ready || reactionStatus === "running"}
      >
        {reactionStatus === "complete" ? <RefreshCw size={17} aria-hidden="true" /> : <Flame size={17} aria-hidden="true" />}
        <span>{reactionStatus === "running" ? "Đang nhiệt phân" : reactionStatus === "complete" ? "Chạy lại" : "Chạy phản ứng"}</span>
      </button>
      <button type="button" className="hero-webgl-reset" onClick={() => resetViewRef.current()}>
        <RotateCcw size={16} aria-hidden="true" />
        <span>Đặt lại góc nhìn</span>
      </button>
    </div>
  );
}
