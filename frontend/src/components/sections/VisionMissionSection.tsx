"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchAboutSection, AboutSectionData } from "@/lib/api";
import { useLivePreview } from "@payloadcms/live-preview-react";

export default function VisionMissionSection() {
  const [initialData, setInitialData] = useState<AboutSectionData | undefined>(undefined);

  useEffect(() => {
    fetchAboutSection().then(data => {
      if (data) setInitialData(data);
    });
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedData = liveData?.visionHeading ? liveData : initialData;
  const activeData = {
    visionHeading: resolvedData?.visionHeading || "Our vision",
    visionDescription: resolvedData?.visionDescription || "Hineet Tech envisions a future where adaptability, innovation, and sustainability form the foundation of enduring success. We foster excellence and trust, empowering our businesses to lead industries and impact society.",
    missionHeading: resolvedData?.missionHeading || "Our mission",
    missionDescription: resolvedData?.missionDescription || "To endure, evolve, and empower – we aim to build institutions that redefine the future, shape societies, and embody the promise of permanence through constant reinvention.",
    visionImage: resolvedData?.visionImage || null,
    cultureHeading: resolvedData?.cultureHeading || "Working at Hineet",
    cultureDescription: resolvedData?.cultureDescription || "This place is designed to make you feel uncomfortable.",
    cultureButtonText: resolvedData?.cultureButtonText || "Learn more about our culture",
    cultureButtonLink: resolvedData?.cultureButtonLink || "/culture",
    cultureImage: resolvedData?.cultureImage || null,
  };

  const visionImageUrl = activeData.visionImage?.url 
    ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}${activeData.visionImage.url}` 
    : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

  const cultureImageUrl = activeData.cultureImage?.url 
    ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}${activeData.cultureImage.url}` 
    : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative w-full z-10 bg-[#050505] border-t border-[#262626] overflow-hidden py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="mb-16">
              <h2 className="text-[#FFFFFF] text-lg md:text-3xl font-light tracking-wide leading-[1.1] drop-shadow-sm">
                {activeData.visionHeading}
              </h2>
              <div className="w-16 h-1 bg-[#60A5FA] mt-2 mb-4 rounded-full" />
              <p className="text-sm md:text-base text-[#737373] leading-relaxed font-medium">
                {activeData.visionDescription}
              </p>
            </div>

            <div>
              <h2 className="text-[#FFFFFF] text-lg md:text-3xl font-light tracking-wide leading-[1.1] drop-shadow-sm">
                {activeData.missionHeading}
              </h2>
              <div className="w-16 h-1 bg-[#60A5FA] mt-2 mb-4 rounded-full" />
              <p className="text-sm md:text-base text-[#737373] leading-relaxed font-medium">
                {activeData.missionDescription}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[#262626]"
          >
            <Image
              src={visionImageUrl}
              alt="Futuristic glowing city"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* ─── CULTURE SECTION ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[#262626] order-2 md:order-1"
          >
            <Image
              src={cultureImageUrl}
              alt="Team collaborating"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col order-1 md:order-2"
          >
            <h2 className="text-[#FFFFFF] text-lg md:text-3xl font-light tracking-wide leading-[1.1] drop-shadow-sm">
              {activeData.cultureHeading}
            </h2>
            <div className="w-16 h-1 bg-[#60A5FA] mt-2 mb-4 rounded-full" />
            <p className="text-sm md:text-base text-[#737373] leading-relaxed font-medium mb-12">
              {activeData.cultureDescription}
            </p>

            <Link href={activeData.cultureButtonLink}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 bg-[#FFFFFF] text-[#2563EB] rounded-xl font-bold text-lg hover:bg-[#E5E5E5] hover:text-[#1D4ED8] transition-colors shadow-lg w-fit"
              >
                {activeData.cultureButtonText}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
