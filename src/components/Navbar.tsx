import React, { useState } from "react";
import { salonConfig } from "../config/salon";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Início", path: "/" },
    { label: "Serviços", path: "/servicos" },
    { label: "O Salão", path: "/sobre" },
    { label: "Agendamentos", path: "/agendamentos" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E8E5DD] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand mark and wordmark */}
        <button
          onClick={() => handleNavClick("/")}
          className="flex min-w-0 items-center gap-2 font-serif text-xl tracking-tight text-[#191716] hover:opacity-80 transition-opacity text-left cursor-pointer"
        >
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="h-11 w-11 shrink-0 object-contain"
          />
          <span className="truncate whitespace-nowrap md:overflow-visible md:text-clip">
            {salonConfig.name}
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B6560]">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === "/" && currentPath === "");
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                  isActive
                    ? "text-[#191716] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#191716]"
                    : "hover:text-[#191716]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("/reserva")}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors whitespace-nowrap cursor-pointer"
          >
            Agendar Horário
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#191716] hover:text-[#6B6560] transition-colors cursor-pointer"
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E5DD] bg-[#FAF9F5] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path === "/" && currentPath === "");
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-base py-2 transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#191716] font-semibold"
                      : "text-[#6B6560] hover:text-[#191716]"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-[#E8E5DD]">
            <button
              onClick={() => handleNavClick("/reserva")}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#191716] hover:bg-[#2E2A27] transition-colors cursor-pointer"
            >
              Agendar Horário
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
