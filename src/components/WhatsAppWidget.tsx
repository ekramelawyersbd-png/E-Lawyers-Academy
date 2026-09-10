import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  return (
    <a
      href="https://wa.me/8801700000000?text=Hello%20E-Lawyers%20Academy%20Support!%20I%20have%20a%20query%20regarding%20course%20enrollment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-emerald-300 group cursor-pointer"
      title="Chat with Admission Helpline on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-slate-950 text-emerald-500" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-extrabold text-xs ml-0 group-hover:ml-2">
        WhatsApp Helpline
      </span>
    </a>
  );
};
