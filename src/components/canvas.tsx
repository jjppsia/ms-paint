import { useDispatch } from 'react-redux'

import { useCanvas } from '@/hooks/use-canvas'
import { finishStroke, startStroke, updateStroke } from '@/redux/actions'

function Canvas() {
  const { canvasRef, currentStroke } = useCanvas()

  const isDrawing = !!currentStroke.points.length
  const dispatch = useDispatch()

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent

    if (!isDrawing) {
      return
    }

    dispatch(updateStroke(offsetX, offsetY))
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent

    dispatch(startStroke(offsetX, offsetY))
  }

  const finishDrawing = () => {
    if (isDrawing) {
      dispatch(finishStroke())
    }
  }

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
