// src/components/Header_telaprincipal.jsx
import React from 'react';
import { User } from 'lucide-react';
import '../styles/Header.css';

export function HeaderTelaprincipal({ activeTab }) {
    return (
        <header className='app-header'>
            <div className='profile-section'>
                <div className='profile-avatar'>
                    <User size={28} color="#333"/>
                </div>
                <span className="profile-text">Meu perfil</span>
            </div>

            <nav className="nav-buttons">
                <button className={`nav-btn ${activeTab === 'quadras' ? 'active' : ''}`}>Quadras</button>
                <button className={`nav-btn ${activeTab === 'reservas' ? 'active' : ''}`}>Suas reservas</button>
                <button className={`nav-btn ${activeTab === 'atendimento' ? 'active' : ''}`}>Atendimento por mensagem</button>
            </nav>
        </header>
    );
}