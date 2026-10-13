import React from 'react';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/TelaLogin.css';

export function TelaLogin() {
    return (
        <div className="login-container">
            {/* Lado Esquerdo: Formulário de Login */}
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h2>Bem-vindo de volta</h2>
                        <p>Insira suas credenciais para acessar sua conta Ginásio.</p>
                    </div>

                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <label>Matrícula</label>
                            <input type="text" placeholder="Sua matrícula" />
                        </div>

                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" placeholder="" />
                            <a href="#forgot" className="forgot-password-link">Esqueceu a senha?</a>
                        </div>

                        <button type="submit" className="login-submit-btn">
                            Entrar
                        </button>

                        <div className="login-footer-register">
                            <span>Novo por aqui? </span>
                            <a href="#register" className="register-link">Crie uma conta</a>
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