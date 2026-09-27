import React, { useState, useEffect } from "react";
import {
  Appointment,
  getUpcomingActiveAppointments,
  getStoredAppointments,
  cancelAppointment,
} from "../data/appointments";
import { salonConfig, buildWhatsAppUrl } from "../config/salon";
import {
  formatDateBr,
  formatDateLongBr,
  formatWeekdayBr,
} from "../utils/formatters";

interface AppointmentsPageProps {
  onNavigate: (path: string) => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  onNavigate,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showPastHistory, setShowPastHistory] = useState(false);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const refreshList = () => {
    const upcoming = getUpcomingActiveAppointments();
    setAppointments(upcoming);
    setAllAppointments(getStoredAppointments());
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleCancel = (aptId: string, customerName: string) => {
    if (
      window.confirm(
        `Deseja realmente cancelar o agendamento de ${customerName}?`
      )
    ) {
      cancelAppointment(aptId);
      refreshList();
      setActionNotice("Agendamento cancelado com sucesso.");
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  const handleOpenWhatsApp = (apt: Appointment) => {
    const url = buildWhatsAppUrl({
      serviceName: apt.serviceName,
      dateStr: formatDateBr(apt.date),
      timeStr: apt.time,
      customerName: apt.customerName,
      notes: apt.notes,
    });
    window.open(url, "_blank");
  };

  // Group upcoming appointments by date
  const groupedByDate = appointments.reduce((acc, apt) => {
    if (!acc[apt.date]) {
      acc[apt.date] = [];
    }
    acc[apt.date].push(apt);
    return acc;
  }, {} as { [date: string]: Appointment[] });

  const sortedDates = Object.keys(groupedByDate).sort();

  // Past/archived list for optional historical review
  const todayIso = new Date().toISOString().slice(0, 10);
  const pastAppointments = allAppointments.filter(
    (apt) => apt.date < todayIso || apt.status === "cancelled"
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B6560] font-medium">
            <span>{salonConfig.name}</span>
            <span aria-hidden="true">·</span>
            <span>Gestão de Horários</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#191716] tracking-tight">
            Próximos Agendamentos
          </h1>

          <p className="text-sm text-[#524C46] max-w-xl">
            Lista organizada cronologicamente com as sessões confirmadas.
            Horários passados são arquivados automaticamente da visão ativa.
          </p>
        </div>

        <button
          onClick={() => onNavigate("/reserva")}
          className="self-start sm:self-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
        >
          Novo Agendamento
        </button>
      </div>

      {actionNotice && (
        <div className="p-4 bg-[#FFFFFF] border border-[#191716] text-xs text-[#191716] font-medium">
          {actionNotice}
        </div>
      )}

      {/* Main Upcoming Appointments List */}
      {sortedDates.length > 0 ? (
        <div className="space-y-8">
          {sortedDates.map((dateStr) => {
            const dayAppointments = groupedByDate[dateStr];
            return (
              <section key={dateStr} className="space-y-3">
                {/* Date header with editorial styling */}
                <div className="flex items-baseline justify-between border-b border-[#191716] pb-2">
                  <h2 className="font-serif text-2xl text-[#191716]">
                    {formatDateLongBr(dateStr)}
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-[#6B6560]">
                    {formatWeekdayBr(dateStr)} · {dayAppointments.length}{" "}
                    {dayAppointments.length === 1 ? "sessão" : "sessões"}
                  </span>
                </div>

                <div className="space-y-3">
                  {dayAppointments.map((apt) => (
                    <article
                      key={apt.id}
                      className="bg-[#FFFFFF] border border-[#E8E5DD] hover:border-[#C4BFAF] transition-all p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        {/* Zero-Pill metadata with separators */}
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6560] font-medium">
                          <span className="font-semibold text-[#191716] tabular-nums text-sm">
                            {apt.time}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>Confirmado</span>
                          <span aria-hidden="true">·</span>
                          <span>Atendimento Presencial</span>
                        </div>

                        <h3 className="font-serif text-xl text-[#191716]">
                          {apt.serviceName}
                        </h3>

                        <div className="text-xs text-[#524C46] flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>
                            Cliente:{" "}
                            <strong className="text-[#191716]">
                              {apt.customerName}
                            </strong>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {apt.customerPhone}
                          </span>
                          {apt.notes && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="italic">"{apt.notes}"</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8E5DD]">
                        <button
                          onClick={() => handleOpenWhatsApp(apt)}
                          className="px-3.5 py-2 text-xs font-medium border border-[#E8E5DD] hover:border-[#191716] text-[#191716] transition-colors whitespace-nowrap cursor-pointer"
                          title="Abrir detalhes no WhatsApp"
                        >
                          Falar no WhatsApp
                        </button>
                        <button
                          onClick={() => handleCancel(apt.id, apt.customerName)}
                          className="px-3 py-2 text-xs text-[#8C867E] hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-12 text-center space-y-4">
          <p className="font-serif text-2xl text-[#191716]">
            Nenhum agendamento futuro no momento
          </p>
          <p className="text-sm text-[#6B6560] max-w-md mx-auto leading-relaxed">
            Todos os horários anteriores foram arquivados automaticamente. Escolha um
            serviço e reserve seu horário em poucos passos.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("/reserva")}
              className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors"
            >
              Agendar Agora
            </button>
          </div>
        </div>
      )}

      {/* Historical / Archive Accordion */}
      <div className="pt-8 border-t border-[#E8E5DD]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowPastHistory(!showPastHistory)}
            className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#191716] font-medium flex items-center gap-2 cursor-pointer"
          >
            <span>{showPastHistory ? "▼ Ocultar Histórico" : "▶ Ver Histórico Arquivado"}</span>
            <span className="text-[11px] text-[#8C867E]">
              ({pastAppointments.length} sessões passadas ou canceladas)
            </span>
          </button>
        </div>

        {showPastHistory && (
          <div className="mt-4 space-y-2">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#FAF9F5] border border-[#E8E5DD] p-3 text-xs flex items-center justify-between text-[#6B6560]"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[#191716]">
                      {formatDateBr(apt.date)} às {apt.time}
                    </span>
                    <span className="mx-2">·</span>
                    <span>{apt.serviceName}</span>
                    <span className="mx-2">·</span>
                    <span>{apt.customerName}</span>
                  </div>
                  <span className="uppercase text-[10px] text-[#8C867E]">
                    {apt.status === "cancelled" ? "Cancelado" : "Concluído"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8C867E] italic py-2">
                Nenhum histórico arquivado.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
