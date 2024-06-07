interface SectionHeaderProps {
  label: string;
  iconLabel: React.ReactNode;
}

const SectionHeader = ({ label, iconLabel }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-[50px] w-[50px] flex items-center justify-center bg-primary/30 text-primary rounded-full">
        {iconLabel}
      </div>
      <p className="font-medium text-lg">{label}</p>
    </div>
  );
};

export default SectionHeader;
