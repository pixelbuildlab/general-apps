import { Routes, Route } from 'react-router-dom'
import MainApp from './MainApp'
import TeamsClockify from './Pages/TeamsClockify'

function Pages() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainApp />}
      />
      <Route
        path='/teams-clockify'
        element={<TeamsClockify />}
      />
    </Routes>
  )
}

export default Pages
