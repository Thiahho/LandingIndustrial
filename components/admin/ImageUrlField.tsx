"use client";

import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type ImageUrlFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
};

export function ImageUrlField({
  label,
  value,
  onChange,
  helper,
}: ImageUrlFieldProps) {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.info &&
      typeof result.info === "object" &&
      "public_id" in result.info
    ) {
      onChange(result.info.public_id as string);
    }
  };

  return (
    <div className="grid gap-3 text-sm font-semibold">
      <span>{label}</span>

      <div className="flex flex-wrap gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none"
          placeholder="Public ID de Cloudinary"
        />
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <CldUploadWidget
          uploadPreset="AMSeguridad"
          onSuccess={handleUploadSuccess}
          options={{
            maxFiles: 1,
            resourceType: "image",
            sources: ["local", "url", "camera"],
            styles: {
              palette: {
                window: "#1a1a2e",
                windowBorder: "#6366f1",
                tabIcon: "#6366f1",
                menuIcons: "#6366f1",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#6366f1",
                action: "#6366f1",
                inactiveTabIcon: "#6b7280",
                error: "#ef4444",
                inProgress: "#6366f1",
                complete: "#22c55e",
                sourceBg: "#0f0f23",
              },
            },
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-400 hover:bg-green-500/20 transition-colors"
            >
              Subir imagen
            </button>
          )}
        </CldUploadWidget>

        {value && (
          <div className="relative overflow-hidden rounded-xl border border-white/10">
            <CldImage
              src={value}
              width={120}
              height={80}
              alt="Vista previa"
              crop={{ type: "fill", gravity: "auto" }}
              className="object-cover"
            />
          </div>
        )}
      </div>

      {helper ? <span className="text-xs text-am-muted">{helper}</span> : null}
    </div>
  );
}
