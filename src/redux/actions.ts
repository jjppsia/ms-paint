import { Point } from './types'

export const START_STROKE = 'START_STROKE'
export const UPDATE_STROKE = 'UPDATE_STROKE'
export const FINISH_STROKE = 'FINISH_STROKE'

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
      type: typeof FINISH_STROKE
    }

export const startStroke = (x: number, y: number) => {
  return { type: START_STROKE, payload: { x, y } }
}

export const updateStroke = (x: number, y: number) => {
  return { type: UPDATE_STROKE, payload: { x, y } }
}

export const finishStroke = () => {
  return { type: FINISH_STROKE }
}
