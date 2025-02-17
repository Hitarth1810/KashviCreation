import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "919376421333"; // Replace with your WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center w-14 h-14"
    >
      <FaWhatsapp size={30} /> {/* WhatsApp icon */}
    </a>
  );
};

export default WhatsAppButton;
