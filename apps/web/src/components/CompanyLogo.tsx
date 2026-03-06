import Image from "next/image";

interface CompanyLogoProps {
  logo?: string;
  companyName: string;
  className?: string;
  groupHover?: boolean;
}

export function CompanyLogo({ logo, companyName, className = "", groupHover = false }: CompanyLogoProps) {
  const hoverClasses = groupHover ? "group-hover:bg-white/20 transition-colors" : "";
  const combinedClassName = `rounded-full ${className} ${hoverClasses}`;

  if (logo) {
    return (
      <Image
        src={logo}
        alt={companyName}
        width={48}
        height={48}
        className={combinedClassName}
      />
    );
  }

  return (
    <div className={`${combinedClassName} bg-gray-100 flex items-center justify-center`}>
      <span className={`text-brand-primary font-semibold ${groupHover ? "group-hover:text-white" : ""}`}>
        {companyName.charAt(0)}
      </span>
    </div>
  );
}
