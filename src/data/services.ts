export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number; // in minutes
  durationLabel: string;
  description: string;
  price: number;
  priceLabel: string;
  conditions?: string;
  popular?: boolean;
  image?: string;
}

export const serviceCategories = [
  "Todos",
  "Corte & Escova",
  "Coloração & Mechas",
  "Tratamentos",
  "Mega Hair & Extensões",
  "Penteados & Make",
  "Unhas & Bem-Estar",
] as const;

export type ServiceCategory = typeof serviceCategories[number];

export const services: Service[] = [
  {
    id: "escova",
    name: "Escova Modelada",
    category: "Corte & Escova",
    duration: 60,
    durationLabel: "1h",
    description:
      "Modelagem clássica ou com ondas leves, alinhamento dos fios e acabamento com proteção térmica. Os valores para cabelos sem mega hair variam de R$ 110 a R$ 150 dependendo do comprimento e volume.",
    price: 110,
    priceLabel: "A partir de R$ 110,00",
    conditions: "Não inclui serviço de lavagem.",
    popular: true,
    image: "/src/assets/images/service_blowout_cut_1790437963369.jpg",
  },
  {
    id: "corte-feminino",
    name: "Corte Feminino com Finalização",
    category: "Corte & Escova",
    duration: 75,
    durationLabel: "1h 15min",
    description:
      "Consultoria visagista prévia para definição da geometria ideal ao formato do rosto e textura dos fios. Inclui lavagem relaxante com massagem capilar e secagem finalizadora.",
    price: 180,
    priceLabel: "R$ 180,00",
    conditions: "Inclui lavagem e secagem.",
    popular: true,
    image: "/src/assets/images/service_blowout_cut_1790437963369.jpg",
  },
  {
    id: "mechas-balayage",
    name: "Mechas & Balayage Iluminada",
    category: "Coloração & Mechas",
    duration: 210,
    durationLabel: "3h 30min",
    description:
      "Técnica personalizada de iluminação com degradê sutil e transições sem marcações. Contempla teste de mecha prévio, descoloração segura com plex protetor, tonalização e tratamento reconstrutor pós-química.",
    price: 520,
    priceLabel: "A partir de R$ 520,00",
    conditions: "Necessário teste de mecha prévio. Valor varia com densidade e comprimento.",
    popular: true,
    image: "/src/assets/images/service_hair_color_1790437974512.jpg",
  },
  {
    id: "retoque-raiz",
    name: "Coloração & Retoque de Raiz",
    category: "Coloração & Mechas",
    duration: 90,
    durationLabel: "1h 30min",
    description:
      "Cobertura perfeita de fios brancos ou equalização de tonalidade com fórmulas ricas em óleos nutritivos sem amônia agressiva. Fios tratados, brilhantes e com cor duradoura.",
    price: 220,
    priceLabel: "A partir de R$ 220,00",
    conditions: "Comprimento até 3cm de raiz. Para extensões maiores, consultar tonalização completa.",
    popular: false,
    image: "/src/assets/images/service_hair_color_1790437974512.jpg",
  },
  {
    id: "tratamento-spa-reconstrucao",
    name: "Spa Capilar & Reconstrução Profunda",
    category: "Tratamentos",
    duration: 60,
    durationLabel: "1h",
    description:
      "Protocolo intensivo de reposição lipídica e hídrica com ativos botânicos e queratina biomimética. Restaura a elasticidade, sela as cutículas e devolve o toque aveludado e brilho espelhado.",
    price: 260,
    priceLabel: "R$ 260,00",
    conditions: "Inclui massagem de couro cabeludo e secagem com escova rápida.",
    popular: true,
    image: "/src/assets/images/service_treatment_spa_1790437984622.jpg",
  },
  {
    id: "spa-couro-cabeludo",
    name: "Terapia & Detox do Couro Cabeludo",
    category: "Tratamentos",
    duration: 45,
    durationLabel: "45min",
    description:
      "Esfoliação suave e purificante, remoção de resíduos acumulados e estímulo à microcirculação folicular através de óleos essenciais calmantes e alta frequência.",
    price: 190,
    priceLabel: "R$ 190,00",
    conditions: "Ideal para controle de oleosidade e fortalecimento da raiz.",
    popular: false,
    image: "/src/assets/images/service_treatment_spa_1790437984622.jpg",
  },
  {
    id: "mega-hair-manutencao",
    name: "Manutenção de Fita Invisível / Mega Hair",
    category: "Mega Hair & Extensões",
    duration: 120,
    durationLabel: "2h",
    description:
      "Remoção cuidadosa, higienização dos fios e das mechas, retipagem com adesivo de nano-fita e reposicionamento milimétrico anatômico garantindo conforto e naturalidade absoluta.",
    price: 380,
    priceLabel: "A partir de R$ 380,00",
    conditions: "Valor referente a até 3 faixas. Faixas adicionais sob consulta.",
    popular: false,
    image: "/src/assets/images/hero_salon_editorial_1790437952827.jpg",
  },
  {
    id: "penteado-social",
    name: "Penteado Social & Editorial",
    category: "Penteados & Make",
    duration: 90,
    durationLabel: "1h 30min",
    description:
      "Criações contemporâneas — coques desestruturados, semipresos orgânicos, ondas de passarela e rabos de cavalo texturizados com fixação duradoura e leveza no movimento.",
    price: 280,
    priceLabel: "A partir de R$ 280,00",
    conditions: "Recomenda-se lavar os cabelos no dia anterior sem máscaras pesadas.",
    popular: false,
    image: "/src/assets/images/service_blowout_cut_1790437963369.jpg",
  },
  {
    id: "maquiagem-beauty",
    name: "Maquiagem Social de Alta Definição",
    category: "Penteados & Make",
    duration: 75,
    durationLabel: "1h 15min",
    description:
      "Preparação de pele com dermocosméticos de luxo, correção luminosa, acabamento natural com viço radiante e aplicação de cílios postiços sob medida.",
    price: 290,
    priceLabel: "R$ 290,00",
    conditions: "Inclui cílios postiços descartáveis de acabamento natural.",
    popular: false,
    image: "/src/assets/images/service_blowout_cut_1790437963369.jpg",
  },
  {
    id: "manicure-pedicure-spa",
    name: "Spa dos Pés e Mãos",
    category: "Unhas & Bem-Estar",
    duration: 60,
    durationLabel: "1h",
    description:
      "Cuidado completo com esfoliação com sais minerais, imersão morna, hidratação profunda com parafina fria e esmaltação com fórmulas de longa duração e alta cobertura.",
    price: 130,
    priceLabel: "R$ 130,00",
    conditions: "Todos os instrumentos esterilizados em autoclave hospitalar grau cirúrgico.",
    popular: false,
    image: "/src/assets/images/service_treatment_spa_1790437984622.jpg",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
