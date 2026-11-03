import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderTelaprincipalAdm } from '../components/Header_telaprincipal_adm';
import { SlidersHorizontal, Plus } from 'lucide-react';
import { QuadraCard } from '../components/QuadraCard';
import '../styles/Telaprincipal_usuario.css';

export function TelaPrincipalAdm() {
    const navigate = useNavigate();

    const [quadras, setQuadras] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function buscarQuadras() {
            try {
                const resposta = await fetch(
                    'http://localhost:3000/api/quadras'
                );

                if (!resposta.ok) {
                    throw new Error('Erro ao buscar quadras.');
                }

                const dados = await resposta.json();
                setQuadras(dados);
            } catch (error) {
                console.error(error);
                setErro('Não foi possível carregar as quadras.');
            } finally {
                setCarregando(false);
            }
        }

        buscarQuadras();
    }, []);

    function abrirDetalhes(id) {
        navigate(`/admin/quadras/${id}`);
    }

    return (
        <div className="home-container">
            <HeaderTelaprincipalAdm activeTab="quadras" />

            <main className="main-content-card">
                <div className="content-header">
                    <h2>Todas as quadras</h2>

                    <div className="admin-header-actions">
                        <button
                            className="add-quadra-btn"
                            onClick={() => navigate('/admin/quadras/nova')}
                        >
                            <Plus size={18} color="#ffffff" />
                            Adicionar quadra
                        </button>

                        <button
                            className="filter-icon-btn"
                            title="Filtrar"
                            type="button"
                        >
                            <SlidersHorizontal size={20} color="#000" />
                        </button>
                    </div>
                </div>

                {carregando && <p>Carregando quadras...</p>}

                {erro && <p>{erro}</p>}

                {!carregando && !erro && quadras.length === 0 && (
                    <p className="placeholder-text">
                        Nenhuma quadra cadastrada ainda.
                    </p>
                )}

                {!carregando && !erro && quadras.length > 0 && (
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