import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { emphasis } from '../../../utils/ui';
import { formatPrice } from '../bookingUtils';
import { backLink, errorNotice, primaryButton, stepLabel, stepLead, stepSection, stepTitle } from '../bookingClasses';

export function ServiceStep({ provider, selectedIds, onToggle, onBack, onContinue, error }) {
  return (
    <section className={stepSection}>
      <button className={backLink} type="button" onClick={onBack}>
        <ArrowLeft size={12} /> Back
      </button>
      <span className={`${stepLabel} mt-3`}>Step 02 · Service</span>
      <h1 className={stepTitle}>Anything to <em className={emphasis}>add?</em></h1>
      <p className={stepLead}>
        Services offered by {provider.name}. Select one or more services for your visit.
      </p>

      {error && <div role="alert" className={errorNotice}>{error}</div>}

      <div className="grid max-w-[620px] grid-cols-2 gap-[9px] max-mobile:grid-cols-1">
        {provider.services.map((service) => {
          const selected = selectedIds.includes(service.id);
          return (
            <button
              key={service.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(service.id)}
              className={`relative grid min-h-24 grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr] gap-x-3 rounded-lg border px-3.5 pb-3 pt-[13px] text-left transition duration-[180ms] hover:-translate-y-px ${
                selected ? 'border-navy bg-navy text-white' : 'border-ink/[.09] bg-white hover:border-ink/25'
              }`}
            >
              <span className="text-[12px] font-bold">{service.name}</span>
              <span className={`justify-self-end text-[12px] ${selected ? 'text-white/70' : 'text-muted'}`}>{service.duration} mins</span>
              <span className="col-span-full mt-[3px] text-[12px] font-bold">{formatPrice(service.price)}</span>
              <span className={`col-span-full mt-2 self-end text-[12px] ${selected ? 'text-white/70' : 'text-muted'}`}>{service.description}</span>
              <span className={`absolute bottom-2.5 right-[11px] grid size-[19px] place-items-center rounded-full border text-sm ${selected ? 'border-white/30 bg-white text-navy' : 'border-faint/50 text-muted'}`}>
                {selected ? <Check size={13} /> : '+'}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className={`${primaryButton} mt-4 ${selectedIds.length === 0 ? 'opacity-[.42]' : ''}`}
        aria-disabled={selectedIds.length === 0}
      >
        {selectedIds.length === 0 ? 'Select a service to continue' : `Continue with ${selectedIds.length} service${selectedIds.length > 1 ? 's' : ''}`}
        <ArrowRight size={13} />
      </button>
    </section>
  );
}
