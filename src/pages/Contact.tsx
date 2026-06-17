import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contact Us | A One Sports Batkhela</title>
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-white tracking-tighter">
          GET IN <span className="text-primary italic">TOUCH</span>
        </h1>
        <p className="text-gray-500 font-medium mt-3 text-sm max-w-lg mx-auto">
          Have questions about pricing, bulk orders, or custom bat knocking? Reach out to our team in Batkhela.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Contact info cards */}
        <div className="space-y-6">
          <div className="bg-[#111] border border-[#1f1f1f] p-6 rounded-2xl flex gap-5 hover:border-primary/30 transition-colors">
            <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0 h-12 w-12 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">Our Location</h3>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">Main Bazar Batkhela, Malakand, Khyber Pakhtunkhwa, Pakistan</p>
            </div>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] p-6 rounded-2xl flex gap-5 hover:border-primary/30 transition-colors">
            <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0 h-12 w-12 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">WhatsApp Support</h3>
              <a href="tel:03009070260" className="text-gray-400 hover:text-primary text-xs sm:text-sm font-medium transition-colors">0300 9070260</a>
            </div>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] p-6 rounded-2xl flex gap-5 hover:border-primary/30 transition-colors">
            <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0 h-12 w-12 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">Email Inquiry</h3>
              <a href="mailto:info@aonesports.com" className="text-gray-400 hover:text-primary text-xs sm:text-sm font-medium transition-colors">info@aonesports.com</a>
            </div>
          </div>

          <div className="bg-[#111] border border-[#1f1f1f] p-6 rounded-2xl flex gap-5 hover:border-primary/30 transition-colors">
            <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0 h-12 w-12 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">Business Hours</h3>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">Mon - Sun: 8:00 AM - 8:00 PM</p>
              <p className="text-gray-500 text-[10px] mt-0.5 font-bold uppercase">(Friday Break: 12:00 PM - 2:00 PM)</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#111] border border-[#1f1f1f] p-8 sm:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-black uppercase text-white mb-2">Message Sent Successfully</h3>
              <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto mb-8">
                Thank you for reaching out to A One Sports. We will reply to your email or WhatsApp message as soon as possible.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl py-3 px-4 text-sm focus:border-primary outline-none transition-colors text-white"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl py-3 px-4 text-sm focus:border-primary outline-none transition-colors text-white"
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl py-3 px-4 text-sm focus:border-primary outline-none transition-colors text-white"
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl py-3 px-4 text-sm focus:border-primary outline-none transition-colors text-white resize-none"
                  placeholder="Type your message details here..."
                />
                {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending Message..." : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full aspect-video md:aspect-[3/1] rounded-3xl overflow-hidden border border-[#1f1f1f] relative group">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13146.402434407335!2d71.9575195!3d34.6148384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc2ec1d4f64d4b%3A0xc3c509373ea2f6bf!2sBatkhela%2C%20Malakand%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2spk!4v1718395000000!5m2!1sen!2spk" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-750"
        ></iframe>
      </div>
    </div>
  );
}
