const Button = ({ children, className = "", onClick }) => {
    return (
        <button
        type="button"
            onClick={onClick}
            className={`mt-6 w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 cursor-pointer hover:scale-105 transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export { Button };
