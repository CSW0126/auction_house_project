import React, {useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls, Float } from '@react-three/drei';
import CameraRig from './CameraRig';
import Model from './Model';
import { useSnapshot } from 'valtio';
import state from '../store';
import { Ship, Shiba, Cup, Ball, Island, Shoe } from '../config/constants';

const CanvasModel = () => {
  const snap = useSnapshot(state);
  const controls = useRef()

  const updateShoeCurrent = (pro) => {
    console.log(pro);
    state.current = pro;
  };

  const renderModel = () => {
    if (snap.page == 'otherGift'){
      switch (snap.show) {
        case 'cup':
          return <Model model={Cup}/>
        case 'shiba':
          return <Model model={Shiba}/>
        case 'ball':
          return <Model model={Ball}/>
        case 'island':
          return <Model model={Island}/> 
        default:
          return <Model model={Ship}/>
      }

    }else if (snap.page == 'bidedItem'){
        return <Model 
          model={Shoe} 
          editable={true}
          updateCurrent={updateShoeCurrent}
          />

    } else {
      return <Model model={Ship}/>
    }
  }

  const GetProduct = () => {
    if (snap.page == 'otherGift'){
      switch (snap.show) {
        case 'cup':
          return Cup
        case 'shiba':
          return Shiba
        case 'ball':
          return Ball
        case 'island':
          return Island
        default:
          return Ship
      }
    }else if (snap.page == 'bidedItem'){
        return Shoe
    } else {
      return Ship
    }
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-up"
      // onClick={() => console.log('123')}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 1.1]}
          position={[0, -1, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

      <CameraRig Product={GetProduct()}>
        <Center>
        <Float
            speed={1}
            rotationIntensity={1}
            floatIntensity={1}
            floatingRange={[0, 0.3]}
          >
          {renderModel()}
          </Float>

        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel