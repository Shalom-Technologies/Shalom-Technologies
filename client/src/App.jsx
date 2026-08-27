import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import DescribePage from './pages/Describe';
import PreviewPage from './pages/Preview';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/describe"
            element={
              <ProtectedRoute>
                <DescribePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <PreviewPage />
              </ProtectedRoute>
            }
          />
          {/* Admin routes go here as you build them */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;