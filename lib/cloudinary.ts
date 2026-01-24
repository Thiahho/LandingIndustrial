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
