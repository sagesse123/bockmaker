import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Calendar from './pages/Calendar';
import Standings from './pages/Standings';
import Bonus from './pages/Bonus';
import Bookmakers from './pages/Bookmakers';
import PromoCode from './pages/PromoCode';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="/bookmakers" element={<Bookmakers />} />
          <Route path="/promo-code" element={<PromoCode />} />
          <Route path="/matches/:id" element={<Matches />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

