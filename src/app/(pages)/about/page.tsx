"use client";
import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

const About = () => {
	const maps = useLoader(THREE.TextureLoader, "/images/img_15.jpg");
	return (
		<div className="h-screen w-full">
			<Canvas
				frameloop="demand"
				camera={{ position: [0, 0, 1] }}>
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					enableDamping
					dampingFactor={0.2}
					autoRotate={false}
					rotateSpeed={-0.5}
				/>
				<Suspense fallback={null}>
					<Preload all />
					<group>
						<mesh>
							<sphereGeometry args={[500, 60, 40]} />
							<meshBasicMaterial
								map={maps}
								side={THREE.BackSide}
							/>
						</mesh>
					</group>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default About;
