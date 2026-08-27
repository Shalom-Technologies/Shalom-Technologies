import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <Seo
        title="Dashboard"
        description="View and manage your Shalom Technologies website projects."
        path="/dashboard"
        noIndex
      />

      <h1>Welcome{user?.name ? `, ${user.name}` : ''}</h1>
      <p>Your projects will appear here. (Dashboard build coming next.)</p>

      <button type="button" onClick={logout} style={{ marginTop: '1.5rem' }}>
        Log out
      </button>
    </div>
  );
}

export default DashboardPage;