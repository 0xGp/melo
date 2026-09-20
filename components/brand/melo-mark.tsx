import Image from "next/image";

export function MeloMark({
  className = "h-8 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/melo-mark.png"
      alt=""
      width={523}
      height={251}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
