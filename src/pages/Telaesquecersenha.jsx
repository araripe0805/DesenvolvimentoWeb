import { useState } from 'react';
import { Link } from 'react-router';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';
import '../styles/Telaesquecersenha.css';

export function TelaEsquecerSenha() {
    const [mensagem, setMensagem] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Confirmação simulada: integrar o envio com a API antes de usar em produção.
        setMensagem('O e-mail foi enviado. Confira sua caixa de entrada para recuperar sua senha.');
    }

    return (
        <main className="login-container recuperacao-container">
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h1>Esqueceu a senha?</h1>
                        <p>Informe sua matrícula e o e-mail cadastrado para recuperar o acesso à sua conta.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit} onInput={() => setMensagem('')}>
                        <div className="input-group">
                            <label htmlFor="recuperacao-matricula">Matrícula</label>
                            <input id="recuperacao-matricula" name="matricula" type="text" autoComplete="username" placeholder="Sua matrícula" required pattern=".*\S.*" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="recuperacao-email">E-mail</label>
                            <input id="recuperacao-email" name="email" type="email" autoComplete="email" placeholder="Seu e-mail cadastrado" required />
                        </div>

                        <button type="submit" className="login-submit-btn">Recuperar senha</button>

                        {mensagem && <p className="recuperacao-status" role="status">{mensagem}</p>}

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
