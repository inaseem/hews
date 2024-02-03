const SearchField = (
  inputProps: React.ButtonHTMLAttributes<HTMLInputElement>
) => {
  return (
    <div className="flex relative">
      <input
        className="flex rounded-sm border border-gray-800 transition focus:border-primary-500 bg-background px-2 py-1 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full"
        placeholder="Search"
        {...inputProps}
      />
    </div>
  );
};

export default SearchField;
