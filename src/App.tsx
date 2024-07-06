import { HashRouter, Route, Routes } from 'react-router-dom'

// ページコンポーネントのインポート
import Home from './presentation/pages/Home'
import Classification from './presentation/pages/Classification'
// import Evaluation from './presentation/pages/Evaluation'
// import Test from './presentation/pages/Pages'

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
