import Footer from "../components/footer/Footer";


const Not_found_page = () => {
    return (
        <div className="text-danger">
            <div className="text-center p-5">
                <h1 className="p-5">404 - Page not found</h1>
                <p className="p-5">The page you requested could not be found.</p>
            </div>
            <Footer />
        </div>
    )
}
export default Not_found_page;