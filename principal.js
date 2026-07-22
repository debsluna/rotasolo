const nomesCategorias = { roteiro: 'Roteiro', orcamento: 'Orcamento', reflexao: 'Reflexao' };

function obterParametros() {
  const params = new URLSearchParams(window.location.search);
  return { categoria: params.get('categoria'), pais: params.get('pais') };
}

function formatarData(dataISO) {
  const d = new Date(dataISO + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function criarCardHTML(post) {
  return `
    <div class="card-destino">
      <a href="post.html?post=${post.slug}">
        <img src="${post.capa}" alt="${post.titulo}">
        <div class="card-corpo">
          <span class="card-tag">${nomesCategorias[post.categorias[0]]}</span>
          <h3>${post.titulo}</h3>
          <p>${post.resumo}</p>
          <span>Ler mais &rarr;</span>
        </div>
      </a>
    </div>`;
}

function renderizarDestaques() {
  const grade = document.getElementById('destaques');
  if (!grade) return;
  grade.innerHTML = dadosPosts.filter(p => p.destaque).slice(0, 3).map(criarCardHTML).join('');
}

function renderizarDestinos() {
  const grade = document.getElementById('grade-destinos-completa');
  if (!grade) return;
  const { categoria, pais } = obterParametros();
  let lista = dadosPosts.slice();
  if (categoria) lista = lista.filter(p => p.categorias.includes(categoria));
  if (pais) lista = lista.filter(p => p.paisSlug === pais);
  lista.sort((a, b) => new Date(b.data) - new Date(a.data));
  grade.innerHTML = lista.length ? lista.map(criarCardHTML).join('') : '<p>Nenhum destino encontrado com esse filtro.</p>';
  document.querySelectorAll('.filtro-categoria').forEach(btn => {
    btn.classList.toggle('ativo', btn.dataset.categoria === (categoria || ''));
  });
}

function filtrarPorCategoria(categoria) {
  const params = new URLSearchParams(window.location.search);
  if (categoria) params.set('categoria', categoria); else params.delete('categoria');
  window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  renderizarDestinos();
}

function preencherSelectPaises() {
  const select = document.getElementById('filtro-pais');
  if (!select) return;
  const vistos = new Set();
  dadosPosts.forEach(p => {
    if (vistos.has(p.paisSlug)) return;
    vistos.add(p.paisSlug);
    const opt = document.createElement('option');
    opt.value = p.paisSlug; opt.textContent = p.pais;
    select.appendChild(opt);
  });
  const { pais } = obterParametros();
  if (pais) select.value = pais;
  select.addEventListener('change', e => {
    const params = new URLSearchParams(window.location.search);
    if (e.target.value) params.set('pais', e.target.value); else params.delete('pais');
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    renderizarDestinos();
  });
}

function criarBlocoHTML(bloco) {
  switch (bloco.tipo) {
    case 'texto': return `<p>${bloco.conteudo}</p>`;
    case 'imagem': return `<figure><img src="${bloco.src}" alt="${bloco.legenda || ''}"><figcaption>${bloco.legenda || ''}</figcaption></figure>`;
    case 'video': return `<div class="video-wrap"><iframe src="${bloco.src}" allowfullscreen loading="lazy"></iframe></div>`;
    case 'audio': return `<div class="audio-wrap">${bloco.legenda ? `<p class="audio-legenda">${bloco.legenda}</p>` : ''}<audio controls src="${bloco.src}"></audio></div>`;
    case 'orcamento': return `<div class="tabela-orcamento"><h3>Quanto custou</h3><table>${bloco.itens.map(i => `<tr><td>${i.nome}</td><td>${i.valor}</td></tr>`).join('')}</table></div>`;
    default: return '';
  }
}

function renderizarPost() {
  const container = document.getElementById('post-conteudo');
  if (!container) return;
  const slug = new URLSearchParams(window.location.search).get('post');
  const post = dadosPosts.find(p => p.slug === slug);
  if (!post) { container.innerHTML = '<div class="container"><p>Post nao encontrado.</p></div>'; return; }
  document.title = post.titulo;
  container.innerHTML = `
    <div class="post-capa" style="background-image:url('${post.capa}')"></div>
    <div class="container post-cabecalho">
      <span class="card-tag">${post.pais}</span>
      <h1>${post.titulo}</h1>
      <p class="post-data">${formatarData(post.data)}</p>
    </div>
    <div class="container post-corpo">${post.blocos.map(criarBlocoHTML).join('')}</div>`;
}

function renderizarMapa() {
  const container = document.getElementById('mapa-pinos');
  const lista = document.getElementById('lista-paises');
  if (!container) return;
  const unicos = {};
  dadosPosts.forEach(p => { unicos[p.paisSlug] = p; });
  Object.values(unicos).forEach(post => {
    const x = ((post.coordenadas.lng + 180) / 360) * 100;
    const y = ((90 - post.coordenadas.lat) / 180) * 100;
    const pino = document.createElement('a');
    pino.href = `destinos.html?pais=${post.paisSlug}`;
    pino.className = 'pino-mapa';
    pino.style.left = x + '%';
    pino.style.top = y + '%';
    pino.innerHTML = `<span class="pino-ponto"></span><span class="pino-label">${post.pais}</span>`;
    container.appendChild(pino);
  });
  if (lista) lista.innerHTML = Object.values(unicos).map(post => `<li><a href="destinos.html?pais=${post.paisSlug}">${post.pais}</a></li>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarDestaques();
  preencherSelectPaises();
  renderizarDestinos();
  renderizarPost();
  renderizarMapa();
  document.querySelectorAll('.filtro-categoria').forEach(btn => {
    btn.addEventListener('click', () => filtrarPorCategoria(btn.dataset.categoria || null));
  });
});
