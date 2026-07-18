"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation, MapPin as MapPinIcon, Phone, AlertCircle, Check } from "lucide-react";

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
  { value: "all", label: "All Types", icon: "building", color: "#6b7280" },
  { value: "hospital", label: "Hospitals", icon: "hospital", color: "#3b82f6" },
  { value: "urgent-care", label: "Urgent Care", icon: "alert-circle", color: "#f97316" },
  { value: "pharmacy", label: "Pharmacies", icon: "pill", color: "#10b981" },
  { value: "clinic", label: "Clinics", icon: "heart-pulse", color: "#3b82f6" },
  { value: "emergency", label: "Emergency Dept", icon: "map-pin", color: "#ec4899" },
] as const;

function getMarkerSvg(type: Facility["type"]): string {
  switch (type) {
    case "hospital":
      return '<path d="M12 2v20M17 7H7"/><path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/>';
    case "urgent-care":
      return '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>';
    case "pharmacy":
      return '<path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 18v-8"/><path d="M6 12h12"/>';
    case "clinic":
      return '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>';
    default:
      return '<path d="M12 2v20M17 7H7"/><path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/>';
  }
}

function getHospitalMarkerSvg(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#3b82f6" stroke="white" stroke-width="2"/>
      <path d="M16 8V22M22 16H10" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `;
}

function FacilityMarker({
  facility,
  selectedFacility,
  onClick,
}: {
  facility: Facility;
  selectedFacility: Facility | null;
  onClick: () => void;
}) {
  const typeInfo = facilityTypes.find((t) => t.value === facility.type);
  const color = typeInfo?.color || "#6b7280";
  const isSelected = selectedFacility?.id === facility.id;

  // Custom hospital marker with distinctive icon
  const icon = useMemo(() => {
    if (facility.type === "hospital") {
      return L.divIcon({
        className: `custom-marker hospital-marker ${isSelected ? "selected" : ""}`,
        html: `
          <div class="marker-wrapper" style="--marker-color: ${color}">
            <div class="marker-pulse"></div>
            <div class="marker-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="13" fill="${color}" stroke="white" stroke-width="2"/>
                <path d="M16 7V25M23 16H9" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44],
      });
    }
    return L.divIcon({
      className: `custom-marker ${isSelected ? "selected" : ""}`,
      html: `
        <div class="marker-wrapper" style="--marker-color: ${color}">
          <div class="marker-pulse"></div>
          <div class="marker-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              ${getMarkerSvg(facility.type)}
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  }, [facility.id, facility.type, color, isSelected]);

  return (
    <Marker
      position={[facility.lat, facility.lng] as [number, number]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup className="custom-popup">
        <FacilityPopup facility={facility} />
      </Popup>
    </Marker>
  );
}

function FacilityPopup({
  facility,
}: {
  facility: Facility;
}) {
  const typeInfo = facilityTypes.find((t) => t.value === facility.type);

  return (
    <div className="p-0 min-w-[280px]">
      <div
        className="relative p-4"
        style={{ backgroundColor: "#0f1320", borderColor: "rgba(255, 255, 255, 0.08)" }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${typeInfo?.color}20` }}
          >
            <svg className="w-5 h-5" style={{ color: typeInfo?.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {typeInfo?.value === "hospital" && <><path d="M12 2v20M17 7H7"/><path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/></>}
              {typeInfo?.value === "urgent-care" && <><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></>}
              {typeInfo?.value === "pharmacy" && <><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 18v-8"/><path d="M6 12h12"/></>}
              {typeInfo?.value === "clinic" && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>}
              {typeInfo?.value === "emergency" && <><path d="M12 2v20M17 7H7"/><path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/></>}
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground-bright truncate">{facility.name}</h3>
            <span
              className="text-[0.55rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${typeInfo?.color}20`, color: typeInfo?.color }}
            >
              {typeInfo?.label}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-3" style={{ backgroundColor: "#0f1320" }}>
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" style={{ color: "#6b7280" }} />
          <span className="truncate">{facility.address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#6b7280" }} />
          <a href={`tel:${facility.phone.replace(/\D/g, "")}`} className="hover:text-foreground-bright transition-colors">
            {facility.phone}
          </a>
        </div>

        {facility.distance !== undefined && (
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <Navigation className="w-4 h-4 flex-shrink-0" style={{ color: "#6b7280" }} />
            <span>{facility.distance.toFixed(1)} miles away</span>
          </div>
        )}

        {facility.waitTime && (
          <div className="flex items-center gap-2 text-sm" style={{ color: "#f97316" }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Est. Wait: {facility.waitTime}</span>
          </div>
        )}

        {facility.open24h && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>Open 24 Hours</span>
          </div>
        )}

        {facility.rating && (
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <span className="font-medium">{facility.rating}</span>
            <span>★</span>
          </div>
        )}

        <div className="pt-2 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <p className="text-xs text-foreground-muted mb-2">Services:</p>
          <div className="flex flex-wrap gap-1.5">
            {facility.services.map((service) => (
              <span
                key={service}
                className="px-2 py-1 rounded text-[0.6rem] font-medium"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#c8ccd4" }}
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(facility.address)}`, "_blank")}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              color: "#3b82f6",
              border: "1px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            <Navigation className="w-3.5 h-3.5" />
            Directions
          </button>
          <button
            onClick={() => window.open(`tel:${facility.phone.replace(/\D/g, "")}`, "_self")}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
}

export function HealthcareFacilitiesMap({
  userLocation,
  facilities,
  selectedType,
  selectedFacility,
  onFacilityClick,
}: {
  userLocation: UserLocation | null;
  facilities: Facility[];
  selectedType: string;
  selectedFacility: Facility | null;
  onFacilityClick: (facility: Facility) => void;
}) {
  const mapCenter = userLocation
    ? [userLocation.lat, userLocation.lng] as [number, number]
    : [40.7589, -73.9851] as [number, number];
  const mapZoom = userLocation ? 13 : 12;

  const filteredFacilities = facilities.filter((f) => selectedType === "all" || f.type === selectedType);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      className="w-full h-full rounded-2xl"
      style={{ zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng] as [number, number]}>
          <Popup>
            <div className="p-2 text-center">
              <p className="font-medium text-foreground-bright">Your Location</p>
              <p className="text-sm text-foreground-muted">{userLocation.city}</p>
            </div>
          </Popup>
        </Marker>
      )}

      {filteredFacilities.map((facility) => (
        <FacilityMarker
          key={facility.id}
          facility={facility}
          selectedFacility={selectedFacility}
          onClick={() => onFacilityClick(facility)}
        />
      ))}
    </MapContainer>
  );
}