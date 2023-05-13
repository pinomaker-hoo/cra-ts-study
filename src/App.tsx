import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login-page"
import PhonePage from "./pages/phone-page"
import { ProtectRoute, PublicRoute } from "./utils/protect-route"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectRoute />}>
          <Route path="/phone" element={<PhonePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
