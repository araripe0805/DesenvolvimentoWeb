// src/pages/TelaAssistencia.jsx
import React from 'react';
import { Headset, UserRound } from 'lucide-react';
import { HeaderTelaprincipalAdm } from '../components/Header_telaprincipal_adm';
import '../styles/TelaAssistencia.css';

export function TelaAssistencia() {
    const conversa = {
        nome: 'Pedro Alonso',
        mensagem: 'Estou com problemas para cancelar minha...',
        horario: '10:30',
        naoLidas: 1,
    };

    return (
        <div className="home-container assistencia-page">
            <HeaderTelaprincipalAdm activeTab={'atendimento'} />

            <main className="main-content-card assistencia-card">
                <div className="assistencia-titulo">
                    <Headset
                        className="assistencia-titulo-icone"
                        size={42}
                        strokeWidth={1.5}
                    />
                    <h1>Assistência</h1>
                </div>

                {/* Lista de conversas */}
                <section className="assistencia-lista">
                    <div className="assistencia-conversa">
                        <div className="assistencia-avatar">
                            <UserRound
                                size={30}
                                strokeWidth={1}
                            />
                        </div>

                        {/* Nome e mensagem prévia */}
                        <div className="assistencia-info">
                            <h2>{conversa.nome}</h2>
                            <p>{conversa.mensagem}</p>
                        </div>

                        {/* Horário e quantidade de mensagens não lidas */}
                        <div className="assistencia-status">
                            <span className="assistencia-nao-lidas">
                                {conversa.naoLidas}
                            </span>
                            <span className="assistencia-horario">
                                {conversa.horario}
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}