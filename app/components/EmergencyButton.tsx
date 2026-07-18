"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronDown, MapPin, Phone, X } from "lucide-react";

export function EmergencyButton({ 
  onClick, 
  className = "",
  showDropdown = false,
  dropdownContent
}: { 
  onClick: () => void; 
  className?: string;
  showDropdown?: boolean;
  dropdownContent?: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (showDropdown && dropdownContent) {
      e.preventDefault();
      e.stopPropagation();
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDropdownOpen && !(e.target as Node)) return;
      setIsDropdownOpen(false);
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
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
          {showDropdown && (
            <ChevronDown className={`w-4 h-4 opacity-60 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          )}
        </div>
      </motion.button>

      {showDropdown && dropdownContent && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute right-0 top-full mt-2 w-64 bg-surface border rounded-xl py-2 shadow-2xl z-50"
          style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
        >
          {dropdownContent}
        </motion.div>
      )}
    </div>
  );
}

interface EmergencyDropdownItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "primary" | "danger";
}

export function EmergencyDropdownItem({ 
  onClick, 
  icon, 
  children, 
  variant = "default" 
}: EmergencyDropdownItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    default: { bg: "rgba(255, 255, 255, 0.02)", text: "#e8eaf0", icon: "#c8ccd4" },
    primary: { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", icon: "#3b82f6" },
    danger: { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", icon: "#ef4444" },
  };

  const style = variantStyles[variant];

  return (
    <button
      onClick={() => { onClick(); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 group"
      style={{
        backgroundColor: isHovered ? style.bg : "transparent",
        color: style.text,
      }}
    >
      <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${style.icon}20` }}>
        <span style={{ color: style.icon }}>{icon}</span>
      </span>
      <span className="font-medium text-sm">{children}</span>
    </button>
  );
}