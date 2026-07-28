export function BrandLogo() {
  return (
    <svg className="brand-logo" viewBox="0 0 220 48" role="img" aria-label="LOEME Quote">
      <path d="M6 6.5C6 4.567 7.567 3 9.5 3H26.4L36 12.6V40.5C36 42.433 34.433 44 32.5 44H9.5C7.567 44 6 42.433 6 40.5V6.5Z" fill="currentColor" />
      <path d="M26 3V11C26 12.105 26.895 13 28 13H36" fill="none" stroke="var(--surface)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14.2 22.1H19.8V27.7C19.8 30.9 17.8 33 14.2 33.7V30.4C15.8 30 16.5 29.1 16.5 27.7H14.2V22.1ZM23.1 22.1H28.7V27.7C28.7 30.9 26.7 33 23.1 33.7V30.4C24.7 30 25.4 29.1 25.4 27.7H23.1V22.1Z" fill="var(--surface)" />
      <circle cx="35" cy="39" r="5" fill="var(--green)" stroke="var(--surface)" strokeWidth="2" />
      <text x="48" y="30.8" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="750" letterSpacing="-1.1">LOEME</text>
      <text x="136" y="30.8" fill="var(--green-dark)" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="750" letterSpacing="-1.1">Quote</text>
    </svg>
  );
}
