"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: '01',
    title: 'Register',
    description: 'Create your secure health profile in under 60 seconds.',
  },
  {
    number: '02',
    title: 'Connect',
    description: 'Link to emergency services and nearby healthcare providers.',
  },
  {
    number: '03',
    title: 'Respond',
    description: 'Access critical information instantly when every second counts.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0e1a]">
      <div className="max-w-3xl mx-auto px-6 relative">
        <h2 className="font-heading text-2xl md:text-3xl font-light text-center text-foreground-bright mb-10 md:mb-16">
          How It Works
        </h2>
        
        <div className="relative">
          <div className="absolute left-[calc(4rem-0.5px)] top-0 bottom-0 w-px bg-white/[0.08]" />
          
          <div className="relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex py-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.15,
                }}
              >
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-white/[0.06] mr-8 w-16 flex-shrink-0 text-right">
                  {step.number}
                </div>
                <div className="pt-2 md:pt-3">
                  <h3 className="font-heading text-lg text-foreground-bright mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
