import { RootState } from "../../.."

interface InitalState {
  count: number
}

const initalState: InitalState = {
  count: 0,
}

export const counter = (
  state = initalState,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case "INCRESE":
      return {
        ...state,
        count: state.count + action.payload,
      }

    case "DISCRESE":
      return {
        ...state,
        count: state.count - action.payload,
      }

    default:
      return state
  }
}

export const increseCount = (count: number) => ({
  type: "INCRESE",
  payload: count,
})

export const discreseCount = (count: number) => ({
  type: "DISCRESE",
  payload: count,
})

export const getCount = (state: RootState) => state.counter.count
