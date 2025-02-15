import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../helpers/const';
import { getLayoutState } from './util';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store';
import { logoutAction } from '../../store/api-actions';
import HeaderLogo from './header-logo';
import { getAuthorizationStatus, getAvatarURL, getEmail } from '../../store/user-process/selectors';
import { getFavortiteOffers } from '../../store/favorites-process/selectors';

function Layout(): JSX.Element {
  const {pathname} = useLocation();
  const {
    rootClassName,
    shouldRenderUser,
    shouldRenderFooter,
    favoriteEmptyClassName
  } = getLayoutState(pathname as AppRoute);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const email = useAppSelector(getEmail);
  const avatarURL = useAppSelector(getAvatarURL);

  const offers = useAppSelector(getFavortiteOffers);
  const isEmpty = offers.length === 0;

  return (
    <div className={cn(
      'page',
      `${rootClassName}`,
      {[favoriteEmptyClassName]: isEmpty}
    )}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            {
              shouldRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{
                            backgroundImage: `url(${avatarURL})`,
                            borderRadius: '50%'}}
                        >
                        </div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">{email}</span>
                            <span className="header__favorite-count">{offers.length}</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <Link className="header__nav-link"
                          to={AppRoute.Root}
                          onClick={(evt) => {
                            evt.preventDefault();
                            dispatch(logoutAction());
                          }}
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
