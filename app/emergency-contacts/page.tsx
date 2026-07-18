"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, AlertTriangle, Shield, Heart, MessageSquare, Loader2, CheckCircle, XCircle, MapPin as MapPinIcon, Download } from "lucide-react";
import { EmergencyContactsGrid } from "../components/emergency/EmergencyContactCard";

interface Location {
  lat: number;
  lng: number;
  city: string;
  region: string;
  country: string;
}

export default function EmergencyContactsPage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [calledNumbers, setCalledNumbers] = useState<Set<string>>(new Set());

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await response.json();
          setUserLocation({
            lat: latitude,
            lng: longitude,
            city: data.address?.city || data.address?.town || data.address?.village || "Unknown",
            region: data.address?.state || data.address?.region || "",
            country: data.address?.country || "",
          });
        } catch {
          setUserLocation({
            lat: latitude,
            lng: longitude,
            city: "Current Location",
            region: "",
            country: "",
          });
        }
        setIsLocating(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleCall = (number: string) => {
    const cleanNumber = number.replace(/\D/g, "");
    setCalledNumbers((prev) => new Set([...prev, cleanNumber]));
    window.open(`tel:${cleanNumber}`, "_self");
  };

  useEffect(() => {
    getLocation();
  }, []);

  const emergencyNumbers = [
    { id: "911", name: "Emergency (911)", number: "911", icon: AlertTriangle, desc: "Police, Fire, Medical - Life threatening emergencies" },
    { id: "poison", name: "Poison Control", number: "1-800-222-1222", icon: Shield, desc: "Poison exposure, overdose, toxic ingestion" },
    { id: "988", name: "Suicide & Crisis Lifeline", number: "988", icon: Heart, desc: "Mental health crisis, suicidal thoughts, emotional support" },
    { id: "crisis-text", name: "Crisis Text Line", number: "741741", icon: MessageSquare, desc: "Text HOME to 741741 - Free 24/7 crisis support" },
    { id: "veterans", name: "Veterans Crisis Line", number: "988", icon: Shield, desc: "Press 1 after dialing 988 - Veterans & families" },
    { id: "disaster", name: "Disaster Distress", number: "1-800-985-5990", icon: AlertTriangle, desc: "Disaster-related emotional distress & trauma" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <span className="label-caps mb-4 inline-block" style={{ color: "#3b82f6" }}>
              EMERGENCY CODE: MED-03-EC
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground-bright mb-6 leading-tight">
              Emergency
              <br />
              <span style={{ color: "#3b82f6" }}>Contacts</span>
            </h1>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              Immediate access to life-saving emergency numbers. One tap to call. Location-aware for local services.
              Every second counts.
            </p>
          </motion.div>

          {/* Location Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div
              className="relative p-5 md:p-6 rounded-2xl border backdrop-blur-sm overflow-hidden"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.08)",
                borderColor: "rgba(59, 130, 246, 0.2)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}>
                    <MapPinIcon className="w-6 h-6" style={{ color: "#3b82f6" }} />
                  </div>
                  <div>
                    <p className="label-caps mb-1" style={{ color: "#3b82f6" }}>DETECT LOCATION</p>
                    {isLocating ? (
                      <div className="flex items-center gap-3 text-foreground-bright">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#3b82f6" }} />
                        <span className="font-medium">Locating...</span>
                      </div>
                    ) : userLocation ? (
                      <div className="flex items-center gap-2 text-foreground-bright">
                        <CheckCircle className="w-5 h-5" style={{ color: "#10b981" }} />
                        <span className="font-medium">
                          {userLocation.city}{userLocation.region && `, ${userLocation.region}`}
                        </span>
                      </div>
                    ) : locationError ? (
                      <div className="flex items-center gap-2 text-foreground-muted">
                        <XCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                        <span>Unable to detect location</span>
                      </div>
                    ) : (
                      <p className="text-foreground-muted">Tap to detect your location for local emergency numbers</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={getLocation}
                  disabled={isLocating}
                  className="flex-shrink-0 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: userLocation ? "rgba(16, 185, 129, 0.15)" : "rgba(59, 130, 246, 0.15)",
                    color: userLocation ? "#10b981" : "#3b82f6",
                    border: userLocation ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  {userLocation ? "Update Location" : isLocating ? "Locating..." : "Detect My Location"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Dial Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-light tracking-tight text-foreground-bright mb-2">
              Quick Dial - Tap to Call
            </h2>
            <p className="text-foreground-muted">Direct lines to critical emergency services</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {emergencyNumbers.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleCall(item.number)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group p-4 md:p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 flex flex-col items-center text-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                >
                  <item.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: "#3b82f6" }} />
                </div>
                <h3 className="font-medium text-sm md:text-base text-foreground-bright mb-1">{item.name}</h3>
                <span className="font-mono text-lg md:text-xl font-medium" style={{ color: "#3b82f6" }}>
                  {item.number}
                </span>
                <p className="text-[0.65rem] md:text-xs text-foreground-muted mt-2 line-clamp-2 max-w-xs">{item.desc}</p>
                <Phone className="absolute bottom-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3b82f6" }} />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Full Contact Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-light tracking-tight text-foreground-bright mb-2">
              All Emergency Contacts
            </h2>
            <p className="text-foreground-muted">Comprehensive directory with categories, availability, and location-based services</p>
          </motion.div>

          <EmergencyContactsGrid />
        </div>
      </section>

      {/* Medical ID Card */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MedicalIDCard />
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 md:px-12 lg:px-20 pb-12 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-foreground-muted text-center max-w-3xl mx-auto leading-relaxed">
            <strong className="text-foreground-bright">Disclaimer:</strong> This portal provides emergency contact information for reference only.
            Always call 911 (or your local emergency number) for life-threatening emergencies. This service does not replace professional medical
            advice, diagnosis, or treatment. Location-based services depend on browser geolocation permissions and accuracy. Emergency numbers
            may vary by country/region. For international emergencies, dial 112 (GSM standard).
          </p>
        </div>
      </section>
    </div>
  );
}

function MedicalIDCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
    emergencyContact: "",
    emergencyPhone: "",
    physician: "",
    physicianPhone: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

  const handleDownload = () => {
    const content = `MEDICAL ID CARD - HEALTH EMERGENCY RESPONSE PORTAL
==============================

PERSONAL INFORMATION
Name: ${formData.name || "[Not provided]"}
Date of Birth: ${formData.dob || "[Not provided]"}
Blood Type: ${formData.bloodType || "[Not provided]"}

MEDICAL INFORMATION
Allergies: ${formData.allergies || "[None known / Not provided]"}
Current Medications: ${formData.medications || "[None / Not provided]"}
Medical Conditions: ${formData.conditions || "[None / Not provided]"}
Primary Physician: ${formData.physician || "[Not provided]"}
Physician Phone: ${formData.physicianPhone || "[Not provided]"}

EMERGENCY CONTACT
Name: ${formData.emergencyContact || "[Not provided]"}
Phone: ${formData.emergencyPhone || "[Not provided]"}

---
Generated by Health Emergency Response Portal (MED-03)
This card is for emergency reference only. Not a legal document.
Date: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medical-id-card.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <div
        className="relative rounded-2xl border overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(15, 19, 32, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd)" }} />

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}>
                <Shield className="w-6 h-6" style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <h3 className="font-heading text-xl font-light text-foreground-bright">Medical ID Card</h3>
                <p className="text-sm text-foreground-muted">Create & download your emergency medical card</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: isExpanded ? "rgba(16, 185, 129, 0.15)" : "rgba(59, 130, 246, 0.15)",
                color: isExpanded ? "#10b981" : "#3b82f6",
                border: isExpanded ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(59, 130, 246, 0.3)",
              }}
            >
              {isExpanded ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Collapse
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Create Card
                </>
              )}
            </button>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 md:space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Blood Type</label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright focus:outline-none focus:ring-2 appearance-none"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    {bloodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Primary Physician</label>
                  <input
                    type="text"
                    value={formData.physician}
                    onChange={(e) => setFormData({ ...formData, physician: e.target.value })}
                    placeholder="Dr. Jane Smith"
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
              </div>

              <div>
                <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Physician Phone</label>
                <input
                  type="tel"
                  value={formData.physicianPhone}
                  onChange={(e) => setFormData({ ...formData, physicianPhone: e.target.value })}
                  placeholder="555-123-4567"
                  className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Allergies</label>
                  <textarea
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="Penicillin, Peanuts, Latex..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Current Medications</label>
                  <textarea
                    value={formData.medications}
                    onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                    placeholder="Lisinopril 10mg, Metformin 500mg..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
              </div>

              <div>
                <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Medical Conditions</label>
                <textarea
                  value={formData.conditions}
                  onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                  placeholder="Diabetes Type 2, Hypertension, Asthma..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Emergency Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#3b82f6" }}>Emergency Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    placeholder="555-987-6543"
                    className="w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm text-foreground-bright placeholder-foreground-muted focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.15)",
                  color: "#3b82f6",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                }}
              >
                <Download className="w-4 h-4" />
                Download Medical ID Card
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}