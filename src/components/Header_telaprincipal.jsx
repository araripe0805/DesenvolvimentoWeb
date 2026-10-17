// src/components/Header_telaprincipal.jsx
import React from 'react';
import { Link, NavLink } from 'react-router';
import { User } from 'lucide-react';
import '../styles/Header.css';

export function HeaderTelaprincipal() {
    return (
        <header className='app-header'>
            <Link to="/perfil" className='profile-section'>
                <div className='profile-avatar'>
                    <User size={28} color="#333"/>
                </div>
                <span className="profile-text">Meu perfil</span>
            </Link>

            <nav className="nav-buttons">
                <NavLink to="/quadras" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Quadras</NavLink>
                <button className="nav-btn" disabled title="Em breve">Suas reservas</button>
                <button className="nav-btn" disabled title="Em breve">Atendimento por mensagem</button>
            </nav>
        </header>
    );
}
