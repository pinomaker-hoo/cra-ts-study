import ReactDOM from "react-dom/client"
import App from "./App"

import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./store"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
