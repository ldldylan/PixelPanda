import { useEffect, useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LoginForm.css';
import anime from 'animejs';
import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  useEffect(() => {
    let current = null;

    const emailElement = emailRef.current;
    const passwordElement = passwordRef.current;
    const submitElement = submitRef.current;

    function handleEmailFocus() {
      if (current) current.pause();
      passwordElement.previousSibling.classList.remove("current");
      emailElement.previousSibling.classList.add("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    function handlePasswordFocus() {
      if (current) current.pause();
      emailElement.previousSibling.classList.remove("current");
      passwordElement.previousSibling.classList.add("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    function handleSubmitFocus() {
      if (current) current.pause();
      emailElement.previousSibling.classList.remove("current");
      passwordElement.previousSibling.classList.remove("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    emailElement.addEventListener('focus', handleEmailFocus);
    passwordElement.addEventListener('focus', handlePasswordFocus);
    submitElement.addEventListener('focus', handleSubmitFocus);

    return () => {
      emailElement.removeEventListener('focus', handleEmailFocus);
      passwordElement.removeEventListener('focus', handlePasswordFocus);
      submitElement.removeEventListener('focus', handleSubmitFocus);
    };
  }, []);

  return (
<div className="login-page">
  <div className="container">
    <div className="form-box">
      <svg viewBox="0 0 320 300">
        <defs>
          <linearGradient
                          id="linearGradient"
                          x1="13"
                          y1="193.49992"
                          x2="307"
                          y2="193.49992"
                          gradientUnits="userSpaceOnUse">
            <stop
                  stopColor="#e66465"
                  offset="0"
                  id="stop876" />
            <stop
                  stopColor="#9198e5"
                  offset="1"
                  id="stop878" />
          </linearGradient>
        </defs>
        <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,
        0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,
        35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,
        38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,
        0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
      </svg>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="current">Email</label> 
        <input type="email" value={email} onChange={update('email')} id="email" ref={emailRef}/>
        <label htmlFor="password">Password</label> <span className="errors">{errors ? '- Invalid Credentials' : null}</span>
        <input type="password" value={password} onChange={update('password')} id="password" ref={passwordRef}/>
        <input type="submit" id="submit" value="LOGIN" ref={submitRef}/>
      </form>
    </div>
  </div>
</div>


    // <form className="session-form" onSubmit={handleSubmit}>
    //   <h2>Log In Form</h2>
    //   <div className="errors">{errors?.email}</div>
    //   <label>
    //     <span>Email</span>
    //     <input type="text"
    //       value={email}
    //       onChange={update('email')}
    //       placeholder="Email"
    //     />
    //   </label>
    //   <div className="errors">{errors?.password}</div>
    //   <label>
    //     <span>Password</span>
    //     <input type="password"
    //       value={password}
    //       onChange={update('password')}
    //       placeholder="Password"
    //     />
    //   </label>
    //   <input
    //     type="submit"
    //     value="Log In"
    //     disabled={!email || !password}
    //   />
    // </form>
  );
}

export default LoginForm;