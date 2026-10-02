import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/siteData';
import { darkPill, monoKicker, referenceSectionY, sectionPad } from '../../utils/ui';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className={`${referenceSectionY} ${sectionPad} bg-paper`}>
      <div className="mx-auto mb-6 max-w-[550px] text-center">
        <span className={monoKicker}>Still curious?</span>
        <h2 className="my-[7px] text-[clamp(20px,2.3vw,36px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[24px]">
          Questions? We've Got Answers
        </h2>
        <p className="m-0 text-[12px] text-muted">Everything you need to know before taking your seat.</p>
      </div>

      <div className="mx-auto w-[min(600px,100%)] border-t border-line">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div className="border-b border-line" key={faq.question}>
              <button
                className="flex w-full items-center justify-between gap-[15px] py-[13px] text-left text-[12px]"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span className="flex-1 text-[12px] font-semibold">{faq.question}</span>
                <ChevronDown className={`flex-none transition-transform duration-[180ms] ${open ? 'rotate-180' : ''}`} size={13} />
              </button>
              <div className={`overflow-hidden text-[12px] leading-[1.6] text-muted transition-[max-height,padding-bottom] duration-200 ${open ? 'max-h-[120px] pb-3' : 'max-h-0'}`}>
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-[18px] flex justify-center">
        <button className={darkPill} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button>
      </div>
    </section>
  );
}
