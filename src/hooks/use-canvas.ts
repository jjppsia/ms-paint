import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { currentStrokeSelector } from '@/redux/root-reducer'
import { clearCanvas, drawStroke, setCanvasSize } from '@/utils/canvas-util'

const CANVAS_WIDTH = 1024
const CANVAS_HEIGHT = 768

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentStroke = useSelector(currentStrokeSelector)

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  useEffect(() => {
    const { context } = getCanvasWithContext()

    if (!context) {
      return
    }

    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    )
  }, [currentStroke])

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()

    if (!canvas || !context) {
      return
    }

    setCanvasSize(canvas, CANVAS_WIDTH, CANVAS_HEIGHT)

    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = 5
    context.strokeStyle = 'black'

    clearCanvas(canvas)
  }, [])

  return { canvasRef, currentStroke }
}
