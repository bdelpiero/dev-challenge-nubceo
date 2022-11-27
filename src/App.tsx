import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './router/ProtectedRoute'
import { Bands } from './pages/Bands'
import { Login } from './pages/Login'
import { Band } from './pages/Band'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}

      <Route element={<ProtectedRoute />}>
        <Route path="/bands" element={<Bands />} />
        <Route path="/band/:id" element={<Band />} />
        <Route path="/" element={<Navigate to="/bands" />} />
      </Route>

      {/* add 404 route */}
    </Routes>
  )
}

export default App
