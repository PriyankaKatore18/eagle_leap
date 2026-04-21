import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const { t } = useLang();
  const [email, setEmail] = useState("");

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! 📚 Welcome to Eagle Leap.");
    setEmail("");
  };

  return (
    <footer className="gradient-dark text-white pt-20 pb-8 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-glow blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo light />
            <p className="mt-4 text-white/70 text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:scale-110 flex items-center justify-center transition-smooth"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-accent">{t.footer.quick}</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              {[
                ["/", "Home"],
                ["/about", "About Us"],
                ["/services", "Services"],
                ["/packages", "Packages"],
                ["/store", "Book Store"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent transition-smooth inline-block hover:translate-x-1">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-accent">Contact</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" /> Shivajinagar, Pune, Maharashtra 411005</li>
              <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" /> +91 98765 43210</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" /> hello@eagleleap.in</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-accent">{t.footer.newsletter}</h4>
            <p className="text-white/70 text-sm mb-4">Monthly insights for authors & publishers.</p>
            <form onSubmit={handleSub} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.emailPh}
                className="px-4 py-2.5 rounded-md bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:outline-none focus:border-accent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-md gradient-accent font-semibold text-sm hover:opacity-90 transition-smooth"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Eagle Leap Publication. {t.footer.rights}</p>
          <p>Made with ❤ in Pune, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
