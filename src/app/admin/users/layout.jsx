import { headers } from "next/headers";
import { notFound } from "next/navigation";

const layout = ({ children }) => {
    const user = JSON.parse(headers().get('userInfo'));
    if (user?.role !== 'admin') return notFound();

    return (
        <div>
            {children}
        </div>
    );
};

export default layout;