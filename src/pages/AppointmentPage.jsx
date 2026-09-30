import { AppointmentForm } from '../components/appointments/AppointmentForm';
import { BookingPageShell } from '../components/layout/BookingPageShell';

export function AppointmentPage() {
  return (
    <BookingPageShell>
      <AppointmentForm />
    </BookingPageShell>
  );
}
