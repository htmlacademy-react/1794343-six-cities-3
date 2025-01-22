import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. 404 Page is not found</title>
      </Helmet>
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h1 style={{ fontSize: '72px' }}>404</h1>
        <h2>Страница не найдена</h2>
        <img src="https://15.design.htmlacademy.pro/static/hotel/12.jpg" alt="Lost in space" style={{ width: '400px' }} />
        <p>Похоже, вы заблудились. Попробуйте вернуться на главную.</p>
        <Link to="/">
          <b style={{ fontSize: '20px', color: '#9E471A', textDecoration: 'underline' }}>
            Вернуться на главную страницу
          </b>
        </Link>
      </div>
    </>
  );
}
export default NotFound;
