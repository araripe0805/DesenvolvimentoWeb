import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import imagemQuadra from '../assets/imagem_tela_login.jpeg';

const quadras = [{ id: 'beach-tennis', nome: 'Quadra de Beach Tennis', tipo: 'areia', esporte: 'Beach Tennis', disponivel: true, preco: 0 }];

export function QuadrasListagem({ actions }) {
  const [aberto, setAberto] = useState(false);
  const [tipo, setTipo] = useState('');
  const [esporte, setEsporte] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  const [minimo, setMinimo] = useState('');
  const [maximo, setMaximo] = useState('');
  const resultados = quadras.filter((quadra) => (!tipo || quadra.tipo === tipo) && (!esporte || quadra.esporte === esporte) && (!disponibilidade || String(quadra.disponivel) === disponibilidade) && (minimo === '' || quadra.preco >= Number(minimo)) && (maximo === '' || quadra.preco <= Number(maximo)));

  return <>
    <div className="content-header"><h2>Todas as quadras</h2><div className="admin-header-actions">{actions}<button type="button" className="filter-icon-btn" title="Filtrar quadras" aria-label="Filtrar quadras" aria-expanded={aberto} aria-controls="painel-filtros" onClick={() => setAberto(!aberto)}><SlidersHorizontal size={20} aria-hidden="true" /></button></div></div>
    <div className="quadras-layout"><div className="quadras-grid" aria-live="polite">{resultados.length ? resultados.map((quadra) => <article className="quadra-list-card" key={quadra.id}><img src={imagemQuadra} alt="" /><div className="quadra-list-card-body"><h3>{quadra.nome}</h3><p>{quadra.esporte} · Areia · Disponível</p><p>Reserva: R$ 0,00</p><Link to={`/quadras/${quadra.id}`}>Ver detalhes</Link></div></article>) : <p className="quadras-empty">Não há quadras que correspondam aos filtros selecionados.</p>}</div>
      {aberto && <aside className="filtros-panel" id="painel-filtros" aria-label="Filtros de quadras"><h3>Filtros</h3>
        <label>Tipo de quadra<select value={tipo} onChange={(event) => setTipo(event.target.value)}><option value="">Todos</option><option value="areia">Areia</option><option value="grama">Grama</option><option value="sintetico">Sintético</option><option value="cimento">Cimento</option></select></label>
        <label>Esporte<select value={esporte} onChange={(event) => setEsporte(event.target.value)}><option value="">Todos</option><option>Beach Tennis</option><option>Futebol</option><option>Vôlei</option><option>Tênis</option></select></label>
        <label>Disponibilidade<select value={disponibilidade} onChange={(event) => setDisponibilidade(event.target.value)}><option value="">Todas</option><option value="true">Disponíveis</option><option value="false">Indisponíveis</option></select></label>
        <fieldset><legend>Preço da reserva (R$)</legend><div className="filtros-price"><label>Mínimo<input type="number" min="0" value={minimo} onChange={(event) => setMinimo(event.target.value)} /></label><label>Máximo<input type="number" min="0" value={maximo} onChange={(event) => setMaximo(event.target.value)} /></label></div></fieldset>
        <button type="button" className="filtros-clear" onClick={() => { setTipo(''); setEsporte(''); setDisponibilidade(''); setMinimo(''); setMaximo(''); }}>Limpar filtros</button>
      </aside>}</div>
  </>;
}
