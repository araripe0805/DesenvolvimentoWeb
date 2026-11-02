import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { HeaderTelaprincipalAdm } from '../components/Header_telaprincipal_adm';
import { Pencil, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/InformacoesQuadraAdm.css';
import imgQuadra from '../assets/imagem_tela_login.jpeg';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Dados de exemplo (depois troque por fetch no backend)
const RESERVAS_INICIAIS = [
  {
    id: 1,
    data: '2026-11-03',
    nome: 'Mariana Costa',
    matricula: '2024001234',
    quadra: 'Beach Tennis D',
    horario: '14:00 – 16:00',
    status: 'Confirmada & Ativa',
  },
  {
    id: 2,
    data: '2026-11-05',
    nome: 'Pedro Alonso',
    matricula: '2024005678',
    quadra: 'Beach Tennis D',
    horario: '18:00 – 19:00',
    status: 'Confirmada & Ativa',
  },
  {
    id: 3,
    data: '2026-11-15',
    nome: 'João Lima',
    matricula: '2024009012',
    quadra: 'Beach Tennis D',
    horario: '09:00 – 10:00',
    status: 'Confirmada & Ativa',
  },
];

function chaveData(ano, mes, dia) {
  return `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function formatarData(chave) {
  const [ano, mes, dia] = chave.split('-').map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}

// Só renderiza a tela se o usuário logado for admin
export function InformacoesQuadraAdm() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (usuario?.tipoUser !== 'admin') {
    return <Navigate to="/quadras" replace />;
  }
  return <ConteudoQuadraAdm />;
}

function ConteudoQuadraAdm() {
  const navigate = useNavigate();
  const hoje = new Date();

  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [reservas, setReservas] = useState(RESERVAS_INICIAIS);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [reservaAberta, setReservaAberta] = useState(null);
  const [aviso, setAviso] = useState('');

  const anos = [ano - 1, ano, ano + 1, ano + 2].filter((a, i, arr) => arr.indexOf(a) === i);
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const celulas = [
    ...Array(primeiroDia).fill(null),
    ...Array.from({ length: totalDias }, (_, i) => i + 1),
  ];

  const reservaDoDia = (chave) => reservas.find((r) => r.data === chave);

  function selecionarDia(dia) {
    setDiaSelecionado(chaveData(ano, mes, dia));
    setAviso('');
  }

  function verReservas() {
    if (!diaSelecionado) return;
    const reserva = reservaDoDia(diaSelecionado);
    if (reserva) {
      setReservaAberta(reserva);
    } else {
      setAviso('Nenhuma reserva neste dia.');
    }
  }

  function cancelarReserva() {
    setReservas((prev) => prev.filter((r) => r.id !== reservaAberta.id));
    setReservaAberta(null);
    setDiaSelecionado(null);
  }

  return (
    <div className="home-container">
      <HeaderTelaprincipalAdm activeTab={'quadras'} />

      <main className="main-content-card iqa-card">
        {/* Topo: editar / título / deletar */}
        <div className="iqa-topbar">
          <button type="button" className="iqa-btn-outline" onClick={() => navigate('/admin/quadras')}>
            <Pencil size={16} /> Editar quadra
          </button>

          <h1 className="iqa-title">Quadra de Beach Tennis D</h1>

          <button type="button" className="iqa-btn-outline iqa-btn-danger">
            <Trash2 size={16} /> Deletar quadra
          </button>
        </div>

        {/* Imagem com setas */}
        <div className="iqa-hero">
          <button type="button" className="iqa-arrow iqa-arrow-left" aria-label="Imagem anterior">
            <ChevronLeft size={28} />
          </button>
          <img src={imgQuadra} alt="Quadra de beach tennis" className="iqa-hero-img" />
          <button type="button" className="iqa-arrow iqa-arrow-right" aria-label="Próxima imagem">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Informações + calendário */}
        <div className="iqa-content">
          <div className="iqa-left">
            <h2 className="iqa-section-title">Descrição do espaço:</h2>

            <div className="iqa-info-row">
              <div>
                <h3 className="iqa-info-label">Localização:</h3>
                <p className="iqa-info-text">Próximo ao bloco M</p>
              </div>
              <div>
                <h3 className="iqa-info-label">Preço da reserva:</h3>
                <p className="iqa-info-text">R$ 0,00</p>
              </div>
            </div>
          </div>

          <div className="iqa-reservas-col">
            <h2 className="iqa-reservas-title">Reservas da quadra:</h2>
            <p className="iqa-reservas-hint">Selecione um dia e clique no botão para ver a reserva</p>
            {aviso && <p className="iqa-aviso" role="status">{aviso}</p>}

            <button
              type="button"
              className="iqa-ver-btn"
              onClick={verReservas}
              disabled={!diaSelecionado}
            >
              Ver reservas da quadra
            </button>
          </div>

          <div className="iqa-calendario">
            <div className="iqa-cal-selects">
              <select value={mes} onChange={(e) => setMes(Number(e.target.value))} aria-label="Mês">
                {MESES.map((nome, i) => (
                  <option key={nome} value={i}>{nome}</option>
                ))}
              </select>

              <select value={ano} onChange={(e) => setAno(Number(e.target.value))} aria-label="Ano">
                {anos.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="iqa-cal-grid">
              {DIAS_SEMANA.map((d, i) => (
                <span key={i} className="iqa-cal-weekday">{d}</span>
              ))}

              {celulas.map((dia, i) => {
                if (dia === null) return <span key={`vazio-${i}`} />;
                const chave = chaveData(ano, mes, dia);
                const reservado = Boolean(reservaDoDia(chave));
                const selecionado = chave === diaSelecionado;
                return (
                  <button
                    key={chave}
                    type="button"
                    className={`iqa-dia ${reservado ? 'reservado' : 'livre'} ${selecionado ? 'selecionado' : ''}`}
                    onClick={() => selecionarDia(dia)}
                    aria-pressed={selecionado}
                    title={reservado ? 'Dia com reserva' : 'Dia livre'}
                  >
                    {dia}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Pop-up: Informações da Reserva */}
      {reservaAberta && (
        <div className="iqa-overlay" onClick={() => setReservaAberta(null)}>
          <div
            className="iqa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="iqa-modal-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="iqa-modal-header">
              <h2 id="iqa-modal-titulo">Informações da Reserva</h2>
              <button
                type="button"
                className="iqa-modal-close"
                aria-label="Fechar"
                onClick={() => setReservaAberta(null)}
              >
                <X size={14} />
              </button>
            </div>

            <div className="iqa-field">
              <label>Nome do usuário</label>
              <div className="iqa-field-value">{reservaAberta.nome}</div>
            </div>

            <div className="iqa-field">
              <label>Matrícula</label>
              <div className="iqa-field-value">{reservaAberta.matricula}</div>
            </div>

            <div className="iqa-field">
              <label>Quadra selecionada</label>
              <div className="iqa-field-value">{reservaAberta.quadra}</div>
            </div>

            <div className="iqa-field-row">
              <div className="iqa-field">
                <label>Data</label>
                <div className="iqa-field-value">{formatarData(reservaAberta.data)}</div>
              </div>
              <div className="iqa-field">
                <label>Horário</label>
                <div className="iqa-field-value">{reservaAberta.horario}</div>
              </div>
            </div>

            <div className="iqa-field">
              <label>Status da reserva</label>
              <span className="iqa-status">{reservaAberta.status}</span>
            </div>

            <button type="button" className="iqa-cancelar-btn" onClick={cancelarReserva}>
              Cancelar Reserva
            </button>

            <button type="button" className="iqa-voltar-btn" onClick={() => setReservaAberta(null)}>
              Voltar ao Calendário
            </button>
          </div>
        </div>
      )}
    </div>
  );
}