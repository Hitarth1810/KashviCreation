"use client";

import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const faqs = [
  {
    question: "What types of sarees do you offer in wholesale?",
    answer: "We offer a wide range of sarees including Banarasi silk, Kanchipuram silk, Cotton, Georgette, Chiffon, and Designer sarees. Our collection features both traditional and contemporary designs."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we provide international shipping to most countries. Shipping time and methods may vary depending on your location."
  },
  {
    question: "What is the delivery time for orders?",
    answer: "Domestic orders typically take 5-7 business days. International orders may take 10-15 business days depending on the destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, we'll provide you with a tracking number via email that you can use to monitor your shipment's status."
  },
  {
    question: "What are your quality assurance measures?",
    answer: "Each saree undergoes strict quality checks for fabric quality, color fastness, and craftsmanship before dispatch. We ensure that only the finest pieces reach our customers."
  },
  {
    question: "Do you offer customization options?",
    answer: "Yes, we provide customization services for bulk orders. This includes design modifications, color variations, and blouse piece customization."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We accept returns within 7 days of delivery if the product is unused and in its original packaging. For wholesale orders, please contact our customer service for specific policies."
  },
  {
    question: "How do I care for my sarees?",
    answer: "Care instructions vary by fabric type. We provide detailed care labels with each saree. Generally, we recommend dry cleaning for silk sarees and gentle hand wash for cotton sarees."
  },
  {
    question: "What is the minimum order quantity?",
    answer: "Our minimum order quantity varies by design and fabric type. Generally, we require a minimum of 10 pieces per design for wholesale orders. Contact us for specific requirements."
  },
  {
    question: "Do you provide design consultation services?",
    answer: "Yes, our experienced team offers design consultation services to help you select the perfect sarees for your market. We can guide you through current trends, popular styles, and seasonal collections."
  }
];

export default function FAQ() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-[#FDF7F7]">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12">
          <h1 
            className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#8B0000]"
            style={{
              animation: 'fadeInDown 0.8s ease-out'
            }}
          >
            Frequently Asked Questions
          </h1>
          <div className="absolute -top-4 right-0 animate-sparkle">
            <Sparkles className="w-6 h-6 text-[#8B0000]" />
          </div>
          <div className="w-32 h-1 bg-[#8B0000] mx-auto mt-4 rounded-full"
            style={{
              animation: 'scaleWidth 1s ease-out'
            }}
          />
        </div>
        
        <style jsx>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scaleWidth {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }

          @keyframes sparkle {
            0%, 100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: scale(1.2) rotate(180deg);
              opacity: 0.8;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(139, 0, 0, 0.2);
            }
            50% {
              box-shadow: 0 0 20px rgba(139, 0, 0, 0.4);
            }
          }
        `}</style>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                transform: hoveredIndex === index ? 'translateX(10px)' : 'translateX(0)',
                boxShadow: hoveredIndex === index ? '0 10px 25px rgba(0,0,0,0.1)' : ''
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  background: hoveredIndex === index ? 'linear-gradient(45deg, #FDF7F7, white)' : 'white'
                }}
              >
                <span className="font-medium text-gray-800 transition-colors duration-300"
                  style={{
                    color: openIndex === index ? '#8B0000' : ''
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'rotate-180 text-[#8B0000]' : 'text-gray-500'
                  }`}
                  style={{
                    transform: `rotate(${openIndex === index ? '180deg' : '0deg'}) ${
                      hoveredIndex === index ? 'scale(1.2)' : 'scale(1)'
                    }`
                  }}
                />
              </button>
              
              <div
                className="transition-all duration-300 ease-in-out overflow-hidden bg-gray-50"
                style={{
                  maxHeight: openIndex === index ? '200px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                  transform: openIndex === index ? 'translateY(0)' : 'translateY(-10px)'
                }}
              >
                <p 
                  className="px-6 py-4 text-gray-600"
                  style={{
                    animation: openIndex === index ? 'scaleIn 0.3s ease-out' : 'none'
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="text-center mt-16 mb-8"
          style={{
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          <p className="text-gray-600 mb-6 text-lg">Still have questions?</p>
          <button 
            className="bg-[#8B0000] text-white px-8 py-3 rounded-full transition-all duration-300 relative group hover:bg-[#a00000]"
            onClick={() => router.push('/contact')}
            style={{
              animation: 'pulse 2s ease-in-out infinite, glow 3s infinite'
            }}
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-white rounded-full transition-all duration-300 group-hover:scale-95 -z-0 opacity-0 group-hover:opacity-20"></div>
          </button>
        </div>
      </div>
    </main>
  );
}