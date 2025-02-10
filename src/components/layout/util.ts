import { AppRoute } from '../../const';

const getLayoutState = (pathname: AppRoute) => {

  let rootClassName = '';
  let favoriteEmptyClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
    favoriteEmptyClassName = 'page--favorites-empty';
  } else {
    const isCityRoute = pathname === AppRoute.Root || pathname.includes(`${AppRoute.Root}?city=`);
    if (isCityRoute) {
      rootClassName = ' page--gray page--main';
    }
  }

  return {rootClassName, shouldRenderUser, shouldRenderFooter, favoriteEmptyClassName};
};

export {getLayoutState};
