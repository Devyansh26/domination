"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Loader2, MapPin, Hospital, Navigation, Filter, X, Check, AlertCircle, HeartPulse, Pill, Building2, MapPin as MapPinIcon, Locate, Phone, Shield, SlidersHorizontal, ChevronDown, AlertTriangle } from "lucide-react";

const HealthcareFacilitiesMap = dynamic(
  () => import("./HealthcareFacilitiesMap").then((mod) => mod.HealthcareFacilitiesMap),
  { ssr: false, loading: () => <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin" style={{ color: "#3b82f6" }} /> Map loading...</div> }
);

interface Facility {
  id: string;
  name: string;
  type: "hospital" | "urgent-care" | "pharmacy" | "clinic" | "emergency";
  lat: number;
  lng: number;
  address: string;
  phone: string;
  distance?: number;
  waitTime?: string;
  services: string[];
  rating?: number;
  open24h?: boolean;
}

interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  region: string;
}

const facilityTypes = [
  { value: "all", label: "All Types", icon: Building2, color: "#6b7280" },
  { value: "hospital", label: "Hospitals", icon: Hospital, color: "#3b82f6" },
  { value: "urgent-care", label: "Urgent Care", icon: AlertCircle, color: "#f97316" },
  { value: "pharmacy", label: "Pharmacies", icon: Pill, color: "#10b981" },
  { value: "clinic", label: "Clinics", icon: HeartPulse, color: "#3b82f6" },
  { value: "emergency", label: "Emergency Dept", icon: MapPinIcon, color: "#ec4899" },
] as const;

const distanceFilters = [
  { value: "all", label: "All Distances" },
  { value: "1", label: "Within 1 mile" },
  { value: "3", label: "Within 3 miles" },
  { value: "5", label: "Within 5 miles" },
  { value: "10", label: "Within 10 miles" },
];

const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "hospital",
    lat: 40.7589,
    lng: -73.9851,
    address: "1000 Medical Center Dr, New York, NY 10022",
    phone: "(212) 555-0100",
    distance: 0.8,
    waitTime: "15 min",
    services: ["Emergency", "Trauma", "Cardiology", "Neurology", "Pediatrics", "Surgery"],
    rating: 4.5,
    open24h: true,
  },
  {
    id: "2",
    name: "Metro Urgent Care",
    type: "urgent-care",
    lat: 40.7505,
    lng: -73.9934,
    address: "500 7th Ave, New York, NY 10018",
    phone: "(212) 555-0200",
    distance: 0.3,
    waitTime: "8 min",
    services: ["Minor Injuries", "Illness", "X-Ray", "Lab Tests", "Vaccinations"],
    rating: 4.2,
    open24h: false,
  },
  {
    id: "3",
    name: "Downtown Pharmacy",
    type: "pharmacy",
    lat: 40.7527,
    lng: -73.9772,
    address: "200 E 42nd St, New York, NY 10017",
    phone: "(212) 555-0300",
    distance: 0.5,
    services: ["Prescriptions", "OTC Meds", "Vaccines", "Health Screening"],
    rating: 4.7,
    open24h: true,
  },
  {
    id: "4",
    name: "Community Health Clinic",
    type: "clinic",
    lat: 40.7614,
    lng: -73.9776,
    address: "300 E 55th St, New York, NY 10022",
    phone: "(212) 555-0400",
    distance: 1.2,
    services: ["Primary Care", "Mental Health", "Dental", "Women's Health"],
    rating: 4.3,
    open24h: false,
  },
  {
    id: "5",
    name: "Emergency Medical Center",
    type: "emergency",
    lat: 40.7484,
    lng: -73.9857,
    address: "400 W 59th St, New York, NY 10019",
    phone: "(212) 555-0500",
    distance: 0.6,
    waitTime: "5 min",
    services: ["Level 1 Trauma", "Burn Unit", "Stroke Center", "Cardiac ICU"],
    rating: 4.8,
    open24h: true,
  },
  {
    id: "6",
    name: "Westside Medical Plaza",
    type: "hospital",
    lat: 40.7689,
    lng: -73.9821,
    address: "1100 Amsterdam Ave, New York, NY 10025",
    phone: "(212) 555-0600",
    distance: 2.1,
    waitTime: "22 min",
    services: ["Emergency", "Maternity", "Oncology", "Orthopedics", "Radiology"],
    rating: 4.4,
    open24h: true,
  },
  {
    id: "7",
    name: "QuickCare Urgent Clinic",
    type: "urgent-care",
    lat: 40.7421,
    lng: -73.9895,
    address: "250 W 34th St, New York, NY 10119",
    phone: "(212) 555-0700",
    distance: 0.9,
    waitTime: "12 min",
    services: ["Sports Injuries", "Flu/COVID", "Stitches", "Splinting", "Physicals"],
    rating: 4.1,
    open24h: false,
  },
  {
    id: "8",
    name: "24/7 Wellness Pharmacy",
    type: "pharmacy",
    lat: 40.7556,
    lng: -73.9812,
    address: "600 Lexington Ave, New York, NY 10022",
    phone: "(212) 555-0800",
    distance: 0.7,
    services: ["Compounding", "Delivery", "Consultation", "Diabetes Care"],
    rating: 4.6,
    open24h: true,
  },
];

// Animated Emergency Button Component
function EmergencyButton({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`relative overflow-hidden rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 ${className}`}
      style={{
        backgroundColor: "#0a0e1a",
        color: "#e8eaf0",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: isHovered 
          ? "0 0 30px rgba(59, 130, 246, 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.2)",
        transform: isPressed ? "scale(0.98)" : isHovered ? "translateY(-2px)" : "none",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ 
          border: "1px solid #3b82f6",
          opacity: pulse ? 0.6 : 0,
          transform: pulse ? "scale(1.15)" : "scale(1)",
        }}
        animate={{ opacity: [0, 0.4, 0], scale: [1, 1.15, 1.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      
      {/* Gradient border */}
      <div className="absolute inset-[1px] rounded-[inherit] bg-gradient-to-r from-blue-500/30 to-blue-600/10" />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ transform: isHovered ? "translateX(0%)" : "translateX(-100%)" }}
        animate={{ transform: isHovered ? "translateX(100%)" : "translateX(-100%)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      <div className="relative z-10 flex items-center gap-3 px-6 py-4">
        <AlertTriangle className="w-5 h-5" style={{ color: "#3b82f6" }} />
        <span className="tracking-wide uppercase">Emergency Now</span>
        <motion.span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#ef4444" }}
          animate={pulse ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <ChevronDown className="w-4 h-4 opacity-60" />
      </div>
    </motion.button>
  );
}

export default function HealthcareFacilitiesPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [facilities] = useState<Facility[]>(mockFacilities);
  const [mapReady, setMapReady] = useState(false);
  const [showDistanceFilter, setShowDistanceFilter] = useState(false);

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
            city: data.address?.city || data.address?.town || data.address?.village || "Current Location",
            region: data.address?.state || data.address?.region || "",
          });
        } catch {
          setUserLocation({
            lat: latitude,
            lng: longitude,
            city: "Current Location",
            region: "",
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

  useEffect(() => {
    getLocation();
    setMapReady(true);
  }, []);

  const filteredFacilities = facilities.filter((f) => {
    const typeMatch = selectedType === "all" || f.type === selectedType;
    const distanceMatch = selectedDistance === "all" || (f.distance || 0) <= parseFloat(selectedDistance);
    return typeMatch && distanceMatch;
  });
  
  const sortedFacilities = useMemo(
    () => [...filteredFacilities].sort((a, b) => (a.distance || 0) - (b.distance || 0)),
    [filteredFacilities]
  );

  const handleEmergencyClick = () => {
    if (userLocation) {
      setSelectedType("emergency");
      setSelectedDistance("3");
    } else {
      getLocation();
      setTimeout(() => {
        setSelectedType("emergency");
        setSelectedDistance("3");
      }, 1000);
    }
  };

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
              EMERGENCY CODE: MED-03-HF
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground-bright mb-6 leading-tight">
              Healthcare
              <br />
              <span style={{ color: "#3b82f6" }}>Facilities</span>
            </h1>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              Find nearby hospitals, urgent care centers, pharmacies, and clinics. Real-time wait times,
              directions, and one-tap calling. Location-aware with interactive map.
            </p>
          </motion.div>

          {/* Location Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl mx-auto mb-10 md:mb-14"
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
                    <Locate className="w-6 h-6" style={{ color: "#3b82f6" }} />
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
                        <Check className="w-5 h-5" style={{ color: "#10b981" }} />
                        <span className="font-medium">
                          {userLocation.city}{userLocation.region && `, ${userLocation.region}`}
                        </span>
                      </div>
                    ) : locationError ? (
                      <div className="flex items-center gap-2 text-foreground-muted">
                        <AlertCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                        <span>Unable to detect location</span>
                      </div>
                    ) : (
                      <p className="text-foreground-muted">Tap to detect your location for nearby facilities</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={getLocation}
                  disabled={isLocating}
                  className="flex-shrink-0 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    color: "#3b82f6",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
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

      {/* Map & Filters */}
      <section className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 md:mb-6"
          >
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <div className="flex flex-wrap gap-2">
                {facilityTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                      selectedType === type.value ? "shadow-lg" : "hover:shadow-md"
                    }`}
                    style={{
                      backgroundColor: selectedType === type.value ? `${type.color}20` : "rgba(255, 255, 255, 0.02)",
                      color: selectedType === type.value ? type.color : "#c8ccd4",
                      border: selectedType === type.value ? `1px solid ${type.color}40` : "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </button>
                ))}
              </div>
              
              {/* Distance Filter Dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowDistanceFilter(!showDistanceFilter)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap hover:shadow-md"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    color: "#c8ccd4",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{distanceFilters.find(d => d.value === selectedDistance)?.label || "All Distances"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDistanceFilter ? "rotate-180" : ""}`} />
                </button>
                
                {showDistanceFilter && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface border rounded-xl py-2 shadow-xl z-50"
                    style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                  >
                    {distanceFilters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => { setSelectedDistance(filter.value); setShowDistanceFilter(false); }}
                        className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                          selectedDistance === filter.value
                            ? "bg-blue-500/20 text-blue-400"
                            : "text-foreground-muted hover:text-foreground-bright hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{filter.label}</span>
                          {selectedDistance === filter.value && <Check className="w-4 h-4" style={{ color: "#3b82f6" }} />}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
          >
            {mapReady ? (
              <HealthcareFacilitiesMap
                userLocation={userLocation}
                facilities={facilities}
                selectedType={selectedType}
                selectedFacility={selectedFacility}
                onFacilityClick={setSelectedFacility}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: "#3b82f6" }} />
              </div>
            )}

            {/* Facility List Sidebar */}
            <div className="absolute top-4 right-4 bottom-4 w-72 md:w-80 bg-background/95 backdrop-blur-xl border-l overflow-y-auto"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-light text-foreground-bright flex items-center gap-2">
                    <Filter className="w-5 h-5" style={{ color: "#3b82f6" }} />
                    Nearby Facilities ({sortedFacilities.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {sortedFacilities.map((facility, index) => {
                    const typeInfo = facilityTypes.find((t) => t.value === facility.type);
                    const isSelected = selectedFacility?.id === facility.id;
                    return (
                      <motion.button
                        key={facility.id}
                        onClick={() => setSelectedFacility(facility)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.03 }}
                        className={`w-full p-3 rounded-xl text-left transition-all duration-300 flex flex-col gap-2 ${
                          isSelected ? "ring-2" : "hover:bg-white/5"
                        }`}
                        style={{
                          backgroundColor: isSelected ? `${typeInfo?.color}15` : "transparent",
                          borderColor: isSelected ? `${typeInfo?.color}40` : "transparent",
                          boxShadow: isSelected ? `0 0 0 2px ${typeInfo?.color}` : "none",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${typeInfo?.color}20` }}
                          >
                            {typeInfo && (
                              (() => {
                                const IconComponent = typeInfo.icon;
                                return <IconComponent className="w-4.5 h-4.5" style={{ color: typeInfo.color }} />;
                              })()
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-foreground-bright truncate">{facility.name}</h4>
                            <p className="text-[0.7rem] text-foreground-muted truncate">{facility.address}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              {facility.distance !== undefined && (
                                <span className="text-[0.65rem] px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" }}>
                                  {facility.distance.toFixed(1)} mi
                                </span>
                              )}
                              {facility.waitTime && (
                                <span className="text-[0.65rem] px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(249, 115, 22, 0.15)", color: "#f97316" }}>
                                  {facility.waitTime}
                                </span>
                              )}
                              {facility.open24h && (
                                <span className="text-[0.65rem] px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                                  24/7
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                  {sortedFacilities.length === 0 && (
                    <div className="text-center py-8 text-foreground-muted">
                      <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No facilities found for this category</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Quick Access */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-light tracking-tight text-foreground-bright mb-2">
              Emergency Quick Access
            </h2>
            <p className="text-foreground-muted">Direct lines for immediate emergencies</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: "911 Emergency", number: "911", color: "#ef4444", icon: AlertCircle },
              { name: "Poison Control", number: "1-800-222-1222", color: "#f97316", icon: Shield },
              { name: "Crisis Lifeline", number: "988", color: "#ec4899", icon: HeartPulse },
              { name: "Find ER Near Me", number: "GPS", color: "#3b82f6", icon: Hospital },
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => item.number === "GPS" ? getLocation() : window.open(`tel:${item.number.replace(/\D/g, "")}`, "_self")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-4 md:p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 flex flex-col items-center text-center group"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-medium text-sm md:text-base text-foreground-bright mb-1">{item.name}</h3>
                <span className="font-mono text-lg md:text-xl font-medium" style={{ color: item.color }}>
                  {item.number}
                </span>
                <Phone className="absolute bottom-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 md:px-12 lg:px-20 pb-12 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-foreground-muted text-center max-w-3xl mx-auto leading-relaxed">
            <strong className="text-foreground-bright">Disclaimer:</strong> Facility data is for reference only and may not reflect real-time availability.
            Always call 911 for life-threatening emergencies. Wait times are estimates. Verify hours and services by calling ahead.
            Map data © OpenStreetMap contributors. This service does not provide medical advice.
          </p>
        </div>
      </section>
    </div>
  );
}