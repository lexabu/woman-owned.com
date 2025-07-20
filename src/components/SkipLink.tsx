export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-coral-500 text-white px-4 py-2 rounded-md font-semibold focus:ring-2 focus:ring-coral-700 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}