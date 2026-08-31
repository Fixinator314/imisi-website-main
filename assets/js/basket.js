import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     ELEMENTS
     ========================================================== */

  const stage = document.getElementById("basketExperience");
  const canvas = document.getElementById("basketCanvas");

  if (!stage || !canvas) {
    console.warn("Basket stage or canvas not found.");
    return;
  }

  /* ==========================================================
     SCENE
     ========================================================== */

  const scene = new THREE.Scene();

  /* ==========================================================
     CAMERA
     ========================================================== */

  const camera = new THREE.PerspectiveCamera(
    32,
    stage.clientWidth / stage.clientHeight,
    0.01,
    100,
  );

  camera.position.set(0, 0, 6);

  /* ==========================================================
     RENDERER
     ========================================================== */

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setSize(stage.clientWidth, stage.clientHeight, false);

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.shadowMap.enabled = true;

  /* ==========================================================
     LIGHTING
     ========================================================== */

  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x052e32, 2.5);

  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3);

  keyLight.position.set(3, 4, 5);
  keyLight.castShadow = true;

  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xbed639, 1.4);

  fillLight.position.set(-4, 2, 3);

  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x076870, 3, 8);

  rimLight.position.set(0, 2, -3);

  scene.add(rimLight);

  /* ==========================================================
     BASKET GROUP
     
     IMPORTANT:
     ScrollTrigger controls the GROUP.
     The infinite rotation controls the MODEL.

     This prevents the two animations from fighting.
     ========================================================== */

  const basketGroup = new THREE.Group();

  scene.add(basketGroup);

  let basket = null;

  let finalSpin = null;

  /* ==========================================================
     LOAD BASKET
     ========================================================== */

  const loader = new GLTFLoader();

  loader.load(
    "./assets/models/imnisi-basket-final.glb",

    (gltf) => {
      basket = gltf.scene;

      /* ------------------------------------------------------
         CENTER MODEL
         ------------------------------------------------------ */

      const box = new THREE.Box3().setFromObject(basket);

      const center = box.getCenter(new THREE.Vector3());

      basket.position.sub(center);

      /* ------------------------------------------------------
         INITIAL MODEL SCALE
         ------------------------------------------------------ */

      basket.scale.setScalar(0.18);

      /* ------------------------------------------------------
         INITIAL MODEL ROTATION
         
         This is the orientation of the actual basket.
         ScrollTrigger will control the GROUP rotation.
         ------------------------------------------------------ */

      basket.rotation.set(0, 0, 0);

      /* ------------------------------------------------------
         MESH SETTINGS
         ------------------------------------------------------ */

      basket.traverse((child) => {
        if (!child.isMesh) {
          return;
        }

        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.needsUpdate = true;
        }
      });

      /* ------------------------------------------------------
         ADD MODEL TO GROUP
         ------------------------------------------------------ */

      basketGroup.add(basket);

      /* ------------------------------------------------------
         INITIAL GROUP POSITION
         ------------------------------------------------------ */

      basketGroup.position.set(-2.2, 1.8, 0);

      /* ------------------------------------------------------
         INITIAL GROUP ROTATION
         ------------------------------------------------------ */

      basketGroup.rotation.set(0.3, -0.8, -0.2);

      console.log("Ìmísí basket loaded.");

      setupBasketScroll();
    },

    /* --------------------------------------------------------
       LOADING PROGRESS
       -------------------------------------------------------- */

    (progress) => {
      if (progress.total) {
        const percent = Math.round((progress.loaded / progress.total) * 100);

        console.log(`Basket loading: ${percent}%`);
      }
    },

    /* --------------------------------------------------------
       LOADING ERROR
       -------------------------------------------------------- */

    (error) => {
      console.error("Unable to load basket:", error);
    },
  );

  /* ==========================================================
     BASKET SCROLL ANIMATION
     ========================================================== */

  function setupBasketScroll() {
    if (!basket) {
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#basketExperience",

        start: "top top",

        end: "+=5900",

        scrub: 1.5,

        pin: true,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          handleFinalSpin(self.progress);
        },
      },
    });

    /* ========================================================
       01 — TINY OBJECT ENTERS
       ======================================================== */

    timeline.to(basket.scale, {
      x: 0.3,
      y: 0.3,
      z: 0.3,

      duration: 0.18,

      ease: "power2.out",
    });

    /* ========================================================
       02 — FIRST SWING
       ======================================================== */

    timeline.to(basketGroup.position, {
      x: 2.0,
      y: 0.4,

      duration: 0.35,

      ease: "power2.inOut",
    });

    timeline.to(
      basketGroup.rotation,
      {
        x: Math.PI * 0.7,
        y: Math.PI * 1.5,
        z: -Math.PI * 0.35,

        duration: 0.35,

        ease: "power2.inOut",
      },
      "<",
    );

    /* ========================================================
       03 — SWING BACK
       ======================================================== */

    timeline.to(basketGroup.position, {
      x: -1.5,
      y: -0.5,

      duration: 0.35,

      ease: "power2.inOut",
    });

    timeline.to(
      basketGroup.rotation,
      {
        x: Math.PI * 1.4,
        y: Math.PI * 2.8,
        z: Math.PI * 0.4,

        duration: 0.35,

        ease: "power2.inOut",
      },
      "<",
    );

    /* ========================================================
       04 — GROW
       ======================================================== */

    timeline.to(basket.scale, {
      x: 1.15,
      y: 1.15,
      z: 1.15,

      duration: 0.35,

      ease: "power3.inOut",
    });

    /* ========================================================
       05 — MOVE TOWARD CENTER
       ======================================================== */

    timeline.to(
      basketGroup.position,
      {
        x: 0.5,
        y: -0.15,

        duration: 0.35,

        ease: "power3.inOut",
      },
      "<",
    );

    /* ========================================================
       06 — BECOME LARGE
       ======================================================== */

    timeline.to(basket.scale, {
      x: 1.8,
      y: 1.8,
      z: 1.8,

      duration: 0.35,

      ease: "power3.inOut",
    });

    /* ========================================================
       07 — MOVE INTO FINAL POSITION
       ======================================================== */

    timeline.to(
      basketGroup.position,
      {
        x: 0,
        y: 0.55,
        z: 0,

        duration: 0.35,

        ease: "power3.inOut",
      },
      "<",
    );

    /* ========================================================
       08 — FINAL STRAIGHTEN
       
       Group rotation is reset.
       The basket itself remains at zero rotation.
       ======================================================== */

    timeline.to(basketGroup.rotation, {
      x: 0,
      y: 0,
      z: 0,

      duration: 0.5,

      ease: "power3.out",
    });

    /* ========================================================
       09 — FINAL SETTLE
       ======================================================== */

    timeline.to(basketGroup.position, {
      x: 0,
      y: 0.65,
      z: 0,

      duration: 0.25,

      ease: "power3.out",
    });

    /* ========================================================
   EDITORIAL TEXT ANIMATION
   ======================================================== */

    const editorialTop = document.querySelector(".basket-editorial--top");

    const editorialBottom = document.querySelector(".basket-editorial--bottom");

    const statementOne = document.querySelector(".basket-statement--one");

    const statementTwo = document.querySelector(".basket-statement--two");

    const statementFinal = document.querySelector(".basket-statement--final");

    /* ========================================================
   INTRO LABEL
   ======================================================== */

    timeline.to(
      editorialTop,
      {
        opacity: 1,

        duration: 0.15,

        ease: "power2.out",
      },
      0.05,
    );

    /* ========================================================
   FIRST STATEMENT
   ======================================================== */

    timeline.to(
      statementOne,
      {
        opacity: 1,

        y: 0,

        duration: 0.2,

        ease: "power3.out",
      },
      0.28,
    );

    /* ========================================================
   FIRST STATEMENT LEAVES
   ======================================================== */

    timeline.to(
      statementOne,
      {
        opacity: 0,

        y: -30,

        duration: 0.12,

        ease: "power2.in",
      },
      0.43,
    );

    /* ========================================================
   SECOND STATEMENT
   ======================================================== */

    timeline.to(
      statementTwo,
      {
        opacity: 1,

        y: 0,

        duration: 0.2,

        ease: "power3.out",
      },
      0.45,
    );

    /* ========================================================
   SECOND STATEMENT LEAVES
   ======================================================== */

    timeline.to(
      statementTwo,
      {
        opacity: 0,

        y: -30,

        duration: 0.12,

        ease: "power2.in",
      },
      0.65,
    );

    /* ========================================================
   FINAL STATEMENT
   ======================================================== */

    timeline.to(
      statementFinal,
      {
        opacity: 1,

        y: 0,

        duration: 0.25,

        ease: "power3.out",
      },
      0.72,
    );

    /* ========================================================
   BOTTOM LABEL
   ======================================================== */

    timeline.to(
      editorialBottom,
      {
        opacity: 1,

        duration: 0.2,

        ease: "power2.out",
      },
      0.78,
    );
  }

  /* ==========================================================
     FINAL INFINITE ROTATION
     
     Only the MODEL rotates.
     The ScrollTrigger controls the GROUP.

     This keeps the two systems independent.
     ========================================================== */

  function handleFinalSpin(progress) {
    /* --------------------------------------------------------
       START SPIN
       -------------------------------------------------------- */

    if (progress >= 0.98 && !finalSpin) {
      finalSpin = gsap.to(basket.rotation, {
        y: `+=${Math.PI * 2}`,

        duration: 8,

        repeat: -1,

        ease: "none",
      });
    }

    /* --------------------------------------------------------
       STOP SPIN WHEN SCROLLING BACK
       -------------------------------------------------------- */

    if (progress < 0.95 && finalSpin) {
      finalSpin.kill();

      finalSpin = null;

      /* Reset model rotation */

      gsap.to(basket.rotation, {
        x: 0,
        y: 0,
        z: 0,

        duration: 0.2,

        overwrite: true,
      });
    }
  }

  /* ==========================================================
     RESIZE
     ========================================================== */

  function resize() {
    const width = stage.clientWidth;
    const height = stage.clientHeight;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
  }

  window.addEventListener("resize", resize);

  /* ==========================================================
     RENDER LOOP
     ========================================================== */

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }

  render();
});
