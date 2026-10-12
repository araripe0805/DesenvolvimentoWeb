// src/components/Header_telaprincipal.jsx
import React from 'react';
import { User } from 'lucide-react';
import '../styles/Header.css';

export function HeaderTelaprincipal() {
    return (
        <header className='app-header'>
            <div className='profile-section'>
                <div className='profile-avatar'>
                    <User size={28} color="#333"/>
                </div>
                <span className="profile-text">Meu perfil</span>
            </div>

            <nav className="nav-buttons">
                <button className="nav-btn active">Quadras</button>
                <button className="nav-btn">Suas reservas</button>
                <button className="nav-btn">Atendimento por mensagem</button>
            </nav>
        </header>
    );
}