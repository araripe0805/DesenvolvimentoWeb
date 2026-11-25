import Quadra from '../models/quadraModel.js';

export async function gerarIdQuadra() {
  for (let tentativa = 0; tentativa < 20; tentativa++) {
    // número aleatório de 6 dígitos
    const id = Math.floor(100000 + Math.random() * 900000);

    const existe = await Quadra.exists({ idQuadra: id });
    if (!existe) return id;
  }

  throw new Error('Não foi possível gerar um idQuadra único.');
}