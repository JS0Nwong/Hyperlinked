import { Routes, Route } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Views
import Home from './views/Home'
import Auth from './views/Auth'
import Links from './views/Links'
import Error from './views/Error'
import Settings from './views/Settings'
import Help from './views/Help'
import './App.css'

import { ThemeProvider } from './utils/context/ThemeProvider'
import { AuthProvider, useAuth } from './utils/context/AuthContext'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Auth />} />
              <Route path='/register' element={<Auth />} />
              <Route path="/links/" element={<Links />} />
              <Route path="/links">
                <Route index element={<Links />} />
                <Route path=":folder" element={<Links />} />
              </Route>
              <Route path="/settings/*" element={<Settings />} />
              <Route path='/help' element={<Help />} />
              <Route path='/*' element={<Error />} />
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
