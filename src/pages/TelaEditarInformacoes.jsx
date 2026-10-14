import React, { useState } from 'react';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { ArrowLeft, Save, User, Lock, Phone, CreditCard } from 'lucide-react';
import '../styles/TelaEditarInformacoes.css';

export function TelaEditarInformacoes() {
    const [formData, setFormData] = useState({
        nome: 'Nome Usuário',
        matricula: 'Matrícula',
        telefone: '(85) 98888-8888',
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
                        <button className="back-btn-inline" title="Voltar">
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
                                <button type="button" className="cancel-btn">
                                    Cancelar
                                </button>
                                <button type="submit" className="save-btn">
                                    <Save size={18} /> Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}