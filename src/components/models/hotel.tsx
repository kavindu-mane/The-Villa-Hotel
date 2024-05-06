"use client";

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["Tree_Model_Detailed_24_-_FU_-_134_Wood_-_Walnut_Horizontal_0"]: THREE.Mesh;
    ["Tree_Model_Detailed_24_-_FU_-_134_Foliage_-_Leaves_Tree_Small_0"]: THREE.Mesh;
    ["Grass_Model_24_-_FU_-_139_Paint_-_Forest_Green_0"]: THREE.Mesh;
    ["Post-Box_01_24_-_FU_-_142_Metal_-_Aluminium_0"]: THREE.Mesh;
    ["Tree_Model_Detailed_24_-_FU_-_134_Paint_-_Peach_0"]: THREE.Mesh;
    ["L_Sofa_-_FU_-_098_GDLM62_FABRIC_001-material_0"]: THREE.Mesh;
    ["Cooktop_Built-in_24_-_FU_-_105_Metal_-_Stainless_Steel_0"]: THREE.Mesh;
    ["SLA_-_019_Stone_-_Marble_Black_0"]: THREE.Mesh;
    ["SLA_-_019_Wood_-_Oak_Light_0"]: THREE.Mesh;
    ["SLA_-_015_Pavement_-_Asphalt_Light_0"]: THREE.Mesh;
    ["SLA_-_017_Tiles_-_White_Matte_15x15_0"]: THREE.Mesh;
    ["SLA_-_016_Wall_white_plaster_0"]: THREE.Mesh;
    ["SLA_-_016_Render_Carpet_-_Light_Blue_0"]: THREE.Mesh;
    ["SLA_-_019_Floorboards_-_03_0"]: THREE.Mesh;
    ["PalmTree_-_FU_-_141_GDLM14_palm02_001-material_0"]: THREE.Mesh;
    ["PalmTree_-_FU_-_141_GDLM15_date_palm_leaf-materi_0"]: THREE.Mesh;
    ["SLA_-_020_Tiles_-_Tan_30x30_0"]: THREE.Mesh;
    ["SLA_-_020_Floorboards_light_0"]: THREE.Mesh;
    ["WashingMachine_-_FU_-_097_GDLM21_Material_001-material_0"]: THREE.Mesh;
    ["CI_Tools_Wall_Covering_-__Stone_-_Marble_Carrara_White_0"]: THREE.Mesh;
    ["SW_-_347_Brick_-_White_Natural_0"]: THREE.Mesh;
    ["DOO_-_021_Wood_-_Walnut_Vertical_0"]: THREE.Mesh;
    ["SLA_-_018_Lino_-_Gray_0"]: THREE.Mesh;
    ["double_bed_white_-_FU_-_128_GDLM53_Material_023-material_0"]: THREE.Mesh;
    ["TR_-_017_Grass_-_Brown_0"]: THREE.Mesh;
    ["TR_-_018_Stonework_-_02_0"]: THREE.Mesh;
    ["BALUSTER_-_001_Paint_-_Golden_Beige_0"]: THREE.Mesh;
    ["CI_Tools_Roof_Covering_-__Roof_-_Asphalt_Shingle_Gray_0"]: THREE.Mesh;
    ["CI_Tools_Roof_Covering_-__Roof_-_Asphalt_Shingle_Gray_Lighter_0"]: THREE.Mesh;
  };
  materials: {
    ["Wood_-_Walnut_Horizontal"]: THREE.MeshStandardMaterial;
    ["Foliage_-_Leaves_Tree_Small"]: THREE.MeshStandardMaterial;
    ["Paint_-_Forest_Green"]: THREE.MeshStandardMaterial;
    ["PaletteMaterial001.003"]: THREE.MeshStandardMaterial;
    ["PaletteMaterial002.003"]: THREE.MeshStandardMaterial;
    ["GDLM62_FABRIC_001-material"]: THREE.MeshStandardMaterial;
    ["Metal_-_Stainless_Steel"]: THREE.MeshStandardMaterial;
    ["Stone_-_Marble_Black"]: THREE.MeshStandardMaterial;
    ["Wood_-_Oak_Light"]: THREE.MeshStandardMaterial;
    ["Pavement_-_Asphalt_Light"]: THREE.MeshStandardMaterial;
    ["Tiles_-_White_Matte_15x15"]: THREE.MeshStandardMaterial;
    Wall_white_plaster: THREE.MeshStandardMaterial;
    ["Render_Carpet_-_Light_Blue"]: THREE.MeshStandardMaterial;
    ["Floorboards_-_03"]: THREE.MeshStandardMaterial;
    ["GDLM14_palm02_001-material"]: THREE.MeshStandardMaterial;
    ["GDLM15_date_palm_leaf-materi"]: THREE.MeshStandardMaterial;
    ["Tiles_-_Tan_30x30"]: THREE.MeshStandardMaterial;
    Floorboards_light: THREE.MeshStandardMaterial;
    ["GDLM21_Material_001-material"]: THREE.MeshStandardMaterial;
    ["Stone_-_Marble_Carrara_White"]: THREE.MeshStandardMaterial;
    ["Brick_-_White_Natural"]: THREE.MeshStandardMaterial;
    ["Wood_-_Walnut_Vertical"]: THREE.MeshStandardMaterial;
    ["Lino_-_Gray"]: THREE.MeshStandardMaterial;
    ["GDLM53_Material_023-material"]: THREE.MeshStandardMaterial;
    ["Grass_-_Brown"]: THREE.MeshStandardMaterial;
    ["Stonework_-_02"]: THREE.MeshStandardMaterial;
    ["Paint_-_Golden_Beige"]: THREE.MeshStandardMaterial;
    ["Roof_-_Asphalt_Shingle_Gray"]: THREE.MeshStandardMaterial;
    ["Roof_-_Asphalt_Shingle_Gray_Lighter"]: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export const HotelModel = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("/models/hotel.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={
          nodes["Tree_Model_Detailed_24_-_FU_-_134_Wood_-_Walnut_Horizontal_0"]
            .geometry
        }
        material={materials["Wood_-_Walnut_Horizontal"]}
        position={[4.437, 0.737, -16.549]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes[
            "Tree_Model_Detailed_24_-_FU_-_134_Foliage_-_Leaves_Tree_Small_0"
          ].geometry
        }
        material={materials["Foliage_-_Leaves_Tree_Small"]}
        position={[4.437, 0.737, -16.549]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["Grass_Model_24_-_FU_-_139_Paint_-_Forest_Green_0"].geometry
        }
        material={materials["Paint_-_Forest_Green"]}
        position={[-1.367, 0.414, -1.968]}
        rotation={[-Math.PI / 2, 0, 0.173]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["Post-Box_01_24_-_FU_-_142_Metal_-_Aluminium_0"].geometry
        }
        material={materials["PaletteMaterial001.003"]}
        position={[-1.285, 1.539, 11.919]}
        rotation={[-Math.PI / 2, 0, 1.953]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["Tree_Model_Detailed_24_-_FU_-_134_Paint_-_Peach_0"].geometry
        }
        material={materials["PaletteMaterial002.003"]}
        position={[13.657, 0.403, 5.791]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["L_Sofa_-_FU_-_098_GDLM62_FABRIC_001-material_0"].geometry
        }
        material={materials["GDLM62_FABRIC_001-material"]}
        position={[3.544, 0.733, 5.285]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["Cooktop_Built-in_24_-_FU_-_105_Metal_-_Stainless_Steel_0"]
            .geometry
        }
        material={materials["Metal_-_Stainless_Steel"]}
        position={[11.548, 0.85, 5.927]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_019_Stone_-_Marble_Black_0"].geometry}
        material={materials["Stone_-_Marble_Black"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_019_Wood_-_Oak_Light_0"].geometry}
        material={materials["Wood_-_Oak_Light"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_015_Pavement_-_Asphalt_Light_0"].geometry}
        material={materials["Pavement_-_Asphalt_Light"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_017_Tiles_-_White_Matte_15x15_0"].geometry}
        material={materials["Tiles_-_White_Matte_15x15"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_016_Wall_white_plaster_0"].geometry}
        material={materials.Wall_white_plaster}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_016_Render_Carpet_-_Light_Blue_0"].geometry}
        material={materials["Render_Carpet_-_Light_Blue"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_019_Floorboards_-_03_0"].geometry}
        material={materials["Floorboards_-_03"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["PalmTree_-_FU_-_141_GDLM14_palm02_001-material_0"].geometry
        }
        material={materials["GDLM14_palm02_001-material"]}
        position={[-10.578, 0.846, -21.456]}
        rotation={[-Math.PI / 2, 0, 0.173]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["PalmTree_-_FU_-_141_GDLM15_date_palm_leaf-materi_0"].geometry
        }
        material={materials["GDLM15_date_palm_leaf-materi"]}
        position={[-10.578, 0.846, -21.456]}
        rotation={[-Math.PI / 2, 0, 0.173]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_020_Tiles_-_Tan_30x30_0"].geometry}
        material={materials["Tiles_-_Tan_30x30"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_020_Floorboards_light_0"].geometry}
        material={materials.Floorboards_light}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["WashingMachine_-_FU_-_097_GDLM21_Material_001-material_0"]
            .geometry
        }
        material={materials["GDLM21_Material_001-material"]}
        position={[7.257, 0.7, 0.386]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["CI_Tools_Wall_Covering_-__Stone_-_Marble_Carrara_White_0"]
            .geometry
        }
        material={materials["Stone_-_Marble_Carrara_White"]}
        position={[2.876, 0.7, 7.697]}
        rotation={[-Math.PI / 2, 0, 1.953]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SW_-_347_Brick_-_White_Natural_0"].geometry}
        material={materials["Brick_-_White_Natural"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["DOO_-_021_Wood_-_Walnut_Vertical_0"].geometry}
        material={materials["Wood_-_Walnut_Vertical"]}
        position={[-8.486, 1, -20.586]}
        rotation={[0, -1.189, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["SLA_-_018_Lino_-_Gray_0"].geometry}
        material={materials["Lino_-_Gray"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["double_bed_white_-_FU_-_128_GDLM53_Material_023-material_0"]
            .geometry
        }
        material={materials["GDLM53_Material_023-material"]}
        position={[2.221, 3.42, 2.42]}
        rotation={[-Math.PI / 2, 0, 0.382]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["TR_-_017_Grass_-_Brown_0"].geometry}
        material={materials["Grass_-_Brown"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["TR_-_018_Stonework_-_02_0"].geometry}
        material={materials["Stonework_-_02"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes["BALUSTER_-_001_Paint_-_Golden_Beige_0"].geometry}
        material={materials["Paint_-_Golden_Beige"]}
        position={[-3.268, 0.525, -5.102]}
        rotation={[-Math.PI / 2, 0, -1.134]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes["CI_Tools_Roof_Covering_-__Roof_-_Asphalt_Shingle_Gray_0"]
            .geometry
        }
        material={materials["Roof_-_Asphalt_Shingle_Gray"]}
        position={[11.248, 5.84, 1.176]}
        rotation={[-Math.PI / 2, 0, -2.76]}
        scale={0.01}
      />
      <mesh
        geometry={
          nodes[
            "CI_Tools_Roof_Covering_-__Roof_-_Asphalt_Shingle_Gray_Lighter_0"
          ].geometry
        }
        material={materials["Roof_-_Asphalt_Shingle_Gray_Lighter"]}
        position={[11.248, 5.84, 1.176]}
        rotation={[-Math.PI / 2, 0, -2.76]}
        scale={0.01}
      />
    </group>
  );
};

useGLTF.preload("/models/hotel.glb");
