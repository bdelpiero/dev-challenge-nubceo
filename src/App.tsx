import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './router/ProtectedRoute'
import { Bands } from './pages/Bands'
import { Login } from './pages/Login'
import { Band } from './pages/Band'
import { SignUp } from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/bands" element={<Bands />} />
        <Route path="/band/:id" element={<Band />} />
        <Route path="/" element={<Navigate to="/bands" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
