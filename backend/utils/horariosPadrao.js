const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const HORA_INICIAL = 8;
const HORA_FINAL = 22;

function formatarHora(hora) {
  return `${String(hora).padStart(2, '0')}:00`;
}

export function gerarHorariosPadrao(quadraId) {
  const horarios = [];

  for (const diaSemana of DIAS_SEMANA) {
    for (let hora = HORA_INICIAL; hora < HORA_FINAL; hora++) {
      horarios.push({
        quadra: quadraId,
        diaSemana,
        horaInicio: formatarHora(hora),
        horaFim: formatarHora(hora + 1),
      });
    }
  }

  return horarios;
}