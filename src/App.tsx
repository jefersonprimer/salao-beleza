import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MobileStickyCta } from "./components/MobileStickyCta";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { BookingPage } from "./pages/BookingPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (
        path === "/servicos" ||
        path === "/reserva" ||
        path === "/agendamentos" ||
        path === "/sobre"
      ) {
        return path;
      }
    }
    return "/";
  });

  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Sync with browser navigation
  const navigateTo = useCallback((path: string, serviceId?: string) => {
    setCurrentPath(path);
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    } else if (path !== "/reserva") {
      setPreselectedServiceId(undefined);
    }

    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelectServiceAndBook = (serviceId: string) => {
    navigateTo("/reserva", serviceId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#191716] font-sans antialiased selection:bg-[#2C241E] selection:text-[#FAF9F5]">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <Navbar currentPath={currentPath} onNavigate={(path) => navigateTo(path)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPath === "/" && (
          <HomePage
            onNavigate={(path) => navigateTo(path)}
            onSelectServiceAndBook={handleSelectServiceAndBook}
          />
        )}

        {currentPath === "/servicos" && (
          <ServicesPage
            onNavigate={(path) => navigateTo(path)}
            onSelectServiceAndBook={handleSelectServiceAndBook}
          />
        )}

        {currentPath === "/reserva" && (
          <BookingPage
            initialServiceId={preselectedServiceId}
            onNavigate={(path) => navigateTo(path)}
            onBookingComplete={() => {
              // Option to stay or redirect
            }}
          />
        )}

        {currentPath === "/agendamentos" && (
          <AppointmentsPage onNavigate={(path) => navigateTo(path)} />
        )}

        {currentPath === "/sobre" && (
          <AboutPage onNavigate={(path) => navigateTo(path)} />
        )}
      </main>

      {/* Subtle Mobile Sticky CTA (obeying 15% viewport height cap) */}
      <MobileStickyCta
        currentPath={currentPath}
        onNavigate={(path) => navigateTo(path)}
      />

      {/* Quiet, Editorial Footer */}
      <Footer onNavigate={(path) => navigateTo(path)} />
    </div>
  );
}
