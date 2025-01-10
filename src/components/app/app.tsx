import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';

type AppProps = {
  offersCount: number;
}

const Page = {
  Main: 'main',
  Login: 'login',
  Favorites: 'favorites',
  Offer: 'offer'
};

const currentPage = Page.Main;

const getPage = (offersCount: number) => {
  switch (currentPage) {
    case Page.Main:
      return <Main offersCount={offersCount}/>;
    case Page.Login:
      return <Login/>;
    case Page.Favorites:
      return <Favorites/>;
    case Page.Offer:
      return <Offer/>;
  }
};

function App({offersCount}: AppProps) {
  return getPage(offersCount);
}
export default App;
