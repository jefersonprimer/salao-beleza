import React from "react";
import { salonConfig } from "../config/salon";
import { ImageWithFallback } from "../components/ImageWithFallback";

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-16">
      {/* Editorial Intro */}
      <div className="max-w-3xl space-y-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B6560] font-medium">
          <span>{salonConfig.name}</span>
          <span aria-hidden="true">·</span>
          <span>Manifesto & Conceito</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-[#191716] tracking-tight">
          Cuidado Capilar como Rito de Autocuidado & Precisão
        </h1>

        <p className="text-base sm:text-lg text-[#524C46] leading-relaxed">
          Fundado com a proposta de resgatar o atendimento minucioso e autoral,
          o Beleza Urbana combina alta técnica de visagismo com um ambiente sereno,
          onde o tempo é respeitado e a individualidade de cada cliente celebrada.
        </p>
      </div>

      {/* Split image & text */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 aspect-[16/10] bg-[#F2EFE9] border border-[#E8E5DD] overflow-hidden">
          <ImageWithFallback
            src="/src/assets/images/hero_salon_editorial_1790437952827.jpg"
            alt="Ateliê Beleza Urbana nos Jardins"
            fallbackTitle="Beleza Urbana"
            fallbackSubtitle="Espaço & Ateliê"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="border-l-2 border-[#191716] pl-4">
            <h2 className="font-serif text-2xl text-[#191716]">
              "A beleza verdadeira não precisa de artifícios pesados, apenas de harmonia e saúde."
            </h2>
          </div>

          <p className="text-sm text-[#524C46] leading-relaxed">
            Nosso espaço foi desenhado nos Jardins para acolher sem excesso de ruídos.
            Aqui, cada cadeira conta com espaço generoso e iluminação pensada para que
            as nuances de cor sejam vistas exatamente como na luz do dia.
          </p>

          <p className="text-sm text-[#524C46] leading-relaxed">
            Utilizamos apenas produtos de renome internacional com ativos biocompatíveis,
            respeitando a barreira hidrolipídica e evitando danos cumulativos aos fios.
          </p>
        </div>
      </div>

      {/* Differentials List */}
      <div className="bg-[#FFFFFF] border border-[#E8E5DD] p-8 md:p-12">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#191716] mb-8">
          Nossos Compromissos Técnicos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
              Protocolo Hospitalar
            </span>
            <h4 className="font-serif text-xl text-[#191716]">Biossegurança Cirúrgica</h4>
            <p className="text-[#524C46] leading-relaxed">
              Todos os instrumentos de metal passam por esterilização em autoclave
              hospitalar com laudo semanal e envelopes selados individualmente.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
              Colorimetria Avançada
            </span>
            <h4 className="font-serif text-xl text-[#191716]">Preservação da Fibra</h4>
            <p className="text-[#524C46] leading-relaxed">
              Descolorações acompanhadas de medidores de pH e teste de mecha obrigatório.
              Garantimos integridade e brilho pós-química sem surpresas.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E7B54]">
              Hospitalidade
            </span>
            <h4 className="font-serif text-xl text-[#191716]">Café & Silêncio</h4>
            <p className="text-[#524C46] leading-relaxed">
              Menu de cafés artesanais moídos na hora, chás botânicos selecionados e
              bancadas de trabalho discretas para quem precisa trabalhar ou relaxar.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Visit Card */}
      <div className="bg-[#F3F1EC] border border-[#E8E5DD] p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#6B6560] font-medium">
            Venha nos Conhecer
          </span>
          <h4 className="font-serif text-2xl text-[#191716]">
            {salonConfig.address.full}
          </h4>
          <p className="text-xs text-[#524C46]">
            {salonConfig.operatingHoursText} · Estacionamento com manobrista no local.
          </p>
        </div>

        <button
          onClick={() => onNavigate("/reserva")}
          className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
        >
          Agendar Atendimento
        </button>
      </div>
    </div>
  );
};
