import { HashRouter, Route, Routes } from 'react-router-dom'

// ページコンポーネントのインポート
import Home from './presentation/pages/Home'
import Classification from './presentation/pages/Classification'

export default function App() {
  return (
    // Electron では BrowserRouter ではなく HashRouter を使う
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classification" element={<Classification />} />
      </Routes>
    </HashRouter>
  )
}
