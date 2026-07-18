"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 md:py-40 bg-[#0a0e1a]">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground-bright mb-8">
          Ready to prepare for what matters most?
        </h2>
        <p className="text-sm text-foreground-muted mb-12 max-w-xl mx-auto">
          Join thousands of users who trust their emergency preparedness to our platform.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/emergency-contacts"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm tracking-widest uppercase transition-all duration-300 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            Emergency Contacts
          </Link>
          <Link
            href="/healthcare-facilities"
            className="px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-sm tracking-widest uppercase transition-all duration-300 rounded-lg hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            Healthcare Facilities
          </Link>
          <Link
            href="/medical-info"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm tracking-widest uppercase transition-all duration-300 rounded-lg hover:from-blue-600 hover:to-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            Medical Info
          </Link>
        </div>

        <button className="px-8 py-3 border border-white/[0.2] text-foreground-muted bg-transparent text-sm tracking-widest uppercase transition-colors duration-300 hover:border-white/[0.8] hover:text-foreground-bright rounded-none">
          Get Started
        </button>
      </motion.div>
    </section>
  );
}