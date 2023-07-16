import FamousProperties from "../../Components/FamousProperties/FamousProperties";
import Featured from "../../Components/Featured/Featured";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import Navbar from "../../Components/Navbar/Navbar";
import PropertyList from "../../Components/Properties/Properties";
import "./Home.css";

const Home = () => {
    return ( 
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Find by property type</h1>
                <PropertyList />
                <h1 className="homeTitle">Famous Properties</h1>
                <FamousProperties />
            </div>
            <MailList />
            <Footer />
        </div>
    );
};

export default Home;
