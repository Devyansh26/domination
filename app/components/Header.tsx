"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { EmergencyButton, EmergencyDropdownItem } from "./EmergencyButton";
import { AlertTriangle, MapPin, Phone, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/emergency-contacts", label: "Emergency Contacts" },
  { href: "/healthcare-facilities", label: "Healthcare Facilities" },
  { href: "/medical-info", label: "Medical Info" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const background = useTransform(scrollY, [0, 100], ["rgba(10, 14, 26, 0)", "rgba(10, 14, 26, 0.95)"]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownItems = (
    <>
      <EmergencyDropdownItem
        icon={<AlertTriangle className="w-5 h-5" />}
        onClick={() => window.location.href = "/emergency-contacts"}
        variant="danger"
      >
        View All Emergency Contacts
      </EmergencyDropdownItem>
      <EmergencyDropdownItem
        icon={<MapPin className="w-5 h-5" />}
        onClick={() => window.location.href = "/healthcare-facilities?type=emergency"}
        variant="primary"
      >
        Find Nearest ER
      </EmergencyDropdownItem>
      <EmergencyDropdownItem
        icon={<Phone className="w-5 h-5" />}
        onClick={() => window.open("tel:911", "_self")}
        variant="danger"
      >
        Call 911 Now
      </EmergencyDropdownItem>
    </>
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Health Emergency Response Portal Home">
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </motion.div>
              <span className="text-sm font-medium text-slate-300/80 hover:text-white tracking-tight transition-colors">
                EmerGen
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * navItems.indexOf(item) + 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-blue-400"
                      : "text-slate-300/80 hover:text-white"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side: emergency button (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <EmergencyButton
                onClick={() => window.location.href = "/emergency-contacts"}
                showDropdown
                dropdownContent={dropdownItems}
              />
            </div>
            {/* Mobile hamburger — always visible on small screens */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {isMobileMenuOpen && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm md:hidden bg-[#0a0e1a] border-l border-slate-800"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex h-full flex-col p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-8 p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex-1" aria-label="Mobile navigation">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * navItems.indexOf(item) + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                        pathname === item.href
                          ? "bg-blue-500/20 text-blue-400 border-l-4 border-blue-400"
                          : "text-slate-300/80 hover:text-white hover:bg-white/5"
                      }`}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <Link
              href="/emergency-contacts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 w-full text-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
            >
              Emergency Now
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}