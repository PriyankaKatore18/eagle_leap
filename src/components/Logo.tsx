import { Link } from "react-router-dom";

const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="group inline-flex shrink-0 items-center" aria-label="Eagle Leap Publication home">
    <span
      className={`inline-flex rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] ${
        light ? "bg-white p-2 shadow-soft" : ""
      }`}
    >
      <img
        src="/brand/eagle-leap-publication-logo.svg"
        alt="Eagle Leap Publication"
        width={132}
        height={132}
        className="h-auto w-auto"
      />
    </span>
  </Link>
);

export default Logo;
