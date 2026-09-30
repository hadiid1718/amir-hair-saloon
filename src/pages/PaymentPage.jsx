import { PaymentFlow } from '../components/payment/PaymentFlow';
import { BookingPageShell } from '../components/layout/BookingPageShell';

export function PaymentPage() {
  return (
    <BookingPageShell>
      <PaymentFlow />
    </BookingPageShell>
  );
}
