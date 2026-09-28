export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  durationLabel: string;
  description: string;
  price: number;
  priceLabel: string;
  conditions?: string;
  popular?: boolean;
  image?: string;
}

export const serviceCategories = ["Todos", "Maquiagem", "Penteado", "Sobrancelha"] as const;
export type ServiceCategory = typeof serviceCategories[number];

// The Instagram profile is the only supplied source; confirm the actual menu with the salon.
export const services: Service[] = [
  {
    id: "maquiagem-social",
    name: "Maquiagem Social Embelezadora",
    category: "Maquiagem",
    duration: 60,
    durationLabel: "Sob consulta",
    description: "Maquiagem para realçar sua beleza em ocasiões especiais. Consulte disponibilidade e valores.",
    price: 180,
    priceLabel: "Média estimada: R$ 180,00",
    popular: true,
  },
  {
    id: "maquiagem-noivas",
    name: "Maquiagem para Noivas",
    category: "Maquiagem",
    duration: 60,
    durationLabel: "Sob consulta",
    description: "Produção especial para o grande dia. Consulte a profissional para combinar detalhes, disponibilidade e valores.",
    price: 800,
    priceLabel: "A partir de R$ 800,00 (estimativa)",
    popular: true,
  },
  {
    id: "penteado",
    name: "Penteado",
    category: "Penteado",
    duration: 60,
    durationLabel: "Sob consulta",
    description: "Penteados para festas, eventos e ocasiões especiais. Consulte opções e valores.",
    price: 160,
    priceLabel: "Média estimada: R$ 160,00",
    popular: true,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    category: "Sobrancelha",
    duration: 30,
    durationLabel: "Sob consulta",
    description: "Consulte os serviços para sobrancelhas, disponibilidade e valores pelo WhatsApp.",
    price: 45,
    priceLabel: "Média estimada: R$ 45,00",
    popular: true,
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
