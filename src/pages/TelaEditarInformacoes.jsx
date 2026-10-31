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
    });
    const [novaSenha, setNovaSenha] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (!usuario?._id) {
            setErro('Você precisa fazer login novamente.');
            return;
        }

        if (!senhaAtual) {
            setErro('Informe sua senha atual para confirmar.');
            return;
        }

        // monta só o que realmente mudou
        const alteracoes = {};
        if (formData.telefone.trim() !== (usuario.telefone || '')) {
            alteracoes.telefone = formData.telefone.trim();
        }
        if (novaSenha) {
            alteracoes.novaSenha = novaSenha;
        }

        if (Object.keys(alteracoes).length === 0) {
            setErro('Nenhuma alteração para salvar.');
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch(`http://localhost:3000/api/users/${usuario._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...alteracoes, senhaAtual }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || 'Não foi possível salvar.');
                return;
            }

            // atualiza os dados guardados no navegador
            localStorage.setItem('usuario', JSON.stringify(dados));

            setNovaSenha('');
            setSenhaAtual('');
            setSucesso('Informações atualizadas com sucesso!');
        } catch (err) {
            setErro('Não foi possível conectar ao servidor.');
        } finally {
            setCarregando(false);
        }
    }

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

                        <form className="edit-form-grid" onSubmit={handleSubmit}>
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
                                    <label>Nova senha</label>
                                    <div className="input-icon-container editable">
                                        <Lock size={18} color="#2563eb" />
                                        <input
                                            type="password"
                                            name="novaSenha"
                                            value={novaSenha}
                                            onChange={(e) => setNovaSenha(e.target.value)}
                                            placeholder="Deixe em branco para manter a atual"
                                            autoComplete="new-password"
                                        />
                                    </div>
                                </div>
                            </div>

                            {erro && <p className="edit-info-erro">{erro}</p>}
                            {sucesso && <p className="edit-info-sucesso">{sucesso}</p>}
                            
                            {/* Botões de Ação (Cancelar e Salvar) */}
                            <div className="edit-form-actions">
                                <button type="button" className="cancel-btn" onClick={() => navigate(perfil)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="save-btn" disabled={carregando}>
                                    <Save size={18} /> {carregando ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="input-row-group">
                        <div className="input-wrapper">
                            <label>Senha atual</label>
                            <div className="input-icon-container editable">
                                <Lock size={18} color="#2563eb" />
                                <input
                                    type="password"
                                    name="senhaAtual"
                                    value={senhaAtual}
                                    onChange={(e) => setSenhaAtual(e.target.value)}
                                    placeholder="Digite sua senha atual"
                                    autoComplete="current-password"
                                />
                            </div>
                            <span className="input-helper-text">Necessária para confirmar qualquer alteração.</span>
                        </div>
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