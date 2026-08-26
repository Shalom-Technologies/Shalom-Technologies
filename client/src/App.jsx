import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Login, Register, Describe, Preview, Dashboard, Admin routes go here as you build them */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;