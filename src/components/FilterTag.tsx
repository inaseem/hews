type FilterTagProps = {
  name: string;
  onClick: () => void;
  isActive?: boolean;
};

const FilterTag = ({ name, onClick, isActive = false }: FilterTagProps) => {
  return (
    <div
      className={`cursor-pointer transition flex items-baseline gap-2 rounded-sm px-2 py-1 border ${
        isActive ? 'border-primary-500' : 'border-gray-800'
      }`}
      onClick={onClick}
    >
      <span className="text-xs">{name}</span>
    </div>
  );
};

export default FilterTag;
