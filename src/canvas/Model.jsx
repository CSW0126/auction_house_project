import React, { useRef, useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';



import state from '../store';
const Model = ({model, updateCurrent}) => {
  const snap = useSnapshot(state);
  const gltf = useLoader(GLTFLoader, model.path)
  // const { nodes, materials } = useGLTF(model.path);
  // console.log(nodes)
  // console.log(materials)
  const { nodes, materials } = useGLTF(model.path);

  const [hovered, setHovered] = useState(null);
  const logoTexture = useTexture(snap.logoDecal);
  console.log(nodes)
  console.log(materials)

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
    }
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  
  const Scene = () =>{
    // console.log(nodes)
    // console.log(materials)
    console.log((gltf))
    return (
      <primitive 
        object={gltf.scene} 
        position={model.position}
        rotation={model.rotation}
        scale={model.scale}
      />
    )
  }
  const group = useRef()

  const renderModel = () => {
    // console.log(model.title)
    // console.log(model.title)
    if (model.title == 'Shoe'){
      return(
        <group
          dispose={null}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(e.object.material.name);
          }}
          onPointerOut={(e) => {
            if (e.intersections.length === 0) {
              setHovered(null);
            }
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            updateCurrent(e.object.material.name);
          }}
          onPointerMissed={() => {
            updateCurrent(null);
          }}
        >
          <mesh
        castShadow
        material-color={snap.colors.laces}
        geometry={nodes.shoe.geometry}
        material={materials.laces}
      />
      <mesh
        castShadow
        material-color={snap.colors.mesh}
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
      />
      <mesh
        castShadow
        material-color={snap.colors.caps}
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
      />
      <mesh
        castShadow
        material-color={snap.colors.inner}
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
      />
      <mesh
        castShadow
        material-color={snap.colors.sole}
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
      />
      <mesh
        castShadow
        material-color={snap.colors.stripes}
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
      />
      <mesh
        castShadow
        material-color={snap.colors.band}
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
      />
      <mesh
        castShadow
        material-color={snap.colors.patch}
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
      />
        {/* <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              position={[735.89, 495.83, 692.58]}
              rotation={[Math.PI, 0.76, 2.68]}
              scale={100}
            />
            <group
              position={[-37.57, -223.59, 77.18]}
              rotation={[-1.57, -0.01, 0.01]}
              scale={[103.84, 108.84, 476.71]}
            >
              <mesh castShadow geometry={nodes.Sphere__0.geometry}>
                <meshStandardMaterial color={snap.colors.hull} name="hull" />
              </mesh>
            </group>
            <group
              position={[-44.14, -562.08, 77.18]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[112.9, 120.19, 120.19]}
            >
              <mesh castShadow geometry={nodes.Cylinder__0.geometry}>
                <meshStandardMaterial color={snap.colors.base} name="base" />
              </mesh>
            </group>
            <group
              position={[-37.58, 198.03, 77.18]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[25.89, 120.19, 72.57]}
            >
              <mesh castShadow geometry={nodes.Sphere001__0.geometry}>
                <meshStandardMaterial color={snap.colors.tip} name="tip" />
              </mesh>
            </group>
            <group
              position={[5.54, -555.21, -46.56]}
              rotation={[-Math.PI / 2, 0, 2.9]}
              scale={[33.29, 41.05, 67.48]}
            >
              <mesh castShadow geometry={nodes.Cube001__0.geometry}>
                <meshStandardMaterial color={snap.colors.wings} name="wings" />
              </mesh>
            </group>
            <group
              position={[-175.48, -555.21, 92.53]}
              rotation={[-Math.PI / 2, 0, -1.38]}
              scale={[33.29, 41.05, 67.48]}
            >
              <mesh castShadow geometry={nodes.Cube002__0.geometry}>
                <meshStandardMaterial color={snap.colors.wings} name="wings" />
              </mesh>
            </group>
            <group
              position={[27.08, -555.21, 197.81]}
              rotation={[-Math.PI / 2, 0, 0.63]}
              scale={[33.29, 41.05, 67.48]}
            >
              <mesh castShadow geometry={nodes.Cube003__0.geometry}>
                <meshStandardMaterial color={snap.colors.wings} name="wings" />
              </mesh>
            </group>
            <group
              position={[-45.05, 156.5, 80.42]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <mesh castShadow geometry={nodes.Cylinder002__0.geometry}>
                <meshStandardMaterial color={snap.colors.tip} name="tip" />
              </mesh>
            </group>
            <group
              position={[-40.41, -99.49, 79.72]}
              rotation={[-0.05, -0.02, -1.58]}
              scale={[71.67, 71.67, 115.24]}
            >
              <mesh castShadow geometry={nodes.Cylinder003__0.geometry}>
                <meshStandardMaterial color={snap.colors.window} name="window" />
              </mesh>
            </group>
          </group>
        </group> */}
    </group>
      )
    }else{
      return (
        <Scene/>
      )
    }
  }


   return (
    <group ref={group} castShadow={true}>
      {renderModel()}
    </group>
   )    


  
}

export default Model