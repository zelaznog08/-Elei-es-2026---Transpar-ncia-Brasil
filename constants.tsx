
import { ElectionMetric, Politician, PollingData, FactCheck, NewsArticle } from './types';

export const ELECTION_DATE = new Date('2026-10-04T08:00:00');

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'n5',
    title: 'Hugo Motta e Davi Alcolumbre assumem presidências da Câmara e do Senado',
    source: 'G1',
    url: 'https://g1.globo.com/',
    date: '2025-02-02',
    candidateId: '6',
    sentiment: 'neutro',
    summary: 'Eleições internas definem o comando das casas legislativas para o biênio 2025-2026.',
    factCheckStatus: 'verificado'
  },
  {
    id: 'n1',
    title: 'Arthur Lira discute reforma administrativa com lideranças',
    source: 'Folha de S.Paulo',
    url: 'https://www.folha.uol.com.br/',
    date: '2024-05-20',
    candidateId: '1',
    sentiment: 'neutro',
    summary: 'A proposta visa reduzir custos operacionais da máquina pública sem afetar serviços essenciais.',
    factCheckStatus: 'verificado'
  },
  {
    id: 'n2',
    title: 'Erika Hilton apresenta projeto de lei sobre dignidade menstrual',
    source: 'G1',
    url: 'https://g1.globo.com/',
    date: '2024-05-19',
    candidateId: '3',
    sentiment: 'positivo',
    summary: 'O projeto busca garantir acesso a produtos de higiene básica para pessoas em vulnerabilidade.',
    factCheckStatus: 'verificado'
  },
  {
    id: 'n3',
    title: 'Polêmica sobre gastos de gabinete de Senador gera debates',
    source: 'Estadão',
    url: 'https://www.estadao.com.br/',
    date: '2024-05-18',
    candidateId: '2',
    sentiment: 'negativo',
    summary: 'Gastos acima da média em viagens oficiais levantam questionamentos sobre austeridade.',
    factCheckStatus: 'alerta'
  },
  {
    id: 'n4',
    title: 'Sóstenes Cavalcante propõe novas diretrizes para o Estatuto do Nascituro',
    source: 'Veja',
    url: 'https://veja.abril.com.br/',
    date: '2024-05-21',
    candidateId: '5',
    sentiment: 'neutro',
    summary: 'O parlamentar defende a proteção integral desde a concepção em nova frente parlamentar.',
    factCheckStatus: 'verificado'
  }
];

export const MOCK_METRICS: ElectionMetric[] = [
  { name: 'Eleitores Estimados', value: 156454011, change: 2.4, type: 'number' },
  { name: 'Gasto Público Federal (YTD)', value: 1245000000, change: 12.5, type: 'currency' },
  { name: 'Transparência Ativa', value: 84.5, change: 5.2, type: 'percentage' },
  { name: 'IDH Médio (Brasil)', value: 0.760, change: 0.5, type: 'number' },
];

export const MOCK_POLLING: PollingData[] = [
  { date: 'Jan 24', candidateA: 32, candidateB: 28, candidateC: 12, undecided: 28 },
  { date: 'Mar 24', candidateA: 34, candidateB: 27, candidateC: 14, undecided: 25 },
  { date: 'Mai 24', candidateA: 33, candidateB: 30, candidateC: 13, undecided: 24 },
  { date: 'Jul 24', candidateA: 35, candidateB: 31, candidateC: 15, undecided: 19 },
];

export const MOCK_POLITICIANS: Politician[] = [
  { 
    id: '1', name: 'Arthur Lira', party: 'PP', role: 'Deputado Federal', spendings: 450000, assets: 5000000, 
    location: 'AL', alignment: 85, education: 'Direito (UFAL)', bio: 'Deputado Federal por Alagoas.' 
  },
  { 
    id: '2', name: 'Rodrigo Pacheco', party: 'PSD', role: 'Senador', spendings: 380000, assets: 25000000, 
    location: 'MG', alignment: 72, education: 'Direito (PUC-MG)', bio: 'Senador por Minas Gerais.' 
  },
  { 
    id: '6', name: 'Hugo Motta', party: 'Republicanos', role: 'Deputado Federal', spendings: 320000, assets: 1200000, 
    location: 'PB', alignment: 90, education: 'Medicina', bio: 'Presidente da Câmara dos Deputados.' 
  },
  { 
    id: '7', name: 'Davi Alcolumbre', party: 'União', role: 'Senador', spendings: 410000, assets: 3500000, 
    location: 'AP', alignment: 88, education: 'Processos Gerenciais', bio: 'Presidente do Senado Federal.' 
  },
  { 
    id: '3', name: 'Erika Hilton', party: 'PSOL', role: 'Deputada Federal', spendings: 410000, assets: 150000, 
    location: 'SP', alignment: 15, education: 'Gerontologia (UFSCar)', bio: 'Ativista de direitos humanos e primeira deputada trans eleita.' 
  },
  { 
    id: '4', name: 'Flávio Bolsonaro', party: 'PL', role: 'Senador', spendings: 420000, assets: 6000000, 
    location: 'RJ', alignment: 5, education: 'Direito (UCA)', bio: 'Filho do ex-presidente Jair Bolsonaro.' 
  },
  { 
    id: '5', name: 'Sóstenes Cavalcante', party: 'PL', role: 'Deputado Federal', spendings: 395000, assets: 1200000, 
    location: 'RJ', alignment: 10, education: 'Teologia', bio: 'Liderança da bancada evangélica e ex-presidente da FPE.' 
  }
];

export const MOCK_FACTS: FactCheck[] = [
  {
    id: 'f1',
    claim: 'O governo atual reduziu o investimento em educação em 50% este ano.',
    status: 'fake',
    explanation: 'Os dados do Tesouro Nacional mostram um aumento real de 4.2% no orçamento do MEC em comparação ao ano anterior.',
    source: 'Tesouro Nacional / Portal da Transparência'
  },
  {
    id: 'f2',
    claim: 'A dívida pública atingiu o maior patamar histórico em relação ao PIB.',
    status: 'impreciso',
    explanation: 'Embora o valor nominal seja alto, a relação dívida/PIB está em 74%, abaixo do pico de 87% registrado em 2020.',
    source: 'Banco Central do Brasil'
  },
  {
    id: 'f3',
    claim: 'O fundo eleitoral para 2026 será de R$ 4,9 bilhões.',
    status: 'fato',
    explanation: 'O valor foi aprovado pelo Congresso Nacional como parte da LDO para as próximas eleições.',
    source: 'Congresso Nacional / TSE'
  }
];

export const DATA_CATEGORIES = [
  { id: 'leg', title: 'Atividade Legislativa', desc: 'Votações, tramitação de projetos e alinhamento partidário.', icon: 'FileText', url: 'https://dadosabertos.camara.leg.br/' },
  { id: 'bud', title: 'Gestão e Orçamento', desc: 'Receitas, despesas, licitações e contratos públicos.', icon: 'DollarSign', url: 'https://portaldatransparencia.gov.br/' },
  { id: 'pol', title: 'Políticas Públicas', desc: 'Monitoramento da implementação e indicadores de desempenho.', icon: 'ClipboardCheck', url: 'https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/politicas-publicas' },
  { id: 'fin', title: 'Financiamento Político', desc: 'Doações, gastos de campanha e transparência partidária.', icon: 'Wallet', url: 'https://divulgacandcontas.tse.jus.br/' },
  { id: 'soc', title: 'Dados Socioeconômicos', desc: 'Indicadores sociais e demográficos para contexto de políticas.', icon: 'BarChart', url: 'https://www.ibge.gov.br/' },
  { id: 'acc', title: 'Transparência e LAI', desc: 'Dados abertos e pedidos de acesso à informação (LAI).', icon: 'Eye', url: 'https://www.gov.br/acessoainformacao/pt-br' },
  { id: 'res', title: 'Análise e Pesquisa', desc: 'Produção acadêmica e relatórios críticos sobre o cenário.', icon: 'BookOpen', url: 'https://www.ipea.gov.br/portal/' },
  { id: 'cit', title: 'Participação Cidadã', desc: 'Ferramentas de engajamento e feedback sobre demandas sociais.', icon: 'Users', url: 'https://www.gov.br/participamaisbrasil/' },
];
