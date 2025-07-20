export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading amazing women-owned businesses...</p>
      </div>
    </div>
  );
}