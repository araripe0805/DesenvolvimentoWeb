import React, { useState } from 'react';
import { HeaderTelaprincipalAdm } from '../components/Header_telaprincipal_adm';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import '../styles/Telacriarquadra.css';

const initialForm = {
  nome: '',
  tipo: '',
  localizacao: '',
  capacidade: '',
  preco: '',
  largura: '',
  comprimento: '',
  descricao: ''
};

export function TelaCriarQuadra() {
  const [form, setForm] = useState(initialForm);
  const [imagem, setImagem] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagem(previewUrl);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Quadra criada:', { ...form, imagem });
    alert('Quadra criada com sucesso!');
  }

  return (
    <div className="home-container">
      <HeaderTelaprincipalAdm activeTab={null} />

      <main className="main-content-card criar-quadra-card">
        <div className="criar-quadra-header">
          <button className="back-btn-criar" type="button" title="Voltar">
            <ArrowLeft size={20} color="#111111" />
          </button>
          <h2>Criar quadra</h2>
        </div>

        <form className="criar-quadra-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="nome">Nome da quadra</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex.: Quadra de areia 01"
              />
            </div>

            <div className="field">
              <label htmlFor="tipo">Tipo de superfície</label>
              <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="areia">Areia</option>
                <option value="grama">Grama</option>
                <option value="sintetico">Sintético</option>
                <option value="cimento">Cimento</option>
              </select>
            </div>

            <div className="field full-width">
              <label htmlFor="localizacao">Localização</label>
              <input
                id="localizacao"
                name="localizacao"
                type="text"
                value={form.localizacao}
                onChange={handleChange}
                placeholder="Ex.: Ginásio Central - Bloco A"
              />
            </div>

            <div className="field">
              <label htmlFor="capacidade">Capacidade máxima</label>
              <input
                id="capacidade"
                name="capacidade"
                type="number"
                min="1"
                value={form.capacidade}
                onChange={handleChange}
                placeholder="Ex.: 10"
              />
            </div>

            <div className="field">
              <label htmlFor="preco">Preço por hora</label>
              <input
                id="preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={form.preco}
                onChange={handleChange}
                placeholder="Ex.: 120.00"
              />
            </div>

            <div className="field">
              <label htmlFor="largura">Largura (m)</label>
              <input
                id="largura"
                name="largura"
                type="number"
                min="0"
                step="0.1"
                value={form.largura}
                onChange={handleChange}
                placeholder="Ex.: 12"
              />
            </div>

            <div className="field">
              <label htmlFor="comprimento">Comprimento (m)</label>
              <input
                id="comprimento"
                name="comprimento"
                type="number"
                min="0"
                step="0.1"
                value={form.comprimento}
                onChange={handleChange}
                placeholder="Ex.: 18"
              />
            </div>

            <div className="field full-width">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descreva as características da quadra, disponibilidade e regras..."
              />
            </div>
          </div>

          <div className="upload-box">
            <label htmlFor="imagem" className="upload-label">
              <UploadCloud size={22} color="#1d4ed8" />
              <span>{imagem ? 'Alterar imagem' : 'Adicionar imagem da quadra'}</span>
            </label>
            <input id="imagem" type="file" accept="image/*" onChange={handleImageChange} />

            {imagem && (
              <img src={imagem} alt="Preview da quadra" className="quadra-preview" />
            )}
          </div>

          <div className="form-actions">
            <button className="cancel-btn" type="button">
              Cancelar
            </button>

            <button className="submit-btn" type="submit">
              <Save size={18} />
              Salvar quadra
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}