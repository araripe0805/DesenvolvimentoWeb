// src/App.jsx
import React from 'react';
import { TelaPrincipalUsuario } from './pages/Telaprincipal_usuario';
import {TelaPerfil} from './pages/Telaperfil';
import { TelaPrincipalAdm } from './pages/Telaprincipal_adm';
import { TelaLogin } from './pages/Telalogin';
import {TelaCriarUsuario} from './pages/Telacriarusuario';
import './App.css';

function App() {
    return <TelaLogin />;
}

export default App;