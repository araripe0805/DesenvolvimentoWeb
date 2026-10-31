import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';

export function TelaLogin() {

    const location = useLocation();
    const navigate = useNavigate();
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (location.state?.usuarioCriado) {
            setMostrarPopup(true);

            // limpa o recado para o popup não voltar ao apertar F5
            navigate(location.pathname, { replace: true, state: null });

            const timer = setTimeout(() => setMostrarPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            const resposta = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matricula, senha }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || 'Não foi possível entrar.');
                return;
            }

            // guarda quem entrou, para as outras telas saberem
            localStorage.setItem('usuario', JSON.stringify(dados));

            if (dados.tipoUser === 'admin') {
                navigate('/quadras_adm');
            } else {
                navigate('/quadras');
            }
        } catch (err) {
            setErro('Não foi possível conectar ao servidor.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="login-container">
            {mostrarPopup && (
                <div className="popup-sucesso">
                    Usuário criado com sucesso!
                </div>
            )}
            
            {/* Lado Esquerdo: Formulário de Login */}
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h2>Bem-vindo de volta</h2>
                        <p>Insira suas credenciais para acessar sua conta Ginásio.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>

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

                        {/* Label de senha */}
                        <div className="input-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                placeholder="Insira sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <Link to="/esqueci-senha" className="forgot-password-link">Esqueceu a senha?</Link>
                        </div>

                        {erro && <p className="form-erro">{erro}</p>}

                        {/* Botão de entrar na conta */}
                        <button type="submit" className="login-submit-btn" disabled={carregando}>
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </button>

                        {/* Botão para criar conta (continua igual) */}
                        <div className="login-footer-register">
                            <span>Novo por aqui? </span>
                            <Link to="/cadastro" className="register-link">Crie uma conta</Link>
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
