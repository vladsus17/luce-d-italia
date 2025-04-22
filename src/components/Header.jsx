import { Link } from 'react-router';
import logoJpg from '../logo.jpeg';
import Search from './Search';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img src={logoJpg} alt="Logo" />
            <div></div>
          </div>
        </Link>
        <Search />
      </div>
    </div>
  );
}

export default Header;
