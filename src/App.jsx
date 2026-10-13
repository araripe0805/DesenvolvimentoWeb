// src/App.jsx
import React from 'react';
import { TelaPrincipalUsuario } from './pages/Telaprincipal_usuario';
import {TelaPerfil} from './pages/Telaperfil';
import { TelaPrincipalAdm } from './pages/Telaprincipal_adm';
import { TelaLogin } from './pages/Telalogin';
import {TelaCriarUsuario} from './pages/Telacriarusuario';
import './App.css';
import { TelaCriarQuadra } from './pages/Telacriarquadra';
import './App.css';

function App() {
  return <TelaCriarQuadra />;
}

export default App;