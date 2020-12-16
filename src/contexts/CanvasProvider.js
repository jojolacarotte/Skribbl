import React, { useContext, useRef, useState } from "react";
import { useSocket } from '../contexts/SocketProvider';

const CanvasContext = React.createContext();

export const useCanvas = () => useContext(CanvasContext);

export function CanvasProvider({children}) {
    const socket = useSocket();
    const divRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    let isDrawing = false; 
    let prevPos = {x : 0, y:0}
    let rect;

    socket.on('receiveDrawingData', (drawingData, drawerWidth) => {
      if (canvasRef.current === null)
        return
      let w = canvasRef.current.width;
      let h = canvasRef.current.height;
      drawLine(drawingData.x0 * w, drawingData.y0 * h, drawingData.x1 * w, drawingData.y1 * h, true);
    })

    const prepareCanvas = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth;
        canvas.height = (window.innerHeight * 2);
        canvas.style.width = `${window.innerWidth/2}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d")
        rect = canvas.getBoundingClientRect();
        console.log('rect',  rect)
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log('nativeEvent', nativeEvent)
    let x = nativeEvent.clientX - rect.left||nativeEvent.touches[0].clientX;
    let y = nativeEvent.clientY - rect.top||nativeEvent.touches[0].clientY;
    prevPos.x = x;
    prevPos.y = y;
    isDrawing = true;
  };

  const finishDrawing = ({ nativeEvent }) => {
    drawLine(prevPos.x, prevPos.y, nativeEvent.clientX||nativeEvent.touches[0].clientX, nativeEvent.clientY||nativeEvent.touches[0].clientY);
    isDrawing = false;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    drawLine(prevPos.x, prevPos.y, nativeEvent.clientX||nativeEvent.touches[0].clientX, nativeEvent.clientY||nativeEvent.touches[0].clientY);

    let x = nativeEvent.clientX - rect.left||nativeEvent.touches[0].clientX;
    let y = nativeEvent.clientY - rect.top||nativeEvent.touches[0].clientY;
    prevPos.x = x;
    prevPos.y = y;
  };

  const drawLine = (x0, y0, x1, y1, emit = false) => {
    let w = canvasRef.current.width;
    let h = canvasRef.current.height;
    contextRef.current.beginPath();
    contextRef.current.moveTo(x0, y0);
    contextRef.current.lineTo(x1  - rect.left, y1- rect.top);
    contextRef.current.stroke();
    contextRef.current.closePath();
    if (emit) { return; }
    socket.emit('drawingData', {x0: x0/w, y0 : y0/h, x1: x1/w, y1: y1/h}, 2880);
  }

  const drawCanvas = () => {
    if (socket === undefined)
      return
    socket.on('receiveDrawingData', (drawingData, drawerWidth) => {
      let w = canvasRef.current.width;
      let h = canvasRef.current.height;
      drawLine(drawingData.x0 * w, drawingData.y0 * h, drawingData.x1 * w, drawingData.y1 * h, true);
    })
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        divRef
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
