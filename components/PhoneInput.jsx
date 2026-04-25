'use client';

import React, { useState, useEffect, useRef } from 'react';
import './PhoneInput.css';
import { ChevronDown } from 'lucide-react';

const countries = [
  { code: '+91', name: 'India', flag: '🇮🇳', length: 10 },
  { code: '+1', name: 'USA', flag: '🇺🇸', length: 10 },
  { code: '+44', name: 'UK', flag: '🇬🇧', length: 10 },
  { code: '+971', name: 'UAE', flag: '🇦🇪', length: 9 },
  { code: '+61', name: 'Australia', flag: '🇦🇺', length: 9 },
  { code: '+1', name: 'Canada', flag: '🇨🇦', length: 10 },
  { code: '+49', name: 'Germany', flag: '🇩🇪', length: 11 },
  { code: '+33', name: 'France', flag: '🇫🇷', length: 9 },
  { code: '+81', name: 'Japan', flag: '🇯🇵', length: 10 },
  { code: '+65', name: 'Singapore', flag: '🇸🇬', length: 8 },
  { code: '+27', name: 'South Africa', flag: '🇿🇦', length: 9 },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰', length: 10 },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩', length: 10 },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰', length: 9 },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾', length: 9 },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩', length: 11 },
  { code: '+66', name: 'Thailand', flag: '🇹🇭', length: 9 },
  { code: '+86', name: 'China', flag: '🇨🇳', length: 11 },
  { code: '+7', name: 'Russia', flag: '🇷🇺', length: 10 },
  { code: '+55', name: 'Brazil', flag: '🇧🇷', length: 11 },
  { code: '+39', name: 'Italy', flag: '🇮🇹', length: 10 },
  { code: '+34', name: 'Spain', flag: '🇪🇸', length: 9 },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱', length: 9 },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭', length: 9 },
  { code: '+46', name: 'Sweden', flag: '🇸🇪', length: 10 },
  { code: '+47', name: 'Norway', flag: '🇳🇴', length: 8 },
  { code: '+45', name: 'Denmark', flag: '🇩🇰', length: 8 },
  { code: '+353', name: 'Ireland', flag: '🇮🇪', length: 9 },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿', length: 9 },
  { code: '+82', name: 'South Korea', flag: '🇰🇷', length: 10 },
  { code: '+90', name: 'Turkey', flag: '🇹🇷', length: 10 },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦', length: 9 },
  { code: '+974', name: 'Qatar', flag: '🇶🇦', length: 8 },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭', length: 8 },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼', length: 8 },
  { code: '+968', name: 'Oman', flag: '🇴🇲', length: 8 },
  { code: '+20', name: 'Egypt', flag: '🇪🇬', length: 10 },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬', length: 10 },
  { code: '+254', name: 'Kenya', flag: '🇰🇪', length: 9 },
  { code: '+233', name: 'Ghana', flag: '🇬🇭', length: 9 },
  { code: '+212', name: 'Morocco', flag: '🇲🇦', length: 9 },
  { code: '+213', name: 'Algeria', flag: '🇩🇿', length: 9 },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳', length: 8 },
  { code: '+351', name: 'Portugal', flag: '🇵🇹', length: 9 },
  { code: '+30', name: 'Greece', flag: '🇬🇷', length: 10 },
  { code: '+48', name: 'Poland', flag: '🇵🇱', length: 9 },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿', length: 9 },
  { code: '+36', name: 'Hungary', flag: '🇭🇺', length: 9 },
  { code: '+43', name: 'Austria', flag: '🇦🇹', length: 10 },
  { code: '+32', name: 'Belgium', flag: '🇧🇪', length: 9 },
  { code: '+358', name: 'Finland', flag: '🇫🇮', length: 10 },
  { code: '+40', name: 'Romania', flag: '🇷🇴', length: 10 },
  { code: '+359', name: 'Bulgaria', flag: '🇧🇬', length: 9 },
  { code: '+385', name: 'Croatia', flag: '🇭🇷', length: 9 },
  { code: '+381', name: 'Serbia', flag: '🇷🇸', length: 9 },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦', length: 9 },
  { code: '+370', name: 'Lithuania', flag: '🇱🇹', length: 8 },
  { code: '+371', name: 'Latvia', flag: '🇱🇻', length: 8 },
  { code: '+372', name: 'Estonia', flag: '🇪🇪', length: 8 },
];

export default function PhoneInput({ value, onChange, label = "Phone Number", required = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dropdownRef = useRef(null);

  // Parse initial value if it contains country code
  useEffect(() => {
    if (value && value.startsWith('+')) {
      const found = countries.find(c => value.startsWith(c.code));
      if (found) {
        setSelectedCountry(found);
      }
    }
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // Clear the number when switching countries to ensure exact length compliance
    onChange(`${country.code} `);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^\d]/g, ''); // Numbers only
    // Enforce exact length
    if (val.length <= (selectedCountry.length || 10)) {
        onChange(`${selectedCountry.code} ${val}`);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = value.includes(' ') ? value.split(' ')[1] : value;
  const placeholder = "0".repeat(selectedCountry.length || 10).replace(/(.{3})/g, '$1 ').trim();

  return (
    <div className="phone-input-container">
      <div className="flex justify-between items-center mb-1">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{label}</label>
        {selectedCountry && (
            <span className="text-[9px] font-bold text-gold-500/50 uppercase tracking-wider">
                {selectedCountry.length} Digits Required
            </span>
        )}
      </div>
      <div className="phone-input-wrapper">
        <div className="country-selector" ref={dropdownRef}>
          <button 
            type="button" 
            className="country-button" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flag">{selectedCountry.flag}</span>
            <span className="code">{selectedCountry.code}</span>
            <ChevronDown size={14} className={`chevron ${isOpen ? 'open' : ''}`} />
          </button>

          {isOpen && (
            <div className="country-dropdown custom-scrollbar">
              {countries.map((c, i) => (
                <div 
                  key={i} 
                  className={`country-option ${selectedCountry.code === c.code ? 'active' : ''}`}
                  onClick={() => handleCountrySelect(c)}
                >
                  <span className="flag">{c.flag}</span>
                  <span className="name">{c.name}</span>
                  <span className="code">{c.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <input
          type="tel"
          value={displayValue || ''}
          onChange={handlePhoneChange}
          required={required}
          placeholder={placeholder}
          minLength={selectedCountry.length}
          maxLength={selectedCountry.length}
          className="phone-field"
        />
      </div>
    </div>
  );
}
