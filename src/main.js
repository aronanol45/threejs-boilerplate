import * as THREE from "three";
import { isTouchDevice } from "./utils/isTouchDevice";
import Stats from "three/examples/jsm/libs/stats.module.js";

class Experience {
  constructor(canvasRef) {
    this.canvasRef = canvasRef;
    this.init();
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(this.getAdjustedPixelRatio());
  }

  getAdjustedPixelRatio() {
    return Math.min(window.devicePixelRatio, 2);
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      500,
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(this.canvasRef),
    });
    this.renderer.setPixelRatio(this.getAdjustedPixelRatio());

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.onResize();

    // avoid to trigger onResize on mobile adressbar hide/show
    if (isTouchDevice()) {
      window.addEventListener(
        "orientationchange",
        () => {
          this.onResize();
        },
        false,
      );
    } else {
      window.addEventListener(
        "resize",
        () => {
          this.onResize();
        },
        false,
      );
    }

    // other toolings
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.animate();
  }

  animate() {
    this.stats.begin();
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
    this.stats.end();

    requestAnimationFrame(() => {
      this.animate();
    });
  }
}

const myExperience = new Experience("#experience");
