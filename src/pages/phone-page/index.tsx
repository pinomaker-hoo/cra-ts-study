import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { isUndefined } from "lodash"

const PhonePage = () => {
  const [data, setData] = useState<any[]>([])
  const [reRenderSwitch, setReRenderSwitch] = useState<boolean>(false)

  const handleRefetch = () => setReRenderSwitch(true)

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
      {phoneList.map((item, index: number) => (
        <li key={index}>{item.name}</li>
      ))}
      <button onClick={handleRefetch}>FETCH</button>
    </div>
  )
}

export default PhonePage
