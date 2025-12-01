import { Routes, Route } from 'react-router-dom'
import MainApp from './MainApp'
import TeamsClockify from './Pages/TeamsClockify'
import { AuthForm } from './components/Auth'

function Pages() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainApp />}
      />
      <Route
        path='/auth'
        element={<AuthForm />}
      />
      <Route
        path='/teams-clockify'
        element={<TeamsClockify />}
      />
    </Routes>
  )
}

export default Pages
