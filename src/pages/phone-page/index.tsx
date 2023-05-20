import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { isUndefined } from "lodash"
import { useSelector } from "react-redux"
import { getToken } from "../../store/reducer/auth"

const PhonePage = () => {
  const { accessToken } = useSelector(getToken)

  const [data, setData] = useState<any[]>([])
  const [reRenderSwitch, setReRenderSwitch] = useState<boolean>(false)

  const handleRefetch = () => setReRenderSwitch(true)

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://phone.pinodev.shop:8000/api/phone",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      {phoneList.map((item, index: number) => (
        <li key={index}>{item.name}</li>
      ))}
      <button onClick={handleRefetch}>FETCH</button>
    </div>
  )
}

export default PhonePage
