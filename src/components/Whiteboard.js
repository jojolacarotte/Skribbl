import { useEffect } from 'react';
import { useCanvas } from "./../contexts/CanvasProvider";

export default function Whiteboard() {

    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        drawCanvas
      } = useCanvas();
    
    useEffect(() => {
        prepareCanvas();
    }, []);

    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
      }

    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={throttle(draw, 1)}
            ref={canvasRef}
        />
    )
}