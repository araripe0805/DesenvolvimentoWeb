import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { ArrowLeft, Save, User, Lock, Phone, CreditCard, Trash2 } from 'lucide-react';
import '../styles/TelaEditarInformacoes.css';

export function TelaEditarInformacoes() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const perfil = pathname.startsWith('/admin') ? '/admin/perfil' : '/perfil';
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    const [formData, setFormData] = useState({
        nome: usuario?.nome || '',
        matricula: usuario?.matricula || '',
        telefone: usuario?.telefone || '',
        senha: '••••••••••••'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return (
        <div className="home-container">
            <HeaderTelaprincipal activeTab={null} />

            <main className="main-content-card edit-info-main-card">
            
                {/* Cabeçalho interno do card */}
                <div className="edit-info-header-row">
                    <div className="edit-info-title-group">
                        <button className="back-btn-inline" title="Voltar" onClick={() => navigate(perfil)}>
                            <ArrowLeft size={20} color="#000" />
                        </button>

                        <div>
                            <h2>Editar informações</h2>
                            <p>Atualize seus dados de contato e segurança da conta.</p>
                        </div>
                    </div>
                </div>

                {/* Formulário Central (sem a coluna da esquerda) */}
                <div className="edit-info-form-container">
                    <div className="account-info-box">
                        <div className="account-info-box-header">
                            <h3>Informações da conta</h3>
                            <p>Confira seus dados atuais antes de salvar.</p>
                        </div>

                        <form className="edit-form-grid" onSubmit={(e) => e.preventDefault()}>
                            {/* Linha 1: Nome e Matrícula (Somente leitura) */}
                            <div className="input-row-group">
                                <div className="input-wrapper">
                                    <div className="label-with-badge">
                                        <label>Nome</label>
                                        <span className="read-only-badge">🔒 Somente leitura</span>
                                    </div>

                                    <div className="input-icon-container read-only">
                                        <User size={18} color="#6b7280" />
                                        <input 
                                        type="text" 
                                        name="nome" 
                                        value={formData.nome} 
                                        readOnly 
                                        />
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <div className="label-with-badge">
                                        <label>Matrícula</label>
                                        <span className="read-only-badge">🔒 Somente leitura</span>
                                    </div>
                                    
                                    <div className="input-icon-container read-only">
                                        <CreditCard size={18} color="#6b7280" />
                                        <input 
                                        type="text" 
                                        name="matricula" 
                                        value={formData.matricula} 
                                        readOnly 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Linha 2: Telefone e Senha */}
                            <div className="input-row-group">
                                <div className="input-wrapper">
                                    <label>Telefone</label>
                                    <div className="input-icon-container editable">
                                        <Phone size={18} color="#2563eb" />
                                        <input 
                                        type="text" 
                                        name="telefone" 
                                        value={formData.telefone} 
                                        onChange={handleChange} 
                                        />
                                    </div>
                                    <span className="input-helper-text">Este número será usado para avisos sobre suas reservas.</span>
                                </div>

                                <div className="input-wrapper">
                                    <label>Senha</label>
                                    <div className="input-icon-container">
                                        <Lock size={18} color="#6b7280" />
                                        <input 
                                        type="password" 
                                        name="senha" 
                                        value={formData.senha} 
                                        onChange={handleChange} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Botões de Ação (Cancelar e Salvar) */}
                            <div className="edit-form-actions">
                                <button type="button" className="cancel-btn" onClick={() => navigate(perfil)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="save-btn">
                                    <Save size={18} /> Salvar
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Zona de perigo: excluir conta */}
                    <div className="danger-zone-box">
                        <div className="danger-zone-text">
                            <h3>Excluir conta</h3>
                            <p>Ao excluir sua conta, seus dados serão removidos e essa ação não poderá ser desfeita.</p>
                        </div>

                        <button type="button" className="delete-account-btn">
                            <Trash2 size={18} /> Excluir conta
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}