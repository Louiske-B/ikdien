/** Zichtbaar label op elke kaart met voorbeelddata. */
export default function Voorbeeld({ className = "" }: { className?: string }) {
  return <span className={`label-voorbeeld ${className}`}>Voorbeeld</span>;
}
