import { useSelector } from "react-redux"
import {
  discreseCount,
  getCount,
  increseCount,
} from "../../store/reducer/count"
import { useDispatch } from "react-redux"

const CountPage = () => {
  const dispatch = useDispatch()

  const count = useSelector(getCount)

  const handleIncrese = () => {
    dispatch(increseCount(1))
  }

  const handleDiscrese = () => {
    dispatch(discreseCount(1))
  }

  return (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={handleIncrese}>INCRESE</button>
      <button onClick={handleDiscrese}>DISCRESE</button>
    </div>
  )
}

export default CountPage
