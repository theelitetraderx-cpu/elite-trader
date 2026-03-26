'use client';

import React, { useState, useEffect, useRef } from 'react';
import './PhoneInput.css';
import { ChevronDown } from 'lucide-react';

const countries = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: '+359', name: 'Bulgaria', flag: '🇧🇬' },
  { code: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+370', name: 'Lithuania', flag: '🇱🇹' },
  { code: '+371', name: 'Latvia', flag: '🇱🇻' },
  { code: '+372', name: 'Estonia', flag: '🇪🇪' },
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
    // Notify parent of the change with the full phone number
    const numberOnly = value.includes(' ') ? value.split(' ')[1] : value;
    onChange(`${country.code} ${numberOnly || ''}`);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^\d]/g, ''); // Numbers only
    onChange(`${selectedCountry.code} ${val}`);
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

  return (
    <div className="phone-input-container">
      <label className="phone-label">{label}</label>
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
          placeholder="000 000 0000"
          className="phone-field"
        />
      </div>
    </div>
  );
}
