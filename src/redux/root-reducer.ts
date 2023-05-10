import { Reducer } from 'redux'

import { Action, FINISH_STROKE, START_STROKE, UPDATE_STROKE } from './actions'
import { RootState } from './types'

const initialState: RootState = {
  currentStroke: { points: [], color: '#000' },
  strokes: [],
}

export const rootReducer: Reducer<RootState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case START_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      }
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      }
    }
    case FINISH_STROKE: {
      if (!state.currentStroke.points.length) {
        return state
      }

      return {
        ...state,
        currentStroke: { ...state.currentStroke, points: [] },
        strokes: [...state.strokes, state.currentStroke],
      }
    }
    default:
      return state
  }
}

export const currentStrokeSelector = (state: RootState) => state.currentStroke
