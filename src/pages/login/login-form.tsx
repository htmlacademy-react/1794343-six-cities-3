import { useRef, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/use-store';
import { loginAction } from '../../store/api-actions';

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };
  return (
    <form
      className="login__form form"
      action=""
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={emailRef}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          ref={passwordRef}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
          title="Password must contain at least one letter and one number"
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>);
}

export default LoginForm;

