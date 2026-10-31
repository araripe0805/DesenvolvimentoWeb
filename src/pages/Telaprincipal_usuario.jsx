import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { QuadrasListagem } from '../components/QuadrasListagem';
import '../styles/Telaprincipal_usuario.css';

export function TelaPrincipalUsuario() {
  return <div className="home-container"><HeaderTelaprincipal activeTab="quadras" /><main className="main-content-card"><QuadrasListagem /></main></div>;
}
