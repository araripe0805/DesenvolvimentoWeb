import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { SlidersHorizontal } from 'lucide-react';
import '../styles/TelaReservaUsuario.css';
import imgPadrao from '../assets/imagem_tela_login.jpeg';

// "2026-11-17T00:00:00.000Z" -> "17/11/2026"
function formatarData(dataIso) {
    const [ano, mes, dia] = dataIso.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
}

// hoje em AAAA-MM-DD, no fuso local
function hojeChave() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${agora.getFullYear()}-${mes}-${dia}`;
}

export function TelaReservasUsuario() {
    const navigate = useNavigate();
    const usuarioId = JSON.parse(localStorage.getItem('usuario') || 'null')?._id;

    const [reservas, setReservas] = useState([]);
    const [carregando, setCarregando] = useState(Boolean(usuarioId));
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (!usuarioId) return;

        let ativo = true;

        async function carregarReservas() {
            try {
                const resposta = await fetch(`http://localhost:3000/api/reservas/usuario/${usuarioId}`);
                const dados = await resposta.json();

                if (!resposta.ok) {
                    if (ativo) setErro(dados.erro || 'Não foi possível carregar suas reservas.');
                    return;
                }

                if (ativo) setReservas(dados);
            } catch (err) {
                if (ativo) setErro('Não foi possível conectar ao servidor.');
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregarReservas();

        return () => { ativo = false; };
    }, [usuarioId]);

    // só confirmadas e de hoje em diante, da mais próxima para a mais distante
    const hoje = hojeChave();
    const reservasAtivas = reservas
        .filter((r) => r.status === 'confirmada' && r.data.slice(0, 10) >= hoje)
        .sort((a, b) =>
            a.data.localeCompare(b.data) ||
            (a.horario?.horaInicio || '').localeCompare(b.horario?.horaInicio || '')
        );

    let mensagem = '';
    if (!usuarioId) {
        mensagem = 'Você precisa fazer login para ver suas reservas.';
    } else if (carregando) {
        mensagem = 'Carregando reservas...';
    } else if (erro) {
        mensagem = erro;
    } else if (reservasAtivas.length === 0) {
        mensagem = 'Você ainda não tem reservas ativas.';
    }

    return (
        <div className="home-container">
            <HeaderTelaprincipal activeTab="reservas" />

            <main className="main-content-card rv-card">
                <div className="rv-header">
                    <h2 className="rv-title">Reservas Ativas</h2>
                    <button className="rv-filter-btn" title="Filtrar" type="button">
                        <SlidersHorizontal size={28} color="#000" />
                    </button>
                </div>

                {mensagem ? (
                    <div className="rv-msg-wrap">
                        <p className={`rv-msg ${erro ? 'rv-msg-erro' : ''}`}>{mensagem}</p>

                        {!usuarioId && <Link to="/login" className="rv-msg-link">Ir para o login</Link>}
                        {usuarioId && !carregando && !erro && (
                            <Link to="/quadras" className="rv-msg-link">Ver quadras</Link>
                        )}
                    </div>
                ) : (
                    <div className="rv-grid">
                        {reservasAtivas.map((r) => {
                            const nome = r.quadra?.nome || 'Quadra removida';
                            const horario = r.horario ? `${r.horario.horaInicio} às ${r.horario.horaFim}` : '';

                            return (
                                <article key={r._id} className="rv-item">
                                    <img
                                        src={r.quadra?.imagem || imgPadrao}
                                        alt={`Quadra ${nome}`}
                                        className="rv-item-img"
                                    />

                                    <div className="rv-item-info">
                                        <div className="rv-item-left">
                                            <h3 className="rv-item-nome">{nome}</h3>
                                            <p className="rv-item-local">{r.quadra?.localizacao || ''}</p>
                                            <p className="rv-item-data">data da reserva: {formatarData(r.data)}</p>
                                        </div>

                                        <div className="rv-item-right">
                                            <p className="rv-reservado">
                                                Reservado para o dia {formatarData(r.data)}
                                                {horario && `, das ${horario}`}
                                            </p>

                                            <button
                                                type="button"
                                                className="rv-detalhes-btn"
                                                onClick={() => navigate(`/reservas/${r._id}`)}
                                            >
                                                Detalhes
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}