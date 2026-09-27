export interface BusinessHour {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export const salonConfig = {
  name: "Beleza Urbana",
  subname: "Studio & Hair",
  tagline: "Cuidado personalizado, técnica refinada e beleza autêntica.",
  whatsapp: "55991710903",
  whatsappFormatted: "+55 99 1710-903",
  phone: "+55 (99) 91710-903",
  address: {
    street: "Rua Oscar Freire, 1024",
    neighborhood: "Jardins",
    city: "São Paulo",
    state: "SP",
    cep: "01426-000",
    full: "Rua Oscar Freire, 1024 - Jardins, São Paulo - SP",
  },
  instagram: "@salaobelezaurbana",
  instagramUrl: "https://instagram.com",
  operatingHoursText: "Terça a Sábado das 09h às 19h",
  hours: [
    { dayOfWeek: 0, dayName: "Domingo", isOpen: false, openTime: "", closeTime: "" },
    { dayOfWeek: 1, dayName: "Segunda-feira", isOpen: false, openTime: "", closeTime: "" },
    { dayOfWeek: 2, dayName: "Terça-feira", isOpen: true, openTime: "09:00", closeTime: "19:00" },
    { dayOfWeek: 3, dayName: "Quarta-feira", isOpen: true, openTime: "09:00", closeTime: "19:00" },
    { dayOfWeek: 4, dayName: "Quinta-feira", isOpen: true, openTime: "09:00", closeTime: "19:00" },
    { dayOfWeek: 5, dayName: "Sexta-feira", isOpen: true, openTime: "09:00", closeTime: "19:00" },
    { dayOfWeek: 6, dayName: "Sábado", isOpen: true, openTime: "09:00", closeTime: "19:00" },
  ] as BusinessHour[],
  // Default standard daily slots (every 60 mins from 09:00 to 18:00)
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
  notes?: string;
}

export function buildWhatsAppUrl(params: WhatsAppMessageParams): string {
  const { serviceName, dateStr, timeStr, customerName, notes } = params;

  let message = `Olá! Gostaria de agendar um horário.\n\n` +
    `Serviço: ${serviceName}\n` +
    `Data: ${dateStr}\n` +
    `Horário: ${timeStr}\n` +
    `Nome: ${customerName}`;

  if (notes && notes.trim()) {
    message += `\nObservação: ${notes.trim()}`;
  }

  message += `\n\nPoderiam confirmar meu agendamento, por favor?`;

  return `https://wa.me/${salonConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
