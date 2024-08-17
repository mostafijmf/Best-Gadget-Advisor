
const ResultNotFound = ({ message = "No result found!" }) => {
    return (
        <div className="w-full h-60 grid place-items-center">
            <p className="text-2xl text-gray-500 font-medium">{message}</p>
        </div>
    );
};

export default ResultNotFound;