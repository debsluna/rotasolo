const dadosPosts = [
  {
    slug: 'lisboa-portugal',
    titulo: 'Lisboa: 5 dias explorando sozinha',
    pais: 'Portugal',
    paisSlug: 'portugal',
    categorias: ['roteiro', 'orcamento'],
    capa: 'assets/lisboa-capa.jpg',
    data: '2025-03-10',
    resumo: 'Ladeiras, pasteis de nata e a sensacao de liberdade so de andar sem pressa.',
    coordenadas: { lat: 38.72, lng: -9.14 },
    destaque: true,
    blocos: [
      { tipo: 'texto', conteudo: 'Cheguei em Lisboa sem plano nenhum alem do endereco do hostel...' },
      { tipo: 'imagem', src: 'assets/lisboa-1.jpg', legenda: 'Vista do Miradouro da Graca' },
      { tipo: 'texto', conteudo: 'No segundo dia, subi ate o Castelo de Sao Jorge...' },
      { tipo: 'video', src: 'https://www.youtube.com/embed/SEU_VIDEO_AQUI' },
      { tipo: 'audio', src: 'assets/lisboa-audio.mp3', legenda: 'Um audio que gravei no eletrico 28' },
      { tipo: 'orcamento', itens: [
        { nome: 'Passagem (ida e volta)', valor: 'R$ 2.100' },
        { nome: 'Hospedagem (5 noites)', valor: 'R$ 950' },
        { nome: 'Alimentacao', valor: 'R$ 600' },
        { nome: 'Passeios', valor: 'R$ 300' }
      ]},
      { tipo: 'texto', conteudo: 'O que fica de Lisboa nao sao os cartoes postais...' }
    ]
  },
  {
    slug: 'hanoi-vietna',
    titulo: 'Hanoi: o caos que vira calma',
    pais: 'Vietna',
    paisSlug: 'vietna',
    categorias: ['reflexao'],
    capa: 'assets/hanoi-capa.jpg',
    data: '2024-11-02',
    resumo: 'Sobre atravessar uma rua tomada de motos e o que isso ensina sobre confiar.',
    coordenadas: { lat: 21.03, lng: 105.85 },
    destaque: true,
    blocos: [
      { tipo: 'texto', conteudo: 'Ninguem te prepara pra primeira vez que voce precisa atravessar uma rua em Hanoi...' },
      { tipo: 'imagem', src: 'assets/hanoi-1.jpg', legenda: 'Bairro antigo ao entardecer' }
    ]
  },
  {
    slug: 'buenos-aires-argentina',
    titulo: 'Buenos Aires em ritmo de tango',
    pais: 'Argentina',
    paisSlug: 'argentina',
    categorias: ['roteiro', 'orcamento'],
    capa: 'assets/ba-capa.jpg',
    data: '2025-06-20',
    resumo: 'Um roteiro de 4 dias entre milongas, livrarias e parrillas.',
    coordenadas: { lat: -34.6, lng: -58.38 },
    destaque: true,
    blocos: [
      { tipo: 'texto', conteudo: 'Buenos Aires tem essa energia meio melancolica e vibrante ao mesmo tempo...' },
      { tipo: 'orcamento', itens: [
        { nome: 'Passagem', valor: 'R$ 1.400' },
        { nome: 'Hospedagem (4 noites)', valor: 'R$ 500' }
      ]}
    ]
  }
];

/*
COMO ADICIONAR UMA VIAGEM NOVA:
1. Copie um bloco inteiro, do "{" ate o "}," que fecha um post.
2. Cole antes do "];" no final deste arquivo.
3. Troque os valores: slug (sem espacos/acentos), titulo, pais, categorias,
   capa (caminho da foto), data, resumo, coordenadas e os blocos de conteudo.

TIPOS DE BLOCO:
- texto:     { tipo: 'texto', conteudo: '...' }
- imagem:    { tipo: 'imagem', src: 'assets/foto.jpg', legenda: '...' }
- video:     { tipo: 'video', src: 'https://www.youtube.com/embed/ID_DO_VIDEO' }
- audio:     { tipo: 'audio', src: 'assets/audio.mp3', legenda: '...' }
- orcamento: { tipo: 'orcamento', itens: [ { nome: '...', valor: '...' } ] }
*/
