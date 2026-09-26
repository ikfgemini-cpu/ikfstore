'use client';

import { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [whatsappNumber, setWhatsappNumber] = useState('6281234567890');

  useEffect(() => {
    // Fetch settings to get the dynamic whatsapp number
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.whatsappNumber) {
          setWhatsappNumber(data.whatsappNumber);
        }
      })
      .catch(err => console.error("Failed to load settings:", err));
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=Hello,%20I%20need%20help%20with%20my%20order.`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contact Customer Service on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.004 2c-5.465 0-9.92 4.417-9.92 9.873 0 1.93.535 3.824 1.558 5.485l-1.42 5.068 5.253-1.365a9.882 9.882 0 004.53 1.09h.004c5.463 0 9.919-4.418 9.919-9.875C21.928 6.818 17.467 2 12.004 2zm0 18.067c-1.636 0-3.238-.432-4.643-1.25l-.333-.195-3.45.897.925-3.32-.214-.337a8.211 8.211 0 01-1.282-4.437c0-4.572 3.791-8.293 8.441-8.293 4.65 0 8.441 3.722 8.441 8.294 0 4.571-3.79 8.293-8.441 8.293h-.001a8.272 8.272 0 01-4.443-1.651zM16.634 13.916c-.253-.125-1.503-.733-1.737-.816-.233-.083-.404-.125-.574.125-.17.25-.66.816-.807.983-.149.167-.297.187-.55.062-1.127-.55-2.071-1.25-2.85-2.226-.214-.266.212-.244.7-.912.085-.118.043-.223-.001-.307-.043-.083-.574-1.365-.787-1.868-.208-.492-.419-.425-.574-.433-.149-.007-.319-.009-.489-.009-.17 0-.447.062-.68.312-.234.25-.893.86-8.893 2.096s.617 2.457.935 2.875c.319.418 1.95 2.94 4.717 4.116.659.28 1.173.447 1.573.571.661.206 1.264.177 1.74.107.534-.078 1.503-.604 1.716-1.188.213-.584.213-1.084.149-1.188-.064-.105-.234-.167-.487-.292z" />
      </svg>
    </button>
  );
}
