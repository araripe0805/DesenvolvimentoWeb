// src/App.jsx
import React from 'react';
import { TelaPrincipalUsuario } from './pages/Telaprincipal_usuario';
import {TelaPerfil} from './pages/Telaperfil';
import { TelaPrincipalAdm } from './pages/Telaprincipal_adm';
import { TelaLogin } from './pages/Telalogin';
import {TelaCriarUsuario} from './pages/Telacriarusuario';
import  {  TelaAssistencia  }  from  './pages/TelaAssistencia' ;
import { TelaChat } from './pages/Telachat';
import { TelaEditarInformacoes } from './pages/TelaEditarInformacoes';
import { TelaCriarQuadra } from './pages/Telacriarquadra';
import TelaInformacoesQuadraUser from "./pages/InformacoesQuadraUser";
import './App.css';

function App() {
  return < TelaInformacoesQuadraUser />;
}

export default App;