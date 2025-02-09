import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import { AppRoute } from '../const';

const HeaderLogo = memo((): JSX.Element => (
  <div className="header__left">
    <NavLink
      className={({ isActive }) => (isActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link')}
      to={AppRoute.Root}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </NavLink>
  </div>
));

HeaderLogo.displayName = 'HeaderLogo';

export default HeaderLogo;
