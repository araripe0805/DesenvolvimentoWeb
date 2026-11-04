import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HeaderTelaprincipal } from "../components/Header_telaprincipal";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import "react-day-picker/style.css";
import "../styles/InformacoesQuadraUser.css";
import imgQuadra from "../assets/imagem_tela_login.jpeg";

const DIAS_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function formatarChave(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export default function InformacoesQuadraUser() {
  const [dataSelecionada, setDataSelecionada] = useState();
  const [hoje] = useState(() => new Date());

  const { id } = useParams();
  const [quadra, setQuadra] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [horarios, setHorarios] = useState([]);
  const [ocupados, setOcupados] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);
  const [erroHorarios, setErroHorarios] = useState("");

  const [reservando, setReservando] = useState(false);
  const [erroReserva, setErroReserva] = useState("");
  const [sucessoReserva, setSucessoReserva] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarQuadra() {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await fetch(`http://localhost:3000/api/quadras/${id}`);
        const dados = await resposta.json();

        if (!resposta.ok) {
          if (ativo) setErro(dados.erro || "Não foi possível carregar a quadra.");
          return;
        }

        if (ativo) setQuadra(dados);
      } catch (err) {
        if (ativo) setErro("Não foi possível conectar ao servidor.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarQuadra();

    return () => { ativo = false; };
  }, [id]);

  function escolherData(data) {
    setDataSelecionada(data);
    setHorarioSelecionado(null);
    setErroHorarios("");
    setErroReserva("");
    setSucessoReserva(false);
    setCarregandoHorarios(Boolean(data));
  }

  function selecionarHorario(horarioId) {
    setHorarioSelecionado(horarioId);
    setErroReserva("");
    setSucessoReserva(false);
  }

  async function reservar() {
    setErroReserva("");
    setSucessoReserva(false);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    if (!usuario?._id) {
      setErroReserva("Você precisa fazer login para reservar.");
      return;
    }

    if (!dataSelecionada || !horarioSelecionado) return;

    setReservando(true);

    try {
      const resposta = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: usuario._id,
          quadra: id,
          horario: horarioSelecionado,
          data: formatarChave(dataSelecionada),
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErroReserva(dados.erro || "Não foi possível reservar.");

        // alguém reservou antes: trava o horário na tela
        if (resposta.status === 409) {
          setOcupados((prev) => [...prev, horarioSelecionado]);
          setHorarioSelecionado(null);
        }
        return;
      }

      // deu certo: o horário passa a aparecer como reservado
      setOcupados((prev) => [...prev, horarioSelecionado]);
      setHorarioSelecionado(null);
      setSucessoReserva(true);
    } catch (err) {
      setErroReserva("Não foi possível conectar ao servidor.");
    } finally {
      setReservando(false);
    }
  }

  useEffect(() => {
    if (!dataSelecionada) return;

    let ativo = true;
    const chave = formatarChave(dataSelecionada);

    async function carregarHorarios() {
      setCarregandoHorarios(true);
      setErroHorarios("");

      try {
        const [respHorarios, respOcupados] = await Promise.all([
          fetch(`http://localhost:3000/api/horarios/quadra/${id}`),
          fetch(`http://localhost:3000/api/reservas/quadra/${id}/ocupados?data=${chave}`),
        ]);

        const dadosHorarios = await respHorarios.json();
        const dadosOcupados = await respOcupados.json();

        if (!respHorarios.ok || !respOcupados.ok) {
          const mensagem = (!respHorarios.ok ? dadosHorarios.erro : dadosOcupados.erro);
          if (ativo) setErroHorarios(mensagem || "Não foi possível carregar os horários.");
          return;
        }

        if (ativo) {
          setHorarios(dadosHorarios);
          setOcupados(dadosOcupados);
        }
      } catch (err) {
        if (ativo) setErroHorarios("Não foi possível conectar ao servidor.");
      } finally {
        if (ativo) setCarregandoHorarios(false);
      }
    }

    carregarHorarios();

    return () => { ativo = false; };
  }, [dataSelecionada, id]);

  const diaSemana = dataSelecionada ? DIAS_SEMANA[dataSelecionada.getDay()] : "";

  const horariosDoDia = horarios
    .filter((h) => h.diaSemana === diaSemana)
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

  let mensagemHorarios = "";
  if (!dataSelecionada) {
    mensagemHorarios = "Escolha uma data para ver os horários.";
  } else if (carregandoHorarios) {
    mensagemHorarios = "Carregando horários...";
  } else if (erroHorarios) {
    mensagemHorarios = erroHorarios;
  } else if (horariosDoDia.length === 0) {
    mensagemHorarios = `Nenhum horário cadastrado para ${diaSemana}.`;
  }

    if (carregando || erro || !quadra) {
    return (
      <div className="iq-page">
        <HeaderTelaprincipal activeTab="quadras" />

        <main className="iq-mainCard">
          <p className={`iq-status ${erro ? "iq-status-erro" : ""}`}>
            {carregando ? "Carregando quadra..." : erro || "Quadra não encontrada."}
          </p>

          {!carregando && (
            <Link to="/quadras" className="iq-status-link">Voltar às quadras</Link>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="iq-page">
      <HeaderTelaprincipal activeTab="quadras" />

      <main className="iq-mainCard">
        <h1 className="iq-mainTitle">{quadra.nome}</h1>

        <div className="iq-hero">
          <button className="iq-arrowButton" aria-label="Voltar">
            ←
          </button>

          <img
            src={quadra.imagem || imgQuadra}
            alt={quadra.nome}
            className="iq-heroImage"
          />

          <button className="iq-arrowButtonRight" aria-label="Próximo">
            →
          </button>
        </div>

        <div className="iq-contentRow">
          <div className="iq-leftColumn">
            <div className="iq-sectionLabel">Descrição do espaço:</div>

            <div className="iq-infoRow">
              <div className="iq-labelBlock">
                <span className="iq-bigLabel">Localização:</span>
                <span className="iq-subText">{quadra.localizacao}</span>
              </div>

              <div className="iq-labelBlock">
                <span className="iq-bigLabel">Preço da reserva:</span>
                <span className="iq-subTextPrice">
                  {Number(quadra.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
            </div>
          </div>

          <div className="iq-rightColumn">
            <div className="iq-reserveTitle">Marque sua reserva:</div>

            <div className="iq-calendarWrap">
              <DayPicker
                mode="single"
                locale={ptBR}
                selected={dataSelecionada}
                onSelect={escolherData}
                disabled={{ before: hoje }}
              />
            </div>

            <div className="iq-horarios">
              <div className="iq-horarios-titulo">Horários disponíveis:</div>

              {mensagemHorarios ? (
                <p className={`iq-horarios-msg ${erroHorarios ? "iq-horarios-erro" : ""}`}>
                  {mensagemHorarios}
                </p>
              ) : (
                <div className="iq-horarios-lista">
                  {horariosDoDia.map((h) => {
                    const ocupado = ocupados.includes(h._id);
                    const selecionado = h._id === horarioSelecionado;

                    return (
                      <button
                        key={h._id}
                        type="button"
                        className={`iq-horario ${ocupado ? "ocupado" : ""} ${selecionado ? "selecionado" : ""}`}
                        disabled={ocupado}
                        aria-pressed={selecionado}
                        onClick={() => selecionarHorario(h._id)}
                      >
                        {h.horaInicio} – {h.horaFim}
                        {ocupado && <span className="iq-horario-tag">Reservado</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {erroReserva && <p className="iq-reserva-msg iq-reserva-erro">{erroReserva}</p>}

            {sucessoReserva && (
              <p className="iq-reserva-msg iq-reserva-sucesso">
                Reserva confirmada! <Link to="/reservas">Ver minhas reservas</Link>
              </p>
            )}

            <button
              className="iq-confirmButton"
              disabled={!dataSelecionada || !horarioSelecionado || reservando}
              onClick={reservar}
            >
              {reservando ? "Reservando..." : "Confirmar reserva"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}