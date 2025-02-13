
import React from 'react';
import { RentalContract } from '../types';

const RentalContractList: React.FC = () => {
  
  const contracts: RentalContract[] = [];

  return (
    <div className="contracts-container">
      <h2>Contratos de Aluguel</h2>
      <div className="contracts-grid">
        {contracts.map((contract) => (
          <div key={contract.id} className={`contract-card status-${contract.paymentStatus.toLowerCase()}`}>
            <h3>Contrato #{contract.id}</h3>
            <p>Valor: R$ {contract.rentalValue.toFixed(2)}</p>
            <p>Vencimento: Todo dia {contract.dueDate}</p>
            <p>Status: {contract.paymentStatus}</p>
            <div className="status-buttons">
              <button className="button-paid">Marcar como Pago</button>
              <button className="button-pending">Marcar como Pendente</button>
              <button className="button-late">Marcar como Atrasado</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalContractList;