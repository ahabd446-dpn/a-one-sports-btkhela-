import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Where is A One Sports located?",
    a: "We are physically located in the Main Bazar Batkhela, Malakand, Khyber Pakhtunkhwa, Pakistan. You are always welcome to visit our retail outlet to check out and feel the gear yourself."
  },
  {
    q: "Do you deliver all over Pakistan?",
    a: "Yes! We offer nationwide shipping across Pakistan. For orders within Khyber Pakhtunkhwa (Peshawar, Swat, Mardan, etc.), delivery usually takes 2-3 business days. For other provinces, it takes 3-5 business days."
  },
  {
    q: "How much are the shipping charges?",
    a: "We provide FREE delivery for all orders above Rs. 5,000. For orders under Rs. 5,000, we charge a flat shipping fee of Rs. 250."
  },
  {
    q: "Are your CA and SS products authentic?",
    a: "Absolutely. We are authorized dealers of CA Sports and SS (Sareen Sports) equipment. Every bat and accessory comes directly from official manufacturing facilities and includes authorized security holograms and registration scratch codes."
  },
  {
    q: "Can I return a product if it doesn't fit or is damaged?",
    a: "Yes, we have a hassle-free 7-day return policy. If you receive a product that is damaged or doesn't match the description, you can contact our support team to arrange a return or exchange. Please note that custom-knocked bats cannot be returned."
  },
  {
    q: "What is your bat knocking service?",
    a: "We offer professional machine knocking and oiling services for green English Willow and Kashmir Willow bats. Standard knocking takes 24-48 hours. You can request this service in the order notes during checkout or contact us directly."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>FAQ | A One Sports Batkhela</title>
      </Helmet>

      <div className="text-center mb-16">
        <div className="inline-flex bg-primary/10 p-3 rounded-2xl text-primary mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white">
          FREQUENTLY ASKED <span className="text-primary italic">QUESTIONS</span>
        </h1>
        <p className="text-gray-500 font-medium mt-3">Find answers to common queries about our products and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-sm sm:text-base text-white hover:text-primary transition-colors">
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 ml-4" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[300px] border-t border-[#1f1f1f]/50 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="px-6 py-5 text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-primary text-black p-3.5 rounded-2xl shrink-0 hidden sm:block">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg text-white">Still have questions?</h3>
            <p className="text-gray-500 text-xs font-medium mt-1">Get in touch with our support team in Batkhela.</p>
          </div>
        </div>
        <Link 
          to="/contact" 
          className="bg-primary text-black px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
