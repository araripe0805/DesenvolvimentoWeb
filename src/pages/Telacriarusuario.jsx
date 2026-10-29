// src/pages/TelaCriarUsuario.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';

export function TelaCriarUsuario() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            const resposta = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, matricula, telefone, senha }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || 'Não foi possível criar a conta.');
                return;
            }

            navigate('/login', { state: { usuarioCriado: true } });
        } catch (err) {
            setErro('Não foi possível conectar ao servidor.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="login-container">
            {/* Lado Esquerdo: Formulário de Login */}
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h2>Crie sua Conta</h2>
                        <p>Insira suas credenciais para criar sua conta Ginásio.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {/* Label de nome */}
                        <div className="input-group">
                            <label>Nome completo</label>
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        {/* Label de matricula */}
                        <div className="input-group">
                            <label>Matrícula</label>
                            <input
                                type="text"
                                placeholder="Sua matrícula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                            />
                        </div>

                        {/* Label do numero de contato */}
                        <div className="input-group">
                            <label>Número para contato</label>
                            <input
                                type="text"
                                placeholder="(**)98888-8888"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </div>

                        {/* Label da senha */}
                        <div className="input-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            
                            {/* Recomendações da senha em formato de lista estilizada */}
                            <ul className="password-hints">
                                <li>Deve conter ao menos um(a):</li>
                                <li>Letra maiúscula</li>
                                <li>Número</li>
                                <li>Caractere especial (Ex: @, #)</li>
                            </ul>
                        </div>

                        {erro && <p className="form-erro">{erro}</p>}

                        {/* botão de criar */}
                        <button type="submit" className="login-submit-btn" disabled={carregando}>
                            {carregando ? 'Criando...' : 'Criar'}
                        </button>

                        {/* Voltar para a tela de login caso tenha entrado sem querer na tela */}
                        <div className="login-footer-register">
                            <span>Já tem uma conta? </span>
                            <Link to="/login" className="register-link">entrar</Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Lado Direito: Imagem da rede de beach tennis */}
            <div className="login-right-side">
                <img src={quadraImg} alt="Quadra Unifor Beach Tennis" className="login-banner-image" />
            </div>
        </div>
    );
}