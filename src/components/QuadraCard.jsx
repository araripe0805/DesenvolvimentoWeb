import React from 'react';
import '../styles/QuadraCard.css';

export function QuadraCard({imagem, titulo, descricao, botaoDetalhes}) {
    return (
        <div className='quadra-card'>
            <div className="quadra-card-image-container">
                <img src={imagem} alt={titulo} className="quadra-card-img" />
            </div>

            <div className="quadra-card-content">
                <div className="quadra-card-info">
                    <h3 className="quadra-card-title">{titulo}</h3>
                    <p className="quadra-card-desc">{descricao}</p>
                </div>

                <button className="quadra-card-btn" onClick={onDetalhes}>
                    Detalhes
                </button>
            </div>
        </div>
    );
}