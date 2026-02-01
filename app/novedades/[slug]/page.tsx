import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { newsPosts } from "@/lib/site-data";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = newsPosts.find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-10 pb-24 pt-28">
        <section className="space-y-6">
          <p className="eyebrow">{post.category}</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">{post.title}</h1>
          <p className="text-sm text-am-silver">{post.date}</p>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={buildCloudinaryUrl(post.image)}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-am-muted">
            <p>
              {post.excerpt} En AM Seguridad trabajamos con protocolos claros y
              tecnología confiable para que cada empresa tenga una respuesta
              inmediata. Contactanos si querés aplicar estas mejoras en tu
              operación.
            </p>
          </div>
          <a
            href="mailto:ventas@empresa.com?subject=Quiero%20aplicar%20esta%20novedad"
            className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
          >
            Quiero aplicar esto en mi empresa
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
