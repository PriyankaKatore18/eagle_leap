import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ items }: { items: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/80">
    <Link to="/" className="flex items-center gap-1 hover:text-accent transition-smooth">
      <Home className="w-4 h-4" /> Home
    </Link>
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-2">
        <ChevronRight className="w-4 h-4 opacity-60" />
        {item.to ? (
          <Link to={item.to} className="hover:text-accent transition-smooth">{item.label}</Link>
        ) : (
          <span className="text-accent font-medium">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
