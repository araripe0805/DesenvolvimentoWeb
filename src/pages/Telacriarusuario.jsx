// src/pages/TelaCriarUsuario.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';

export function TelaCriarUsuario() {
    return (
        <div className="login-container">
            {/* Lado Esquerdo: Formulário de Login */}
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h2>Crie sua Conta</h2>
                        <p>Insira suas credenciais para criar sua conta Ginásio.</p>
                    </div>

                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        {/* Label de nome */}
                        <div className="input-group">
                            <label>Nome completo</label>
                            <input type="text" placeholder="Digite seu nome" />
                        </div>

                        {/* Label de matricula */}
                        <div className="input-group">
                            <label>Matrícula</label>
                            <input type="text" placeholder="Sua matrícula" />
                        </div>

                        {/* Label do numero de contato */}
                        <div className="input-group">
                            <label>Número para contato</label>
                            <input type="text" placeholder="(**)98888-8888" />
                        </div>

                        {/* Label da senha */}
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" placeholder="" />
                            
                            {/* Recomendações da senha em formato de lista estilizada */}
                            <ul className="password-hints">
                                <li>Deve conter ao menos um(a):</li>
                                <li>Letra maiúscula</li>
                                <li>Número</li>
                                <li>Caractere especial (Ex: @, #)</li>
                            </ul>
                        </div>

                        {/* botão de criar */}
                        <button type="submit" className="login-submit-btn">
                            Criar
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