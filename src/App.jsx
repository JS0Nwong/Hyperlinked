import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Auth from './views/Auth'
import Links from './views/Links'
import Error from './views/Error'
import Settings from './views/Settings'
import './App.css'

import { ThemeProvider } from './utils/context/ThemeProvider'
import { AuthProvider } from './utils/context/AuthContext'

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Auth />} />
            <Route path='/register' element={<Auth />} />
            <Route path="/links" element={<Links />} />
            <Route path="/settings" element={<Settings/>}/>
            <Route path='/*' element={<Error />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
