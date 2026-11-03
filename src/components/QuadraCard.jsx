
import React from 'react';
import '../styles/QuadraCard.css';

export function QuadraCard({ quadra, onDetalhes }) {
    const preco = Number(quadra.preco);
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
    return (
        <div className="quadra-card">
            <div className="quadra-card-image-container">
                <img
                    src={quadra.imagem || '/imagem-quadra-padrao.jpg'}
                    alt={quadra.nome || 'Quadra esportiva'}
                    className="quadra-card-img"
                />
            </div>

            <div className="quadra-card-content">
                <div className="quadra-card-info">
                    <h3 className="quadra-card-title">
                        {quadra.nome || 'Quadra sem nome'}
                    </h3>

                    <p className="quadra-card-desc">
                        {quadra.localizacao || 'Localização não informada'}
                    </p>

                    <p className="quadra-card-desc">
                        {Number.isFinite(preco)
                            ? `R$ ${preco.toFixed(2).replace('.', ',')} / hora`
                            : 'Preço não informado'}
                    </p>
                </div>

                <button
                    className="quadra-card-btn"
                    type="button"
                    onClick={() => onDetalhes(quadra._id)}
                >
                    Detalhes
                </button>
            </div>
        </div>
    );
}