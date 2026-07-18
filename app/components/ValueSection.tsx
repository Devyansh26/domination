"use client";

import { motion } from "framer-motion";

const VALUES = [
  {
    title: 'Emergency Contacts',
    description: 'One-tap access to local emergency services, poison control, and crisis hotlines.',
    icon: 'phone',
  },
  {
    title: 'Nearby Facilities',
    description: 'Real-time proximity search for hospitals, urgent care centers, and pharmacies.',
    icon: 'mapPin',
  },
  {
    title: 'Critical Medical Info',
    description: 'Instant retrieval of allergies, medications, blood type, and conditions.',
    icon: 'clipboard',
  },
];

function Icon({ name }: { name: string }) {
  switch (name) {
    case 'phone':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'mapPin':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 14h6" />
          <path d="M9 18h6" />
          <path d="M9 10h6" />
        </svg>
      );
    default:
      return null;
  }
}

export function ValueSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0e1a]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-2xl md:text-3xl font-light text-center text-foreground-bright mb-10 md:mb-16">
          Core Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              className="p-6 md:p-8 bg-transparent border border-white/[0.08] rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.15,
              }}
            >
              <div className="text-foreground-muted mb-6">
                <Icon name={value.icon} />
              </div>
              <h3 className="font-heading text-lg text-foreground-bright mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
