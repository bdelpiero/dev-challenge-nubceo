import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./router/ProtectedRoute"
import { Bands } from "./pages/Bands"
import { Login } from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Bands />} />
        {/* <Route path="/band/:id" element={<Band />} /> */}
      </Route>
    </Routes>
  )
}

export default App
