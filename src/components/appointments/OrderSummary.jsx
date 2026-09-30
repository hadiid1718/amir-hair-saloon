import { Scissors } from 'lucide-react';
import { formatPrice } from './bookingUtils';

/**
 * The "Your order" side panel. Children render underneath the totals (CTA + hints).
 * `advance` optionally adds the "pay now" line once checkout is reached.
 */
export function OrderSummary({ provider, services, totalPrice, totalDuration, caption, advance, children }) {
  const hideOnTablet = 'max-tablet:hidden';

  return (
    <aside className="sticky top-[94px] min-w-0 rounded-lg border border-[rgba(17,17,17,.08)] bg-white max-tablet:static max-tablet:order-first">
      <div className="p-4 max-tablet:px-[15px] max-tablet:py-[13px]">
        <span className="mb-1 block text-[10px] font-bold">Your order</span>
        <span className="block border-b border-line pb-3 text-[7px] text-faint">Asad Hair Saloon</span>

        {provider && (
          <div className="flex items-center gap-2 border-b border-line py-3 max-tablet:border-b-0 max-tablet:pb-0 max-tablet:pt-2">
            <div className="grid size-[27px] flex-none place-items-center overflow-hidden rounded-full bg-[#f5f5f3] text-muted">
              {provider.image ? <img className="size-full object-cover" src={provider.image} alt="" /> : <Scissors size={15} />}
            </div>
            <div className="grid gap-0.5">
              <strong className="text-[8px]">{provider.name}</strong>
              <span className="text-[7px] text-muted">{caption}</span>
            </div>
          </div>
        )}

        <div className={`grid gap-[9px] py-2.5 ${hideOnTablet}`}>
          {services.length === 0 ? (
            <div className="grid gap-1 py-[9px]">
              <span className="text-[8px] text-muted">No services selected yet.</span>
              <small className="text-[7px] leading-[1.5] text-faint">Your services, time and total will appear here.</small>
            </div>
          ) : services.map((service) => (
            <div className="flex justify-between gap-2.5" key={service.id}>
              <div className="grid gap-0.5">
                <strong className="text-[8px] leading-[1.35]">{service.name}</strong>
                <span className="text-[7px] text-muted">{service.duration} min</span>
              </div>
              <strong className="text-[8px] leading-[1.35]">{formatPrice(service.price)}</strong>
            </div>
          ))}
        </div>

        <div className={`flex items-baseline justify-between border-t border-line pt-2.5 ${hideOnTablet}`}>
          <span className="text-[8px] text-muted">Subtotal</span>
          <strong className="text-[9px]">{formatPrice(totalPrice)}</strong>
        </div>

        {advance && (
          <div className={`mt-1.5 flex items-baseline justify-between ${hideOnTablet}`}>
            <span className="text-[8px] text-muted">{advance.label}</span>
            <strong className="text-[9px]">{formatPrice(advance.amount)}</strong>
          </div>
        )}

        <div className={`mt-[3px] text-[7px] text-faint ${hideOnTablet}`}>Total time: {totalDuration || 0} min</div>

        {children}
      </div>
    </aside>
  );
}

/** The navy call-to-action used in the order panel. Stays clickable when `blocked` so it can explain what is missing. */
export function OrderCta({ blocked = false, busy = false, children, ...props }) {
  return (
    <button
      className={`mt-3.5 flex min-h-[35px] w-full items-center justify-center gap-1.5 rounded-[5px] bg-navy text-[8px] font-bold text-white transition duration-[180ms] ${blocked || busy ? 'opacity-[.42]' : 'hover:-translate-y-px'} ${busy ? 'cursor-wait' : ''}`}
      aria-disabled={blocked || busy}
      {...props}
    >
      {children}
    </button>
  );
}

export function OrderHint({ children }) {
  if (!children) return null;
  return <p className="mb-0 mt-[9px] text-center text-[7px] leading-[1.55] text-faint">{children}</p>;
}
