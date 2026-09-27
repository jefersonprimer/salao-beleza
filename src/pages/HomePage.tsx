import React from "react";
import { services } from "../data/services";
import { salonConfig } from "../config/salon";
import { ServiceCard } from "../components/ServiceCard";
import { ImageWithFallback } from "../components/ImageWithFallback";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectServiceAndBook: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectServiceAndBook,
}) => {
  // Take featured/popular services
  const featuredServices = services.filter((s) => s.popular).slice(0, 4);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="pt-8 md:pt-16 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B6560] font-medium">
              <span>{salonConfig.name}</span>
              <span aria-hidden="true">·</span>
              <span>Jardins, São Paulo</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#191716] leading-[1.12] tracking-tight text-balance">
              A arte do cuidado capilar em sua forma mais autêntica e precisa.
            </h1>

            <p className="text-base sm:text-lg text-[#524C46] max-w-xl leading-relaxed">
              Especialistas em cortes visagistas, mechas sob medida e rituais de
              reconstrução profunda. Atendimento exclusivo, com foco na saúde da fibra
              e no seu bem-estar.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate("/reserva")}
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
              >
                Agendar Horário
              </button>

              <button
                onClick={() => onNavigate("/servicos")}
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#191716] border border-[#191716] hover:bg-[#191716]/5 transition-colors whitespace-nowrap cursor-pointer"
              >
                Ver Serviços & Preços
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#6B6560] border-t border-[#E8E5DD]">
              <div>
                <span className="font-semibold text-[#191716]">Horários:</span>{" "}
                {salonConfig.operatingHoursText}
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-[#191716]">Atendimento:</span>{" "}
                Com hora marcada
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EFE9] border border-[#E8E5DD] shadow-sm">
              <ImageWithFallback
                src="/src/assets/images/hero_salon_editorial_1790437952827.jpg"
                alt="Interior do Ateliê Beleza Urbana em São Paulo"
                fallbackTitle="Beleza Urbana"
                fallbackSubtitle="Studio & Hair"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About / Brand Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-8 md:p-14">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#6B6560] font-medium">
              Sobre o Ateliê
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191716] leading-tight text-balance">
              Uma abordagem personalizada, onde a sua identidade é o ponto de partida.
            </h2>
            <p className="text-base text-[#4A4540] leading-relaxed">
              No Beleza Urbana, acreditamos que cabelo bonito é sinônimo de cabelo saudável.
              Nossa equipe alia formação técnica rigorosa em academias internacionais a
              um ambiente tranquilo e intimista, livre de pressa.
            </p>
          </div>

          {/* 3 Pillars - Clean typography without icon clutter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-[#E8E5DD]">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
                01. Diagnóstico Personalizado
              </span>
              <h3 className="font-serif text-xl text-[#191716]">Visagismo & Escuta Ativa</h3>
              <p className="text-sm text-[#524C46] leading-relaxed">
                Antes de qualquer tesoura ou pincel, analisamos a rotina, o biotipo e
                a textura natural para um resultado harmônico e prático de manter.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
                02. Fórmulas de Alta Pureza
              </span>
              <h3 className="font-serif text-xl text-[#191716]">Proteção & Restauração</h3>
              <p className="text-sm text-[#524C46] leading-relaxed">
                Trabalhamos exclusivamente com colorações de baixo impacto oxidativo e
                ativos biofuncionais que tratam enquanto transformam.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
                03. Pontualidade & Conforto
              </span>
              <h3 className="font-serif text-xl text-[#191716]">Tempo Respeitado</h3>
              <p className="text-sm text-[#524C46] leading-relaxed">
                Agenda controlada sem sobreposição de clientes, garantindo atenção
                integral do início ao fim do seu procedimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#6B6560] font-medium">
              Serviços em Destaque
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191716]">
              Cuidado especializado para cada necessidade
            </h2>
            <p className="text-sm sm:text-base text-[#524C46] max-w-xl">
              Confira os procedimentos mais procurados em nosso espaço. Todos os valores
              e condições são transparentes.
            </p>
          </div>

          <button
            onClick={() => onNavigate("/servicos")}
            className="self-start md:self-end text-xs font-semibold uppercase tracking-wider text-[#191716] border-b border-[#191716] pb-1 hover:opacity-70 transition-opacity cursor-pointer whitespace-nowrap"
          >
            Ver todos os serviços &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={onSelectServiceAndBook}
              showImage={true}
            />
          ))}
        </div>
      </section>

      {/* Salon Experience & Ambience Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F3F1EC] border border-[#E8E5DD] p-8 md:p-12">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#6B6560] font-medium">
              Experiência no Salão
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191716] leading-tight">
              Um refúgio de tranquilidade no coração de São Paulo.
            </h2>
            <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
              Projetamos o espaço com iluminação natural filtrada, acabamentos em
              pedra e madeira nobre, além de bancadas amplas e isoladas. Você desfruta
              de café especial, seleção de chás e silêncio ou música ambiente suave
              durante seu momento de autocuidado.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate("/reserva")}
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
              >
                Reserve sua Experiência
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] bg-[#E8E5DD] overflow-hidden">
              <ImageWithFallback
                src="/src/assets/images/service_hair_color_1790437974512.jpg"
                alt="Coloração e mechas no Beleza Urbana"
                fallbackTitle="Coloração"
                fallbackSubtitle="Mechas & Balayage"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] bg-[#E8E5DD] overflow-hidden">
              <ImageWithFallback
                src="/src/assets/images/service_treatment_spa_1790437984622.jpg"
                alt="Spa do couro cabeludo no Beleza Urbana"
                fallbackTitle="Terapia Capilar"
                fallbackSubtitle="Spa do Couro"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Attributable Client Testimonials */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#6B6560] font-medium">
            Depoimentos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#191716]">
            A experiência contada por quem confia em nós
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-7 flex flex-col justify-between">
            <p className="text-sm text-[#4A4540] italic leading-relaxed mb-6">
              "O atendimento com visagismo fez toda a diferença. O corte valorizou o
              movimento natural do meu cabelo sem eu precisar passar horas modelando
              em casa."
            </p>
            <div className="border-t border-[#E8E5DD] pt-4 text-xs">
              <span className="font-semibold text-[#191716] block">Mariana Silveira</span>
              <span className="text-[#8C867E]">Corte Feminino com Finalização · Cliente há 2 anos</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-7 flex flex-col justify-between">
            <p className="text-sm text-[#4A4540] italic leading-relaxed mb-6">
              "Fiz as mechas iluminadas com eles e a saúde do meu fio permaneceu
              impecável. O teste de mecha antes dá uma segurança ímpar."
            </p>
            <div className="border-t border-[#E8E5DD] pt-4 text-xs">
              <span className="font-semibold text-[#191716] block">Beatriz Ramos</span>
              <span className="text-[#8C867E]">Balayage Iluminada & Spa Capilar</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-7 flex flex-col justify-between">
            <p className="text-sm text-[#4A4540] italic leading-relaxed mb-6">
              "Pontualidade britânica e um ambiente acolhedor. Agendar pelo WhatsApp é
              super rápido e a confirmação é imediata."
            </p>
            <div className="border-t border-[#E8E5DD] pt-4 text-xs">
              <span className="font-semibold text-[#191716] block">Juliana Esteves</span>
              <span className="text-[#8C867E]">Escova Modelada Recorrente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Booking CTA Banner */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#191716] text-[#FAF9F5] p-8 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#9E7B54] font-medium">
              Agendamento Fácil
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
              Pronta para renovar o visual com profissionais dedicados?
            </h2>
            <p className="text-sm sm:text-base text-[#A39E96] leading-relaxed">
              Selecione o serviço desejado, confira a disponibilidade em tempo real e
              confirme seu horário diretamente pelo WhatsApp oficial do salão.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => onNavigate("/reserva")}
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#191716] bg-[#FAF9F5] hover:bg-[#E8E5DD] transition-colors whitespace-nowrap cursor-pointer text-center"
            >
              Iniciar Agendamento
            </button>
            <a
              href={`https://wa.me/${salonConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] border border-[#524C46] hover:bg-[#2A2725] transition-colors whitespace-nowrap text-center"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
