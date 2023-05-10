import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
)
