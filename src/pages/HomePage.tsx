import React from "react";
import { services } from "../data/services";
import { salonConfig } from "../config/salon";
import { ServiceCard } from "../components/ServiceCard";
import { ImageWithFallback } from "../components/ImageWithFallback";
import portfolio0 from "../assets/images/instagram-portfolio-0.jpg";
import portfolio01 from "../assets/images/instagram-portfolio-01.jpg";
import portfolio02 from "../assets/images/instagram-portfolio-02.jpg";
import portfolio1 from "../assets/images/instagram-portfolio-1.webp";
import portfolio2 from "../assets/images/instagram-portfolio-2.webp";
import portfolio3 from "../assets/images/instagram-portfolio-3.webp";

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
              <span>Frederico Westphalen · RS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#191716] leading-[1.12] tracking-tight text-balance">
              Sua beleza em destaque no seu dia inesquecível!
            </h1>

            <p className="text-base sm:text-lg text-[#524C46] max-w-xl leading-relaxed">
              Maquiagem social embelezadora, produções para noivas, penteados e sobrancelhas. Agende seu horário em Frederico Westphalen.
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
                Atendimento com agendamento
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EFE9] border border-[#E8E5DD] shadow-sm">
              <ImageWithFallback
                src={portfolio0}
                alt="Mari, maquiagem e penteado"
                fallbackTitle="Mari"
                fallbackSubtitle="Maquiagem & Penteado"
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
              Mari | Maquiagem e Penteado
            </h2>
            <p className="text-base text-[#4A4540] leading-relaxed">
              Especialista em maquiagem social embelezadora e noivas, com atendimento de penteado e sobrancelha. Consulte valores e disponibilidade pelo WhatsApp.
            </p>
          </div>

          {/* 3 Pillars - Clean typography without icon clutter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-[#E8E5DD]">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
                01. Maquiagem
              </span>
              <h3 className="font-serif text-xl text-[#191716]">Social & Noivas</h3>
              <p className="text-sm text-[#524C46] leading-relaxed">
                Maquiagem social embelezadora para ocasiões especiais e para o seu dia inesquecível.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
                02. Penteado
              </span>
              <h3 className="font-serif text-xl text-[#191716]">Produção para ocasiões especiais</h3>
              <p className="text-sm text-[#524C46] leading-relaxed">
                Consulte opções e disponibilidade ao solicitar seu horário pelo WhatsApp.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
                03. Sobrancelha
              </span>
              <h3 className="font-serif text-xl text-[#191716]">Consulte os serviços</h3>
              <p className="text-sm text-[#524C46] leading-relaxed">
                Fale com a Mari para saber quais atendimentos estão disponíveis e seus valores.
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
              Escolha um serviço e envie sua preferência de dia e horário pelo WhatsApp.
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
              showImage={false}
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
              Encontre a Mari em Frederico Westphalen.
            </h2>
            <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
              R. Alfredo Haubert, 788 · Frederico Westphalen - RS · CEP 98400-000. Consulte horários pelo WhatsApp.
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
                src={portfolio1}
                alt="Maquiagem para ocasiões especiais"
                fallbackTitle="Maquiagem"
                fallbackSubtitle="Social & Noivas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] bg-[#E8E5DD] overflow-hidden">
              <ImageWithFallback
                src={portfolio2}
                alt="Penteado para ocasiões especiais"
                fallbackTitle="Penteado"
                fallbackSubtitle="Para seu dia especial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Official profile link */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#6B6560] font-medium">
            Instagram
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#191716]">
            Veja os trabalhos da Mari
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: portfolio01, alt: "Produção de maquiagem e penteado para festa" },
            { src: portfolio02, alt: "Maquiagem social em cliente do salão" },
            { src: portfolio3, alt: "Maquiagem de noiva durante a preparação" },
          ].map((photo) => (
            <a key={photo.src} href={salonConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="block aspect-[4/5] overflow-hidden bg-[#F2EFE9]">
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" />
            </a>
          ))}
        </div>
        <a href={salonConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="block text-center border border-[#E8E5DD] bg-white p-5 text-sm font-semibold text-[#191716] hover:bg-[#F3F1EC]">Ver mais trabalhos no Instagram ↗</a>
      </section>

      {/* Location & Booking CTA Banner */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#191716] text-[#FAF9F5] p-8 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#9E7B54] font-medium">
              Agendamento Fácil
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
              Prepare-se para o seu dia especial.
            </h2>
            <p className="text-sm sm:text-base text-[#A39E96] leading-relaxed">
              Envie o serviço, dia e horário desejados. A Mari confirma a disponibilidade pelo WhatsApp.
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
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
