import { Check, Scissors } from 'lucide-react';
import { bookingProviders } from '../../../data/bookingData';
import { emphasis } from '../../../utils/ui';
import { stepLabel, stepLead, stepSection, stepTitle } from '../bookingClasses';

export function ProfessionalStep({ providerId, onSelect }) {
  return (
    <section className={stepSection}>
      <span className={stepLabel}>Step 01 · Professional</span>
      <h1 className={stepTitle}>Choose a <em className={emphasis}>professional.</em></h1>
      <p className={stepLead}>
        Each professional offers different services. Select who you would like to book with.
      </p>

      <div className="mt-7 grid grid-cols-[repeat(2,minmax(120px,165px))] gap-3 max-mobile:grid-cols-[repeat(2,minmax(0,1fr))]" role="radiogroup" aria-label="Professional">
        {bookingProviders.map((item) => {
          const selected = providerId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(item.id)}
              className={`relative flex min-h-[150px] flex-col items-center justify-center gap-[5px] rounded-lg border bg-white p-[13px] text-center transition duration-200 hover:-translate-y-0.5 max-mobile:min-h-[135px] ${
                selected ? 'border-faint/50 shadow-[0_5px_18px_rgba(17,17,17,.07)]' : 'border-ink/10 hover:border-ink/28'
              }`}
            >
              <div className="mb-[5px] grid size-[54px] place-items-center overflow-hidden rounded-full bg-[#f5f5f3] text-faint">
                {item.image ? <img className="size-full object-cover" src={item.image} alt="" /> : <Scissors size={22} strokeWidth={1.5} />}
              </div>
              <strong className="text-[11px] font-bold">{item.name}</strong>
              <span className="text-[8px] leading-[1.45] text-muted">{item.subtitle}</span>
              {selected && (
                <span className="absolute right-[9px] top-[9px] grid size-[18px] place-items-center rounded-full bg-ink text-white">
                  <Check size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
