import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Layout } from '../../components/Layout/Layout'
import { Info } from '../Info/Info'
import { Home } from '../Home/Home'
import { Daschboard } from '../Dashboard/Dashboard'
import { Line } from 'react-chartjs-2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/general" element={<Home/>} />
          <Route path="/dashboard" element={<Daschboard/>} />
          <Route path="/info" element={<Info/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
