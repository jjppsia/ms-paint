import { useCanvas } from '@/hooks/use-canvas'

function Canvas() {
  const { canvasRef, draw, startDrawing, finishDrawing } = useCanvas()

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseOut={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  )
}

export default Canvas
