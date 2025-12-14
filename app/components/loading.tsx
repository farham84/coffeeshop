// components/Loader.tsx
"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cream2 z-50">
      <div className="relative w-24 h-24">
        <img
          src="/coffee.png"
          alt="coffee bean"
          className="w-16 h-16 animate-spin360"
        />
        ...Loading
      </div>
    </div>
  );
}
