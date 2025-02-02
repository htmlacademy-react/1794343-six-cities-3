import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { AppRoute } from '../../components/const';

function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. 404 Page not found</title>
      </Helmet>
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h1 style={{ fontSize: '72px' }}>404</h1>
        <h2>Page not found</h2>
        <img src="https://15.design.htmlacademy.pro/static/hotel/12.jpg" alt="Lost in the street" style={{ width: '400px' }} />
        <p>Looks like you are lost. Try to return to the main page.</p>
        <Link to={AppRoute.Root}>
          <b style={{ fontSize: '20px', color: '#9E471A', textDecoration: 'underline' }}>
            Go to Main Page
          </b>
        </Link>
      </div>
    </>
  );
}
export default NotFound;
