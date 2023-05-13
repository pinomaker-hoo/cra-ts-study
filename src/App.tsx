import axios from "axios"
import useInput from "./hooks/useInput"
import { useCallback, useEffect, useMemo, useState } from "react"
import { isUndefined } from "lodash"

const App = () => {
  const [user, setUser] = useInput({ id: "", password: "" })
  const [data, setData] = useState<any[]>([])
  const [reRenderSwitch, setReRenderSwitch] = useState<boolean>(false)

  const handleRefetch = () => setReRenderSwitch(true)

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

        return
      }

      alert(message)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://phone.pinodev.shop:8000/api/phone",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      return data
    } catch (err) {
      console.log(err)
    }
  }

  const phoneList = useMemo(() => {
    return isUndefined(data)
      ? []
      : data.map((item) => {
          return { ...item, name: item.name + "님" }
        })
  }, [data])

  const trasnformName = useCallback((arr: { name: string }[]) => {
    return arr.map((item) => ({ ...item, name: item.name + "님" }))
  }, [])

  useEffect(() => {
    if (reRenderSwitch) {
      setReRenderSwitch(false)
    }

    fetchData().then(({ responseData, status }) => {
      if (status === 200) {
        setData(responseData)

        return
      }

      alert("로그인 해주세요.")
    })
  }, [reRenderSwitch])

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
      {phoneList.map((item, index: number) => (
        <li key={index}>{item.name}</li>
      ))}
      <button onClick={handleRefetch}>FETCH</button>
    </div>
  )
}

export default App
