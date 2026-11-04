import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { SlidersHorizontal } from 'lucide-react';
import imgPadrao from '../assets/imagem_tela_login.jpeg';
import '../styles/Telaprincipal_usuario.css';

const TIPOS = { areia: 'Areia', grama: 'Grama', sintetico: 'Sintético', cimento: 'Cimento' };

export function TelaPrincipalUsuario() {
    const [quadras, setQuadras] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        let ativo = true;

        async function carregarQuadras() {
            try {
                const resposta = await fetch('http://localhost:3000/api/quadras');
                const dados = await resposta.json();

                if (!resposta.ok) {
                    if (ativo) setErro(dados.erro || 'Não foi possível carregar as quadras.');
                    return;
                }

                if (ativo) setQuadras(dados);
            } catch (err) {
                if (ativo) setErro('Não foi possível conectar ao servidor.');
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregarQuadras();

        return () => { ativo = false; };
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

                {carregando && <p className="quadras-status">Carregando quadras...</p>}

                {!carregando && erro && (
                    <p className="quadras-status quadras-status-erro">{erro}</p>
                )}

                {!carregando && !erro && quadras.length === 0 && (
                    <p className="quadras-status">Nenhuma quadra disponível no momento.</p>
                )}

                {!carregando && !erro && quadras.length > 0 && (
                    <div className="quadras-grid">
                        {quadras.map((quadra) => (
                            <Link
                                key={quadra._id}
                                to={`/quadras/${quadra._id}`}
                                className="quadra-lista-card"
                            >
                                <img
                                    src={quadra.imagem || imgPadrao}
                                    alt={quadra.nome}
                                    className="quadra-lista-img"
                                />
                                <div className="quadra-lista-info">
                                    <span className="quadra-lista-tipo">{TIPOS[quadra.tipo] || quadra.tipo}</span>
                                    <h3>{quadra.nome}</h3>
                                    <p className="quadra-lista-local">{quadra.localizacao}</p>
                                    <p className="quadra-lista-preco">
                                        {Number(quadra.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} por hora
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}