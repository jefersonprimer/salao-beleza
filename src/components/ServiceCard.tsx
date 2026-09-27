import React from "react";
import { Service } from "../data/services";
import { ImageWithFallback } from "./ImageWithFallback";

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
  showImage?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBook,
  showImage = false,
}) => {
  return (
    <article className="group bg-[#FFFFFF] border border-[#E8E5DD] hover:border-[#C4BFAF] transition-all duration-200 flex flex-col justify-between p-6 sm:p-7">
      <div>
        {showImage && service.image && (
          <div className="mb-5 overflow-hidden aspect-[16/10] bg-[#F2EFE9] border border-[#E8E5DD]">
            <ImageWithFallback
              src={service.image}
              alt={service.name}
              fallbackTitle={service.name}
              fallbackSubtitle={service.category}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </div>
        )}

        {/* Clean unboxed metadata per Zero-Pill discipline */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6560] mb-2 font-medium">
          <span>{service.category}</span>
          <span aria-hidden="true">·</span>
          <span>{service.durationLabel}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#191716] leading-snug mb-3">
          {service.name}
        </h3>

        <p className="text-sm text-[#4A4540] leading-relaxed mb-4">
          {service.description}
        </p>

        {service.conditions && (
          <p className="text-xs text-[#8C867E] italic border-l-2 border-[#D8D4CA] pl-3 mb-4">
            {service.conditions}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-[#E8E5DD] flex items-center justify-between gap-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wider text-[#8C867E]">
            Investimento
          </span>
          <span className="text-base sm:text-lg font-semibold text-[#191716] tabular-nums">
            {service.priceLabel}
          </span>
        </div>

        <button
          onClick={() => onBook(service.id)}
          className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
        >
          Agendar este serviço
        </button>
      </div>
    </article>
  );
};
