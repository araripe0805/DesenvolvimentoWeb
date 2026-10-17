import { useState } from 'react';
import { Link } from 'react-router';
import quadraImg from '../assets/imagem_tela_login.jpeg';
import '../styles/Telalogin.css';
import '../styles/Telacadastro.css';

export function TelaCadastro() {
    const [mensagem, setMensagem] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const senha = form.elements.namedItem('senha');
        const confirmacao = form.elements.namedItem('confirmacao');

        if (senha.value !== confirmacao.value) {
            confirmacao.setCustomValidity('As senhas precisam ser iguais.');
            confirmacao.reportValidity();
            return;
        }

        // Nenhum dado é armazenado enquanto não houver integração com a API.
        setMensagem('Dados validados. A criação da conta ainda não está disponível.');
    }

    function handleInput(event) {
        event.currentTarget.elements.namedItem('confirmacao').setCustomValidity('');
        setMensagem('');
    }

    return (
        <main className="login-container cadastro-container">
            <div className="login-left-side">
                <div className="login-form-wrapper">
                    <div className="login-header-text">
                        <h1>Crie sua conta</h1>
                        <p>Preencha seus dados para começar a usar o Ginásio.</p>
                    </div>

                    <form className="login-form cadastro-form" onSubmit={handleSubmit} onInput={handleInput}>
                        <div className="input-group">
                            <label htmlFor="cadastro-nome">Nome completo</label>
                            <input id="cadastro-nome" name="nome" type="text" autoComplete="name" placeholder="Seu nome completo" required pattern=".*\S.*" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="cadastro-matricula">Matrícula</label>
                            <input id="cadastro-matricula" name="matricula" type="text" autoComplete="username" placeholder="Sua matrícula" required pattern=".*\S.*" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="cadastro-email">E-mail</label>
                            <input id="cadastro-email" name="email" type="email" autoComplete="email" placeholder="Seu e-mail" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="cadastro-telefone">Telefone</label>
                            <input id="cadastro-telefone" name="telefone" type="tel" autoComplete="tel" placeholder="(85) 99999-9999" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="cadastro-senha">Senha</label>
                            <input id="cadastro-senha" name="senha" type="password" autoComplete="new-password" placeholder="Crie uma senha" minLength={8} aria-describedby="senha-ajuda" required />
                            <small id="senha-ajuda" className="cadastro-help">Use pelo menos 8 caracteres.</small>
                        </div>

                        <div className="input-group">
                            <label htmlFor="cadastro-confirmacao">Confirmar senha</label>
                            <input id="cadastro-confirmacao" name="confirmacao" type="password" autoComplete="new-password" placeholder="Repita sua senha" minLength={8} required />
                        </div>

                        <button type="submit" className="login-submit-btn">Criar conta</button>

                        {mensagem && <p className="cadastro-status" role="status">{mensagem}</p>}

                        <div className="login-footer-register">
                            <span>Já tem uma conta? </span>
                            <Link to="/login" className="register-link">Entrar</Link>
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
