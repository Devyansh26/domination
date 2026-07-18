"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Shield, AlertTriangle, Heart, MessageSquare } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  category: "emergency" | "medical" | "mental" | "poison" | "disaster" | "general";
  icon: React.ReactNode;
  available: string;
  locationBased?: boolean;
}

const contacts: EmergencyContact[] = [
  {
    id: "911",
    name: "Emergency Services (911)",
    number: "911",
    description: "Police, Fire, Medical emergencies - Life-threatening situations",
    category: "emergency",
    icon: <AlertTriangle className="w-6 h-6" />,
    available: "24/7",
    locationBased: true,
  },
  {
    id: "poison",
    name: "Poison Control Center",
    number: "1-800-222-1222",
    description: "Poison exposure, overdose, toxic substance ingestion",
    category: "poison",
    icon: <Shield className="w-6 h-6" />,
    available: "24/7",
    locationBased: true,
  },
  {
    id: "suicide",
    name: "Suicide & Crisis Lifeline",
    number: "988",
    description: "Mental health crisis, suicidal thoughts, emotional distress",
    category: "mental",
    icon: <Heart className="w-6 h-6" />,
    available: "24/7",
    locationBased: true,
  },
  {
    id: "crisis-text",
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free, 24/7 crisis support via text message",
    category: "mental",
    icon: <MessageSquare className="w-6 h-6" />,
    available: "24/7",
    locationBased: false,
  },
  {
    id: "disaster",
    name: "Disaster Distress Helpline",
    number: "1-800-985-5990",
    description: "Disaster-related emotional distress, trauma counseling",
    category: "disaster",
    icon: <AlertTriangle className="w-6 h-6" />,
    available: "24/7",
    locationBased: true,
  },
  {
    id: "veterans",
    name: "Veterans Crisis Line",
    number: "988 then press 1",
    description: "Veterans, service members, families in crisis",
    category: "mental",
    icon: <Shield className="w-6 h-6" />,
    available: "24/7",
    locationBased: false,
  },
  {
    id: "non-emergency",
    name: "Non-Emergency Police",
    number: "311",
    description: "Non-life-threatening situations, noise complaints, minor incidents",
    category: "general",
    icon: <Phone className="w-6 h-6" />,
    available: "Varies by location",
    locationBased: true,
  },
  {
    id: "hospital",
    name: "Nearest Hospital ER",
    number: "Use GPS below",
    description: "Find nearest emergency room with directions",
    category: "medical",
    icon: <MapPin className="w-6 h-6" />,
    available: "24/7",
    locationBased: true,
  },
];

const categoryLabels: Record<EmergencyContact["category"], string> = {
  emergency: "Emergency",
  medical: "Medical",
  mental: "Mental Health",
  poison: "Poison Control",
  disaster: "Disaster",
  general: "General",
};

const categoryColors: Record<EmergencyContact["category"], string> = {
  emergency: "#3b82f6",
  medical: "#3b82f6",
  mental: "#3b82f6",
  poison: "#3b82f6",
  disaster: "#3b82f6",
  general: "#6b7280",
};

export function EmergencyContactCard({ contact, index }: { contact: EmergencyContact; index: number }) {
  const handleCall = (number: string) => {
    if (number.startsWith("Text")) {
      navigator.clipboard.writeText(number.replace("Text ", "").replace(" to ", ""));
      alert("Number copied to clipboard!");
    } else {
      window.open(`tel:${number.replace(/\D/g, "")}`, "_self");
    }
  };

  const categoryColor = categoryColors[contact.category];
  const categoryLabel = categoryLabels[contact.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative bg-surface/50 backdrop-blur-sm border border-border hover:border-border-hover rounded-xl p-5 md:p-6 transition-all duration-300"
      style={{ borderLeftColor: categoryColor, borderLeftWidth: "3px" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${categoryColor}20` }}
        >
          <span style={{ color: categoryColor }}>{contact.icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="font-heading text-lg font-light text-foreground-bright truncate pr-4">
              {contact.name}
            </h3>
            <span
              className="flex-shrink-0 px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-wider rounded-full"
              style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
            >
              {categoryLabel}
            </span>
          </div>

          <p className="text-sm text-foreground-muted mb-3 line-clamp-2">{contact.description}</p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-foreground-bright">
              <Phone className="w-4 h-4 text-foreground-muted" />
              <span className="font-mono text-lg font-medium" style={{ color: categoryColor }}>
                {contact.number}
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-foreground-muted px-2 py-1 rounded-full bg-surface border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {contact.available}
            </span>
            {contact.locationBased && (
              <span className="flex items-center gap-1.5 text-xs text-foreground-muted px-2 py-1 rounded-full bg-surface border border-border">
                <MapPin className="w-3 h-3" style={{ color: categoryColor }} />
                Location-based
              </span>
            )}
          </div>

          <button
            onClick={() => handleCall(contact.number)}
            className="w-full sm:w-auto group relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 overflow-hidden"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
              border: `1px solid ${categoryColor}40`,
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              {contact.number.startsWith("Text") ? "Text Now" : "Call Now"}
            </span>
            <span
              className="absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
              style={{ backgroundColor: categoryColor }}
            />
          </button>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColor }} />
      </div>
    </motion.div>
  );
}

export function EmergencyContactsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {contacts.map((contact, index) => (
        <EmergencyContactCard key={contact.id} contact={contact} index={index} />
      ))}
    </div>
  );
}