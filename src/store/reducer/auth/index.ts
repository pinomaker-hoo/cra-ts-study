import { RootState } from "../../.."

interface InitalState {
  accessToken: string
  refreshToken: string
  name: string
}

interface LoginProps {
  accessToken: string
  refreshToken: string
  name: string
}

const initalState: InitalState = {
  accessToken: "",
  refreshToken: "",
  name: "",
}

export const auth = (
  state = initalState,
  action: { type: string; payload: LoginProps }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      }

    case "LOGOUT":
      return {
        state: initalState,
      }

    default:
      return state
  }
}

export const login = (user: LoginProps) => ({
  type: "LOGIN",
  payload: user,
})

export const logout = () => ({
  type: "LOGOUT",
})

export const getToken = (state: RootState) => state.auth
