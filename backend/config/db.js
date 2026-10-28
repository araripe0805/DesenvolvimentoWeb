import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }
}

export async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}