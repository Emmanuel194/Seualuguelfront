// src/components/RentalContractForm.tsx
import React, { useState } from 'react';
import { Tenant, RentalContract } from '../types';

interface RentalContractFormProps {
  tenants: Tenant[];
  onSave: (contract: RentalContract) => void;
}

const RentalContractForm: React.FC<RentalContractFormProps> = ({ tenants, onSave }) => {
  const [contractData, setContractData] = useState<Omit<RentalContract, 'id'>>({
    tenantId: '',
    rentalValue: 0,
    startDate: '',
    dueDate: 1,
    paymentStatus: 'PENDING',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(contractData);
  };

  return (
    <div className="form-container">
      <h2>Novo Contrato de Aluguel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Inquilino</label>
          <select
            value={contractData.tenantId}
            onChange={(e) => setContractData({ ...contractData, tenantId: e.target.value })}
            required
          >
            <option value="">Selecione um inquilino</option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Valor do Aluguel</label>
          <input
            type="number"
            value={contractData.rentalValue}
            onChange={(e) => setContractData({ ...contractData, rentalValue: Number(e.target.value) })}
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Início</label>
          <input
            type="date"
            value={contractData.startDate}
            onChange={(e) => setContractData({ ...contractData, startDate: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Dia do Vencimento</label>
          <input
            type="number"
            min="1"
            max="31"
            value={contractData.dueDate}
            onChange={(e) => setContractData({ ...contractData, dueDate: Number(e.target.value) })}
            required
          />
        </div>

        <div className="form-group">
          <label>Observações</label>
          <textarea
            value={contractData.notes}
            onChange={(e) => setContractData({ ...contractData, notes: e.target.value })}
          />
        </div>

        <button type="submit">Salvar Contrato</button>
      </form>
    </div>
  );
};

export default RentalContractForm;