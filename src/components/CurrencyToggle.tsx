import { Currency, currencyConfig } from "../config/site";

interface CurrencyToggleProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
}

export default function CurrencyToggle({ currency, onChange }: CurrencyToggleProps) {
  return (
    <div className="inline-flex items-center bg-surface-700/80 rounded-xl p-1 border border-white/5">
      {(Object.keys(currencyConfig.symbols) as Currency[]).map((cur) => (
        <button
          key={cur}
          onClick={() => onChange(cur)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            currency === cur
              ? "bg-brand-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {currencyConfig.symbols[cur]} {cur}
        </button>
      ))}
    </div>
  );
}
