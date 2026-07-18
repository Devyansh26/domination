"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp, AlertTriangle, HeartPulse, Pill, Stethoscope, FileText, BookOpen, Shield, Loader2 } from "lucide-react";

const medicalCategories = [
  {
    id: "first-aid",
    label: "First Aid Guides",
    icon: Shield,
    color: "#3b82f6",
    description: "Step-by-step emergency first aid procedures",
  },
  {
    id: "symptoms",
    label: "Symptom Checker",
    icon: Stethoscope,
    color: "#60a5fa",
    description: "Identify potential conditions from symptoms",
  },
  {
    id: "medications",
    label: "Medication Info",
    icon: Pill,
    color: "#10b981",
    description: "Drug information, dosages, and interactions",
  },
  {
    id: "conditions",
    label: "Medical Conditions",
    icon: HeartPulse,
    color: "#2563eb",
    description: "Detailed guides on diseases and conditions",
  },
  {
    id: "emergency-procedures",
    label: "Emergency Procedures",
    icon: AlertTriangle,
    color: "#1d4ed8",
    description: "Critical life-saving procedures and protocols",
  },
  {
    id: "reference",
    label: "Quick Reference",
    icon: BookOpen,
    color: "#60a5fa",
    description: "Vital signs, conversions, and medical charts",
  },
];

const firstAidGuides = [
  {
    id: "cpr",
    title: "CPR (Cardiopulmonary Resuscitation)",
    category: "first-aid",
    difficulty: "High",
    time: "Immediate",
    steps: [
      "Check responsiveness - tap and shout",
      "Call 911 / emergency services",
      "Begin chest compressions: 100-120/min, 2 inches deep",
      "Give 2 rescue breaths after 30 compressions",
      "Continue until help arrives or person responds",
    ],
    keywords: ["cardiac arrest", "unconscious", "not breathing"],
  },
  {
    id: "choking",
    title: "Choking (Heimlich Maneuver)",
    category: "first-aid",
    difficulty: "Medium",
    time: "Immediate",
    steps: [
      "Stand behind person, wrap arms around waist",
      "Make fist above navel, grasp with other hand",
      "Quick upward thrusts (6-10 times)",
      "Repeat until object dislodged or person unconscious",
      "If unconscious, begin CPR",
    ],
    keywords: ["choking", "airway obstruction", "cannot breathe"],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding Control",
    category: "first-aid",
    difficulty: "Medium",
    time: "Immediate",
    steps: [
      "Apply direct pressure with clean cloth",
      "Elevate wound above heart if possible",
      "Apply pressure to arterial pressure point",
      "Use tourniquet only as last resort",
      "Call 911 for severe bleeding",
    ],
    keywords: ["bleeding", "hemorrhage", "wound", "cut"],
  },
  {
    id: "burns",
    title: "Burn Treatment",
    category: "first-aid",
    difficulty: "Low",
    time: "Within minutes",
    steps: [
      "Cool burn under running water 10-20 minutes",
      "Remove jewelry/tight clothing near burn",
      "Cover with sterile non-stick dressing",
      "Do NOT apply ice, butter, or ointments",
      "Seek medical care for burns >3 inches or on face/hands",
    ],
    keywords: ["burn", "scald", "thermal injury"],
  },
  {
    id: "stroke",
    title: "Stroke Recognition (FAST)",
    category: "emergency-procedures",
    difficulty: "Low",
    time: "Immediate",
    steps: [
      "F - Face: Ask to smile - check for drooping",
      "A - Arms: Ask to raise both - check for weakness",
      "S - Speech: Ask to repeat phrase - check for slurring",
      "T - Time: Call 911 immediately if any sign present",
      "Note time symptoms started for medical team",
    ],
    keywords: ["stroke", "FAST", "brain attack", "TIA"],
  },
  {
    id: "heart-attack",
    title: "Heart Attack Response",
    category: "emergency-procedures",
    difficulty: "Low",
    time: "Immediate",
    steps: [
      "Call 911 immediately",
      "Have person sit/rest in comfortable position",
      "Give aspirin (325mg) if not allergic - chew it",
      "Loosen tight clothing",
      "Begin CPR if person becomes unconscious",
    ],
    keywords: ["heart attack", "myocardial infarction", "chest pain"],
  },
  {
    id: "seizure",
    title: "Seizure First Aid",
    category: "first-aid",
    difficulty: "Low",
    time: "During event",
    steps: [
      "Stay calm, time the seizure",
      "Clear area of hard/sharp objects",
      "Place something soft under head",
      "Do NOT restrain or put anything in mouth",
      "Roll to recovery position after seizure ends",
      "Call 911 if >5 minutes, repeated, or first seizure",
    ],
    keywords: ["seizure", "epilepsy", "convulsion"],
  },
  {
    id: "anaphylaxis",
    title: "Anaphylaxis (Severe Allergic Reaction)",
    category: "emergency-procedures",
    difficulty: "Medium",
    time: "Immediate",
    steps: [
      "Call 911 immediately",
      "Administer epinephrine (EpiPen) if available",
      "Have person lie down with legs elevated",
      "Give second dose in 5-15 min if no improvement",
      "Stay with person until EMS arrives",
    ],
    keywords: ["anaphylaxis", "allergy", "EpiPen", "allergic reaction"],
  },
  {
    id: "fracture",
    title: "Fracture / Sprain Immobilization",
    category: "first-aid",
    difficulty: "Medium",
    time: "Before transport",
    steps: [
      "Do NOT attempt to realign bone",
      "Immobilize with splint - include joints above/below",
      "Apply ice pack wrapped in cloth",
      "Elevate if possible",
      "Check circulation beyond injury site",
    ],
    keywords: ["fracture", "broken bone", "sprain", "immobilization"],
  },
];

const symptomChecker = [
  {
    id: "chest-pain",
    symptom: "Chest Pain / Pressure",
    possibleConditions: ["Heart Attack", "Angina", "Panic Attack", "GERD", "Costochondritis"],
    urgency: "high",
    redFlags: ["Radiating to arm/jaw", "Shortness of breath", "Sweating", "Nausea"],
  },
  {
    id: "shortness-breath",
    symptom: "Shortness of Breath",
    possibleConditions: ["Asthma", "COPD", "Pneumonia", "Pulmonary Embolism", "Heart Failure", "Anxiety"],
    urgency: "high",
    redFlags: ["Blue lips/fingernails", "Cannot speak in sentences", "Chest pain"],
  },
  {
    id: "severe-headache",
    symptom: "Sudden Severe Headache",
    possibleConditions: ["Migraine", "Tension Headache", "Stroke", "Aneurysm", "Meningitis"],
    urgency: "high",
    redFlags: ["Thunderclap onset", "Stiff neck", "Vision changes", "Confusion"],
  },
  {
    id: "abdominal-pain",
    symptom: "Severe Abdominal Pain",
    possibleConditions: ["Appendicitis", "Gallstones", "Kidney Stones", "Pancreatitis", "Bowel Obstruction"],
    urgency: "medium",
    redFlags: ["Fever", "Vomiting blood", "Bloody stool", "Unable to pass gas"],
  },
  {
    id: "fever",
    symptom: "High Fever (>103°F / 39.4°C)",
    possibleConditions: ["Infection", "Heat Stroke", "Medication Reaction", "Autoimmune Flare"],
    urgency: "medium",
    redFlags: ["Stiff neck", "Rash", "Confusion", "Difficulty breathing"],
  },
  {
    id: "dizziness",
    symptom: "Dizziness / Fainting",
    possibleConditions: ["Dehydration", "Low Blood Sugar", "Heart Arrhythmia", "Stroke", "Vertigo"],
    urgency: "medium",
    redFlags: ["Chest pain", "Speech difficulty", "Weakness on one side", "Vision loss"],
  },
];

const medicationInfo = [
  {
    id: "aspirin",
    name: "Aspirin (Acetylsalicylic Acid)",
    type: "Antiplatelet / Analgesic",
    commonUses: ["Heart attack prevention", "Pain relief", "Fever reduction", "Anti-inflammatory"],
    dosage: "Adults: 325-650mg every 4-6 hours (max 4g/day). Heart: 81mg daily.",
    warnings: ["Do not give to children/teens (Reye's syndrome)", "Avoid with bleeding disorders", "Take with food"],
    interactions: ["Warfarin", "Ibuprofen", "Alcohol", "Corticosteroids"],
  },
  {
    id: "epinephrine",
    name: "Epinephrine (EpiPen)",
    type: "Emergency / Sympathomimetic",
    commonUses: ["Anaphylaxis", "Severe allergic reaction", "Cardiac arrest"],
    dosage: "Auto-injector 0.3mg (adult) or 0.15mg (child) IM in outer thigh. Repeat in 5-15 min if needed.",
    warnings: ["Use immediately for anaphylaxis", "Call 911 after use", "Store at room temperature"],
    interactions: ["Beta-blockers may reduce effectiveness", "MAO inhibitors"],
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin (Sublingual)",
    type: "Vasodilator / Antianginal",
    commonUses: ["Angina (chest pain)", "Acute coronary syndrome"],
    dosage: "0.3-0.6mg sublingual every 5 min x3 max. Call 911 if no relief after 3 doses.",
    warnings: ["Sit down before taking", "May cause severe hypotension", "Do not use with PDE5 inhibitors (Viagra/Cialis)"],
    interactions: ["Sildenafil", "Tadalafil", "Alcohol", "Antihypertensives"],
  },
  {
    id: "insulin",
    name: "Insulin (Rapid/Short-acting)",
    type: "Hormone / Antidiabetic",
    commonUses: ["Type 1 Diabetes", "Type 2 Diabetes", "Hyperglycemic emergencies"],
    dosage: "Highly individualized. Rapid-acting: 0.1-0.2 units/kg per meal. Check blood glucose.",
    warnings: ["Risk of hypoglycemia", "Rotate injection sites", "Never share pens/needles"],
    interactions: ["Beta-blockers mask hypoglycemia", "Corticosteroids increase requirements", "Alcohol"],
  },
  {
    id: "albuterol",
    name: "Albuterol (Rescue Inhaler)",
    type: "Short-acting Beta-agonist (SABA)",
    commonUses: ["Asthma attack", "COPD exacerbation", "Exercise-induced bronchospasm"],
    dosage: "2 puffs every 4-6 hours as needed. Max 8 puffs/24hr without doctor guidance.",
    warnings: ["Not for daily maintenance", "Tachycardia, tremor common", "Rinse mouth after use"],
    interactions: ["Beta-blockers", "Diuretics", "MAO inhibitors", "Tricyclic antidepressants"],
  },
];

const medicalConditions = [
  {
    id: "diabetes",
    name: "Diabetes Mellitus",
    type: "Chronic Metabolic",
    keyFacts: ["Type 1: Autoimmune, insulin-dependent", "Type 2: Insulin resistance", "HbA1c target: <7% (individualized)", "Complications: retinopathy, nephropathy, neuropathy"],
    emergencySigns: ["DKA: fruity breath, Kussmaul breathing, confusion", "HHS: extreme dehydration, altered mental status", "Severe hypo: <54 mg/dL, unconscious, seizure"],
    management: ["Blood glucose monitoring", "Medication adherence", "Diet/exercise", "Regular screenings"],
  },
  {
    id: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    type: "Cardiovascular",
    keyFacts: ["Normal: <120/80", "Elevated: 120-129/<80", "Stage 1: 130-139/80-89", "Stage 2: ≥140/≥90", "Crisis: >180/>120"],
    emergencySigns: ["Hypertensive emergency: BP >180/120 with end-organ damage", "Symptoms: severe headache, vision changes, chest pain, dyspnea"],
    management: ["DASH diet", "Sodium <2.3g/day", "Exercise 150 min/week", "Medication adherence", "Home BP monitoring"],
  },
  {
    id: "asthma",
    name: "Asthma",
    type: "Respiratory",
    keyFacts: ["Chronic airway inflammation", "Reversible bronchospasm", "Triggers: allergens, exercise, cold air, stress", "Peak flow monitoring helpful"],
    emergencySigns: ["Status asthmaticus: severe attack unresponsive to rescue inhaler", "Unable to speak in sentences", "Cyanosis, silent chest, exhaustion"],
    management: ["Controller meds (ICS) daily", "Rescue inhaler (SABA) as needed", "Asthma action plan", "Trigger avoidance", "Annual flu vaccine"],
  },
  {
    id: "stroke",
    name: "Stroke (CVA / TIA)",
    type: "Neurological",
    keyFacts: ["Ischemic: 87% (clot)", "Hemorrhagic: 13% (bleed)", "TIA: transient, warning sign", "Time is brain - 1.9M neurons/min lost"],
    emergencySigns: ["FAST: Face, Arm, Speech, Time", "Sudden: numbness, confusion, vision loss, dizziness, severe headache"],
    management: ["tPA within 4.5 hours (ischemic)", "Thrombectomy up to 24 hrs", "BP management", "Secondary prevention: antiplatelet, statin, anticoag if afib"],
  },
  {
    id: "mi",
    name: "Myocardial Infarction (Heart Attack)",
    type: "Cardiovascular",
    keyFacts: ["STEMI: ST elevation - needs immediate PCI", "NSTEMI: no ST elevation - risk stratify", "Troponin rises 3-4 hrs, peaks 24 hrs", "Complications: arrhythmia, shock, rupture"],
    emergencySigns: ["Chest pressure/squeezing >20 min", "Radiating to arm, jaw, back", "Diaphoresis, nausea, dyspnea", "Atypical in women, elderly, diabetics"],
    management: ["Aspirin 325mg chewed", "Nitroglycerin sublingual", "Oxygen if hypoxic", "Morphine if pain unrelieved", "PCI within 90 min (STEMI)"],
  },
  {
    id: "sepsis",
    name: "Sepsis / Septic Shock",
    type: "Infectious / Critical Care",
    keyFacts: ["Life-threatening organ dysfunction from dysregulated host response", "qSOFA: RR≥22, SBP≤100, AMS", "Lactate >2 mmol/L concerning", "Septic shock: vasopressor need + lactate >2"],
    emergencySigns: ["Altered mental status", "Hypotension unresponsive to fluids", "Lactate >4 mmol/L", "Oliguria, cool extremities, mottling"],
    management: ["Sepsis bundle: lactate, cultures, antibiotics <1hr", "30ml/kg crystalloid bolus", "Vasopressors (norepinephrine first-line)", "Source control", "Corticosteroids if refractory shock"],
  },
];

const quickReference = [
  {
    category: "Vital Signs (Adult Normal Ranges)",
    items: [
      { label: "Heart Rate", value: "60-100 bpm" },
      { label: "Blood Pressure", value: "<120/80 mmHg" },
      { label: "Respiratory Rate", value: "12-20 breaths/min" },
      { label: "Temperature", value: "97.8-99.1°F (36.5-37.3°C)" },
      { label: "O2 Saturation", value: "95-100%" },
      { label: "GCS", value: "15 (normal)" },
    ],
  },
  {
    category: "Pediatric Vitals (Approximate)",
    items: [
      { label: "Newborn HR", value: "100-180 bpm" },
      { label: "Infant HR (1-12mo)", value: "100-160 bpm" },
      { label: "Child HR (1-10yr)", value: "70-130 bpm" },
      { label: "Newborn RR", value: "30-60 breaths/min" },
      { label: "Infant RR", value: "20-40 breaths/min" },
      { label: "Child RR", value: "15-30 breaths/min" },
    ],
  },
  {
    category: "Common Conversions",
    items: [
      { label: "°F to °C", value: "(°F - 32) × 5/9" },
      { label: "°C to °F", value: "(°C × 9/5) + 32" },
      { label: "lb to kg", value: "lb ÷ 2.2" },
      { label: "kg to lb", value: "kg × 2.2" },
      { label: "in to cm", value: "in × 2.54" },
      { label: "mg to mcg", value: "mg × 1000" },
    ],
  },
  {
    category: "Glasgow Coma Scale",
    items: [
      { label: "Eye Opening", value: "4=Spontaneous, 3=Voice, 2=Pain, 1=None" },
      { label: "Verbal Response", value: "5=Oriented, 4=Confused, 3=Inappropriate, 2=Sounds, 1=None" },
      { label: "Motor Response", value: "6=Obeys, 5=Localizes, 4=Withdraws, 3=Flexion, 2=Extension, 1=None" },
      { label: "Total Score", value: "15=Normal, 13-14=Mild, 9-12=Moderate, ≤8=Severe (intubate)" },
    ],
  },
  {
    category: "APGAR Score (Newborn)",
    items: [
      { label: "A - Appearance", value: "0=Blue/pale, 1=Pink body/blue extremities, 2=Pink all over" },
      { label: "P - Pulse", value: "0=Absent, 1=<100, 2=>100" },
      { label: "G - Grimace", value: "0=None, 1=Grimace, 2=Cough/sneeze/cry" },
      { label: "A - Activity", value: "0=Limp, 1=Some flexion, 2=Active motion" },
      { label: "R - Respiration", value: "0=Absent, 1=Weak/irregular, 2=Strong cry" },
      { label: "Score", value: "7-10=Normal, 4-6=Moderate distress, 0-3=Severe distress" },
    ],
  },
  {
    category: "Emergency Drug Doses (Adult)",
    items: [
      { label: "Epinephrine (Cardiac Arrest)", value: "1mg IV/IO q3-5min (1:10,000)" },
      { label: "Epinephrine (Anaphylaxis)", value: "0.3mg IM (1:1,000) lateral thigh" },
      { label: "Atropine (Bradycardia)", value: "1mg IV q3-5min (max 3mg)" },
      { label: "Amiodarone (VF/pVT)", value: "300mg IV bolus, then 150mg" },
      { label: "Lidocaine (VF/pVT alt)", value: "1-1.5mg/kg IV" },
      { label: "Magnesium (Torsades)", value: "1-2g IV over 15min" },
      { label: "Sodium Bicarb (Acidosis)", value: "1mEq/kg IV" },
      { label: "Calcium Chloride (HyperK)", value: "1g IV over 2-5min" },
    ],
  },
];

export default function MedicalInfoPage() {
  const [activeCategory, setActiveCategory] = useState("first-aid");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredGuides = firstAidGuides.filter(
    (guide) =>
      guide.category === activeCategory &&
      (guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredSymptoms = symptomChecker.filter(
    (s) =>
      s.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.possibleConditions.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMeds = medicationInfo.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.commonUses.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredConditions = medicalConditions.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyFacts.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
          >
            <span className="label-caps mb-4 inline-block" style={{ color: "#3b82f6" }}>
              EMERGENCY CODE: MED-03-MI
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground-bright mb-6 leading-tight">
              Medical
              <br />
              <span style={{ color: "#3b82f6" }}>Information</span>
            </h1>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              Critical medical reference at your fingertips. First aid guides, symptom checker, medication database,
              condition references, and emergency protocols. Offline-capable, evidence-based.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {medicalCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    activeCategory === cat.id ? "shadow-lg" : "hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: activeCategory === cat.id ? `${cat.color}20` : "rgba(255, 255, 255, 0.02)",
                    color: activeCategory === cat.id ? cat.color : "#c8ccd4",
                    border: activeCategory === cat.id ? `1px solid ${cat.color}40` : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl mx-auto mb-10 md:mb-14"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#6b7280" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, symptoms, medications, conditions..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeCategory === "first-aid" && (
            <FirstAidSection guides={filteredGuides} expandedItems={expandedItems} onToggle={toggleExpand} />
          )}
          {activeCategory === "symptoms" && (
            <SymptomCheckerSection symptoms={filteredSymptoms} expandedItems={expandedItems} onToggle={toggleExpand} />
          )}
          {activeCategory === "medications" && (
            <MedicationSection medications={filteredMeds} expandedItems={expandedItems} onToggle={toggleExpand} />
          )}
          {activeCategory === "conditions" && (
            <ConditionsSection conditions={filteredConditions} expandedItems={expandedItems} onToggle={toggleExpand} />
          )}
          {activeCategory === "emergency-procedures" && (
            <EmergencyProceduresSection guides={filteredGuides} expandedItems={expandedItems} onToggle={toggleExpand} />
          )}
          {activeCategory === "reference" && <QuickReferenceSection />}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 md:px-12 lg:px-20 pb-12 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-foreground-muted text-center max-w-3xl mx-auto leading-relaxed">
            <strong className="text-foreground-bright">Medical Disclaimer:</strong> This information is for educational and reference purposes only
            and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider
            with any questions regarding a medical condition. In emergencies, call 911 or your local emergency number immediately.
            Information may not reflect the most current medical guidelines. Use at your own risk.
          </p>
        </div>
      </section>
    </div>
  );
}

function FirstAidSection({
  guides,
  expandedItems,
  onToggle,
}: {
  guides: typeof firstAidGuides;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="space-y-4">
        {guides.map((guide) => (
          <ExpandableCard
            key={guide.id}
            id={guide.id}
            title={guide.title}
            isExpanded={expandedItems.has(guide.id)}
            onToggle={onToggle}
            badges={[
              { label: guide.difficulty, color: guide.difficulty === "High" ? "#ef4444" : guide.difficulty === "Medium" ? "#f97316" : "#10b981" },
              { label: guide.time, color: "#3b82f6" },
            ]}
          >
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {guide.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 rounded text-[0.6rem] font-medium"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <ol className="space-y-2">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-foreground-muted leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs font-mono font-medium"
                      style={{ color: "#ef4444" }}>
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ExpandableCard>
        ))}
        {guides.length === 0 && (
          <div className="text-center py-12 text-foreground-muted">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No guides found matching your search</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SymptomCheckerSection({
  symptoms,
  expandedItems,
  onToggle,
}: {
  symptoms: typeof symptomChecker;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="space-y-4">
        {symptoms.map((symptom) => (
          <ExpandableCard
            key={symptom.id}
            id={symptom.id}
            title={symptom.symptom}
            isExpanded={expandedItems.has(symptom.id)}
            onToggle={onToggle}
            badges={[
              { label: symptom.urgency === "high" ? "HIGH URGENCY" : "MEDIUM URGENCY", color: symptom.urgency === "high" ? "#ef4444" : "#f97316" },
            ]}
          >
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground-bright mb-2">Possible Conditions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {symptom.possibleConditions.map((cond) => (
                    <span
                      key={cond}
                      className="px-2.5 py-1 rounded bg-surface border border-border text-foreground-muted hover:border-border-hover transition-colors"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
              {symptom.redFlags.length > 0 && (
                <div className="p-3 rounded-lg border" style={{ backgroundColor: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                  <p className="font-medium text-sm mb-2 flex items-center gap-2" style={{ color: "#ef4444" }}>
                    <AlertTriangle className="w-4 h-4" />
                    <span>RED FLAGS - Seek Emergency Care If:</span>
                  </p>
                  <ul className="space-y-1 text-foreground-muted">
                    {symptom.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#ef4444" }} />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ExpandableCard>
        ))}
        {symptoms.length === 0 && (
          <div className="text-center py-12 text-foreground-muted">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No symptoms found matching your search</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MedicationSection({
  medications,
  expandedItems,
  onToggle,
}: {
  medications: typeof medicationInfo;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="space-y-4">
        {medications.map((med) => (
          <ExpandableCard
            key={med.id}
            id={med.id}
            title={med.name}
            subtitle={med.type}
            isExpanded={expandedItems.has(med.id)}
            onToggle={onToggle}
            badges={[
              { label: med.commonUses.includes("Anaphylaxis") || med.commonUses.includes("Cardiac arrest") ? "EMERGENCY" : "PRESCRIPTION", color: med.commonUses.includes("Anaphylaxis") || med.commonUses.includes("Cardiac arrest") ? "#ef4444" : "#3b82f6" },
            ]}
          >
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground-bright mb-2">Common Uses:</p>
                <div className="flex flex-wrap gap-1.5">
                  {med.commonUses.map((use) => (
                    <span key={use} className="px-2.5 py-1 rounded bg-surface border border-border text-foreground-muted">{use}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg border" style={{ backgroundColor: "rgba(15, 19, 32, 0.5)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
                <p className="font-medium mb-1">Typical Adult Dosage:</p>
                <p className="text-foreground-muted">{med.dosage}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground-bright mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" style={{ color: "#ef4444" }} />
                    Warnings
                  </p>
                  <ul className="space-y-1 text-sm text-foreground-muted">
                    {med.warnings.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#ef4444" }} />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground-bright mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4" style={{ color: "#3b82f6" }} />
                    Interactions
                  </p>
                  <ul className="space-y-1 text-sm text-foreground-muted">
                    {med.interactions.map((i, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#3b82f6" }} />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ExpandableCard>
        ))}
        {medications.length === 0 && (
          <div className="text-center py-12 text-foreground-muted">
            <Pill className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No medications found matching your search</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ConditionsSection({
  conditions,
  expandedItems,
  onToggle,
}: {
  conditions: typeof medicalConditions;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="space-y-4">
        {conditions.map((cond) => (
          <ExpandableCard
            key={cond.id}
            id={cond.id}
            title={cond.name}
            subtitle={cond.type}
            isExpanded={expandedItems.has(cond.id)}
            onToggle={onToggle}
          >
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground-bright mb-2">Key Facts:</p>
                <ul className="space-y-1 text-foreground-muted">
                  {cond.keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#3b82f6" }} />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-lg border" style={{ backgroundColor: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                <p className="font-medium text-sm mb-2 flex items-center gap-2" style={{ color: "#ef4444" }}>
                  <AlertTriangle className="w-4 h-4" />
                  <span>EMERGENCY SIGNS - Call 911:</span>
                </p>
                <ul className="space-y-1 text-foreground-muted text-sm">
                  {cond.emergencySigns.map((sign, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#3b82f6" }} />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground-bright mb-2">Management:</p>
                <ul className="space-y-1 text-foreground-muted">
                  {cond.management.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#3b82f6" }} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
        {conditions.length === 0 && (
          <div className="text-center py-12 text-foreground-muted">
            <HeartPulse className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No conditions found matching your search</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EmergencyProceduresSection({
  guides,
  expandedItems,
  onToggle,
}: {
  guides: typeof firstAidGuides;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="space-y-4">
        {guides.map((guide) => (
          <ExpandableCard
            key={guide.id}
            id={guide.id}
            title={guide.title}
            isExpanded={expandedItems.has(guide.id)}
            onToggle={onToggle}
            badges={[
              { label: "EMERGENCY", color: "#3b82f6" },
              { label: guide.difficulty, color: guide.difficulty === "High" ? "#3b82f6" : guide.difficulty === "Medium" ? "#60a5fa" : "#93c5fd" },
            ]}
          >
            <div className="space-y-3 text-sm">
              <ol className="space-y-2">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-foreground-bright leading-relaxed font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs font-mono font-medium"
                      style={{ color: "#3b82f6", borderColor: "#3b82f6" }}>
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ExpandableCard>
        ))}
        {guides.length === 0 && (
          <div className="text-center py-12 text-foreground-muted">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No emergency procedures found matching your search</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function QuickReferenceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="space-y-8">
        {quickReference.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + sectionIndex * 0.05 }}
          >
            <h3 className="font-heading text-lg font-light text-foreground-bright mb-4 pb-2 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
              {section.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={`${section.category}-${item.label}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + sectionIndex * 0.05 + itemIndex * 0.02 }}
                  className="p-4 rounded-xl border backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <p className="font-medium text-sm text-foreground-bright mb-1">{item.label}</p>
                  <p className="font-mono text-sm" style={{ color: "#3b82f6" }}>{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ExpandableCard({
  id,
  title,
  subtitle,
  isExpanded,
  onToggle,
  badges = [],
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  badges?: Array<{ label: string; color: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300"
      style={{
        backgroundColor: "rgba(15, 19, 32, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      <button
        onClick={() => onToggle(id)}
        className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg md:text-xl font-light text-foreground-bright truncate pr-4">{title}</h3>
          {subtitle && <p className="text-sm text-foreground-muted mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-wider rounded-full"
              style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
            >
              {badge.label}
            </span>
          ))}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-foreground-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground-muted" />
          )}
        </div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden px-5 md:px-6 pb-5 md:pb-6"
        style={{ transition: "height 0.3s ease, opacity 0.2s ease" }}
      >
        {children}
      </motion.div>
    </div>
  );
}