import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 z-50 bg-sky-400 text-black font-display px-6 py-3 rounded-lg shadow-lg animate-fade-in">
      {message}
    </div>
  );
};

export default Notification;
