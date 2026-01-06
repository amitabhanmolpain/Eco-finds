import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle size={20} className="flex-shrink-0" />,
    error: <AlertCircle size={20} className="flex-shrink-0" />,
    info: <Info size={20} className="flex-shrink-0" />,
  };

  const styles = {
    success: 'bg-emerald-500 border-emerald-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600',
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 ${styles[type]} text-white px-5 py-4 rounded-xl shadow-2xl border-2 flex items-center gap-3 min-w-[300px] max-w-md transition-all transform z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {icons[type]}
      <span className="flex-1 font-medium">{message}</span>
      <button 
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose && onClose(), 300);
        }}
        className="hover:bg-white/20 rounded-lg p-1 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
