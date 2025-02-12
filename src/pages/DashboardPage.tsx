import React, { useState } from 'react';
import '../styles/DashboardPage.css';


interface Tenant {
  name: string;
  cpf: string;
  birthdate: string;
  phone: string;
  email: string;
}

const DashboardPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]); 
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [tenantData, setTenantData] = useState<Tenant>({
    name: '',
    cpf: '',
    birthdate: '',
    phone: '',
    email: '',
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTenants([...tenants, tenantData]);
    setTenantData({ name: '', cpf: '', birthdate: '', phone: '', email: '' });
    setShowTenantForm(false);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleMenu}>
          {isMenuOpen ? '<<' : '>>'}
        </button>
        <ul className="menu">
          <li onClick={() => setShowTenantForm(true)}>Cadastrar Inquilino</li>
          {/* Adicione mais itens de menu aqui */}
        </ul>
      </div>
      <div className="main-content">
        {showTenantForm && (
          <div className="tenant-form">
            <h2>Cadastrar Inquilino</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  value={tenantData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                CPF:
                <input
                  type="text"
                  name="cpf"
                  value={tenantData.cpf}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Data de Nascimento:
                <input
                  type="date"
                  name="birthdate"
                  value={tenantData.birthdate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  name="phone"
                  value={tenantData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={tenantData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setShowTenantForm(false)}>Cancelar</button>
            </form>
          </div>
        )}
        <div className="tenant-list">
          {tenants.map((tenant, index) => (
            <div key={index} className="tenant-card">
              <h3>{tenant.name}</h3>
              <p>CPF: {tenant.cpf}</p>
              <p>Data de Nascimento: {tenant.birthdate}</p>
              <p>Telefone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
