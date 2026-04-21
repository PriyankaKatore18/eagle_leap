import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/packages", label: t.nav.packages },
    { to: "/store", label: t.nav.store },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {({ isActive }) => (
                <span
                  className={`relative inline-block px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                    isActive ? "text-accent" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all ${
                      isActive ? "w-6" : "w-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:border-accent hover:text-accent transition-smooth text-sm font-medium"
            aria-label="Toggle language"
          >
            <Languages className="w-4 h-4" />
            {lang === "en" ? "मराठी" : "English"}
          </button>
          <Button asChild className="hidden md:inline-flex gradient-accent text-accent-foreground hover:opacity-90 shadow-soft font-semibold">
            <Link to="/contact">{t.nav.cta}</Link>
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container-custom py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-md text-base font-medium transition-smooth ${
                    isActive ? "bg-accent/10 text-accent" : "hover:bg-secondary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-border font-medium"
            >
              <Languages className="w-4 h-4" />
              {lang === "en" ? "मराठी" : "English"}
            </button>
            <Button asChild className="mt-2 gradient-accent text-accent-foreground font-semibold">
              <Link to="/contact" onClick={() => setOpen(false)}>{t.nav.cta}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
