import { useEffect } from 'react';
import { useCanvas } from "./../contexts/CanvasProvider";

export default function Whiteboard() {

    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
      } = useCanvas();
    
    useEffect(() => {
        prepareCanvas();
    }, []);

    return (
        <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        />
    )
}