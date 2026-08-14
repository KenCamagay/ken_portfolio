import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type ProjectPreviewProps = {
  title: string;
  images?: string[];
};

export default function ProjectPreview({
  title,
  images = [],
}: ProjectPreviewProps) {
  const image = images[0];

  if (!image) {
    return (
      <div className="flex h-full min-h-60 items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <ArrowUpRight className="h-7 w-7 text-blue-300" />
          </div>

          <p className="text-sm text-slate-500">
            Project Preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <Image
        src={image}
        alt={`${title} project preview`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      {/* Subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
    </div>
  );
}