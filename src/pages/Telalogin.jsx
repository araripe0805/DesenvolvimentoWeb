import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';

export function TelaLogin() {

    const location = useLocation();
    const navigate = useNavigate();
    const [mostrarPopup, setMostrarPopup] = useState(false);

    useEffect(() => {
        if (location.state?.usuarioCriado) {
            setMostrarPopup(true);

            // limpa o recado para o popup não voltar ao apertar F5
            navigate(location.pathname, { replace: true, state: null });

            const timer = setTimeout(() => setMostrarPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

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

                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>

                        {/* Label de matricula */}
                        <div className="input-group">
                            <label>Matrícula</label>
                            <input type="text" placeholder="Sua matrícula" />
                        </div>

                        {/* Label de senha */}
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" placeholder="Insira sua senha" />
                            <Link to="/esqueci-senha" className="forgot-password-link">Esqueceu a senha?</Link>
                        </div>

                        {/* Botão de entrar na conta */}
                        <button type="submit" className="login-submit-btn">
                            Entrar
                        </button>

                        {/* Botão para criar conta */}
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
