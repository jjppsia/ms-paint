import { Point } from './types'

export const START_STROKE = 'START_STROKE'
export const UPDATE_STROKE = 'UPDATE_STROKE'
export const SET_STROKE_COLOR = 'SET_STROKE_COLOR'
export const FINISH_STROKE = 'FINISH_STROKE'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

export type Action =
  | {
      type: typeof START_STROKE
      payload: Point
    }
  | {
      type: typeof UPDATE_STROKE
      payload: Point
    }
  | {
      type: typeof SET_STROKE_COLOR
      payload: string
    }
  | {
      type: typeof FINISH_STROKE
    }
  | {
      type: typeof UNDO
    }
  | {
      type: typeof REDO
    }

export const startStroke = (x: number, y: number) => {
  return { type: START_STROKE, payload: { x, y } }
}

export const updateStroke = (x: number, y: number) => {
  return { type: UPDATE_STROKE, payload: { x, y } }
}

export const setStrokeColor = (color: string) => {
  return { type: SET_STROKE_COLOR, payload: color }
}

export const finishStroke = () => {
  return { type: FINISH_STROKE }
}

export const undo = () => {
  return { type: UNDO }
}

export const redo = () => {
  return { type: REDO }
}
