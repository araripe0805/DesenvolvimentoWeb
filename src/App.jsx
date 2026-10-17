// src/App.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { TelaPrincipalUsuario } from './pages/Telaprincipal_usuario';
import {TelaPerfil} from './pages/Telaperfil';
import { TelaPrincipalAdm } from './pages/Telaprincipal_adm';
import { TelaLogin } from './pages/Telalogin';
import { TelaCadastro } from './pages/Telacadastro';
import { TelaEsquecerSenha } from './pages/Telaesquecersenha';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<TelaLogin />} />
            <Route path="/cadastro" element={<TelaCadastro />} />
            <Route path="/esqueci-senha" element={<TelaEsquecerSenha />} />
            <Route path="/quadras" element={<TelaPrincipalUsuario />} />
            <Route path="/perfil" element={<TelaPerfil />} />
            <Route path="/admin" element={<TelaPrincipalAdm />} />
            <Route path="/admin/perfil" element={<TelaPerfil admin />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;
