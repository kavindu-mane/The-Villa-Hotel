"use client";
import * as THREE from "three";
import React, { FC, useEffect, useRef } from "react";
import { useGLTF, useAnimations, useBounds } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    Object_8001: THREE.Mesh;
    Object_6001: THREE.Mesh;
    Object_164: THREE.Mesh;
    Object_46: THREE.Mesh;
    Object_194: THREE.Mesh;
    Object_70: THREE.Mesh;
    Object_168: THREE.Mesh;
    Object_4002: THREE.Mesh;
    Object_160: THREE.Mesh;
    coconut_tree_coconut_tree_mat_0: THREE.Mesh;
    Object_87: THREE.Mesh;
    Object_15001: THREE.Mesh;
    Object_45: THREE.Mesh;
    Object_135: THREE.Mesh;
    Object_9001: THREE.Mesh;
  };
  materials: {
    PaletteMaterial002: THREE.MeshStandardMaterial;
    ["Wood.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    PaletteMaterial001: THREE.MeshPhysicalMaterial;
    wood: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshPhysicalMaterial;
    PaletteMaterial004: THREE.MeshPhysicalMaterial;
    Table_cloth: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshPhysicalMaterial;
    PaletteMaterial005: THREE.MeshPhysicalMaterial;
    coconut_tree_mat: THREE.MeshBasicMaterial;
    qita: THREE.MeshStandardMaterial;
    zhuozi: THREE.MeshStandardMaterial;
    boli: THREE.MeshStandardMaterial;
    yeti: THREE.MeshStandardMaterial;
    yizi: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "Object_0";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export const TableModel: FC<{
  setIsTopView: (value: boolean) => void;
  isTopView: boolean;
  setRoomId: (value: number) => void;
}> = (
  { setIsTopView, isTopView, setRoomId },
  props: JSX.IntrinsicElements["group"],
) => {
  const { nodes, materials, animations } = useGLTF(
    "/models/table.glb",
  ) as GLTFResult;
  const ref = useRef<THREE.Group>(null);
  const isInitialLoadRef = useRef(true);
  const { camera } = useThree();
  const { actions } = useAnimations(animations, ref);

  // reset positions when moving to top view
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }
    if (isTopView) {
      camera.position.set(0, 10, 0);
    } else {
      camera.position.set(0, 0, 10);
    }
    camera.lookAt(0, 0, 0);
    camera.zoom = 0.7;
    camera.updateProjectionMatrix();
  }, [camera, isTopView]);

  useEffect(() => {
    actions["Object_0"]?.play();
  }, [actions]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="Object_3" position={[-6.104, 0.831, 8.314]} scale={0.2}>
          <group
            name="Object_4"
            position={[-0.103, -7.312, -9.555]}
            rotation={[0, 0.013, 0]}
            scale={1.816}
          />
          <group
            name="Object_4006"
            position={[-0.103, -7.312, -9.555]}
            rotation={[0, 0.013, 0]}
            scale={1.816}
          />
          <group
            name="Object_4010"
            position={[-0.103, -7.312, -9.555]}
            rotation={[0, 0.013, 0]}
            scale={1.816}
          />
          <group
            name="Object_4014"
            position={[-0.103, -7.312, -9.555]}
            rotation={[0, 0.013, 0]}
            scale={1.816}
          />
        </group>
        <group
          name="Object_3001"
          position={[-2.181, 0.817, 7.6]}
          rotation={[0, 0.013, 0]}
          scale={0.2}
        >
          <group
            name="Object_4004"
            position={[-0.103, -7.312, -9.555]}
            scale={1.816}
          />
          <group
            name="Object_4012"
            position={[-0.103, -7.312, -9.555]}
            scale={1.816}
          />
        </group>
        <group
          name="Object_3002"
          position={[-2.463, 0.801, 1.563]}
          rotation={[0, 0.013, 0]}
          scale={0.2}
        >
          <group
            name="Object_4028"
            position={[-0.103, -7.312, -9.555]}
            scale={1.816}
          />
          <group
            name="Object_4030"
            position={[-0.103, -7.312, -9.555]}
            scale={1.816}
          />
        </group>
        <mesh
          name="Plane"
          geometry={nodes.Plane.geometry}
          material={materials.PaletteMaterial002}
          position={[-0.755, -0.062, -0.912]}
          scale={[10, 1, 10]}
        />
        <mesh
          name="Object_8001"
          geometry={nodes.Object_8001.geometry}
          material={materials["Wood.001"]}
          position={[5.923, 0.152, 7.471]}
        />
        <mesh
          name="Object_6001"
          geometry={nodes.Object_6001.geometry}
          material={materials["Material.002"]}
          position={[5.923, 0.488, 7.602]}
        />
        <mesh
          name="Object_164"
          geometry={nodes.Object_164.geometry}
          material={materials.PaletteMaterial001}
          position={[-7.136, 0.749, 6.073]}
          rotation={[0, 0.013, 0]}
          scale={0.432}
        />
        <mesh
          name="Object_46"
          geometry={nodes.Object_46.geometry}
          material={materials.wood}
          position={[-7.136, 0.348, 5.113]}
          rotation={[-Math.PI, -0.798, -Math.PI]}
          scale={0.029}
        />
        <mesh
          name="Object_194"
          geometry={nodes.Object_194.geometry}
          material={materials.PaletteMaterial003}
          position={[-7.617, 0.764, 5.818]}
          rotation={[0, 0.013, 0]}
          scale={0.041}
        />
        <mesh
          name="Object_70"
          geometry={nodes.Object_70.geometry}
          material={materials.PaletteMaterial004}
          position={[-8.093, 0.679, 6.152]}
          rotation={[0, 0.013, 0]}
          scale={[0.049, 0.004, 0.049]}
        />
        <mesh
          name="Object_168"
          geometry={nodes.Object_168.geometry}
          material={materials.Table_cloth}
          position={[-7.126, 0.724, 6.078]}
          rotation={[0, 0.013, 0]}
          scale={0.347}
        />
        <mesh
          name="Object_4002"
          geometry={nodes.Object_4002.geometry}
          material={materials["Material.003"]}
          position={[-7.832, 0.694, 5.906]}
          rotation={[0, 0.013, 0]}
          scale={0.5}
        />
        <mesh
          name="Object_160"
          geometry={nodes.Object_160.geometry}
          material={materials.PaletteMaterial005}
          position={[-8.119, 0.73, 6.035]}
          rotation={[0.064, 0.013, -0.001]}
          scale={[0.024, 0.124, 0.178]}
        />
        <mesh
          name="coconut_tree_coconut_tree_mat_0"
          geometry={nodes.coconut_tree_coconut_tree_mat_0.geometry}
          material={materials.coconut_tree_mat}
          position={[9.889, 0.186, 0.013]}
        />
        <mesh
          name="Object_87"
          geometry={nodes.Object_87.geometry}
          material={materials.qita}
          position={[6.706, 1.123, -8.499]}
          scale={1.769}
        />
        <mesh
          name="Object_15001"
          geometry={nodes.Object_15001.geometry}
          material={materials.zhuozi}
          position={[6.706, 1.123, -8.499]}
          scale={1.769}
        />
        <mesh
          name="Object_45"
          geometry={nodes.Object_45.geometry}
          material={materials.boli}
          position={[6.706, 1.123, -8.499]}
          scale={1.769}
        />
        <mesh
          name="Object_135"
          geometry={nodes.Object_135.geometry}
          material={materials.yeti}
          position={[6.706, 1.123, -8.499]}
          scale={1.769}
        />
        <mesh
          name="Object_9001"
          geometry={nodes.Object_9001.geometry}
          material={materials.yizi}
          position={[6.706, 1.123, -8.499]}
          scale={1.769}
        />
      </group>
    </group>
  );
};
