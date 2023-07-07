import { finishStroke, startStroke, updateStroke } from '@/redux/actions'
import {
  currentStrokeSelector,
  historyIndexSelector,
  strokesSelector,
} from '@/redux/root-reducer'
import { clearCanvas, drawStroke, setCanvasSize } from '@/utils/canvas-util'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CANVAS_WIDTH = 1024
const CANVAS_HEIGHT = 768

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentStroke = useSelector(currentStrokeSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)
  const dispatch = useDispatch()

  const isDrawing = !!currentStroke.points.length

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

    if (!context || !canvas) {
      return
    }

    requestAnimationFrame(() => {
      clearCanvas(canvas)

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color)
      })
    })
  }, [historyIndex, strokes])

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

  return { canvasRef, draw, startDrawing, finishDrawing }
}
