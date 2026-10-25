import Image from "next/image";

/** Placeholder-logo. Vervang public/logo.svg door het echte logo (zelfde bestandsnaam of pas dit pad aan). */
export default function Logo({ size = 48 }: { size?: number }) {
  return <Image src="/logo.svg" alt="" width={size} height={size} priority />;
}
