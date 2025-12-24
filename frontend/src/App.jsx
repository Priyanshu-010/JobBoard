import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"

import Jobs from "./pages/user/Jobs"
function App() {

  return (
    <div className='text-blue-300 bg-black h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />}/>
      </Routes>
    </div>
  )
}

export default App