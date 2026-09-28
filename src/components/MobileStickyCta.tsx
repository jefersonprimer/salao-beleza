import React from "react";

interface MobileStickyCtaProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({
  currentPath,
  onNavigate,
}) => {
  // Hide if already on the booking page
  if (currentPath === "/reserva") {
    return null;
  }

  return (
    <aside
      aria-label="Agendamento rápido"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#E8E5DD] px-4 py-2.5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-[#191716]">
            Consulte disponibilidade
          </span>
          <span className="text-[11px] text-[#6B6560]">
            Fale com o salão pelo WhatsApp
          </span>
        </div>
        <button
          onClick={() => onNavigate("/reserva")}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
        >
          Agendar Horário
        </button>
      </div>
    </aside>
  );
};
