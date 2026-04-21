import Breadcrumb from "./Breadcrumb";

interface Props {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; to?: string }[];
}

const PageBanner = ({ title, subtitle, breadcrumbs }: Props) => (
  <section className="relative pt-32 pb-20 gradient-dark overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent blur-3xl animate-float" />
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-primary-glow blur-3xl" />
    </div>
    <div className="container-custom relative">
      <div className="animate-fade-in-up">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
          {title.split(" ").map((w, i) => (
            <span key={i} className={i % 2 === 1 ? "text-gradient-accent" : ""}>{w} </span>
          ))}
        </h1>
        {subtitle && <p className="mt-4 text-lg text-white/80 max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  </section>
);

export default PageBanner;
