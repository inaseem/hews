const FallbackLoader = () => {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt="Loading..."
        width={48}
        height={48}
        className="animate-pulse"
      />
    </div>
  );
};

export default FallbackLoader;
