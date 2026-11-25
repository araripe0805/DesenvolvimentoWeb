import 'dotenv/config';
import Quadra from '../models/quadraModel.js';
import { gerarIdQuadra } from '../utils/gerarIdQuadra.js';
import { connectToMongoDB, disconnectFromMongoDB } from '../config/db.js';

async function main() {
  await connectToMongoDB();

  // idQuadra: null pega as quadras com o campo vazio ou ausente
  const semId = await Quadra.find({ idQuadra: null }).select('_id nome');

  if (semId.length === 0) {
    console.log('Nenhuma quadra sem idQuadra.');
  }

  for (const quadra of semId) {
    const idQuadra = await gerarIdQuadra();
    await Quadra.updateOne({ _id: quadra._id }, { $set: { idQuadra } });
    console.log(`${quadra.nome}: idQuadra ${idQuadra}`);
  }

  await disconnectFromMongoDB();
}

main().catch(async (err) => {
  console.error(err);
  await disconnectFromMongoDB().catch(() => {});
  process.exitCode = 1;
});