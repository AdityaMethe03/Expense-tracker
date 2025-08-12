export default function Button({
  text,
  className = "",
  disabled = false,
  onClick,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          w-fit
          rounded-lg 
          bg-blue-700
          text-white 
          tracking-wide
          text-[0.75rem]
          py-3 px-6
          mx-auto
          shadow-[0_0_0.25rem_#12123d]
          transition-all duration-500
          hover:shadow-[0_0_0.5rem_#ffffff,0_0_0.25rem_#ffffff,0_0_0.25rem_#ffffff,0_0_0.25rem_#ffffff]
          disabled:cursor-not-allowed 
          disabled:shadow-none
          md:text-[0.95rem]
          lg:text-[1.05rem]
          md:py-3 md:px-5 
          ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}
