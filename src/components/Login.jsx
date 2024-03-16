// Login.js
import './Login.css'
import { useState } from 'react';
import supabase from './supabaseClient';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('Tokens').select('*').eq('username', username).eq('token', password);

    if (error) {
      console.error("Error occurred during login:", error);
      return;
    }

    if (data.length > 0) {
      const userData = data[0];
      alert(`${userData.username} Logged in successfully.`);
    } else {
      console.log("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Enter Your Username....'
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Enter Your Token....'
            className="form-control"
          />
        </div>
        <div className="btnwrap">
          <button type="submit" className="btn">Login</button>
        </div>
        <br />
        <a href='/register'>  Don't Have Account? Register Here.</a>
      </form>
    </div>
  );
}

export default Login;
