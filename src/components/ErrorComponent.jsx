import Link from "next/link";

const ErrorComponent = ({ error, reset }) => {
    return (
        <main className="container grid place-items-center min-h-full lg:px-8 pt-24 md:pb-40 pb-24">
            <div className="text-center text-primary">
                <p className="text-lg">
                    There was a problem
                </p>
                <h2 className="mt-4 md:text-3xl text-2xl font-bold text-red-500">
                    {error.message || "Something went wrong!"}
                </h2>
                <p className="mt-6 text-base">
                    Please try again later or contact support if the problem persists.
                </p>
                <div className="mt-10 flex items-center justify-center gap-6">
                    <button
                        className="btn mx-0 border border-emerald-500 bg-emerald-100 hover:bg-emerald-200 hover:shadow-none"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                    <Link
                        href={'/'}
                        className="btn mx-0 border border-gray-400 bg-gray-100 hover:bg-gray-200 hover:shadow-none"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ErrorComponent;