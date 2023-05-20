import { useNavigate } from "react-router-dom"
import useInput from "../../hooks/useInput"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../store/reducer/auth"

const LoginPage = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useInput({ id: "", password: "" })

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (user.id === "" || user.password === "") {
      alert("데이터 입력")!

      return
    }

    try {
      const {
        data: { status, message, responseData },
      } = await axios.post(
        "http://phone.pinodev.shop:8000/api/user/login",
        user
      )

      if (status === 200) {
        dispatch(login(responseData))

        alert(message)

        navigate("/phone")
        return
      }

      alert(message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <input type="text" value={user.id} onChange={setUser} name="id" />
      <input
        type="password"
        value={user.password}
        onChange={setUser}
        name="password"
      />
      <button onClick={handleLogin}>LOGIN</button>
    </div>
  )
}

export default LoginPage
