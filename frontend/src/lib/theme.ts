/**
 * Escala neutra "slate" (50-950) — cinza com um leve tingimento azulado
 * (mesmo matiz do navy/azul da marca, ~218°), em vez de cinza puro. Mesma
 * progressão de claridade do cinza neutro anterior (contraste conferido
 * degrau a degrau, sem regressão), só troca a temperatura da cor de fundo/
 * texto do app inteiro para combinar com o logo. Todo tom neutro do app
 * deve vir de um desses 11 degraus, para evitar cinzas quase-iguais
 * espalhados pelos componentes. Cores semânticas não-neutras (status
 * verde/laranja/vermelho, acentos do radar, badge "selecionado" etc.) ficam
 * fora da escala, propositalmente.
 */
export const slate = {
  50: "#f6f7fa",
  100: "#eef1f6",
  200: "#d8dfeb",
  300: "#bac7de",
  400: "#809ac7",
  500: "#4467a3",
  600: "#354d76",
  700: "#293b59",
  800: "#1a2436",
  900: "#121824",
  950: "#080b10",
} as const;

/**
 * Paleta de marca — extraída direto do logo (lupa azul→teal sobre a
 * molécula, "Chem" em navy escuro, hexágonos verde/azul ao fundo). Usada
 * pontualmente por cima da escala neutra acima: navy substitui o antigo
 * "ink" (cinza-quase-preto) em textos de destaque, botões primários e
 * estados ativos; o gradiente azul→teal marca elementos de progresso/
 * destaque; o verde reforça o significado "confiável" nos status.
 */
export const brand = {
  navy: "#132a4d",
  navyDeep: "#0c1d38",
  blue: "#2563eb",
  teal: "#14b8a6",
  // Versão escurecida do teal, para quando o tom precisa carregar texto
  // branco por cima (ver brandMix) — o teal puro não tem contraste pra isso.
  tealDeep: "#0d8177",
  // Escurecido em relação ao tom "puro" do logo — esse verde é usado como
  // cor de TEXTO (rótulo de status), não só como indicador/dot, e precisa
  // de >=4.5:1 de contraste contra fundo branco (WCAG AA texto normal).
  green: "#147a54",
  gradient: "linear-gradient(90deg, #2563eb, #14b8a6)",
} as const;

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Cor intermediária do gradiente da marca (blue -> teal), com `t` de 0 a 1.
 * Serve pra "espalhar" o gradiente por elementos separados (barras, badges),
 * onde aplicar o CSS gradient em cada um repetiria o ciclo inteiro dentro de
 * cada elemento em vez de progredir ao longo do conjunto.
 *
 * `onDark` (padrão) termina num teal escurecido em vez do teal puro do logo:
 * quando o elemento carrega texto branco por cima (badge numerado), o teal
 * claro só alcança 2.5:1 de contraste. Passe `false` para elementos sem
 * texto (barras de progresso), que podem usar o teal vivo da marca. */
export function brandMix(t: number, onDark = true) {
  const [r1, g1, b1] = hexToRgb(brand.blue);
  const [r2, g2, b2] = hexToRgb(onDark ? brand.tealDeep : brand.teal);
  const k = Math.max(0, Math.min(1, t));
  const r = Math.round(r1 + (r2 - r1) * k);
  const g = Math.round(g1 + (g2 - g1) * k);
  const b = Math.round(b1 + (b2 - b1) * k);
  return `rgb(${r}, ${g}, ${b})`;
}

export const colors = {
  pageBackground: slate[300],
  canvas: slate[50],
  panel: slate[200],

  ink: brand.navy,
  inkText: slate[50],
  white: "#ffffff",

  accentGradient: brand.gradient,
  accentBlue: brand.blue,
  accentTeal: brand.teal,

  buttonSecondary: slate[300],
  buttonSecondaryBorder: slate[300],
  buttonSecondaryHover: slate[300],

  divider: slate[300],

  tabBar: slate[300],
  tabIdleText: slate[600],

  inputField: slate[200],
  addButton: slate[300],
  addButtonHover: slate[400],

  emptyIcon: slate[500],
  emptyTitle: slate[600],
  emptySubtitle: slate[400],

  card: slate[200],
  cardIcon: slate[300],
  cardIconStroke: slate[600],
  cardTitle: slate[900],
  cardSubtitle: slate[400],
  cardRemoveHover: slate[100],
  cardRemoveStroke: slate[600],

  dropZoneOuter: slate[200],
  dropZoneInner: slate[200],
  dropZoneOutline: slate[400],
  dropZoneText: slate[600],
  dropZoneActiveOutline: slate[500],

  fileIconBg: slate[100],
  fileIconBorder: slate[300],
  fileIconTab: slate[200],
  fileBadge: "#1e8f5b",
  fileName: slate[700],
  fileRemoveText: slate[500],

  toolButtonShadow: "rgba(0, 0, 0, 0.1)",
  toolIconStroke: slate[700],

  secondarySend: slate[300],
  secondarySendHover: slate[300],
  secondarySendText: slate[700],

  stepNumberBg: brand.blue,
  stepTitle: brand.navy,
  stepDesc: slate[600],

  modalOverlay: "rgba(38, 38, 38, 0.42)",
  modalShadow: "rgba(0, 0, 0, 0.3)",
  modalBg: slate[50],
  modalIconBg: slate[800],

  historyItem: slate[100],
  historyItemHover: slate[200],
  historyDeleteHover: "#e0d3d3",
  historyDeleteStroke: "#b2544c",

  progressTrack: slate[200],

  // Status de confiabilidade (tabela de resultados / cromatização de risco).
  // Verde afinado pro tom verde-azulado da marca (era um verde genérico);
  // laranja/vermelho ficam neutros de propósito — não fazem parte da marca.
  statusHighConfidence: brand.green,
  statusReviewSuggested: "#e0932f",
  statusRiskAlert: "#d64545",

  sidebarCollapsed: slate[200],
  navIdleBg: slate[300],
  navIdleStroke: slate[700],

  tableHeaderBg: slate[300],
  tableRowAlt: slate[100],
  tableBorder: slate[200],
  tableDividerRow: slate[200],
  tableRowHover: slate[100],
  tableRowActive: "#dce8fc",

  detailPanelBg: slate[200],
  detailFooterBg: slate[300],
} as const;

/**
 * Escala tipográfica modular (base 14px, razão 1.25 — "major third"). Todo
 * fontSize do app deve vir de um desses degraus, em vez de números soltos
 * (13, 15, 16, 24...) espalhados pelos componentes.
 */
export const fontSize = {
  xs: 9,
  sm: 11,
  cap: 12,
  base: 14,
  md: 18,
  lg: 22,
  xl: 27,
  "2xl": 34,
  "3xl": 43,
  "4xl": 53,
  "5xl": 66,
  "6xl": 83,
} as const;
