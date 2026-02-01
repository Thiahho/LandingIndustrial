import Image from "next/image";

type CloudinaryImageProps = {
  publicId: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const q = quality || 80;

  // Si ya es una URL completa, retornarla
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${q},w_${width}/${src}`;
};

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
}: CloudinaryImageProps) {
  if (!publicId) {
    return null;
  }

  // Si es URL externa, usar el componente Image directamente
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return (
      <Image
        src={publicId}
        alt={alt}
        width={fill ? undefined : (width || 800)}
        height={fill ? undefined : (height || 600)}
        fill={fill}
        className={className}
        priority={priority}
        sizes={sizes}
        unoptimized
      />
    );
  }

  return (
    <Image
      loader={cloudinaryLoader}
      src={publicId}
      alt={alt}
      width={fill ? undefined : (width || 800)}
      height={fill ? undefined : (height || 600)}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
    />
  );
}
