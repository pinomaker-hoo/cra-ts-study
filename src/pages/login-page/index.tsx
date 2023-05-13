import { useNavigate } from "react-router-dom"
import useInput from "../../hooks/useInput"
import axios from "axios"

const LoginPage = () => {
  const [user, setUser] = useInput({ id: "", password: "" })

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (user.id === "" || user.password === "") {
      alert("데이터 입력")!

      return
    }

    try {
      const {
        data: {
          status,
          message,
          responseData: { accessToken },
        },
      } = await axios.post(
        "http://phone.pinodev.shop:8000/api/user/login",
        user
      )

      if (status === 200) {
        localStorage.setItem("token", accessToken)

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
