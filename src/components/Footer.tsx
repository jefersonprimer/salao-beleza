import React from "react";
import { salonConfig } from "../config/salon";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#191716] text-[#FAF9F5] border-t border-[#2A2725] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#2E2A27]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-tight block">
              {salonConfig.name}
            </span>
            <p className="text-sm text-[#A39E96] max-w-sm leading-relaxed">
              {salonConfig.tagline}
            </p>
            <div className="pt-2 text-xs text-[#8C867E]">
              Fale com o salão pelo WhatsApp para consultar serviços e agendar.
            </div>
          </div>

          {/* Practical Info Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF9F5]/70">
              Localização & Horários
            </h4>
            <address className="not-italic text-sm text-[#A39E96] space-y-1.5 leading-relaxed">
              <p>Endereço e localização</p>
              <p>Consulte pelo WhatsApp</p>
              <p className="pt-2 text-[#FAF9F5] font-medium">{salonConfig.operatingHoursText}</p>
              <p className="text-xs text-[#8C867E]">Horários sujeitos a confirmação</p>
            </address>
          </div>

          {/* Quick links & Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF9F5]/70">
              Atendimento
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-[#A39E96]">
              <a
                href={`https://wa.me/${salonConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAF9F5] transition-colors"
              >
                WhatsApp: {salonConfig.whatsappFormatted}
              </a>
              <button
                onClick={() => onNavigate("/servicos")}
                className="text-left hover:text-[#FAF9F5] transition-colors cursor-pointer"
              >
                Tabela de Serviços & Valores
              </button>
              <button
                onClick={() => onNavigate("/reserva")}
                className="text-left hover:text-[#FAF9F5] transition-colors cursor-pointer"
              >
                Agendamento Online
              </button>
              <button
                onClick={() => onNavigate("/agendamentos")}
                className="text-left hover:text-[#FAF9F5] transition-colors cursor-pointer"
              >
                Consultar Meus Agendamentos
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C867E] gap-4">
          <p>© {new Date().getFullYear()} {salonConfig.name}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>{salonConfig.instagram}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
