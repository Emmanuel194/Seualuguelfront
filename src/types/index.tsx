export interface Tenant {
  id?: string;
  name: string;
  cpf: string;
  birthdate: string;
  phone: string;
  email: string;
}

export interface RentalContract {
  id?: string;
  tenantId: string;
  rentalValue: number;
  startDate: string;
  dueDate: number; 
  paymentStatus: 'PENDING' | 'PAID' | 'LATE';
  notes?: string;
}