import 'dotenv/config';
import Quadra from '../models/quadraModel.js';
import Horario from '../models/horarioModel.js';
import { gerarHorariosPadrao } from '../utils/horariosPadrao.js';
import { connectToMongoDB, disconnectFromMongoDB } from '../config/db.js';

async function main() {
  await connectToMongoDB();

  const quadras = await Quadra.find({ ativo: true });

  for (const quadra of quadras) {
    const existentes = await Horario.find({ quadra: quadra._id, ativo: true });

    // só cria o que não bate com um horário que a quadra já tem
    const novos = gerarHorariosPadrao(quadra._id).filter((novo) =>
      !existentes.some((e) =>
        e.diaSemana === novo.diaSemana &&
        e.horaInicio < novo.horaFim &&
        e.horaFim > novo.horaInicio
      )
    );

    if (novos.length === 0) {
      console.log(`${quadra.nome}: nada a criar.`);
      continue;
    }

    await Horario.insertMany(novos);
    console.log(`${quadra.nome}: ${novos.length} horários criados.`);
  }

  await disconnectFromMongoDB();
}

main().catch(async (err) => {
  console.error(err);
  await disconnectFromMongoDB().catch(() => {});
  process.exitCode = 1;
});