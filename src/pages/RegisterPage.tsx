import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      setPopupMessage('Os emails não coincidem');
      setShowPopup(true);
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users/register', { name, dateOfBirth, email, password });
      setPopupMessage('Usuário registrado com sucesso!');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 2000);
    } catch (error) {
      setPopupMessage('Erro ao registrar usuário');
      setShowPopup(true);
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="register-input-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="register-input-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <div className="register-input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="register-input-group">
            <label>Confirme seu Email</label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="register-input"
              placeholder="Confirme seu email"
              required
            />
          </div>
          <div className="register-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="register-button-group">
            <button type="submit" className="register-button">Register</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
