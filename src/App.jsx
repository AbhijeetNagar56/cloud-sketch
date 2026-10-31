import Home from './components/Home'
import Architecture from './components/Architecture'
import Pipeline from './components/Pipeline'
import Saved from './components/Saved'
import About from './components/About'
import { Routes, Route } from 'react-router'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/architecture' element={<Architecture />} />
        <Route path='/pipeline' element={<Pipeline />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  )
}

export default App
