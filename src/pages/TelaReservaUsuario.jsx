import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderTelaprincipal } from '../components/Header_telaprincipal';
import { SlidersHorizontal } from 'lucide-react';
import '../styles/TelaReservaUsuario.css';
import imgBeachTennis from '../assets/imagem_tela_login.jpeg';
// Salve a foto do ginásio em src/assets/quadra_volei.jpeg e troque o import abaixo:
// import imgVolei from '../assets/quadra_volei.jpeg';
const imgVolei = imgBeachTennis;

const reservas = [
    {
        id: 1,
        quadra: 'Beach tennis',
        local: 'Próximo ao bloco M',
        dataReserva: '29/09/2026',
        imagem: imgBeachTennis,
        status: 'aguardando',
    },
    {
        id: 2,
        quadra: 'Vôlei',
        local: 'Ginásio poliesportivo',
        dataReserva: '30/11/2026',
        imagem: imgVolei,
        status: 'agendada',
        dataTexto: '30/11/2026, às 18h',
    },
];

export function TelaReservasUsuario() {
    const navigate = useNavigate();

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

                <div className="rv-grid">
                    {reservas.map((r) => (
                        <article key={r.id} className="rv-item">
                            <img src={r.imagem} alt={`Quadra de ${r.quadra}`} className="rv-item-img" />

                            <div className="rv-item-info">
                                <div className="rv-item-left">
                                    <h3 className="rv-item-nome">{r.quadra}</h3>
                                    <p className="rv-item-local">{r.local}</p>
                                    <p className="rv-item-data">data da reserva: {r.dataReserva}</p>
                                </div>

                                <div className="rv-item-right">
                                    {r.status === 'aguardando' ? (
                                        <div className="rv-status">
                                            <span className="rv-dot" />
                                            <span>Aguardando por você</span>
                                        </div>
                                    ) : (
                                        <p className="rv-reservado">Reservado para o dia {r.dataTexto}</p>
                                    )}

                                    <button
                                        type="button"
                                        className="rv-detalhes-btn"
                                        onClick={() => navigate(`/reservas/${r.id}`)}
                                    >
                                        Detalhes
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}