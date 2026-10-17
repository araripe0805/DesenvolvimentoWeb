// src/pages/Telaprincipal_usuario.jsx
import React from 'react';
import { HeaderTelaprincipalAdm } from '../components/Header_telaprincipal_adm';
import { SlidersHorizontal, Plus } from 'lucide-react';
import '../styles/Telaprincipal_usuario.css'; 

export function TelaPrincipalAdm() {
    return (
        <div className="home-container">
            {/* Topo com o menu */}
            <HeaderTelaprincipalAdm />

            {/* Conteúdo Central / Cartão Branco */}
            <main className='main-content-card'>
                <div className="content-header">
                    <h2>Todas as quadras</h2>

                    {/* Ações no canto superior direito: Botão Adicionar Quadra + Ícone de Filtro */}
                    <div className="admin-header-actions">
                        <button className="add-quadra-btn">
                            <Plus size={18} color="#ffffff" /> Adicionar quadra
                        </button>

                        <button className="filter-icon-btn" title="Filtrar">
                            <SlidersHorizontal size={20} color="#000" />
                        </button>
                    </div>
                </div>

                {/* Área reservada para os cards */}
                <div className="cards-grid-placeholder">
                    <p className="placeholder-text">Os cards das quadras serão inseridos aqui em breve...</p>
                </div>
            </main>
        </div>
    );
}
