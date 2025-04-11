import { Appointment } from "../interfaces";

export class AppointmentService {
    private appointments: Appointment[] = [];
  
    addAppointment(appointment: Appointment): void {
      this.appointments.push(appointment);
    }
  
    getAppointmentsByUser(userId: number): Appointment[] {
      return this.appointments.filter(appointment => appointment.userId === userId);
    }
  
    getAppointmentById(id: number): Appointment | undefined {
      return this.appointments.find(appointment => appointment.id === id);
    }
  }
  