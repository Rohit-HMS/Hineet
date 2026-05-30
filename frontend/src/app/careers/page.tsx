"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { Plus, Minus, MapPin, Briefcase, ArrowRight, X, UserRound, Mail, Phone, UploadCloud } from "lucide-react";

function Portal({ children }: { children: ReactNode }) {
  const [mount, setMount] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setMount(document.body);
  }, []);
  if (!mount) return null;
  return createPortal(children, mount);
}

import { fetchJobs, fetchCareersPage, type CareersPageData } from "@/lib/api";
import { Job } from "@/data/jobs";

const defaultCareersHeroData: CareersPageData = {
  badge: "WE'RE HIRING",
  heading: "Join the *Movement*",
  description: "Shape the future of commerce and logistics with a team of relentless innovators.",
  perks: [
    { name: "Remote-first" },
    { name: "Equity Package" },
    { name: "Health Coverage" },
    { name: "Learning Budget" },
  ],
};

const deptColors: Record<string, string> = {
  Engineering: "bg-[#1E3A8A]/30 text-[#60A5FA] border-[#1E40AF]",
  Design: "bg-violet-900/30 text-violet-400 border-violet-800",
  Marketing: "bg-emerald-900/30 text-emerald-400 border-emerald-800",
};

function JobCard({ initialJob, i, openIndex, setOpenIndex, setSelectedJobTitle, setIsApplyModalOpen }: any) {
  const { data: liveJob } = useLivePreview({
    initialData: initialJob,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const job = (liveJob && liveJob.id === initialJob.id) ? liveJob : initialJob;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-[2rem] overflow-hidden group border border-[#262626]"
    >
      <button
        onClick={() => setOpenIndex(openIndex === i ? null : i)}
        className="w-full px-8 py-7 flex items-center justify-between text-left focus:outline-none"
      >
        <div>
          <h4 className="text-2xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#2563EB] transition-colors duration-200">{job.title}</h4>
          <div className="flex flex-wrap gap-3 mt-3 items-center">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${deptColors[job.dept] ?? "bg-[#171717] text-[#A3A3A3] border-[#262626]"}`}>{job.dept}</span>
            <span className="flex items-center gap-1 text-[#737373] text-sm font-medium"><MapPin size={13} />{job.location}</span>
            <span className="flex items-center gap-1 text-[#737373] text-sm font-medium"><Briefcase size={13} />{job.type}</span>
          </div>
        </div>
        <div className={`p-3.5 rounded-2xl transition-all duration-200 flex-shrink-0 ml-4 ${openIndex === i ? "blue-gradient-btn text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]" : "bg-[#171717] text-[#737373] group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB]"}`}>
          {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {openIndex === i && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 border-t border-[#262626]">
              <p className="mb-8 text-lg text-[#737373] leading-relaxed pt-6">{job.desc}</p>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedJobTitle(job.title);
                  setIsApplyModalOpen(true);
                }}
                className="flex items-center gap-2 px-8 py-4 blue-gradient-btn text-white rounded-2xl font-bold shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.45)] transition-all duration-200"
              >
                Apply Now <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Careers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [initialHeroData, setInitialHeroData] = useState<CareersPageData | undefined>(undefined);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    fetchJobs().then(setJobs);
    fetchCareersPage().then((data) => {
      if (data) {
        setInitialHeroData(data);
      }
    });
  }, []);

  const { data: liveHeroData } = useLivePreview<CareersPageData>({
    initialData: initialHeroData as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedData = liveHeroData?.heading ? liveHeroData : initialHeroData;
  const activeData = resolvedData || defaultCareersHeroData;

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !resumeFile) {
      alert("Please fill in all fields and upload your resume.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const mediaFormData = new FormData();
      mediaFormData.append("file", resumeFile);
      mediaFormData.append("_payload", JSON.stringify({ alt: `${fullName} Resume` }));

      const mediaRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}/api/media`, {
        method: "POST",
        body: mediaFormData,
      });

      if (!mediaRes.ok) {
        throw new Error("Failed to upload resume file.");
      }

      const mediaData = await mediaRes.json();
      const resumeId = mediaData.id || mediaData.doc?.id;

      const appRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}/api/job-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          jobTitle: selectedJobTitle,
          resume: resumeId,
        }),
      });

      if (appRes.ok) {
        setSubmitStatus("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setResumeFile(null);
        setTimeout(() => {
          setIsApplyModalOpen(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStyledText = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part: string, idx: number) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        const cleanPart = part.slice(1, -1);
        return (
          <span key={idx} className="blue-gradient-text italic">
            {cleanPart}
          </span>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    if (!isApplyModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsApplyModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isApplyModalOpen]);

  return (
    <div className="pt-40 pb-20 w-full min-h-screen bg-transparent relative overflow-hidden">
      <div className="ambient-orb w-[50vw] h-[50vw] bg-[#2563EB]/07 top-1/4 right-0 blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-20"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#2563EB] mb-4 block">
            {activeData.badge}
          </span>
          <h1 className="text-[#FFFFFF] text-5xl md:text-[5.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm">
            {renderStyledText(activeData.heading)}
          </h1>
          <p className="text-2xl text-[#737373] font-medium leading-relaxed max-w-2xl">
            {activeData.description}
          </p>
        </motion.div>

        {activeData.perks && activeData.perks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {activeData.perks.map((perk, idx) => (
              <div key={perk.id || idx} className="glass-card px-6 py-4 rounded-2xl text-center text-sm font-semibold text-[#A3A3A3]">
                {perk.name}
              </div>
            ))}
          </motion.div>
        )}

        <div className="max-w-5xl">
          <h3 className="text-[#FFFFFF] text-3xl md:text-5xl font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm">Open Roles</h3>
          <div className="flex flex-col gap-5">
            {jobs.map((job, i) => (
              <JobCard 
                key={i} 
                initialJob={job} 
                i={i} 
                openIndex={openIndex} 
                setOpenIndex={setOpenIndex} 
                setSelectedJobTitle={setSelectedJobTitle} 
                setIsApplyModalOpen={setIsApplyModalOpen} 
              />
            ))}
          </div>
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {isApplyModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]/65 backdrop-blur-xl px-4 py-6"
              onClick={() => setIsApplyModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 18 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[var(--glass-border)] bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-3xl"
              >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#60A5FA]/5 pointer-events-none" />
              <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#2563EB]/10 blur-[110px] pointer-events-none" />

              <div className="relative flex items-start justify-between gap-6 border-b border-[var(--glass-border)] px-6 py-6 sm:px-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#60A5FA]">Apply Now</p>
                  <h2 className="mt-3 text-2xl font-light tracking-wide text-[var(--text-primary)] sm:text-3xl">
                    Submit your application
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {selectedJobTitle ? `Applying for ${selectedJobTitle}` : "Share your details and resume with us."}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close application form"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/40 text-[var(--text-muted)] transition-all duration-200 hover:border-[#60A5FA]/40 hover:bg-[#2563EB]/10 hover:text-[var(--text-primary)] hover:shadow-[0_0_24px_rgba(37,99,235,0.22)]"
                >
                  <X size={18} className="transition-transform duration-200 group-hover:rotate-90" />
                </button>
              </div>

              {submitStatus === "success" && (
                <div className="mx-6 sm:mx-8 p-4 rounded-2xl text-sm font-semibold alert-success">
                  Application submitted successfully! closing modal...
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mx-6 sm:mx-8 p-4 rounded-2xl text-sm font-semibold alert-error">
                  Failed to submit application. Please try again.
                </div>
              )}
              <form className="relative grid gap-5 px-6 py-6 sm:px-8 sm:py-8" onSubmit={handleApplySubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Full Name</span>
                    <div className="group flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/35 px-4 py-4 transition-all duration-200 focus-within:border-[#60A5FA]/50 focus-within:bg-[var(--bg-primary)]/55 focus-within:shadow-[0_0_0_1px_rgba(96,165,250,0.18)]">
                      <UserRound size={18} className="text-[var(--text-muted)] transition-colors group-focus-within:text-[#60A5FA]" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                      />
                    </div>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Email Address</span>
                    <div className="group flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/35 px-4 py-4 transition-all duration-200 focus-within:border-[#60A5FA]/50 focus-within:bg-[var(--bg-primary)]/55 focus-within:shadow-[0_0_0_1px_rgba(96,165,250,0.18)]">
                      <Mail size={18} className="text-[var(--text-muted)] transition-colors group-focus-within:text-[#60A5FA]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                      />
                    </div>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Phone Number</span>
                  <div className="group flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/35 px-4 py-4 transition-all duration-200 focus-within:border-[#60A5FA]/50 focus-within:bg-[var(--bg-primary)]/55 focus-within:shadow-[0_0_0_1px_rgba(96,165,250,0.18)]">
                    <Phone size={18} className="text-[var(--text-muted)] transition-colors group-focus-within:text-[#60A5FA]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2 cursor-pointer">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Resume Upload</span>
                  <div className="group flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--glass-border)] bg-[var(--bg-primary)]/35 px-5 py-6 text-center transition-all duration-200 hover:border-[#60A5FA]/40 hover:bg-[#2563EB]/8 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.12)]">
                    <UploadCloud size={22} className="mb-3 text-[#60A5FA]" />
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {resumeFile ? resumeFile.name : "Click to upload your resume"}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {resumeFile ? `${(resumeFile.size / 1024).toFixed(1)} KB` : "Supports PDF, DOC, or DOCX"}
                    </p>
                    <input 
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setResumeFile(e.target.files[0]);
                        }
                      }}
                      className="sr-only" 
                    />
                  </div>
                </label>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white blue-gradient-btn shadow-[0_10px_30px_rgba(37,99,235,0.28)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(37,99,235,0.42)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </div>
  );
}
