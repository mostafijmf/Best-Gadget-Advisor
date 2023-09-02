import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const ProductReviewsLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default ProductReviewsLayout;