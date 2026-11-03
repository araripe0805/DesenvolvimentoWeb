import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
<<<<<<< HEAD
const [arquivoImagem, setArquivoImagem] = useState(null);
const [imagem, setImagem] = useState('');
=======
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [imagem, setImagem] = useState('');
>>>>>>> 22cec8d (COrrigindo a porra do merge)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

<<<<<<< HEAD
function handleImageChange(event) {
    const arquivo = event.target.files[0];

    if (!arquivo) {
        return;
    }

    if (!arquivo.type.startsWith('image/')) {
        setError('Selecione um arquivo de imagem válido.');
        return;
    }

=======
  function handleImageChange(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) {
        return;
    }

    if (!arquivo.type.startsWith('image/')) {
        setError('Selecione um arquivo de imagem válido.');
        return;
    }

>>>>>>> 22cec8d (COrrigindo a porra do merge)
    setArquivoImagem(arquivo);

    const leitor = new FileReader();

    leitor.onloadend = () => {
        setImagem(leitor.result);
    };

    leitor.readAsDataURL(arquivo);
}

  async function handleSubmit(event) {
    event.preventDefault();
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
    setLoading(true);
    setError('');
    setSucesso('');

    try {
      const usuarioSalvo = localStorage.getItem('usuario');

      if (!usuarioSalvo) {
        setError('Você precisa estar logado para criar uma quadra.');
        return;
      }

      const usuario = JSON.parse(usuarioSalvo);
<<<<<<< HEAD
=======

>>>>>>> 22cec8d (COrrigindo a porra do merge)
      const idAdministrador = usuario._id || usuario.id;

      if (!idAdministrador) {
        setError(
          'Não foi possível identificar o administrador. Faça login novamente.'
        );
        return;
      }

      const dadosQuadra = {
        ...form,
        capacidade: Number(form.capacidade),
        preco: Number(form.preco),
        largura: Number(form.largura),
        comprimento: Number(form.comprimento),
        imagem: imagem,
        administrador: idAdministrador
      };

      const resposta = await fetch(
        'http://localhost:3000/api/quadras',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosQuadra)
        }
      );

      const dadosResposta = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.erro ||
          dadosResposta.mensagem ||
          'Não foi possível criar a quadra.'
        );
      }

      setSucesso('Quadra criada com sucesso!');
      setForm(initialForm);
      setImagem('');
      setArquivoImagem(null);
    } catch (erro) {
      console.error('Erro ao criar quadra:', erro);
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
      setError(
        erro.message || 'Erro ao conectar com o servidor.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home-container">
      <HeaderTelaprincipalAdm activeTab="quadras" />

      <main className="main-content-card criar-quadra-card">
        <div className="criar-quadra-header">
          <button
            className="back-btn-criar"
            type="button"
            title="Voltar"
            onClick={() => navigate('/admin/quadras')}
          >
            <ArrowLeft size={20} color="#111111" />
          </button>

          <h2>Criar quadra</h2>
        </div>

        {sucesso && (
  <div className="modal-overlay">
    <div className="modal-sucesso">
      <div className="icone-sucesso">✓</div>

      <h2>Quadra cadastrada!</h2>

      <p>
        A quadra foi criada com sucesso e já está disponível
        na listagem.
      </p>

      <button
        type="button"
        className="btn-confirmacao"
        onClick={() => setSucesso('')}
      >
        Entendi
      </button>
    </div>
  </div>
)}

        <form
          className="criar-quadra-form"
          onSubmit={handleSubmit}
        >
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
                required
              />
            </div>

            <div className="field">
              <label htmlFor="tipo">Tipo de superfície</label>
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
              <select
                id="tipo"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
              >
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
                required
              />
            </div>

            <div className="field">
              <label htmlFor="capacidade">
                Capacidade máxima
              </label>
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
              <input
                id="capacidade"
                name="capacidade"
                type="number"
                min="1"
                value={form.capacidade}
                onChange={handleChange}
                placeholder="Ex.: 10"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="preco">
                Preço por hora (R$)
              </label>
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
              <input
                id="preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={form.preco}
                onChange={handleChange}
                placeholder="Ex.: 120.00"
                required
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
                required
              />
            </div>

            <div className="field">
              <label htmlFor="comprimento">
                Comprimento (m)
              </label>
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
              <input
                id="comprimento"
                name="comprimento"
                type="number"
                min="0"
                step="0.1"
                value={form.comprimento}
                onChange={handleChange}
                placeholder="Ex.: 18"
                required
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
            <label
              htmlFor="imagem"
              className="upload-label"
            >
              <UploadCloud size={22} color="#1d4ed8" />
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
              <span>
                {imagem
                  ? 'Alterar imagem'
                  : 'Adicionar imagem da quadra'}
              </span>
            </label>
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
            <input
              id="imagem"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagem && (
              <img
                src={imagem}
                alt="Preview da quadra"
                className="quadra-preview"
              />
            )}
          </div>

          {error && (
            <p className="form-erro">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              className="cancel-btn"
              type="button"
              onClick={() => navigate('/admin/quadras')}
            >
              Cancelar
            </button>

            <button
              className="submit-btn"
              type="submit"
              disabled={loading || Boolean(sucesso)}
            >
              <Save size={18} />
<<<<<<< HEAD

=======
>>>>>>> 22cec8d (COrrigindo a porra do merge)
              {loading
                ? 'Salvando...'
                : 'Salvar quadra'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}