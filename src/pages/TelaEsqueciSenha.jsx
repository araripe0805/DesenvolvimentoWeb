import { useState } from 'react';
import { Link } from 'react-router-dom';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';
import '../styles/TelaEsqueciSenha.css';

export function TelaEsqueciSenha() {
    const [mensagem, setMensagem] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Confirmação visual do protótipo; o envio real depende da integração com o backend.
        setMensagem('E-mail enviado! Verifique sua caixa de entrada e a pasta de spam para recuperar sua senha.');
    }

    return (
        <main className="login-container recuperar-senha-page">
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h1>Esqueceu a senha?</h1>
                        <p>Informe sua matrícula e o e-mail cadastrado para recuperar o acesso à sua conta.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit} onChange={() => setMensagem('')}>
                        <div className="input-group">
                            <label htmlFor="recuperar-matricula">Matrícula</label>
                            <input id="recuperar-matricula" name="matricula" type="text"
                                autoComplete="username" placeholder="Sua matrícula" required pattern=".*\S.*" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="recuperar-email">E-mail</label>
                            <input id="recuperar-email" name="email" type="email"
                                autoComplete="email" placeholder="Seu e-mail cadastrado" required />
                        </div>

                        <button type="submit" className="login-submit-btn">Recuperar senha</button>
                        {mensagem && <p className="recuperar-senha-status" role="status">{mensagem}</p>}

                        <div className="login-footer-register">
                            <Link to="/login" className="register-link">Voltar para o login</Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="login-right-side">
                <img src={quadraImg} alt="Quadra Unifor Beach Tennis" className="login-banner-image" />
            </div>
        </main>
    );
}
