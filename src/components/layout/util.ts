import { AppRoute } from '../const';

const getLayoutState = (pathname: AppRoute) => {

  let rootClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  } else {
    const isCityRoute = /^\/[a-zA-Z]+$/.test(pathname);
    if (isCityRoute) {
      rootClassName = ' page--gray page--main';
    }
  }

  return {rootClassName, shouldRenderUser, shouldRenderFooter};
};

export {getLayoutState};
