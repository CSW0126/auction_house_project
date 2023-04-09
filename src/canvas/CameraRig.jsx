import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import * as THREE from 'three';

import state from '../store';

const CameraRig = ({ children, Product }) => {
  const group = useRef();
  const snap = useSnapshot(state);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState([0, 0, 0]);
  const initPosition = Product.normalSize.homePosition;

  const handleMouseDown = (event) => {
      setIsDragging(true);
      setPreviousMousePosition({
        x: event.clientX,
        y: event.clientY,
      });

  };

  const handleMouseUp = () => {
      setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    const currentPage = window.location.href.split('/').pop();
    // set the initial position of the model
    let targetPosition = initPosition
    if(currentPage == 'home' || currentPage == '') {
      if(isBreakpoint) targetPosition = Product.midSize.homePosition;
      if(isMobile) targetPosition = Product.phoneSize.homePosition;
    }
    else if(currentPage == 'auction') {
      if(isMobile) targetPosition = Product.phoneSize.auctionPosition;
      else targetPosition = Product.normalSize.auctionPosition;
    }else if(currentPage == 'signin' || currentPage == 'signup') {
      if(isMobile) targetPosition = Product.phoneSize.signPosition;
      else targetPosition = Product.normalSize.signPosition;
    }else if(currentPage == 'otherGift') {
      if(isMobile) targetPosition = Product.phoneSize.otherPosition;
      else targetPosition = Product.normalSize.otherPosition;
    }else if(currentPage == 'bidedItem') {
      if(isMobile) targetPosition = Product.phoneSize.bidPosition;
      else targetPosition = Product.normalSize.bidPosition;
    }else{
      targetPosition = [0,0,1200];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation smoothly
    if (isDragging ) {
      if (currentPage == 'bidedItem' && snap.ColorPickerOn){
        easing.dampE(
          group.current.rotation,
          [state.pointer.y / 10, -state.pointer.x / 5, 0],
          0.25,
          delta
        );
      }else{
        const mousePosition = {
          x: state.mouse.x,
          y: state.mouse.y,
        };
        const rotation = [
          currentRotation[0] + (mousePosition.y - previousMousePosition.y) / 100,
          currentRotation[1] + (mousePosition.x - previousMousePosition.x) / 100,
          currentRotation[2],
        ];
  
        easing.dampE(group.current.rotation, rotation, 0.25, delta);
        setCurrentRotation(rotation);
        setPreviousMousePosition(mousePosition);
      }
    } else {
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
