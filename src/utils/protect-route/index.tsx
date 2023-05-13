import React, { useMemo } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { isNull } from "lodash"

export function ProtectRoute({ target }: any) {
  const token = localStorage.getItem("token")
  const logined = useMemo(() => {
    return !isNull(token)
  }, [token])

  return logined ? <Outlet /> : <Navigate to="/" />
}

export function PublicRoute({ target }: any) {
  const token = localStorage.getItem("token")
  const logined = useMemo(() => {
    return !isNull(token)
  }, [token])

  return logined ? <Navigate to="/phone" /> : <Outlet />
}
