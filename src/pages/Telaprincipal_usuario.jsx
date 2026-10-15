// src/pages/Telaprincipal_usuario.jsx
import React from 'react';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { SlidersHorizontal } from 'lucide-react';
import '../styles/Telaprincipal_usuario.css'; 

export function TelaPrincipalUsuario() {
    console.log('TelaPrincipalUsuario renderizou');
    return (
        <div className="home-container">
            {/* Topo com o menu */}
            <HeaderTelaprincipal activeTab={'quadras'}/>

            {/* Conteúdo Central / Cartão Branco */}
            <main className='main-content-card'>
                <div className="content-header">
                    <h2>Todas as quadras</h2>
                    <button className="filter-icon-btn" title="Filtrar">
                        <SlidersHorizontal size={20} color="#000" />
                    </button>
                </div>

                {/* Área reservada para os cards */}
                <div className="cards-grid-placeholder">
                    <p className="placeholder-text">Os cards das quadras serão inseridos aqui em breve...</p>
                </div>
            </main>
        </div>
    );
}