import React, { useState } from "react";
import { services, serviceCategories, ServiceCategory } from "../data/services";
import { ServiceCard } from "../components/ServiceCard";
import { salonConfig } from "../config/salon";

interface ServicesPageProps {
  onSelectServiceAndBook: (serviceId: string) => void;
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectServiceAndBook,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "Todos" || service.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B6560] font-medium">
          <span>{salonConfig.name}</span>
          <span aria-hidden="true">·</span>
          <span>Menu de Procedimentos</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-[#191716] tracking-tight">
          Maquiagem, penteado & sobrancelha
        </h1>

        <p className="text-base text-[#524C46] leading-relaxed">
          Valores aproximados para referência. Confirme o preço final, duração e disponibilidade diretamente com a Mari pelo WhatsApp.
        </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="max-w-md">
          <label htmlFor="service-search" className="sr-only">
            Buscar serviço
          </label>
          <input
            id="service-search"
            type="search"
            placeholder="Buscar por corte, escova, mechas, hidratação..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-white border border-[#E8E5DD] focus:outline-none focus:border-[#191716] text-[#191716] placeholder-[#8C867E]"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {serviceCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#191716] text-[#FAF9F5]"
                    : "bg-[#FFFFFF] border border-[#E8E5DD] text-[#524C46] hover:text-[#191716] hover:border-[#191716]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={onSelectServiceAndBook}
              showImage={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-12 text-center space-y-3">
          <p className="font-serif text-2xl text-[#191716]">
            Nenhum serviço encontrado
          </p>
          <p className="text-sm text-[#6B6560]">
            Tente buscar com outros termos ou selecione outra categoria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Todos");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#191716] border-b border-[#191716] pb-0.5"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Policies & Important Information */}
      <div className="bg-[#F3F1EC] border border-[#E8E5DD] p-8 md:p-10 space-y-6">
        <h3 className="font-serif text-2xl text-[#191716]">
          Informações Importantes & Políticas do Salão
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#524C46] leading-relaxed">
          <div className="space-y-1">
            <strong className="block text-[#191716] font-semibold text-xs uppercase tracking-wider">
              Tolerância de Horário
            </strong>
            <p>
              Para respeitar todos os agendamentos do dia, solicitamos pontualidade.
              A tolerância máxima é de 15 minutos de atraso.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="block text-[#191716] font-semibold text-xs uppercase tracking-wider">
              Teste de Mecha
            </strong>
            <p>
              Procedimentos químicos como descolorações e mechas exigem avaliação
              prévia da resistência da fibra para segurança do seu fio.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="block text-[#191716] font-semibold text-xs uppercase tracking-wider">
              Reagendamento & Cancelamento
            </strong>
            <p>
              Caso necessite alterar seu dia ou horário, pedimos aviso prévio de
              diretamente pelo WhatsApp.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#D8D4CA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#6B6560]">
            Dúvidas sobre qual serviço escolher?
          </span>
          <button
            onClick={() => onNavigate("/reserva")}
            className="text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] px-5 py-2.5 hover:bg-[#2E2A27] transition-colors"
          >
            Agendar Consulta ou Horário
          </button>
        </div>
      </div>
    </div>
  );
};
