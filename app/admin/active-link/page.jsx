import { headers } from "next/headers";
import Form from "./Form";

export const metadata = {
    title: 'Create Account',
    robots: { index: false, nocache: true, },
};

const ActiveLink = () => {
    const payload = JSON.parse(headers().get('payload'));
    const error = headers().get('error');
    if (error) throw new Error(error);

    return (<>
        <div className="fixed inset-0 z-[1000] bg_gradient">
            <div className="container mt-20">
                <Form data={payload} />
            </div>
        </div>
    </>);
};

export default ActiveLink;