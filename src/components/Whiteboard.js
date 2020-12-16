import { useEffect } from 'react';
import { useCanvas } from "./../contexts/CanvasProvider";

export default function Whiteboard() {

    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        difRef
      } = useCanvas();
    
    useEffect(() => {
        prepareCanvas();
    }, []);

    return (
        <div ref={difRef}>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    )
}