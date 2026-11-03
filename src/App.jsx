import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { TelaPrincipalUsuario } from './pages/Telaprincipal_usuario';
import { TelaPerfil } from './pages/Telaperfil';
import { TelaPrincipalAdm } from './pages/Telaprincipal_adm';
import { TelaLogin } from './pages/Telalogin';
import { TelaEsqueciSenha } from './pages/TelaEsqueciSenha';
import { TelaCriarUsuario } from './pages/Telacriarusuario';
import { TelaAssistencia } from './pages/TelaAssistencia';
import { TelaChat } from './pages/Telachat';
import { TelaEditarInformacoes } from './pages/TelaEditarInformacoes';
import { TelaCriarQuadra } from './pages/Telacriarquadra';
import InformacoesQuadraUser from './pages/InformacoesQuadraUser';
import { HeaderTelaprincipal } from './components/Header_telaprincipal';
import './App.css';

function Reservas() {
  return <div className="home-container"><HeaderTelaprincipal activeTab="reservas" />
    <main className="main-content-card"><h1>Suas reservas</h1>
      <p>A consulta de reservas ainda não está disponível.</p><Link to="/quadras">Ver quadras</Link>
    </main></div>;
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<TelaLogin />} />
    <Route path="/esqueci-senha" element={<TelaEsqueciSenha />} />
    <Route path="/cadastro" element={<TelaCriarUsuario />} />
    <Route path="/quadras" element={<TelaPrincipalUsuario />} />
    <Route path="/quadras_adm" element={<TelaPrincipalAdm />} />
    <Route path="/quadras/:id" element={<InformacoesQuadraUser />} />
    <Route path="/reservas" element={<Reservas />} />
    <Route path="/perfil" element={<TelaPerfil />} />
    <Route path="/perfil/editar" element={<TelaEditarInformacoes />} />
    <Route path="/atendimento" element={<TelaChat />} />
    <Route path="/admin" element={<Navigate to="/admin/quadras" replace />} />
    <Route path="/admin/quadras" element={<TelaPrincipalAdm />} />
    <Route path="/admin/quadras/nova" element={<TelaCriarQuadra />} />
    <Route path="/admin/perfil" element={<TelaPerfil />} />
    <Route path="/admin/perfil/editar" element={<TelaEditarInformacoes />} />
    <Route path="/admin/atendimento" element={<TelaAssistencia />} />
    <Route path="/admin/atendimento/:id" element={<TelaChat />} />
    <Route path="*" element={<main className="main-content-card"><h1>Página não encontrada</h1><Link to="/quadras">Voltar às quadras</Link></main>} />
  </Routes></BrowserRouter>;
}
