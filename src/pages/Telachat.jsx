// src/pages/TelaAssistencia.jsx
import React from 'react';
import { UserRound, Send } from 'lucide-react';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import '../styles/Telachat.css';

export function TelaChat() {
    return (
        <div className="home-container chat-page">
            <HeaderTelaprincipal activeTab={'atendimento'} />

            <main className="main-content-card assistencia-card">
                <div className="assistencia-titulo">
                    <UserRound
                        className="assistencia-titulo-icone"
                        size={42}
                        strokeWidth={1.5}
                    />
                    <h1>Assistência</h1>
                </div>

                {/* Area da mensagem */}
                <div className='chat-messages-area'>
                    <div className='chat-bubble received'>
                        <p>Como posso ajudar?</p>
                        <span className='chat-time'>10:30</span>
                    </div>

                    <div className="chat-bubble sent">
                            <p>Estou com problemas com para cancelar minha reserva na quadra de vôlei</p>
                            <span className="chat-time">10:31</span>
                    </div>

                    {/* Area de digitar */}
                    <div className="chat-input-area">
                        <input type="text" placeholder="Sua mensagem..." />
                        <button className="chat-send-btn" title="Enviar">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}