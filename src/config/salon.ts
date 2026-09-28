export interface BusinessHour {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export const salonConfig = {
  name: "Essência de Mulher - Studio de Beleza",
  subname: "Mari | Maquiagem e Penteado",
  tagline: "Sua beleza em destaque no seu dia inesquecível!",
  whatsapp: "559992787174",
  whatsappFormatted: "+55 (99) 9278-7174",
  phone: "+55 (99) 9278-7174",
  address: {
    street: "R. Alfredo Haubert, 788",
    neighborhood: "",
    city: "Frederico Westphalen",
    state: "RS",
    cep: "98400-000",
    full: "R. Alfredo Haubert, 788 - Frederico Westphalen - RS, 98400-000",
  },
  instagram: "@essenciademulhersalao_",
  instagramUrl: "https://www.instagram.com/essenciademulhersalao_/",
  operatingHoursText: "Consulte os horários pelo WhatsApp",
  // Collect preferred dates; the salon confirms its actual hours on WhatsApp.
  hours: [
    { dayOfWeek: 0, dayName: "Domingo", isOpen: true, openTime: "", closeTime: "" },
    { dayOfWeek: 1, dayName: "Segunda-feira", isOpen: true, openTime: "", closeTime: "" },
    { dayOfWeek: 2, dayName: "Terça-feira", isOpen: true, openTime: "", closeTime: "" },
    { dayOfWeek: 3, dayName: "Quarta-feira", isOpen: true, openTime: "", closeTime: "" },
    { dayOfWeek: 4, dayName: "Quinta-feira", isOpen: true, openTime: "", closeTime: "" },
    { dayOfWeek: 5, dayName: "Sexta-feira", isOpen: true, openTime: "", closeTime: "" },
    { dayOfWeek: 6, dayName: "Sábado", isOpen: true, openTime: "", closeTime: "" },
  ] as BusinessHour[],
  // Suggested times only; the salon confirms availability via WhatsApp.
  standardSlots: [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ],
};

export interface WhatsAppMessageParams {
  serviceName: string;
  dateStr: string;
  timeStr: string;
  customerName: string;
  customerPhone?: string;
  notes?: string;
}

export function buildWhatsAppUrl(params: WhatsAppMessageParams): string {
  const { serviceName, dateStr, timeStr, customerName, customerPhone, notes } = params;

  let message = `Olá! Gostaria de agendar um horário.\n\n` +
    `Serviço: ${serviceName}\n` +
    `Data: ${dateStr}\n` +
    `Horário: ${timeStr}\n` +
    `Nome: ${customerName}` +
    (customerPhone ? `\nTelefone para contato: ${customerPhone}` : "");

  if (notes && notes.trim()) {
    message += `\nObservação: ${notes.trim()}`;
  }

  message += `\n\nEste é um pedido de agendamento. Poderiam confirmar a disponibilidade, por favor?`;

  return `https://wa.me/${salonConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
