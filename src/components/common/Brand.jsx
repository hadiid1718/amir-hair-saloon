import { site } from '../../data/siteData';

export function Brand({ onHome }) {
  return (
    <button
      className="inline-flex w-max flex-col items-start justify-self-start text-left"
      onClick={onHome}
      aria-label={`${site.name} home`}
    >
      <span className="text-[13px] font-extrabold leading-[.88] tracking-[-.035em]">{site.shortName}</span>
      <span className="mt-0.5 text-[7px] tracking-[.17em]">HAIR SALOON</span>
    </button>
  );
}
