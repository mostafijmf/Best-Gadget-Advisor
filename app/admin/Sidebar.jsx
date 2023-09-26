import { headers } from "next/headers";
import MenuItems from "./MenuItems";

const Sidebar = () => {
    const user = JSON.parse(headers().get('userInfo'));

    return (<>
        <MenuItems user={user?.role} />
    </>);
};

export default Sidebar;