import React from "react";
import { salonConfig } from "../config/salon";

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => (
  <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
    <section className="max-w-3xl space-y-5">
      <div className="text-xs uppercase tracking-widest text-[#6B6560] font-medium">
        {salonConfig.name} · {salonConfig.address.city} - {salonConfig.address.state}
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl text-[#191716] tracking-tight">
        Sua beleza em destaque no seu dia inesquecível!
      </h1>
      <p className="text-base sm:text-lg text-[#524C46] leading-relaxed">
        Mari é especialista em maquiagem social embelezadora e maquiagem para noivas. Também atende com penteado e serviços para sobrancelha.
      </p>
    </section>

    <section className="bg-white border border-[#E8E5DD] p-8 md:p-12 grid md:grid-cols-3 gap-8">
      {["Maquiagem social embelezadora", "Maquiagem para noivas", "Penteado e sobrancelha"].map((item) => (
        <div key={item}>
          <h2 className="font-serif text-xl text-[#191716]">{item}</h2>
          <p className="text-sm text-[#524C46] mt-2">Consulte valores e disponibilidade pelo WhatsApp.</p>
        </div>
      ))}
    </section>

    <section className="bg-[#F3F1EC] border border-[#E8E5DD] p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#6B6560] font-medium">Endereço</span>
        <h2 className="font-serif text-2xl text-[#191716]">{salonConfig.address.full}</h2>
        <p className="text-sm text-[#524C46]">Horários e valores sob consulta.</p>
      </div>
      <button
        onClick={() => onNavigate("/reserva")}
        className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
      >
        Solicitar horário
      </button>
    </section>
  </div>
);
