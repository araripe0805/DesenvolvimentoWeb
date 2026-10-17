import { Link, useLocation } from 'react-router-dom';
import { ProfileMenu } from './ProfileMenu';
import '../styles/Header.css';

export function HeaderTelaprincipal({ activeTab, admin = false }) {
  const { pathname } = useLocation();
  const isAdmin = admin || pathname.startsWith('/admin');
  const prefix = isAdmin ? '/admin' : '';
  const items = [{ tab: 'quadras', to: `${prefix}/quadras`, label: 'Quadras' },
    ...(!isAdmin ? [{ tab: 'reservas', to: '/reservas', label: 'Suas reservas' }] : []),
    { tab: 'atendimento', to: `${prefix}/atendimento`, label: 'Atendimento por mensagem' }];
  return <header className="app-header">
    <ProfileMenu key={pathname} />
    <nav className="nav-buttons" aria-label="Navegação principal">
      {items.map(({ tab, to, label }) => <Link key={tab} to={to}
        aria-current={activeTab === tab ? 'page' : undefined}
        className={`nav-btn ${activeTab === tab ? 'active' : ''}`}>{label}</Link>)}
    </nav>
  </header>;
}
