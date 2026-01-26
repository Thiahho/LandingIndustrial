"use client";

import { toWebp } from "@/lib/cloudinary";

type ImageUrlFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
};

export function ImageUrlField({ label, value, onChange, helper }: ImageUrlFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <div className="flex flex-wrap gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={() => onChange(toWebp(value))}
          className="rounded-full border border-am-primary/40 bg-am-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-am-primaryStrong"
        >
          Convertir a WebP
        </button>
      </div>
      {helper ? <span className="text-xs text-am-muted">{helper}</span> : null}
    </label>
  );
}
