import { Helmet } from "react-helmet-async";
import { ShieldCheck, RotateCcw, AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Returns() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Return Policy | A One Sports Batkhela</title>
      </Helmet>

      <div className="text-center mb-16">
        <div className="inline-flex bg-primary/10 p-3 rounded-2xl text-primary mb-4">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white">
          RETURN & <span className="text-primary italic">EXCHANGE</span>
        </h1>
        <p className="text-gray-500 font-medium mt-3">Read about our 7-day checking warranty and exchange guidelines.</p>
      </div>

      <div className="space-y-8 mb-12">
        <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8">
          <h3 className="font-display font-black uppercase text-lg text-primary mb-6 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" /> 7-Day Checking Warranty
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
            We provide a 100% transparent **7-day checking warranty** on all unused items. If there is a manufacturing defect, physical damage upon delivery, or you received the incorrect size/model, you can request an exchange or refund within 7 days of receiving the package.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8">
            <h3 className="font-display font-black uppercase text-lg text-white mb-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" /> Return Eligibility
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-medium list-disc list-inside">
              <li>Item must be unused and in original packaging.</li>
              <li>Holograms, tags, and wrappers must be intact.</li>
              <li>Cricket bats must not have oiling, knocking, or face tape applied post-delivery.</li>
              <li>Return request must be logged within 7 days.</li>
            </ul>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8">
            <h3 className="font-display font-black uppercase text-lg text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Non-Returnable Items
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-medium list-disc list-inside">
              <li>Customized team uniforms or customized print items.</li>
              <li>English Willow bats that have already been knocked or oiled.</li>
              <li>Items purchased during clearance or end-of-season sales (eligible for size exchange only).</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 space-y-4">
          <h3 className="font-display font-black uppercase text-xl text-white">How to initiate a return?</h3>
          <ol className="space-y-4 text-xs sm:text-sm text-gray-400 font-medium list-decimal list-inside">
            <li>Take clear photos of the item showing any defect or issue.</li>
            <li>Send a message to our WhatsApp support line (**0300 9070260**) or email us at **returns@aonesports.com** with your order number.</li>
            <li>Once approved, package the item securely and send it back to our store address (A One Sports, Main Bazar Batkhela).</li>
            <li>Upon receiving and inspecting the package, we will dispatch the exchange item or process a refund to your Easypaisa/JazzCash or bank account within 3 business days.</li>
          </ol>
        </div>
      </div>

      <div className="text-center">
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-3 bg-primary text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all"
        >
          Contact Return Support
        </Link>
      </div>
    </div>
  );
}
