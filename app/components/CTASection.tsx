"use client";

import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 md:py-40 bg-[#0a0e1a]">
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground-bright mb-8">
          Ready to prepare for what matters most?
        </h2>
        <p className="text-sm text-foreground-muted mb-12">
          Join thousands of users who trust their emergency preparedness to our platform.
        </p>
        <button className="px-8 py-3 border border-white/[0.2] text-foreground-muted bg-transparent text-sm tracking-widest uppercase transition-colors duration-300 hover:border-white/[0.8] hover:text-foreground-bright rounded-none">
          Get Started
        </button>
      </motion.div>
    </section>
  );
}
