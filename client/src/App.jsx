import { useState } from 'react'
import Navbar from './components/Navbar'
import AllRoutes from './routes/AllRoutes'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state) => state.user)
  console.log(user)
  return (
    <>
      <Navbar />
      <AllRoutes/>
    </>
  )
}

export default App
