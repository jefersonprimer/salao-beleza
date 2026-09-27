import { salonConfig } from "../config/salon";
import { services, getServiceById } from "./services";

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  createdAt: string; // ISO
  status: "confirmed" | "completed" | "cancelled";
}

const STORAGE_KEY = "beleza_urbana_appointments_v1";

// Seed realistic upcoming appointments relative to current system time (2026-09-26)
// Sept 26, 2026 is Saturday (day 6 - open)
// Sept 27, 2026 is Sunday (closed)
// Sept 28, 2026 is Monday (closed)
// Sept 29, 2026 is Tuesday (open)
// Sept 30, 2026 is Wednesday (open)
// Oct 01, 2026 is Thursday (open)
const initialAppointmentsSeed: Appointment[] = [
  // Past appointment (to test auto-filtering out of active list)
  {
    id: "apt-past-01",
    serviceId: "escova",
    serviceName: "Escova Modelada",
    customerName: "Mariana Souza",
    customerPhone: "(11) 98844-1234",
    date: "2026-09-24",
    time: "14:00",
    createdAt: "2026-09-22T10:00:00Z",
    status: "completed",
  },
  // Active today/upcoming
  {
    id: "apt-seed-01",
    serviceId: "escova",
    serviceName: "Escova Modelada",
    customerName: "Camila Ribeiro",
    customerPhone: "(11) 99123-4567",
    date: "2026-09-26",
    time: "10:00",
    createdAt: "2026-09-25T14:30:00Z",
    status: "confirmed",
  },
  {
    id: "apt-seed-02",
    serviceId: "corte-feminino",
    serviceName: "Corte Feminino com Finalização",
    customerName: "Beatriz Helena",
    customerPhone: "(11) 97654-3210",
    date: "2026-09-26",
    time: "15:00",
    createdAt: "2026-09-25T16:00:00Z",
    status: "confirmed",
  },
  {
    id: "apt-seed-03",
    serviceId: "mechas-balayage",
    serviceName: "Mechas & Balayage Iluminada",
    customerName: "Larissa Monteiro",
    customerPhone: "(11) 99876-5432",
    date: "2026-09-29",
    time: "14:00",
    createdAt: "2026-09-25T18:00:00Z",
    status: "confirmed",
  },
  {
    id: "apt-seed-04",
    serviceId: "escova",
    serviceName: "Escova Modelada",
    customerName: "Jeferson Alves",
    customerPhone: "(99) 91710-9030",
    date: "2026-09-30",
    time: "14:00",
    createdAt: "2026-09-26T08:00:00Z",
    status: "confirmed",
  },
  {
    id: "apt-seed-05",
    serviceId: "tratamento-spa-reconstrucao",
    serviceName: "Spa Capilar & Reconstrução Profunda",
    customerName: "Fernanda Costa",
    customerPhone: "(11) 98112-9988",
    date: "2026-10-01",
    time: "11:00",
    createdAt: "2026-09-26T08:15:00Z",
    status: "confirmed",
  },
];

export function getStoredAppointments(): Appointment[] {
  if (typeof window === "undefined") {
    return initialAppointmentsSeed;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAppointmentsSeed));
      return initialAppointmentsSeed;
    }
    return JSON.parse(raw);
  } catch {
    return initialAppointmentsSeed;
  }
}

export function saveAppointment(appointmentData: Omit<Appointment, "id" | "createdAt" | "status">): Appointment {
  const all = getStoredAppointments();
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  const updated = [...all, newAppointment];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newAppointment;
}

export function cancelAppointment(appointmentId: string): void {
  const all = getStoredAppointments();
  const updated = all.map((apt) =>
    apt.id === appointmentId ? { ...apt, status: "cancelled" as const } : apt
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

/**
 * Returns only upcoming active appointments (not cancelled, date + time is in future or today),
 * sorted chronologically (ascending).
 */
export function getUpcomingActiveAppointments(now: Date = new Date()): Appointment[] {
  const all = getStoredAppointments();
  const nowIsoDate = now.toISOString().slice(0, 10);
  const currentHours = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  const nowTime = `${currentHours}:${currentMinutes}`;

  return all
    .filter((apt) => {
      if (apt.status === "cancelled") return false;
      // Date comparison: if appointment date is before today, it's past
      if (apt.date < nowIsoDate) return false;
      // If appointment is today, check if time has already passed
      if (apt.date === nowIsoDate && apt.time < nowTime) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.time.localeCompare(b.time);
    });
}

export interface SlotAvailability {
  time: string;
  isAvailable: boolean;
  reason?: string;
}

/**
 * Checks real-time availability for a given date (YYYY-MM-DD).
 */
export function getAvailabilityForDate(dateStr: string, now: Date = new Date()): {
  isOpen: boolean;
  reason?: string;
  slots: SlotAvailability[];
} {
  // Parse date safely
  const [year, month, day] = dateStr.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day, 12, 0, 0);
  const dayOfWeek = targetDate.getDay();

  const businessDay = salonConfig.hours.find((h) => h.dayOfWeek === dayOfWeek);

  if (!businessDay || !businessDay.isOpen) {
    return {
      isOpen: false,
      reason: "O salão não abre aos domingos e segundas-feiras.",
      slots: [],
    };
  }

  const todayIso = now.toISOString().slice(0, 10);
  if (dateStr < todayIso) {
    return {
      isOpen: false,
      reason: "Não é possível agendar em datas passadas.",
      slots: [],
    };
  }

  const currentHours = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  const nowTime = `${currentHours}:${currentMinutes}`;

  // Find all active appointments on this day
  const stored = getStoredAppointments();
  const bookedTimes = new Set(
    stored
      .filter((apt) => apt.date === dateStr && apt.status !== "cancelled")
      .map((apt) => apt.time)
  );

  const slots: SlotAvailability[] = salonConfig.standardSlots.map((time) => {
    // If today, has this hour already passed?
    const isPastTime = dateStr === todayIso && time <= nowTime;
    const isBooked = bookedTimes.has(time);

    let isAvailable = true;
    let reason: string | undefined;

    if (isPastTime) {
      isAvailable = false;
      reason = "Horário encerrado hoje";
    } else if (isBooked) {
      isAvailable = false;
      reason = "Horário já reservado";
    }

    return {
      time,
      isAvailable,
      reason,
    };
  });

  return {
    isOpen: true,
    slots,
  };
}
