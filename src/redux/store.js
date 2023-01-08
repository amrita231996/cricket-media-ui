import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'

import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevToolsDevelopmentOnly(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(sagas)

export default store
