"use client";

import * as THREE from "three";
import React, { FC, useEffect, useRef } from "react";
import { useBounds, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    ["01_01_0"]: THREE.Mesh;
    ["01_01_0001"]: THREE.Mesh;
    ["01_01_0002"]: THREE.Mesh;
    ["������������001_������"]: THREE.Mesh;
    ["������������001_������001"]: THREE.Mesh;
    ["������������001_�������"]: THREE.Mesh;
    ["������������002_������"]: THREE.Mesh;
    ["������������002_������001"]: THREE.Mesh;
    ["������������002_�������"]: THREE.Mesh;
    ["������������003_������"]: THREE.Mesh;
    ["������������003_������001"]: THREE.Mesh;
    ["������������003_�������"]: THREE.Mesh;
    ["������������004_������"]: THREE.Mesh;
    ["������������004_������001"]: THREE.Mesh;
    ["������������004_�������"]: THREE.Mesh;
    ["������������005_������"]: THREE.Mesh;
    ["������������005_������001"]: THREE.Mesh;
    ["������������005_�������"]: THREE.Mesh;
    ["������������006_������"]: THREE.Mesh;
    ["������������006_������001"]: THREE.Mesh;
    ["������������006_�������"]: THREE.Mesh;
    ["������������007_������"]: THREE.Mesh;
    ["������������007_������001"]: THREE.Mesh;
    ["������������007_�������"]: THREE.Mesh;
    Chair1_Metal028_2K_0: THREE.Mesh;
    Chair1_Wood049_2K_0: THREE.Mesh;
    Chair1_Metal028_2K_0001: THREE.Mesh;
    Chair1_Wood049_2K_0001: THREE.Mesh;
    Chair1_Metal028_2K_0002: THREE.Mesh;
    Chair1_Wood049_2K_0002: THREE.Mesh;
    Chair1_Metal028_2K_0003: THREE.Mesh;
    Chair1_Wood049_2K_0003: THREE.Mesh;
    Chair1_Metal028_2K_0004: THREE.Mesh;
    Chair1_Wood049_2K_0004: THREE.Mesh;
    Chair1_Metal028_2K_0005: THREE.Mesh;
    Chair1_Wood049_2K_0005: THREE.Mesh;
    Chair1_Metal028_2K_0006: THREE.Mesh;
    Chair1_Wood049_2K_0006: THREE.Mesh;
    Chair1_Metal028_2K_0007: THREE.Mesh;
    Chair1_Wood049_2K_0007: THREE.Mesh;
    Chair2_Metal028_2K_0: THREE.Mesh;
    Chair2_Wood049_2K_0: THREE.Mesh;
    Chair2_Metal028_2K_0001: THREE.Mesh;
    Chair2_Wood049_2K_0001: THREE.Mesh;
    Chair2_Metal028_2K_0002: THREE.Mesh;
    Chair2_Wood049_2K_0002: THREE.Mesh;
    Chair2_Metal028_2K_0003: THREE.Mesh;
    Chair2_Wood049_2K_0003: THREE.Mesh;
    Chair2_Metal028_2K_0004: THREE.Mesh;
    Chair2_Wood049_2K_0004: THREE.Mesh;
    Chair2_Metal028_2K_0005: THREE.Mesh;
    Chair2_Wood049_2K_0005: THREE.Mesh;
    Chair2_Metal028_2K_0006: THREE.Mesh;
    Chair2_Wood049_2K_0006: THREE.Mesh;
    Chair2_Metal028_2K_0007: THREE.Mesh;
    Chair2_Wood049_2K_0007: THREE.Mesh;
    Chair3_Metal028_2K_0: THREE.Mesh;
    Chair3_Wood049_2K_0: THREE.Mesh;
    Chair3_Metal028_2K_0001: THREE.Mesh;
    Chair3_Wood049_2K_0001: THREE.Mesh;
    Chair3_Metal028_2K_0002: THREE.Mesh;
    Chair3_Wood049_2K_0002: THREE.Mesh;
    Chair3_Metal028_2K_0003: THREE.Mesh;
    Chair3_Wood049_2K_0003: THREE.Mesh;
    Chair3_Metal028_2K_0004: THREE.Mesh;
    Chair3_Wood049_2K_0004: THREE.Mesh;
    Chair3_Metal028_2K_0005: THREE.Mesh;
    Chair3_Wood049_2K_0005: THREE.Mesh;
    Chair3_Metal028_2K_0006: THREE.Mesh;
    Chair3_Wood049_2K_0006: THREE.Mesh;
    Chair3_Metal028_2K_0007: THREE.Mesh;
    Chair3_Wood049_2K_0007: THREE.Mesh;
    Chair4_Metal028_2K_0: THREE.Mesh;
    Chair4_Wood049_2K_0: THREE.Mesh;
    Chair4_Metal028_2K_0001: THREE.Mesh;
    Chair4_Metal028_2K_0005: THREE.Mesh;
    Chair4_Metal028_2K_0006: THREE.Mesh;
    Chair4_Metal028_2K_0007: THREE.Mesh;
    Chair4_Wood049_2K_0001: THREE.Mesh;
    Chair4_Wood049_2K_0005: THREE.Mesh;
    Chair4_Wood049_2K_0006: THREE.Mesh;
    Chair4_Wood049_2K_0007: THREE.Mesh;
    Chair4_Metal028_2K_0002: THREE.Mesh;
    Chair4_Wood049_2K_0002: THREE.Mesh;
    Chair4_Metal028_2K_0003: THREE.Mesh;
    Chair4_Wood049_2K_0003: THREE.Mesh;
    Chair4_Metal028_2K_0004: THREE.Mesh;
    Chair4_Wood049_2K_0004: THREE.Mesh;
    Table_Metal028_2K_0: THREE.Mesh;
    Table_Wood049_2K_0: THREE.Mesh;
    Table_Metal028_2K_0001: THREE.Mesh;
    Table_Wood049_2K_0001: THREE.Mesh;
    Table_Metal028_2K_0002: THREE.Mesh;
    Table_Wood049_2K_0002: THREE.Mesh;
    Table_Metal028_2K_0003: THREE.Mesh;
    Table_Wood049_2K_0003: THREE.Mesh;
    Table_Metal028_2K_0004: THREE.Mesh;
    Table_Wood049_2K_0004: THREE.Mesh;
    Table_Metal028_2K_0005: THREE.Mesh;
    Table_Wood049_2K_0005: THREE.Mesh;
    Table_Metal028_2K_0006: THREE.Mesh;
    Table_Wood049_2K_0006: THREE.Mesh;
    Table_Metal028_2K_0007: THREE.Mesh;
    Table_Wood049_2K_0007: THREE.Mesh;
    Null_wood_0001: THREE.Mesh;
    Null_wood_0002: THREE.Mesh;
    Null_wood_0003: THREE.Mesh;
    Null_wood_0004: THREE.Mesh;
    Null_wood_0005: THREE.Mesh;
    polySurface12_lambert2_0: THREE.Mesh;
    polySurface13_lambert2_0: THREE.Mesh;
    polySurface14_lambert2_0: THREE.Mesh;
    polySurface15_lambert2_0: THREE.Mesh;
    polySurface16_lambert2_0: THREE.Mesh;
    polySurface17_lambert2_0: THREE.Mesh;
    polySurface18_lambert2_0: THREE.Mesh;
    polySurface19_lambert2_0: THREE.Mesh;
    polySurface20_lambert2_0: THREE.Mesh;
    polySurface22_lambert2_0: THREE.Mesh;
    polySurface23_lambert1_0: THREE.Mesh;
    polySurface1_lambert2_0: THREE.Mesh;
    polySurface10_lambert2_0: THREE.Mesh;
    polySurface11_lambert2_0: THREE.Mesh;
    polySurface3_lambert2_0: THREE.Mesh;
    polySurface5_lambert2_0: THREE.Mesh;
    polySurface6_lambert2_0: THREE.Mesh;
    polySurface8_lambert2_0: THREE.Mesh;
    polySurface9_lambert2_0: THREE.Mesh;
    pSphere10_lambert7_0: THREE.Mesh;
    pSphere4_blinn2_0: THREE.Mesh;
    pSphere5_blinn2_0: THREE.Mesh;
    pSphere6_blinn2_0: THREE.Mesh;
    pSphere7_lambert4_0: THREE.Mesh;
    pSphere8_lambert4_0: THREE.Mesh;
    pSphere9_lambert4_0: THREE.Mesh;
    polySurface12_lambert2_0001: THREE.Mesh;
    polySurface13_lambert2_0001: THREE.Mesh;
    polySurface14_lambert2_0001: THREE.Mesh;
    polySurface15_lambert2_0001: THREE.Mesh;
    polySurface16_lambert2_0001: THREE.Mesh;
    polySurface17_lambert2_0001: THREE.Mesh;
    polySurface18_lambert2_0001: THREE.Mesh;
    polySurface19_lambert2_0001: THREE.Mesh;
    polySurface20_lambert2_0001: THREE.Mesh;
    polySurface22_lambert2_0001: THREE.Mesh;
    polySurface23_lambert1_0001: THREE.Mesh;
    polySurface1_lambert2_0001: THREE.Mesh;
    polySurface10_lambert2_0001: THREE.Mesh;
    polySurface11_lambert2_0001: THREE.Mesh;
    polySurface3_lambert2_0001: THREE.Mesh;
    polySurface5_lambert2_0001: THREE.Mesh;
    polySurface6_lambert2_0001: THREE.Mesh;
    polySurface8_lambert2_0001: THREE.Mesh;
    polySurface9_lambert2_0001: THREE.Mesh;
    pSphere10_lambert7_0001: THREE.Mesh;
    pSphere4_blinn2_0001: THREE.Mesh;
    pSphere5_blinn2_0001: THREE.Mesh;
    pSphere6_blinn2_0001: THREE.Mesh;
    pSphere7_lambert4_0001: THREE.Mesh;
    pSphere8_lambert4_0001: THREE.Mesh;
    pSphere9_lambert4_0001: THREE.Mesh;
    polySurface12_lambert2_0002: THREE.Mesh;
    polySurface13_lambert2_0002: THREE.Mesh;
    polySurface14_lambert2_0002: THREE.Mesh;
    polySurface15_lambert2_0002: THREE.Mesh;
    polySurface16_lambert2_0002: THREE.Mesh;
    polySurface17_lambert2_0002: THREE.Mesh;
    polySurface18_lambert2_0002: THREE.Mesh;
    polySurface19_lambert2_0002: THREE.Mesh;
    polySurface20_lambert2_0002: THREE.Mesh;
    polySurface22_lambert2_0002: THREE.Mesh;
    polySurface23_lambert1_0002: THREE.Mesh;
    polySurface1_lambert2_0002: THREE.Mesh;
    polySurface10_lambert2_0002: THREE.Mesh;
    polySurface11_lambert2_0002: THREE.Mesh;
    polySurface3_lambert2_0002: THREE.Mesh;
    polySurface5_lambert2_0002: THREE.Mesh;
    polySurface6_lambert2_0002: THREE.Mesh;
    polySurface8_lambert2_0002: THREE.Mesh;
    polySurface9_lambert2_0002: THREE.Mesh;
    pSphere10_lambert7_0002: THREE.Mesh;
    pSphere4_blinn2_0002: THREE.Mesh;
    pSphere5_blinn2_0002: THREE.Mesh;
    pSphere6_blinn2_0002: THREE.Mesh;
    pSphere7_lambert4_0002: THREE.Mesh;
    pSphere8_lambert4_0002: THREE.Mesh;
    pSphere9_lambert4_0002: THREE.Mesh;
    polySurface12_lambert2_0003: THREE.Mesh;
    polySurface13_lambert2_0003: THREE.Mesh;
    polySurface14_lambert2_0003: THREE.Mesh;
    polySurface15_lambert2_0003: THREE.Mesh;
    polySurface16_lambert2_0003: THREE.Mesh;
    polySurface17_lambert2_0003: THREE.Mesh;
    polySurface18_lambert2_0003: THREE.Mesh;
    polySurface19_lambert2_0003: THREE.Mesh;
    polySurface20_lambert2_0003: THREE.Mesh;
    polySurface22_lambert2_0003: THREE.Mesh;
    polySurface23_lambert1_0003: THREE.Mesh;
    polySurface1_lambert2_0003: THREE.Mesh;
    polySurface10_lambert2_0003: THREE.Mesh;
    polySurface11_lambert2_0003: THREE.Mesh;
    polySurface3_lambert2_0003: THREE.Mesh;
    polySurface5_lambert2_0003: THREE.Mesh;
    polySurface6_lambert2_0003: THREE.Mesh;
    polySurface8_lambert2_0003: THREE.Mesh;
    polySurface9_lambert2_0003: THREE.Mesh;
    pSphere10_lambert7_0003: THREE.Mesh;
    pSphere4_blinn2_0003: THREE.Mesh;
    pSphere5_blinn2_0003: THREE.Mesh;
    pSphere6_blinn2_0003: THREE.Mesh;
    pSphere7_lambert4_0003: THREE.Mesh;
    pSphere8_lambert4_0003: THREE.Mesh;
    pSphere9_lambert4_0003: THREE.Mesh;
    Text: THREE.Mesh;
    Text001: THREE.Mesh;
    Text002: THREE.Mesh;
    Text003: THREE.Mesh;
    Text006: THREE.Mesh;
    Text007: THREE.Mesh;
    Text008: THREE.Mesh;
    Text009: THREE.Mesh;
    Text010: THREE.Mesh;
    Text011: THREE.Mesh;
    Text012: THREE.Mesh;
    Text013: THREE.Mesh;
    Text014: THREE.Mesh;
    Text015: THREE.Mesh;
    Text005: THREE.Mesh;
    Text017: THREE.Mesh;
    Text004: THREE.Mesh;
    Text016: THREE.Mesh;
    Text018: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
    [".001"]: THREE.MeshStandardMaterial;
    [".002"]: THREE.MeshStandardMaterial;
    [".003"]: THREE.MeshStandardMaterial;
    [".004"]: THREE.MeshStandardMaterial;
    ["material.001"]: THREE.MeshStandardMaterial;
    [".005"]: THREE.MeshStandardMaterial;
    Metal028_2K: THREE.MeshStandardMaterial;
    Wood049_2K: THREE.MeshStandardMaterial;
    wood: THREE.MeshStandardMaterial;
    lambert2: THREE.MeshStandardMaterial;
    lambert1: THREE.MeshStandardMaterial;
    lambert7: THREE.MeshStandardMaterial;
    blinn2: THREE.MeshStandardMaterial;
    lambert4: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export const TableModel: FC<{
  setIsTopView: (value: boolean) => void;
  isTopView: boolean;
  setRoomId: (value: number) => void;
}> = (
  { setIsTopView, isTopView, setRoomId },
  props: JSX.IntrinsicElements["group"],
) => {
  const { nodes, materials } = useGLTF("/models/table.glb") as GLTFResult;
  const ref = useRef<THREE.Group>(null);
  const isInitialLoadRef = useRef(true);
  const { camera } = useThree();
  const bounds = useBounds();

  // reset positions when moving to top view
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }
    if (isTopView) {
      camera.position.set(0, 10, 0);
    } else {
      camera.position.set(0, 3, 5);
    }
    camera.lookAt(0, 0, 0);
    camera.zoom = 0.5;
    camera.updateProjectionMatrix();
  }, [camera, isTopView]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={3}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[-13.496, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0.511]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["01_01_0"].geometry}
              material={materials.material}
              position={[7.992, 0.633, -0.881]}
              scale={1.532}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["01_01_0001"].geometry}
              material={materials.material}
              position={[10.233, 0.999, -0.88]}
              scale={1.532}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["01_01_0002"].geometry}
              material={materials.material}
              position={[7.447, 2.652, -0.87]}
              scale={1.532}
            />
          </group>
        </group>
      </group>
      <group
        position={[0, -3.75, 0.73]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={3}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[880.09, 108.302, -154.393]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[866.562, 116.32, 186.348]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0001.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0001.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[571.281, 97.364, -154.154]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0002.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0002.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[239.703, 104.568, -163.916]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0003.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0003.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[-108.991, 100.891, -165.406]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0004.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0004.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[566.489, 124.081, 172.431]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0005.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0005.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[566.489, 124.081, 172.431]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0006.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0006.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.052]}
            />
          </group>
          <group
            position={[227.275, 124.081, 177.168]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Metal028_2K_0007.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair1_Wood049_2K_0007.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.128]}
            />
          </group>
          <group
            position={[751.304, 108.302, -154.393]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[737.777, 116.32, 186.348]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0001.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0001.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[442.496, 97.364, -154.154]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0002.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0002.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[110.917, 104.568, -163.916]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0003.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0003.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[-237.777, 100.891, -165.406]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0004.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0004.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[437.703, 124.081, 172.431]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0005.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0005.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[437.703, 124.081, 172.431]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0006.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0006.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.052]}
            />
          </group>
          <group
            position={[98.49, 124.081, 177.168]}
            rotation={[-Math.PI / 2, 0, -3.016]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Metal028_2K_0007.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair2_Wood049_2K_0007.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.128]}
            />
          </group>
          <group
            position={[880.09, 108.302, -230.699]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[866.562, 116.32, 110.041]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0001.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0001.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[571.281, 97.364, -230.461]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0002.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0002.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[239.703, 104.568, -240.223]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0003.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0003.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[-108.991, 100.891, -241.713]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0004.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0004.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[566.489, 124.081, 96.125]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0005.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0005.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[566.489, 124.081, 96.125]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0006.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0006.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.052]}
            />
          </group>
          <group
            position={[227.276, 124.081, 100.861]}
            rotation={[-Math.PI / 2, 0, 0.238]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Metal028_2K_0007.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair3_Wood049_2K_0007.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.128]}
            />
          </group>
          <group
            position={[751.304, 108.302, -241.739]}
            rotation={[-Math.PI / 2, 0, 2.737]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[623.37, 340.935, -153.725]}
            rotation={[-Math.PI / 2, 0, 2.737]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0001.geometry}
              material={materials.Metal028_2K}
              position={[-1.567, 1.436, -1.721]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0005.geometry}
              material={materials.Metal028_2K}
              position={[0.588, 2.241, -1.661]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0006.geometry}
              material={materials.Metal028_2K}
              position={[0.588, 2.241, -1.661]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0007.geometry}
              material={materials.Metal028_2K}
              position={[2.964, 3.297, -1.661]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0001.geometry}
              material={materials.Wood049_2K}
              position={[-1.567, 1.436, -1.721]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0005.geometry}
              material={materials.Wood049_2K}
              position={[0.588, 2.241, -1.661]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0006.geometry}
              material={materials.Wood049_2K}
              position={[0.588, 2.241, -1.714]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0007.geometry}
              material={materials.Wood049_2K}
              position={[2.964, 3.297, -1.79]}
            />
          </group>
          <group
            position={[442.496, 97.364, -241.501]}
            rotation={[-Math.PI / 2, 0, 2.737]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0002.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0002.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[110.917, 104.568, -251.262]}
            rotation={[-Math.PI / 2, 0, 2.737]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0003.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0003.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[-237.777, 100.891, -252.752]}
            rotation={[-Math.PI / 2, 0, 2.737]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Metal028_2K_0004.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Chair4_Wood049_2K_0004.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[782.21, 147.787, -145.514]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[768.683, 155.805, 195.227]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0001.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0001.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[473.402, 136.849, -145.276]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0002.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0002.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[141.823, 144.053, -155.038]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0003.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0003.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[-206.871, 140.376, -156.528]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0004.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0004.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[468.609, 163.566, 181.31]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0005.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0005.geometry}
              material={materials.Wood049_2K}
            />
          </group>
          <group
            position={[468.609, 163.566, 181.31]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0006.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0006.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.052]}
            />
          </group>
          <group
            position={[129.396, 163.566, 186.046]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={130.529}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Metal028_2K_0007.geometry}
              material={materials.Metal028_2K}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Table_Wood049_2K_0007.geometry}
              material={materials.Wood049_2K}
              position={[0, 0, -0.128]}
            />
          </group>
        </group>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={3}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[0.408, 47.446, 0.076]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Null_wood_0001.geometry}
              material={materials.wood}
              position={[-175.774, -85.219, 162.722]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Null_wood_0002.geometry}
              material={materials.wood}
              position={[-161.749, -83.859, 481.49]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Null_wood_0003.geometry}
              material={materials.wood}
              position={[133.334, -88.417, 475.185]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Null_wood_0004.geometry}
              material={materials.wood}
              position={[490.65, -82.295, 465.885]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Null_wood_0005.geometry}
              material={materials.wood}
              position={[796.51, -76.477, 457.913]}
            />
          </group>
        </group>
      </group>
      <group
        position={[43.931, -3.382, -15.459]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.622}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-1.446, 1.856, 1.8]} rotation={[0, 1.339, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface12_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface13_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface14_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface15_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface16_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface17_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface18_lambert2_0.geometry}
              material={materials.lambert2}
              position={[-2.456, -0.096, 8.466]}
              rotation={[-0.274, -0.135, -0.098]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface19_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface20_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface22_lambert2_0.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface23_lambert1_0.geometry}
              material={materials.lambert1}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface1_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface10_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface11_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface3_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface5_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface6_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface8_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface9_lambert2_0.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere10_lambert7_0.geometry}
            material={materials.lambert7}
            position={[-0.834, 0.324, 0.603]}
            scale={[2.265, 0.309, 2.265]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere4_blinn2_0.geometry}
            material={materials.blinn2}
            position={[0, 1.748, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere5_blinn2_0.geometry}
            material={materials.blinn2}
            position={[1.026, 1.984, 1.463]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere6_blinn2_0.geometry}
            material={materials.blinn2}
            position={[-1.254, 2.055, 2.687]}
            rotation={[0, 1.237, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere7_lambert4_0.geometry}
            material={materials.lambert4}
            position={[0.393, 9.713, 1.02]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere8_lambert4_0.geometry}
            material={materials.lambert4}
            position={[1.148, 9.949, 1.88]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere9_lambert4_0.geometry}
            material={materials.lambert4}
            position={[-0.82, 10.02, 2.708]}
            rotation={[0, 1.237, 0]}
            scale={0.683}
          />
        </group>
      </group>
      <group
        position={[46.252, -3.834, 7.751]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.622}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-1.446, 1.856, 1.8]} rotation={[0, 1.339, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface12_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface13_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface14_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface15_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface16_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface17_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface18_lambert2_0001.geometry}
              material={materials.lambert2}
              position={[-2.456, -0.096, 8.466]}
              rotation={[-0.274, -0.135, -0.098]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface19_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface20_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface22_lambert2_0001.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface23_lambert1_0001.geometry}
              material={materials.lambert1}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface1_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface10_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface11_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface3_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface5_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface6_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface8_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface9_lambert2_0001.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere10_lambert7_0001.geometry}
            material={materials.lambert7}
            position={[-0.834, 0.324, 0.603]}
            scale={[2.265, 0.309, 2.265]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere4_blinn2_0001.geometry}
            material={materials.blinn2}
            position={[0, 1.748, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere5_blinn2_0001.geometry}
            material={materials.blinn2}
            position={[1.026, 1.984, 1.463]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere6_blinn2_0001.geometry}
            material={materials.blinn2}
            position={[-1.254, 2.055, 2.687]}
            rotation={[0, 1.237, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere7_lambert4_0001.geometry}
            material={materials.lambert4}
            position={[0.393, 9.713, 1.02]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere8_lambert4_0001.geometry}
            material={materials.lambert4}
            position={[1.148, 9.949, 1.88]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere9_lambert4_0001.geometry}
            material={materials.lambert4}
            position={[-0.82, 10.02, 2.708]}
            rotation={[0, 1.237, 0]}
            scale={0.683}
          />
        </group>
      </group>
      <group
        position={[-23.376, -2.956, -16.546]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.622}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-1.446, 1.856, 1.8]} rotation={[0, 1.339, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface12_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface13_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface14_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface15_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface16_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface17_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface18_lambert2_0002.geometry}
              material={materials.lambert2}
              position={[-2.456, -0.096, 8.466]}
              rotation={[-0.274, -0.135, -0.098]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface19_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface20_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface22_lambert2_0002.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface23_lambert1_0002.geometry}
              material={materials.lambert1}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface1_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface10_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface11_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface3_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface5_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface6_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface8_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface9_lambert2_0002.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere10_lambert7_0002.geometry}
            material={materials.lambert7}
            position={[-0.834, 0.324, 0.603]}
            scale={[2.265, 0.309, 2.265]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere4_blinn2_0002.geometry}
            material={materials.blinn2}
            position={[0, 1.748, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere5_blinn2_0002.geometry}
            material={materials.blinn2}
            position={[1.026, 1.984, 1.463]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere6_blinn2_0002.geometry}
            material={materials.blinn2}
            position={[-1.254, 2.055, 2.687]}
            rotation={[0, 1.237, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere7_lambert4_0002.geometry}
            material={materials.lambert4}
            position={[0.393, 9.713, 1.02]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere8_lambert4_0002.geometry}
            material={materials.lambert4}
            position={[1.148, 9.949, 1.88]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere9_lambert4_0002.geometry}
            material={materials.lambert4}
            position={[-0.82, 10.02, 2.708]}
            rotation={[0, 1.237, 0]}
            scale={0.683}
          />
        </group>
      </group>
      <group
        position={[-22.89, -2.708, 8.212]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.622}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-1.446, 1.856, 1.8]} rotation={[0, 1.339, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface12_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface13_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface14_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface15_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface16_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface17_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface18_lambert2_0003.geometry}
              material={materials.lambert2}
              position={[-2.456, -0.096, 8.466]}
              rotation={[-0.274, -0.135, -0.098]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface19_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface20_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface22_lambert2_0003.geometry}
              material={materials.lambert2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.polySurface23_lambert1_0003.geometry}
              material={materials.lambert1}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface1_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface10_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface11_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface3_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface5_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface6_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface8_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface9_lambert2_0003.geometry}
            material={materials.lambert2}
            position={[0, 1.984, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere10_lambert7_0003.geometry}
            material={materials.lambert7}
            position={[-0.834, 0.324, 0.603]}
            scale={[2.265, 0.309, 2.265]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere4_blinn2_0003.geometry}
            material={materials.blinn2}
            position={[0, 1.748, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere5_blinn2_0003.geometry}
            material={materials.blinn2}
            position={[1.026, 1.984, 1.463]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere6_blinn2_0003.geometry}
            material={materials.blinn2}
            position={[-1.254, 2.055, 2.687]}
            rotation={[0, 1.237, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere7_lambert4_0003.geometry}
            material={materials.lambert4}
            position={[0.393, 9.713, 1.02]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere8_lambert4_0003.geometry}
            material={materials.lambert4}
            position={[1.148, 9.949, 1.88]}
            scale={0.683}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere9_lambert4_0003.geometry}
            material={materials.lambert4}
            position={[-0.82, 10.02, 2.708]}
            rotation={[0, 1.237, 0]}
            scale={0.683}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.001"]}
        position={[-5.767, 0.926, 15.151]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={materials["Material.001"]}
        position={[3.002, 0.677, 14.759]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text002.geometry}
        material={materials["Material.001"]}
        position={[13.396, 0.731, 14.218]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text003.geometry}
        material={materials["Material.001"]}
        position={[-6.188, 1.346, 5.24]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text006.geometry}
        material={materials["Material.001"]}
        position={[22.802, 1.26, 5.396]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text007.geometry}
        material={materials["Material.001"]}
        position={[22.426, 1.146, 14.118]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text008.geometry}
        material={materials["Material.001"]}
        position={[-6.004, 0.451, -4.929]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text009.geometry}
        material={materials["Material.001"]}
        position={[4.367, 0.942, -4.882]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text010.geometry}
        material={materials["Material.001"]}
        position={[14.303, 0.61, -4.668]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text011.geometry}
        material={materials["Material.001"]}
        position={[23.495, 0.882, -4.594]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text012.geometry}
        material={materials["Material.001"]}
        position={[-7.518, 0.305, -15.752]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text013.geometry}
        material={materials["Material.001"]}
        position={[2.879, 0.534, -14.886]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text014.geometry}
        material={materials["Material.001"]}
        position={[18.873, 0.789, -10.676]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text015.geometry}
        material={materials["Material.001"]}
        position={[24.248, 0.973, -14.684]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text005.geometry}
        material={materials["Material.001"]}
        position={[13.94, 1.493, 4.978]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text017.geometry}
        material={materials["Material.001"]}
        position={[3.623, 1.493, 5.12]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text004.geometry}
        material={materials["Material.001"]}
        position={[14.418, 0.694, -14.809]}
        scale={[2.004, 1.66, 2.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text016.geometry}
        material={materials["Material.001"]}
        position={[1.751, 1.601, -23.324]}
        rotation={[1.072, 0, 0]}
        scale={[3.142, 2.603, 3.142]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text018.geometry}
        material={materials["Material.001"]}
        position={[17.866, 0.776, 26.2]}
        rotation={[2.07, 0.007, -3.129]}
        scale={[3.142, 2.603, 3.142]}
      />
      <group scale={0.01}>
        <group
          position={[-97.521, 94.447, -105.123]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[60.476, 60.476, 3.764]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������001_������"].geometry}
            material={materials[".001"]}
            position={[-11.798, 27.396, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������001_������001"].geometry}
            material={materials[".001"]}
            position={[-11.798, 27.396, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������001_�������"].geometry}
            material={materials[".001"]}
            position={[7.127, 27.223, -57.159]}
            scale={1.714}
          />
        </group>
        <group
          position={[-97.521, -49.536, 118.426]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={[60.476, 60.476, 3.764]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������002_������"].geometry}
            material={materials[".002"]}
            position={[11.798, -24.918, -26.62]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������002_������001"].geometry}
            material={materials[".002"]}
            position={[11.798, -24.918, -26.62]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������002_�������"].geometry}
            material={materials[".002"]}
            position={[-7.127, -24.745, -20.856]}
            scale={1.714}
          />
        </group>
        <group
          position={[96.626, -49.536, 118.426]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={[60.476, 60.476, 3.764]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������003_������"].geometry}
            material={materials[".003"]}
            position={[9.505, -24.918, -26.62]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������003_������001"].geometry}
            material={materials[".003"]}
            position={[9.505, -24.918, -26.62]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������003_�������"].geometry}
            material={materials[".003"]}
            position={[-9.42, -24.972, -15.264]}
            scale={1.714}
          />
        </group>
        <group
          position={[-221.11, 94.447, -1.588]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[60.476, 60.476, 3.764]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������004_������"].geometry}
            material={materials[".004"]}
            position={[26.173, 13.257, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������004_������001"].geometry}
            material={materials[".004"]}
            position={[26.173, 13.257, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������004_�������"].geometry}
            material={materials[".004"]}
            position={[26, -5.668, -57.159]}
            scale={1.714}
          />
        </group>
        <group
          position={[96.626, 94.447, -105.123]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[60.476, 60.476, 3.764]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������005_������"].geometry}
            material={materials["material.001"]}
            position={[-9.505, 27.396, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������005_������001"].geometry}
            material={materials["material.001"]}
            position={[-9.505, 27.396, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������005_�������"].geometry}
            material={materials["material.001"]}
            position={[9.42, 27.223, -57.159]}
            scale={1.714}
          />
        </group>
        <group
          position={[219.726, 94.447, -1.588]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[60.476, 60.476, 3.764]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������006_������"].geometry}
            material={materials[".005"]}
            position={[-26.173, -8.051, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������006_������001"].geometry}
            material={materials[".005"]}
            position={[-26.173, -8.051, -54.727]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������006_�������"].geometry}
            material={materials[".005"]}
            position={[-26, 10.873, -57.159]}
            scale={1.714}
          />
        </group>
        <group
          position={[0, 138.45, -0.267]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[237.759, 114.893, 6.1]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������007_������"].geometry}
            material={materials["material.001"]}
            position={[-2.708, 13.769, -28.616]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������007_������001"].geometry}
            material={materials["material.001"]}
            position={[-2.708, 13.769, -28.616]}
            scale={1.714}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["������������007_�������"].geometry}
            material={materials["material.001"]}
            position={[2.106, 13.678, -30.117]}
            scale={1.714}
          />
        </group>
      </group>
    </group>
  );
};
