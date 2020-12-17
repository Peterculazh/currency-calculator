import { Link } from "react-router-dom";
import '../../styles/components/header.sass';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <Link to="/" className="header-item">Currencies</Link>
                <Link to="/calculator" className="header-item">Calculator</Link>
            </nav>
        </header>
    )
}


export default Header;