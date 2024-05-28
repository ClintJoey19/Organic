import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
  name: string;
  items: {
    label: string;
    value: string;
  }[];
}

const SelectFilter = ({ name, items }: SelectFilterProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ label, value }) => (
          <SelectItem key={label} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
