import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const ProductLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default ProductLayout;