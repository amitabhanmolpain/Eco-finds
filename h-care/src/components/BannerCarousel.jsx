import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { id: 1, title: '50% off on Jackets', subtitle: 'Stay warm with half price on selected jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
  { id: 2, title: 'Sell your used goods here', subtitle: 'Clean your room, earn cash — list in minutes', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' },
  { id: 3, title: 'Study Material Sale', subtitle: 'Bundles and notes at student-friendly prices', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' },
];

const BannerCarousel = ({ interval = 3500 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="w-full relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`transition-all duration-500 ease-in-out ${i === index ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 -translate-x-full'}`}
        >
          <div className="w-full h-48 md:h-56 lg:h-64 flex items-center justify-between bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-8 md:px-12">
            <div className="text-white flex-1 max-w-2xl">
              <div className="text-2xl md:text-4xl font-bold mb-3">{s.title}</div>
              <div className="text-sm md:text-lg opacity-95 font-medium">{s.subtitle}</div>
            </div>
            <div className="hidden md:flex w-48 h-48 bg-white rounded-2xl shadow-2xl p-4 items-center justify-center ml-8">
              <img src={s.image} alt={s.title} className="max-h-full max-w-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      ))}

      {/* controls */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-600 p-3 rounded-full shadow-lg transition-all hover:scale-110">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-600 p-3 rounded-full shadow-lg transition-all hover:scale-110">
        <ChevronRight size={24} />
      </button>

      {/* indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
