import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/reset-password', { email: resetEmail });
      console.log(response.data);
      setShowResetPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-links">
          <a href="/register">Cadastre-se</a>
          <button className="link-button" onClick={() => setShowResetPopup(true)}>Recuperar Senha</button>
        </div>
      </div>

      {showResetPopup && (
        <div className="reset-popup">
          <div className="reset-popup-content">
            <h3>Recuperar Senha</h3>
            <form onSubmit={handleResetPassword}>
              <div className="reset-input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="reset-input"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div className="reset-button-group">
                <button type="submit" className="reset-button submit-button">Enviar</button>
                <button type="button" className="reset-button cancel-button" onClick={() => setShowResetPopup(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
