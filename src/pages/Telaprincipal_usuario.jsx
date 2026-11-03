import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { SlidersHorizontal } from 'lucide-react';
import { QuadraCard } from '../components/QuadraCard';
import '../styles/Telaprincipal_usuario.css';

export function TelaPrincipalUsuario() {
    const navigate = useNavigate();

    const [quadras, setQuadras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function buscaQuadras() {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/quadras'
                );

                if (!response.ok) {
                    throw new Error('Erro ao buscar quadras.');
                }

                const dados = await response.json();
                setQuadras(dados);
            } catch (error) {
                console.error(error);
                setError('Não foi possível carregar as quadras.');
            } finally {
                setLoading(false);
            }
        }

        buscaQuadras();
    }, []);

    function abrirDetalhes(id) {
        navigate(`/quadras/${id}`);
    }

    return (
        <div className="home-container">
            <HeaderTelaprincipal activeTab="quadras" />

            <main className="main-content-card">
                <div className="content-header">
                    <h2>Todas as quadras</h2>

                    <button
                        className="filter-icon-btn"
                        title="Filtrar"
                        type="button"
                    >
                        <SlidersHorizontal size={20} color="#000" />
                    </button>
                </div>

                {loading && <p>Carregando quadras...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && quadras.length === 0 && (
                    <p className="placeholder-text">
                        Nenhuma quadra cadastrada ainda.
                    </p>
                )}

                {!loading && !error && quadras.length > 0 && (
                    <div className="cards-grid-placeholder">
                        {quadras.map((quadra) => (
                            <QuadraCard
                                key={quadra._id}
                                quadra={quadra}
                                onDetalhes={abrirDetalhes}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}