import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { HeaderTelaprincipalAdm } from '../components/Header_telaprincipal_adm';
import { QuadrasListagem } from '../components/QuadrasListagem';
import '../styles/Telaprincipal_usuario.css';

export function TelaPrincipalAdm() {
  return <div className="home-container"><HeaderTelaprincipalAdm activeTab="quadras" /><main className="main-content-card"><QuadrasListagem actions={<Link className="add-quadra-btn" to="/admin/quadras/nova"><Plus size={18} aria-hidden="true" /> Adicionar quadra</Link>} /></main></div>;
}
