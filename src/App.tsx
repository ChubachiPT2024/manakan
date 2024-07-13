import { HashRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Home from './presentation/pages/Home'
import Classification from './presentation/pages/Classification'
import Review from './presentation/pages/Review'
import { SelectedSubmissionsContext } from './presentation/classification/components/SelectSubmissionsContext'

export default function App() {
  const [selectedSubmissions, setSelectedSubmissions] = useState<Submission[]>([])

  return (
    <SelectedSubmissionsContext.Provider value={{ selectedSubmissions, setSelectedSubmissions }}>
      {/* Electron では BrowserRouter ではなく HashRouter を使う */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Classification" element={<Classification />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </HashRouter>
    </SelectedSubmissionsContext.Provider>
  )
}
