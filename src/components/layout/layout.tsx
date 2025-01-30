import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { getAuthorizationStatus } from '../../mocks/authorization-status';
import { getLayoutState } from './util';
import { OfferType } from '../offer-card/types';
import cn from 'classnames';

type LayoutProps = {
  offers: OfferType[];
}

function Layout({offers}: LayoutProps): JSX.Element {
  const {pathname} = useLocation();

  const {rootClassName, shouldRenderUser, shouldRenderFooter} = getLayoutState(pathname as AppRoute);
  const authorizationStatus = getAuthorizationStatus();
  //cюда передать избранные офферы
  const isEmpty = offers.length === 0;

  return (
    <div className={cn(
      'page',
      `${rootClassName}`,
      {'page__main--favorites-empty': isEmpty}
    )}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink
                className={({ isActive }) => (isActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link')}
                to={AppRoute.Root}
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </NavLink>
            </div>
            {
              shouldRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                            <span className="header__favorite-count">3</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <Link className="header__nav-link"
                          to={AppRoute.Root}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>) : null}
                  </ul>
                </nav>) : null
            }
          </div>
        </div>
      </header>
      <Outlet/>
      {shouldRenderFooter ? (
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Root}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
