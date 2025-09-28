const STYLES_MAPPING = {
    "primary":" bg-blue-500 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 duration-300 ",
    "outline-primary":"px-2.5 py-0.5  bg-blue-400 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 duration-300"
}
const Button = ({ disabled=false,children, className = "", onClick ,variant="primary"}) => {
    return (
        <button
        disabled={disabled}
        type="button"
            onClick={onClick}
            className={
                `disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer hover:scale-105 transition ${STYLES_MAPPING[variant]} ${className}`}
        >
            {children}
        </button> 
    );
};

export { Button };
