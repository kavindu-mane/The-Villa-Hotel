"use client";

// import React, { Suspense } from "react";
// import * as THREE from "three";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls, Preload } from "@react-three/drei";

const AboutPage = () => {
  // const maps = useLoader(THREE.TextureLoader, "/images/img_15.jpg");
  // return (
  // 	<div className="h-screen w-full">
  // 		<Canvas
  // 			frameloop="demand"
  // 			camera={{ position: [0, 0, 1] }}>
  // 			<OrbitControls
  // 				enableZoom={false}
  // 				enablePan={false}
  // 				enableDamping
  // 				dampingFactor={0.2}
  // 				autoRotate={false}
  // 				rotateSpeed={-0.5}
  // 			/>
  // 			<Suspense fallback={null}>
  // 				<Preload all />
  // 				<group>
  // 					<mesh>
  // 						<sphereGeometry args={[500, 60, 40]} />
  // 						<meshBasicMaterial
  // 							map={maps}
  // 							side={THREE.BackSide}
  // 						/>
  // 					</mesh>
  // 				</group>
  // 			</Suspense>
  // 		</Canvas>
  // 	</div>
  // );
  return (
    <div className="h-screen w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">About</h1>
        <p className="text-xl">This is the about page</p>
      </div>
    </div>
  );
};

export default AboutPage;
