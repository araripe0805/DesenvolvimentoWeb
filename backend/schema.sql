CREATE DATABASE quadras_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE quadras_db;

CREATE TABLE users (
    id INT auto_increment primary key,
    nome VARCHAR(255) not null,
    email VARCHAR(255) not null unique,
    matricula VARCHAR(20) not null unique,
    senha VARCHAR(255) not null,
    telefone VARCHAR(20) not null,
    tipo_usuario ENUM('admin', 'usuario') not null,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quadras (
    id INT auto_increment primary key,
    admin_id INT not null,
    FOREIGN KEY (admin_id) REFERENCES users(id),
    nome VARCHAR(255) not null,
    esporte VARCHAR(50) not null,
    descricao TEXT,
    localizacao VARCHAR(255) not null,
    capacidade INT not null,
    preco DECIMAL(10, 2) not null,
    imagem_url VARCHAR(255),
    ativo BOOLEAN not null DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservas (
    id INT auto_increment primary key,
    quadra_id INT not null,
    FOREIGN KEY (quadra_id) REFERENCES quadras(id),
    usuario_id INT not null,
    FOREIGN KEY (usuario_id) REFERENCES users(id),
    data_reserva DATE not null,
    hora_inicio TIME not null,
    hora_fim TIME not null,
    valor DECIMAL(10, 2) not null,
    status ENUM('pendente', 'confirmada', 'cancelada') not null DEFAULT 'pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check (hora_inicio < hora_fim),
    INDEX idx_reserva_busca (quadra_id, data_reserva)
);

CREATE TABLE horarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quadra_id INT NOT NULL,
  dia_semana ENUM('domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado') NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  FOREIGN KEY (quadra_id) REFERENCES quadras(id) ON DELETE CASCADE
);


CREATE TABLE mensagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remetente_id INT NOT NULL,
  destinatario_id INT NOT NULL,
  quadra_id INT NULL,
  texto TEXT NOT NULL,
  lida BOOLEAN NOT NULL DEFAULT FALSE,
  enviada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (remetente_id) REFERENCES users(id),
  FOREIGN KEY (destinatario_id) REFERENCES users(id),
  FOREIGN KEY (quadra_id) REFERENCES quadras(id),
  INDEX idx_conversa (remetente_id, destinatario_id, enviada_em)
);