import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. 404 Page is not found</title>
      </Helmet>
      <h1>404. Страница на найдена</h1>
      <Link to="/">Вернуться на главную страницу</Link>
    </>
  );
}
export default NotFound;
