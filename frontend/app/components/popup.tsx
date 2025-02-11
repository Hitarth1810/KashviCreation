import React from "react"

interface PopupProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export default function Popup({ message, type, onClose }: PopupProps) {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="mt-20 bg-white p-4 rounded-md shadow-md animate-slideDown flex items-center gap-4">
        {type === "success" ? (
          <svg
            className="w-6 h-6 text-green-600 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-red-600 animate-shake"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        )}
        <p className={`text-${type === "success" ? "green" : "red"}-600`}>{message}</p>
        <button
          onClick={onClose}
          className="ml-auto bg-[#8B1B48] text-white py-1 px-3 rounded-md hover:bg-[#6B1537] transition-colors duration-200"
        >
          Close
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-20px);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-10px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}