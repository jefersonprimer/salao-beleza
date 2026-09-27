import React, { useState, useMemo } from "react";
import { services, getServiceById, Service } from "../data/services";
import {
  getAvailabilityForDate,
  saveAppointment,
} from "../data/appointments";
import { salonConfig, buildWhatsAppUrl } from "../config/salon";
import {
  formatDateBr,
  formatDateLongBr,
  formatWeekdayBr,
  maskPhoneBr,
} from "../utils/formatters";

interface BookingPageProps {
  initialServiceId?: string;
  onNavigate: (path: string) => void;
  onBookingComplete?: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  onNavigate,
  onBookingComplete,
}) => {
  // Step: 1 (Service), 2 (Date), 3 (Time), 4 (Customer Info), 5 (Summary & Confirm)
  const [currentStep, setCurrentStep] = useState<number>(
    initialServiceId ? 2 : 1
  );

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || (services[0]?.id ?? "")
  );

  // Default to today or next open day
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(() => today.toISOString().slice(0, 10), [today]);

  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Customer form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [isConfirmed, setIsConfirmed] = useState(false);

  // Selected service object
  const selectedService: Service | undefined = useMemo(() => {
    return getServiceById(selectedServiceId) || services[0];
  }, [selectedServiceId]);

  // Compute 21 days window from today
  const availableDates = useMemo(() => {
    const list = [];
    const base = new Date();
    for (let i = 0; i < 21; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const dayOfWeek = d.getDay();
      const isClosed = dayOfWeek === 0 || dayOfWeek === 1; // Sun/Mon closed
      list.push({
        iso,
        dateObj: d,
        dayNumber: d.getDate(),
        weekdayShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][dayOfWeek],
        monthShort: [
          "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
          "Jul", "Ago", "Set", "Out", "Nov", "Dez",
        ][d.getMonth()],
        isClosed,
      });
    }
    return list;
  }, []);

  // Compute real-time availability for selected date
  const dayAvailability = useMemo(() => {
    return getAvailabilityForDate(selectedDate);
  }, [selectedDate, isConfirmed]);

  // Validate Step 4 Form
  const validateCustomerInfo = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) {
      errors.name = "Por favor, informe seu nome completo.";
    } else if (customerName.trim().length < 3) {
      errors.name = "Nome muito curto.";
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone) {
      errors.phone = "Por favor, informe seu WhatsApp para confirmação.";
    } else if (cleanPhone.length < 10) {
      errors.phone = "Número incompleto (mínimo 10 dígitos com DDD).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhoneBr(e.target.value);
    setCustomerPhone(masked);
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
    if (formErrors.name) {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleConfirmAndRedirect = () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerName.trim()) {
      return;
    }

    // Save appointment into local/persistent mock repository
    saveAppointment({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date: selectedDate,
      time: selectedTime,
      notes: customerNotes.trim() || undefined,
    });

    setIsConfirmed(true);

    if (onBookingComplete) {
      onBookingComplete();
    }

    // Build official pre-filled WhatsApp URL
    const whatsappUrl = buildWhatsAppUrl({
      serviceName: selectedService.name,
      dateStr: formatDateBr(selectedDate),
      timeStr: selectedTime,
      customerName: customerName.trim(),
      notes: customerNotes.trim(),
    });

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B6560] font-medium">
          <span>{salonConfig.name}</span>
          <span aria-hidden="true">·</span>
          <span>Reserva Online</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#191716] tracking-tight">
          Agendamento de Atendimento
        </h1>

        <p className="text-sm sm:text-base text-[#524C46]">
          Selecione o procedimento, escolha a data e o horário disponível em tempo real
          e confirme diretamente no WhatsApp do ateliê.
        </p>
      </div>

      {/* Progress Steps Header */}
      <nav aria-label="Etapas do agendamento" className="border-b border-[#E8E5DD] pb-4">
        <div className="flex items-center justify-between text-xs font-medium text-[#6B6560] overflow-x-auto gap-4">
          {[
            { step: 1, label: "1. Serviço" },
            { step: 2, label: "2. Data" },
            { step: 3, label: "3. Horário" },
            { step: 4, label: "4. Dados" },
            { step: 5, label: "5. Confirmação" },
          ].map((item) => {
            const isActive = currentStep === item.step;
            const isCompleted = currentStep > item.step;
            return (
              <button
                key={item.step}
                onClick={() => {
                  if (item.step < currentStep) {
                    setCurrentStep(item.step);
                  }
                }}
                disabled={item.step > currentStep}
                className={`whitespace-nowrap transition-colors pb-1 cursor-pointer disabled:cursor-not-allowed ${
                  isActive
                    ? "text-[#191716] font-semibold border-b-2 border-[#191716]"
                    : isCompleted
                    ? "text-[#191716] hover:underline"
                    : "text-[#B3ADA5]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* STEP 1: Select Service */}
      {currentStep === 1 && (
        <section aria-labelledby="step-service-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="step-service-heading" className="font-serif text-2xl text-[#191716]">
              Passo 1 — Selecione o Serviço
            </h2>
            <span className="text-xs text-[#6B6560]">
              {services.length} opções disponíveis
            </span>
          </div>

          <div className="space-y-3">
            {services.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? "border-[#191716] bg-[#FFFFFF] shadow-xs"
                      : "border-[#E8E5DD] bg-[#FFFFFF] hover:border-[#C4BFAF]"
                  }`}
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6560] font-medium">
                      <span>{service.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.durationLabel}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#191716]">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#524C46] leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8E5DD]">
                    <span className="text-sm font-semibold text-[#191716] tabular-nums">
                      {service.priceLabel}
                    </span>
                    <span
                      className={`text-xs mt-1 font-medium ${
                        isSelected ? "text-[#191716] font-semibold" : "text-[#8C867E]"
                      }`}
                    >
                      {isSelected ? "✓ Selecionado" : "Selecionar"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!selectedServiceId}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors disabled:opacity-50 cursor-pointer"
            >
              Avançar para Escolha da Data &rarr;
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: Select Date */}
      {currentStep === 2 && (
        <section aria-labelledby="step-date-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="step-date-heading" className="font-serif text-2xl text-[#191716]">
                Passo 2 — Escolha a Data
              </h2>
              <p className="text-xs text-[#6B6560] mt-1">
                Serviço selecionado:{" "}
                <span className="font-medium text-[#191716]">
                  {selectedService?.name}
                </span>{" "}
                ({selectedService?.durationLabel})
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-[#6B6560] underline hover:text-[#191716]"
            >
              Trocar serviço
            </button>
          </div>

          {/* Date Slider / Carousel Cards */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {availableDates.map((d) => {
              const isSelected = selectedDate === d.iso;
              const isToday = d.iso === todayIso;

              if (d.isClosed) {
                return (
                  <div
                    key={d.iso}
                    className="p-3 bg-[#F5F3ED] border border-[#E8E5DD] text-center opacity-45 cursor-not-allowed select-none"
                    title="Fechado aos domingos e segundas"
                  >
                    <span className="text-[11px] block uppercase text-[#8C867E]">
                      {d.weekdayShort}
                    </span>
                    <span className="text-lg font-serif text-[#8C867E] block my-0.5">
                      {d.dayNumber}
                    </span>
                    <span className="text-[10px] text-[#8C867E] block">
                      Fechado
                    </span>
                  </div>
                );
              }

              return (
                <button
                  key={d.iso}
                  onClick={() => setSelectedDate(d.iso)}
                  className={`p-3 border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#191716] bg-[#191716] text-[#FAF9F5] shadow-xs"
                      : "border-[#E8E5DD] bg-white text-[#191716] hover:border-[#191716]"
                  }`}
                >
                  <span
                    className={`text-[11px] block uppercase ${
                      isSelected ? "text-[#D8D4CA]" : "text-[#6B6560]"
                    }`}
                  >
                    {d.weekdayShort}
                  </span>
                  <span className="text-xl font-serif block my-0.5 tabular-nums">
                    {d.dayNumber}
                  </span>
                  <span
                    className={`text-[10px] block ${
                      isSelected ? "text-[#FAF9F5]" : isToday ? "text-[#9E7B54] font-medium" : "text-[#8C867E]"
                    }`}
                  >
                    {isToday ? "Hoje" : d.monthShort}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-4 text-xs text-[#524C46] flex items-center justify-between">
            <span>
              Data selecionada:{" "}
              <strong className="text-[#191716]">
                {formatDateLongBr(selectedDate)} ({formatWeekdayBr(selectedDate)})
              </strong>
            </span>
            <span className="text-[#6B6560]">
              Atendimento das 09h às 19h
            </span>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#191716]"
            >
              &larr; Voltar ao Serviço
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors cursor-pointer"
            >
              Avançar para Escolha de Horário &rarr;
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: Select Time (Real-Time Availability) */}
      {currentStep === 3 && (
        <section aria-labelledby="step-time-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="step-time-heading" className="font-serif text-2xl text-[#191716]">
                Passo 3 — Horários Disponíveis
              </h2>
              <p className="text-xs text-[#6B6560] mt-1">
                Para{" "}
                <span className="font-medium text-[#191716]">
                  {formatDateLongBr(selectedDate)} ({formatWeekdayBr(selectedDate)})
                </span>
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-[#6B6560] underline hover:text-[#191716]"
            >
              Alterar data
            </button>
          </div>

          {/* Availability Status Notification */}
          {!dayAvailability.isOpen ? (
            <div className="bg-[#F5F3ED] border border-[#E8E5DD] p-8 text-center space-y-3">
              <p className="font-serif text-xl text-[#191716]">
                Salão Fechado Nesta Data
              </p>
              <p className="text-sm text-[#6B6560]">
                {dayAvailability.reason || "Não há atendimentos disponíveis para esta data."}
              </p>
              <button
                onClick={() => setCurrentStep(2)}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#191716] border-b border-[#191716] pb-0.5"
              >
                Escolher outro dia
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {dayAvailability.slots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  if (!slot.isAvailable) {
                    return (
                      <div
                        key={slot.time}
                        className="p-3.5 border border-[#E8E5DD] bg-[#F5F3ED] opacity-45 cursor-not-allowed flex flex-col justify-between text-left"
                      >
                        <span className="text-sm font-semibold text-[#8C867E] tabular-nums">
                          {slot.time}
                        </span>
                        <span className="text-[11px] text-[#8C867E] mt-1">
                          {slot.reason || "Indisponível"}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3.5 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-[#191716] bg-[#191716] text-[#FAF9F5] shadow-xs"
                          : "border-[#E8E5DD] bg-white text-[#191716] hover:border-[#191716]"
                      }`}
                    >
                      <span className="text-base font-semibold tabular-nums">
                        {slot.time}
                      </span>
                      <span
                        className={`text-[11px] mt-1 ${
                          isSelected ? "text-[#D8D4CA]" : "text-[#9E7B54]"
                        }`}
                      >
                        Disponível
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-4 text-xs text-[#524C46] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[#9E7B54]">
                    <span className="w-2 h-2 rounded-full bg-[#9E7B54]" />
                    Horário livre
                  </span>
                  <span className="flex items-center gap-1.5 text-[#8C867E]">
                    <span className="w-2 h-2 rounded-full bg-[#B3ADA5]" />
                    Já reservado
                  </span>
                </div>
                {selectedTime && (
                  <span className="font-medium text-[#191716]">
                    Horário escolhido: {selectedTime}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#191716]"
            >
              &larr; Voltar à Data
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              disabled={!selectedTime}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors disabled:opacity-50 cursor-pointer"
            >
              Avançar para Seus Dados &rarr;
            </button>
          </div>
        </section>
      )}

      {/* STEP 4: Customer Information */}
      {currentStep === 4 && (
        <section aria-labelledby="step-info-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="step-info-heading" className="font-serif text-2xl text-[#191716]">
              Passo 4 — Seus Dados para Contato
            </h2>
            <span className="text-xs text-[#6B6560]">
              Mínimo necessário para o agendamento
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-6 sm:p-8 space-y-5">
            <div>
              <label
                htmlFor="customer-name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#191716] mb-2"
              >
                Nome Completo *
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="Ex: Jeferson Alves"
                value={customerName}
                onChange={handleNameChange}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  formErrors.name ? "border-red-500" : "border-[#E8E5DD]"
                } focus:outline-none focus:border-[#191716] text-[#191716] placeholder-[#8C867E]`}
              />
              {formErrors.name && (
                <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="customer-phone"
                className="block text-xs font-semibold uppercase tracking-wider text-[#191716] mb-2"
              >
                WhatsApp com DDD *
              </label>
              <input
                id="customer-phone"
                type="tel"
                placeholder="(11) 98765-4321"
                value={customerPhone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  formErrors.phone ? "border-red-500" : "border-[#E8E5DD]"
                } focus:outline-none focus:border-[#191716] text-[#191716] placeholder-[#8C867E]`}
              />
              {formErrors.phone && (
                <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
              )}
              <p className="text-[11px] text-[#8C867E] mt-1">
                Usaremos para enviar o link direto de confirmação e lembretes da sessão.
              </p>
            </div>

            <div>
              <label
                htmlFor="customer-notes"
                className="block text-xs font-semibold uppercase tracking-wider text-[#191716] mb-2"
              >
                Observação sobre o Cabelo (Opcional)
              </label>
              <textarea
                id="customer-notes"
                rows={2}
                placeholder="Ex: Cabelo volumoso, possui química recente, pretendo clarear..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E8E5DD] focus:outline-none focus:border-[#191716] text-[#191716] placeholder-[#8C867E]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#191716]"
            >
              &larr; Voltar ao Horário
            </button>
            <button
              onClick={() => {
                if (validateCustomerInfo()) {
                  setCurrentStep(5);
                }
              }}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors cursor-pointer"
            >
              Revisar Agendamento &rarr;
            </button>
          </div>
        </section>
      )}

      {/* STEP 5: Summary & Confirm via WhatsApp */}
      {currentStep === 5 && (
        <section aria-labelledby="step-summary-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="step-summary-heading" className="font-serif text-2xl text-[#191716]">
              Passo 5 — Resumo do Agendamento
            </h2>
            <button
              onClick={() => setCurrentStep(4)}
              className="text-xs text-[#6B6560] underline hover:text-[#191716]"
            >
              Editar dados
            </button>
          </div>

          {/* Clean Editorial Summary Card */}
          <div className="bg-[#FFFFFF] border border-[#191716] p-7 sm:p-9 space-y-6">
            <div className="border-b border-[#E8E5DD] pb-5">
              <span className="text-xs uppercase tracking-widest text-[#9E7B54] font-medium block mb-1">
                Confirmação de Reserva
              </span>
              <h3 className="font-serif text-2xl text-[#191716]">
                {selectedService?.name}
              </h3>
              <p className="text-xs text-[#6B6560] mt-1">
                Categoria: {selectedService?.category} · Duração estimada: {selectedService?.durationLabel}
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                  Data Selecionada
                </dt>
                <dd className="font-semibold text-[#191716] mt-0.5">
                  {formatDateLongBr(selectedDate)} ({formatWeekdayBr(selectedDate)})
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                  Horário
                </dt>
                <dd className="font-semibold text-[#191716] mt-0.5 tabular-nums">
                  {selectedTime}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                  Cliente
                </dt>
                <dd className="font-semibold text-[#191716] mt-0.5">
                  {customerName}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                  WhatsApp de Contato
                </dt>
                <dd className="font-semibold text-[#191716] mt-0.5 tabular-nums">
                  {customerPhone}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                  Valor do Procedimento
                </dt>
                <dd className="font-semibold text-[#191716] mt-0.5">
                  {selectedService?.priceLabel}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                  Localização
                </dt>
                <dd className="text-[#524C46] mt-0.5 text-xs">
                  {salonConfig.address.full}
                </dd>
              </div>

              {customerNotes && (
                <div className="sm:col-span-2 pt-2 border-t border-[#E8E5DD]">
                  <dt className="text-xs uppercase tracking-wider text-[#8C867E]">
                    Observação
                  </dt>
                  <dd className="text-xs text-[#524C46] mt-0.5 italic">
                    "{customerNotes}"
                  </dd>
                </div>
              )}
            </dl>

            <div className="pt-4 border-t border-[#E8E5DD] bg-[#FAF9F5] p-4 text-xs text-[#524C46] space-y-1">
              <strong className="text-[#191716] block">
                Como funciona a confirmação?
              </strong>
              <p>
                Ao clicar no botão abaixo, sua mensagem pré-formatada será aberta no WhatsApp
                oficial do Beleza Urbana (<strong>{salonConfig.whatsappFormatted}</strong>).
                Nossa recepção valida os detalhes e finaliza a inclusão em instantes.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleConfirmAndRedirect}
              className="w-full py-4 text-sm font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-sm"
            >
              <span>Confirmar via WhatsApp</span>
              <svg className="w-5 h-5 text-[#FAF9F5]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.531 1.769.78 2.796.78 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.766-5.767-5.766zm3.374 8.204c-.14.394-.711.724-1.013.771-.284.043-.654.062-1.076-.073-.257-.082-.589-.193-.997-.369-1.748-.755-2.883-2.525-2.971-2.642-.088-.117-.714-.95-.714-1.81 0-.86.449-1.282.609-1.458.16-.176.349-.22.466-.22.116 0 .233.001.335.006.108.005.253-.041.395.3.146.352.497 1.213.541 1.301.044.088.073.191.015.308-.059.117-.088.19-.175.293-.088.103-.186.23-.266.309-.092.091-.188.19-.081.373.107.183.477.787 1.025 1.275.706.629 1.302.823 1.488.915.186.092.296.079.406-.047.11-.126.471-.548.597-.735.126-.188.252-.157.423-.094.172.063 1.09.514 1.277.607.187.094.312.14.358.219.046.079.046.458-.094.852z" />
              </svg>
            </button>

            {isConfirmed && (
              <div className="bg-[#FAF9F5] border border-[#191716] p-4 text-xs text-[#191716] text-center space-y-2">
                <p className="font-semibold">
                  ✓ Agendamento salvo com sucesso!
                </p>
                <p className="text-[#6B6560]">
                  Caso o WhatsApp não tenha aberto automaticamente, verifique a permissão
                  de pop-ups ou acesse diretamente pelos seus agendamentos.
                </p>
                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={() => onNavigate("/agendamentos")}
                    className="font-semibold underline cursor-pointer"
                  >
                    Ver Meus Agendamentos
                  </button>
                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      setCurrentStep(1);
                    }}
                    className="text-[#6B6560] hover:underline cursor-pointer"
                  >
                    Fazer Novo Agendamento
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
