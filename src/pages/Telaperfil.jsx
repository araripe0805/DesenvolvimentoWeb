import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { User, ArrowLeft, Pencil, LogOut } from 'lucide-react';
import '../styles/Telaperfil.css';

export function TelaPerfil() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const prefix = pathname.startsWith('/admin') ? '/admin' : '';
    let usuario;
    try {
        usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    } catch {
        return <Navigate to="/login" replace />;
    }

    if (!usuario?._id) {
        return <Navigate to="/login" replace />;
    }

    const tipoConta = { usuario: 'Usuário', admin: 'Administrador' }[usuario.tipoUser] || 'Não informado';
    return (
        <div className='home-container'>
            {/* Topo com o menu compartilhado */}
            <HeaderTelaprincipal activeTab={null}/>

            {/* Cartão Branco Central da Tela de Perfil */}
            <main className='main-content-card profile-card'>
                {/* Botão de voltar (seta para esquerda) */}
                <button className='back-btn' title='Voltar' onClick={() => navigate(`${prefix}/quadras`)}>
                    <ArrowLeft size={20} color="#000"/>
                </button>

                {/* Botão de sair no canto superior direito */}
                <button className='logout-btn' title='Sair' onClick={() => navigate('/login', { replace: true })}>
                    <LogOut size={20} color="#dc2626"/>
                </button>

                {/* Conteúdo principal do perfil (Avatar grande e dados) */}
                <div className="profile-content-layout">
                    <div className="profile-large-avatar">
                        <User size={84} color="#333" />
                    </div>

                    <div className="profile-info-section">
                        <h2 className='profile-nome-usuario'>{usuario.nome || 'Nome não informado'}</h2>
                        <dl className="profile-details">
                            <div>
                                <dt>Matrícula</dt>
                                <dd>{usuario.matricula || 'Não informada'}</dd>
                            </div>
                            <div>
                                <dt>Telefone</dt>
                                <dd>{usuario.telefone || 'Não informado'}</dd>
                            </div>
                            <div>
                                <dt>Tipo de conta</dt>
                                <dd>{tipoConta}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Rodapé do card com o botão "Editar informações" */}
                <div className="profile-footer-action">
                    <button className="edit-info-btn" onClick={() => navigate(`${prefix}/perfil/editar`)}>
                        Editar Informações <Pencil size={16} color="#000"/>
                    </button>
                </div>
            </main>
        </div>
    );
}
