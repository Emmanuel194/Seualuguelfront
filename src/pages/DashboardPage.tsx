
import React, { useState } from 'react';
import TenantForm from './TenantForm.tsx';
import RentalContractForm from '../components/RentalContractForm.tsx';
import RentalContractList from '../components/RentalContractList.tsx';
import { Tenant } from '../types';
import '../styles/DashboardPage.css';

type DashboardView = 'tenants' | 'newTenant' | 'contracts' | 'newContract';

const DashboardPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>('tenants');
  const [tenants, setTenants] = useState<Tenant[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleMenu}>
          {isMenuOpen ? '<<' : '>>'}
        </button>
        <ul className="menu">
          <li onClick={() => setCurrentView('tenants')}>Listar Inquilinos</li>
          <li onClick={() => setCurrentView('newTenant')}>Cadastrar Inquilino</li>
          <li onClick={() => setCurrentView('contracts')}>Contratos de Aluguel</li>
          <li onClick={() => setCurrentView('newContract')}>Novo Contrato</li>
        </ul>
      </div>
      
      <div className="main-content">
        {currentView === 'newTenant' && (
          <TenantForm 
            onSave={(tenant) => {
              setTenants([...tenants, tenant]);
              setCurrentView('tenants');
            }}
          />
        )}

        {currentView === 'tenants' && (
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
        )}

        {currentView === 'newContract' && (
          <RentalContractForm 
            tenants={tenants}
            onSave={(contract) => {
              console.log('Novo contrato:', contract);
              setCurrentView('contracts');
            }}
          />
        )}

        {currentView === 'contracts' && (
          <RentalContractList />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;