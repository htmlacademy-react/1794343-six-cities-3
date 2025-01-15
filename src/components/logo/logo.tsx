import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';


const getLogoState = (pathname: AppRoute) => {
  let className = '';
  let isActive: boolean = false;

  if (pathname === AppRoute.Root) {
    className = 'header__logo-link--active';
    isActive = true;
  }
  return {className, isActive};
};

function Logo(): JSX.Element {
  const {pathname} = useLocation();
  const {className, isActive} = getLogoState(pathname as AppRoute);
  return isActive ? (
    <a className={`header__logo-link${className}`}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </a>
  ) : (
    <Link className={`header__logo-link${className}`} to={AppRoute.Root}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>);
}


export default Logo;
