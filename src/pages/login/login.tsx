import {Helmet} from 'react-helmet-async';
import { getRandomElement } from '../helpers';
import { cities } from '../../helpers/const';
import LoginForm from './login-form';
import LocationsItem from '../../components/locations-item';

function Login(): JSX.Element {
  const city = getRandomElement(cities) as string;

  return (
    <>
      <Helmet>
        <title>6 cities. Authorization</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <LocationsItem
              city={city}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
