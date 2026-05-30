"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { fetchFooter, type FooterData, type FooterLink, type FooterColumn, type FooterSocialLink } from "@/lib/api";
import { useLivePreview } from "@payloadcms/live-preview-react";

const defaultFooterData: FooterData = {
  description: "A connected ecosystem of technology, commerce, culture, and convenience, designed for the future.",
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/hineet.tech?igsh=NnpleXFnYjkycmt0&utm_source=qr" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/hineet-tech-pvt-ltd/" },
    { platform: "whatsapp", url: "https://wa.me/919664134872" },
    { platform: "email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=hineettechprivatelimited@gmail.com" },
  ],
  columns: [
    {
      title: "About",
      links: [
        { label: "Culture", linkType: "custom", url: "/culture" },
        { label: "Careers", linkType: "custom", url: "/careers" },
        { label: "Product", linkType: "custom", url: "/products" },
        { label: "Contact", linkType: "custom", url: "/contact" },
      ],
    },
    {
      title: "Our Product",
      links: [
        { label: "Wapex", linkType: "custom", url: "/products/wapex" },
        { label: "Propwise", linkType: "custom", url: "/products/propwise" },
        { label: "School", linkType: "custom", url: "/products/school-os" },
        { label: "Project Management", linkType: "custom", url: "/products/project-management" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", linkType: "custom", url: "https://www.linkedin.com/company/hineet-tech-pvt-ltd/" },
        { label: "Instagram", linkType: "custom", url: "https://www.instagram.com/hineet.tech?igsh=NnpleXFnYjkycmt0&utm_source=qr" },
        { label: "WhatsApp", linkType: "custom", url: "https://wa.me/919664134872" },
        { label: "Gmail", linkType: "custom", url: "https://mail.google.com/mail/?view=cm&fs=1&to=hineettechprivatelimited@gmail.com" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} HINEET TECH Private Limited. All rights reserved.`,
  bottomLinks: [
    { label: "Privacy Policy", linkType: "custom", url: "#" },
    { label: "Terms of Service", linkType: "custom", url: "#" },
  ],
};

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "linkedin":
      return <FaLinkedin className="w-8 h-8" />;
    case "instagram":
      return <FaInstagram className="w-8 h-8" />;
    case "whatsapp":
      return <FaWhatsapp className="w-8 h-8" />;
    case "email":
    default:
      return <FaEnvelope className="w-8 h-8" />;
  }
};

const getSocialHoverClass = (platform: string) => {
  switch (platform) {
    case "instagram":
      return "hover:text-[#E4405F]";
    case "linkedin":
      return "hover:text-[#0A66C2]";
    case "whatsapp":
      return "hover:text-[#25D366]";
    case "email":
    default:
      return "hover:text-[#EA4335]";
  }
};

const resolveUrl = (link: FooterLink) => {
  if (link.linkType === 'product') {
    const productObj = link.product;
    if (productObj && typeof productObj === 'object' && 'slug' in productObj) {
      return `/products/${productObj.slug}`;
    }
    return `/products`;
  }
  if (link.linkType === 'job') {
    const jobObj = link.job;
    if (jobObj && typeof jobObj === 'object' && 'slug' in jobObj) {
      return `/careers`;
    }
    return `/careers`;
  }
  return link.url || "#";
};

export default function Footer() {
  const [initialFooter, setInitialFooter] = useState<FooterData | undefined>(undefined);

  useEffect(() => {
    fetchFooter().then((data) => {
      if (data) {
        setInitialFooter(data);
      }
    });
  }, []);

  const { data: liveFooter } = useLivePreview<FooterData>({
    initialData: initialFooter as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedFooter = liveFooter?.description ? liveFooter : initialFooter;
  const activeFooter = resolvedFooter || defaultFooterData;

  return (
    <footer className="w-full bg-[var(--surface-secondary)] text-[var(--text-primary)] py-24 px-6 lg:px-12 mt-0 relative overflow-hidden border-t border-[var(--glass-border)] backdrop-blur-xl z-[60] pointer-events-auto">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/40 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-radial-blue-center opacity-60 pointer-events-none" />
      {/* Subtle blue orb top-right */}
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[var(--accent-primary)]/06 blur-[100px] pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 relative z-10">
        <div className="md:col-span-2 lg:col-span-2">
          <Link href="/" className="mb-8 inline-flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="HINEET TECH logo"
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
              priority
            />
            <div className="flex flex-col leading-none">
              <div className="text-2xl font-bold tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200">
                HINEET TECH
              </div>
              <div className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mt-1">
                Private Limited
              </div>
            </div>
          </Link>
          <p className="text-[var(--text-primary)] max-w-sm text-lg leading-relaxed">
            {activeFooter.description}
          </p>
          <div className="flex items-center gap-5 mt-8">
            {activeFooter.socialLinks?.map((social: FooterSocialLink, idx: number) => (
              <a
                key={social.id || idx}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className={`text-[var(--text-primary)] transition-colors ${getSocialHoverClass(social.platform)}`}
                aria-label={social.platform}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        {activeFooter.columns?.map((column: FooterColumn, colIdx: number) => (
          <div key={column.id || colIdx}>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-6 text-[var(--text-primary)]">
              {column.title}
            </h4>
            <ul className="space-y-4">
              {column.links?.map((link: FooterLink, linkIdx: number) => {
                const href = resolveUrl(link);
                const isExternal = href.startsWith("http");
                return (
                  <li key={link.id || linkIdx}>
                    {isExternal ? (
                      <a
                        href={href}
                        target={link.newTab ? "_blank" : undefined}
                        rel={link.newTab ? "noreferrer noopener" : undefined}
                        className="relative group text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors font-medium pointer-events-auto z-[60]"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full w-0 group-hover:w-full transition-all duration-400" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        target={link.newTab ? "_blank" : undefined}
                        className="relative group text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors font-medium pointer-events-auto z-[60]"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full w-0 group-hover:w-full transition-all duration-400" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto mt-20 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between relative z-10">
        <p className="text-[var(--text-primary)] text-sm">
          {activeFooter.copyright}
        </p>
        <div className="flex gap-6 mt-6 md:mt-0 text-sm text-[var(--text-primary)]">
          {activeFooter.bottomLinks?.map((link: FooterLink, idx: number) => {
            const href = resolveUrl(link);
            const isExternal = href.startsWith("http");
            return isExternal ? (
              <a
                key={link.id || idx}
                href={href}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noreferrer noopener" : undefined}
                className="relative group hover:text-[var(--accent-primary)] transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full w-0 group-hover:w-full transition-all duration-400" />
              </a>
            ) : (
              <Link
                key={link.id || idx}
                href={href}
                target={link.newTab ? "_blank" : undefined}
                className="relative group hover:text-[var(--accent-primary)] transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full w-0 group-hover:w-full transition-all duration-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
