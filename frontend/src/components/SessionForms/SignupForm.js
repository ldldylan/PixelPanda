import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SignupForm.css';
import anime from 'animejs';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'confirmPassword':
        setState = setConfirmPassword;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    dispatch(signup(user)); 
  }

  useEffect(() => {
    let current = null;

    const emailElement = emailRef.current;
    const passwordElement = passwordRef.current;
    const confirmPasswordElement = confirmPasswordRef.current;
    const submitElement = submitRef.current;

    function handleEmailFocus() {
      if (current) current.pause();
      passwordElement.previousSibling.classList.remove("current");
      emailElement.previousSibling.classList.add("current");
      confirmPasswordElement.previousSibling.classList.remove("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1500',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    function handlePasswordFocus() {
      if (current) current.pause();
      emailElement.previousSibling.classList.remove("current");
      passwordElement.previousSibling.classList.add("current");
      confirmPasswordElement.previousSibling.classList.remove("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1500',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    function handleConfirmPasswordFocus() {
      if (current) current.pause();
      emailElement.previousSibling.classList.remove("current");
      passwordElement.previousSibling.classList.remove("current");
      confirmPasswordElement.previousSibling.classList.add("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -672,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1500',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    function handleSubmitFocus() {
      if (current) current.pause();
      emailElement.previousSibling.classList.remove("current");
      passwordElement.previousSibling.classList.remove("current");
      confirmPasswordElement.previousSibling.classList.remove("current");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -1086,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1500',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    }

    emailElement.addEventListener('focus', handleEmailFocus);
    passwordElement.addEventListener('focus', handlePasswordFocus);
    confirmPasswordElement.addEventListener('focus', handleConfirmPasswordFocus);
    submitElement.addEventListener('focus', handleSubmitFocus);

    return () => {
      emailElement.removeEventListener('focus', handleEmailFocus);
      passwordElement.removeEventListener('focus', handlePasswordFocus);
      confirmPasswordElement.addEventListener('focus', handleConfirmPasswordFocus);
      submitElement.removeEventListener('focus', handleSubmitFocus);
    };
  }, []);

  return (
<div className="login-page">
  <div className="container">
    <div className="form-box">
      <svg viewBox="0 0 320 340">
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
        <path d="m 40 120.0002 l 239.9998 -0.0003 c 0 0 24.9926 0.7993 
        25.0002 35.0002 c 0.008 34.2008 -25.0002 35 -25.0002 35 h -239.9998 
        c 0 -0.0205 -25 4.0135 -25 38.5 c 0 34.4865 25 38.5 25 38.5 h 240
         c 0 0 24.9926 0.7993 25.002 35.002 c -0.008 34.2008 -25 35 -25 35 
         h -215.002 c 0 0 -20 0.996 -20 -25 c 0 -24.004 20 -25 20 -25 h 190 
         c 0 0 20 1.7103 20 25 c 0 24.004 -20 25 -20 25 h -168.5714" />
      </svg>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="current">Email</label>
        <span className="errors">{errors?.email}</span>
        <input type="email" value={email} onChange={update('email')} id="email" ref={emailRef}/>
        <label htmlFor="password">Password</label>
        <span className="errors">{errors?.password}</span>
        <input type="password" value={password} onChange={update('password')} id="password" ref={passwordRef}/>
        <label htmlFor="confirm-password">Confirm Password</label>
        <span className="errors">
         {password !== confirmPassword && 'Confirm Password field must match'}
       </span>
        <input type="password" value={confirmPassword} onChange={update('confirmPassword')} id="confirm-password" ref={confirmPasswordRef}></input>
        <input type="submit" id="submit" value="REGISTER" ref={submitRef}/>
      </form>
    </div>
  </div>
</div>
    // <form className="session-form" onSubmit={handleSubmit}>
    //   <h2>Sign Up Form</h2>
    //   <div className="errors">{errors?.email}</div>
    //   <label>
    //     <span>Email</span>
    //     <input type="text"
    //       value={email}
    //       onChange={update('email')}
    //       placeholder="Email"
    //     />
    //   </label>
    //   <div className="errors">{errors?.username}</div>
    //   <label>
    //     <span>Username</span>
    //     <input type="text"
    //       value={username}
    //       onChange={update('username')}
    //       placeholder="Username"
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
    //   <div className="errors">
    //     {password !== password2 && 'Confirm Password field must match'}
    //   </div>
    //   <label>
    //     <span>Confirm Password</span>
    //     <input type="password"
    //       value={password2}
    //       onChange={update('password2')}
    //       placeholder="Confirm Password"
    //     />
    //   </label>
    //   <input
    //     type="submit"
    //     value="Sign Up"
    //     disabled={!email || !username || !password || password !== password2}
    //   />
    // </form>

  );
}

export default SignupForm;