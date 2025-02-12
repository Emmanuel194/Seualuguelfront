import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        navigate('/dashboard'); 
      } else {
        console.error('Erro ao fazer login');
      }
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
          <div className="remember-me-group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe">Lembrar-me</label>
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
