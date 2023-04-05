import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ScrollModelAnimation() {
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  const [_camera, setCamera] = useState();
  const [scene] = useState(new THREE.Scene());
  const [_controls, setControls] = useState();

  const refContainer = useRef();

  useEffect(() => {
    const parameters = {
      materialColor: "#ffeded",
    };
    const { container } = refContainer;

    if (container && !renderer) {
      // Texture
      const textureLoader = new THREE.TextureLoader();
      const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
      const particlesTexture = textureLoader.load("textures/particles/1.png");
      // material
      const material = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture,
      });

      // Object
      const objectDistance = 4;
      const mesh1 = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0, 4, 16, 60),
        material
      );
      const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(1), material);
      const mesh3 = new THREE.Mesh(new THREE.SphereGeometry(1), material);
      const mesh4 = new THREE.Mesh(new THREE.SphereGeometry(1), material);
      const mesh5 = new THREE.Mesh(new THREE.SphereGeometry(1), material);

      mesh1.position.x = 3;
      mesh2.position.x = -3;
      mesh3.position.x = 3;
      mesh4.position.x = -3;
      mesh5.position.x = 3;

      mesh1.position.y = objectDistance * 0;
      mesh2.position.y = objectDistance * 1;
      mesh3.position.y = objectDistance * 2;
      mesh4.position.y = objectDistance * 3;
      mesh5.position.y = objectDistance * 4;

      scene.add(mesh1, mesh2, mesh3, mesh4, mesh5);
      const sectionMeshes = [mesh1, mesh2, mesh3, mesh4, mesh5];

      // lights
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 0);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // particle geometry
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 1000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] =
          objectDistance * 0.5 -
          Math.random() * objectDistance * sectionMeshes.length;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferGeometry(positions, 3)
      );

      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      // particles material
      const particleMaterial = new THREE.PointsMaterial();
      particleMaterial.size = 0.1;
      particleMaterial.sizeAttenuation = true;
      particleMaterial.color = new THREE.Color("#ff88cc");
      particleMaterial.transparent = true;
      particleMaterial.alphaMap = particlesTexture;
      particleMaterial.depthWrite = false;
      particleMaterial.depthTest = false;
      particleMaterial.blending = THREE.AdditiveBlending;
      particleMaterial.vertexColors = true
    }
  }, []);

  return <div>ScrollModelAnimation</div>;
}
