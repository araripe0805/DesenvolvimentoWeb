import React, { useState } from "react";
import { HeaderTelaprincipal } from "../components/Header_telaprincipal";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import "react-day-picker/style.css";
import "../styles/InformacoesQuadraUser.css";
import imgQuadra from "../assets/imagem_tela_login.jpeg";

export default function InformacoesQuadraUser() {
  const [dataSelecionada, setDataSelecionada] = useState();
  const [hoje] = useState(() => new Date());

  return (
    <div className="iq-page">
      <HeaderTelaprincipal activeTab="quadras" />

      <main className="iq-mainCard">
        <h1 className="iq-mainTitle">Quadra de Beach Tennis</h1>

        <div className="iq-hero">
          <button className="iq-arrowButton" aria-label="Voltar">
            ←
          </button>

          <img
            src={imgQuadra}
            alt="Quadra de beach tennis"
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
                <span className="iq-subText">Próximo ao bloco M</span>
              </div>

              <div className="iq-labelBlock">
                <span className="iq-bigLabel">Preço da reserva:</span>
                <span className="iq-subTextPrice">R$ 0,00</span>
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
                onSelect={setDataSelecionada}
                disabled={{ before: hoje }}
              />
            </div>

            <button className="iq-confirmButton" disabled={!dataSelecionada}>
              Confirmar reserva
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}