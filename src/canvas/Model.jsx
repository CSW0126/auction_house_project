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
  const fullTexture = useTexture(snap.fullDecal);
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
    console.log(model.title)
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
    </group>
      )
    }else if (model.title == 'T-Shirt'){
      console.log('fdsgsdfg')
      return (
        <group>
          <mesh
            castShadow
            material-color={snap.TShirtColor}
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1}
            dispose={null}
          >
            {snap.isFullTexture && (
              <Decal 
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1.2}
                map={fullTexture}
              />
            )
          }

            {snap.isLogoTexture && (
              <Decal 
                position={[0, 0.04, 0.15]}
                rotation={[0, 0, 0]}
                scale={0.15}
                map={logoTexture}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
              />
            )}
          </mesh>
        </group>
      )
        
    }else{
      return (
        <Scene/>
      )
    }
  }


      useFrame((state, delta) => {
        if(snap.myItemShow == 'TShirt' && model.title == 'TShirt'){
          console.log('TShirt')
          easing.dampC(materials.lambert1.color, snap.TShirtColor, 0.25, delta)
        }
      });


   return (
    <group ref={group} castShadow={true}>
      {renderModel()}
    </group>
   )    


  
}

export default Model