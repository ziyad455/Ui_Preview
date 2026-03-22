import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { buildInstagramDmLink } from './lib/instagram'
import { LandingPage } from './pages/LandingPage'
import { ProductsPage } from './pages/ProductsPage'
import './App.css'

function App() {
  const generalOrderLink = buildInstagramDmLink(
    'Hi Asanora Jewels, I would like to place an order. Can you help me choose a piece?',
  )

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<LandingPage generalOrderLink={generalOrderLink} />}
        />
        <Route
          path="/products"
          element={<ProductsPage generalOrderLink={generalOrderLink} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
