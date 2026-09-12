interface SectionTitleProps {
  children: React.ReactNode;
  count?: string;
  action?: React.ReactNode;
}

export default function SectionTitle({ children, count, action }: SectionTitleProps) {
  return (
    <header data-slot="panel-header" className="zickrian-section-title">
      <h2 data-slot="panel-title">
        {children}
        {count && <sup>({count})</sup>}
      </h2>
      {action}
    </header>
  );
}
