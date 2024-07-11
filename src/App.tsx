import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './presentation/pages/Home'
import Classification from './presentation/pages/Classification'
import Review from './presentation/pages/Review'

export default function App() {
  return (
    // Electron では BrowserRouter ではなく HashRouter を使う
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classification/:id" element={<Classification />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </HashRouter>
  )
}
