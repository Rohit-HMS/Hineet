"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Instrument_Sans } from "next/font/google";
import { LiaLinkedin } from "react-icons/lia";
import { fetchContactPage, type ContactPageData, type ContactInfoItem } from "@/lib/api";
import { useLivePreview } from "@payloadcms/live-preview-react";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

const defaultContactData: ContactPageData = {
  heading: "Let's Connect.",
  description: "Have a question, partnership proposal, or just want to say hi? We'd love to hear from you.",
  contactInfo: [
    { icon: "map-pin", label: "HeadQuarter", value: "Sudarshan Enclave, Sector 3,\nUdaipur, Rajasthan 313001, India.", href: "https://maps.google.com/?q=Sudarshan+Enclave,+Sector+3,+Udaipur,+Rajasthan+313001,+India" },
    { icon: "mail", label: "General Inquiries", value: "hineettechprivatelimited@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=hineettechprivatelimited@gmail.com" },
    { icon: "phone", label: "Phone", value: "+91 9664134872", href: "tel:+919664134872" },
    { icon: "linkedin", label: "Linkedin", value: "Hineet Tech Pvt. Ltd", href: "https://www.linkedin.com/company/hineet-tech-pvt-ltd/" },
  ],
  formTitle: "Send us a message",
};

const getContactIcon = (iconName: string) => {
  switch (iconName) {
    case "map-pin":
      return MapPin;
    case "mail":
      return Mail;
    case "phone":
      return Phone;
    case "linkedin":
    default:
      return LiaLinkedin;
  }
};

const renderSecondWordBlue = (text: string) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length < 2) return text;
  
  return (
    <>
      {words[0]}{" "}
      <span className="blue-gradient-text italic pr-4">
        {words[1]}
      </span>
      {words.length > 2 && " " + words.slice(2).join(" ")}
    </>
  );
};

export default function Contact() {
  const [initialData, setInitialData] = useState<ContactPageData | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    fetchContactPage().then((data) => {
      if (data) {
        setInitialData(data);
      }
    });
  }, []);

  const { data: liveData } = useLivePreview<ContactPageData>({
    initialData: initialData as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedData = liveData?.heading ? liveData : initialData;
  const activeData = resolvedData || defaultContactData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}/api/contact-submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-40 pb-20 w-full min-h-screen bg-transparent relative overflow-hidden">
      {/* Ambient */}
      <div className="ambient-orb w-[60vw] h-[60vw] bg-[#2563EB]/06 top-0 right-0 blur-[150px]" />
      <div className="ambient-orb w-[40vw] h-[40vw] bg-[#60A5FA]/05 bottom-0 left-0 blur-[100px]" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-16 relative z-10">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:w-1/2"
        >
          <h1 className={`${instrumentSans.className} text-[#FFFFFF] text-5xl md:text-[5.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm`}>
            {renderSecondWordBlue(activeData.heading)}
          </h1>
          <p className="text-2xl text-[#737373] font-medium leading-relaxed mb-16 max-w-md">
            {activeData.description}
          </p>

          <div className="space-y-8">
            {(activeData.contactInfo || []).map((info: ContactInfoItem, idx: number) => {
              const Icon = getContactIcon(info.icon);
              return (
                <a 
                  key={info.label || idx} 
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#171717] border border-[#262626] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB]/10 group-hover:border-[#2563EB]/30 transition-all duration-200">
                    <Icon size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2563EB] mb-1 tracking-wide uppercase group-hover:text-[var(--text-primary)] transition-colors duration-200">
                      {info.label}
                    </h4>
                    <p className="text-[#737373] text-lg leading-relaxed whitespace-pre-line group-hover:text-[#A3A3A3] transition-colors duration-200">
                      {info.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:w-1/2"
        >
          <div className="glass-card p-10 rounded-[2.5rem] border border-[#262626] shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <h2 className={`${instrumentSans.className} text-[#FFFFFF] text-3xl md:text-4xl font-light tracking-wide leading-[1.1] mb-8 drop-shadow-sm`}>
              {activeData.formTitle}
            </h2>
            {submitStatus === "success" && (
              <div className="mb-6 p-4 rounded-2xl text-sm font-semibold alert-success">
                Your message has been sent successfully! We will get back to you shortly.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 rounded-2xl text-sm font-semibold alert-error">
                Failed to send message. Please try again.
              </div>
            )}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#737373] uppercase tracking-widest">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-white w-full rounded-2xl px-5 py-4 text-base bg-transparent border border-[#262626] text-white outline-none focus:border-[#2563EB]"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#737373] uppercase tracking-widest">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-white w-full rounded-2xl px-5 py-4 text-base bg-transparent border border-[#262626] text-white outline-none focus:border-[#2563EB]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#737373] uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-white w-full rounded-2xl px-5 py-4 text-base bg-transparent border border-[#262626] text-white outline-none focus:border-[#2563EB]"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#737373] uppercase tracking-widest">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-white w-full rounded-2xl px-5 py-4 text-base bg-transparent border border-[#262626] text-white outline-none focus:border-[#2563EB]"
                  placeholder="How can we help?"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#737373] uppercase tracking-widest">Message</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-white w-full rounded-2xl px-5 py-4 text-base resize-none bg-transparent border border-[#262626] text-white outline-none focus:border-[#2563EB]"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-5 mt-2 blue-gradient-btn text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(37,99,235,0.35)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
