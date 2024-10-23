import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Home from './Home.jsx'


function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<PrivateRoute />}>
          <Route path='/home' element={<Home />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
