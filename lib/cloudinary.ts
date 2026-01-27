const WEBP_TRANSFORMATION = "f_webp,q_auto";

export function toWebp(url: string) {
  if (!url) return url;

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  if (url.includes(`/upload/${WEBP_TRANSFORMATION}/`)) {
    return url;
  }

  return url.replace("/upload/", `/upload/${WEBP_TRANSFORMATION}/`);
}

export function buildCloudinaryUrl(publicId: string, transformation = WEBP_TRANSFORMATION) {
  if (!publicId) return "";

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return publicId;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`;
}
