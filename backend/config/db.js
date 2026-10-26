import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const cliente = new MongoClient(uri);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB com sucesso!');
    return client;
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }
}

export async function disconnectFromMongoDB() {
  await client.close();
}