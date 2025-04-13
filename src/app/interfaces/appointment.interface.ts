export interface Appointment {
    id: number;
    userId: number; 
    deviceId: number;
    serviceId: number;
    date: string;
    status: 'folyamatban' | 'befejezve';
  }
  