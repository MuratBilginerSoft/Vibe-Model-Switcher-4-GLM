import React from 'react';
import useAppStore from '../store/useAppStore';

const AboutModal = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useAppStore();

  if (!isAboutModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsAboutModalOpen(false)}>
      <div className="modal about-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="about-modal-header">
          <button className="modal-close" onClick={() => setIsAboutModalOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-logo-container">
            <svg viewBox="0 0 80 80" fill="none" className="about-app-logo">
              <path
                d="M40 8C24 8 12 18 12 28c0 5 2.5 10 5 13.5C14 44.5 12 48 12 52c0 8 7.5 15 15 15 4 0 7.5-1.5 10-4 2.5 2.5 6 4 10 4 7.5 0 15-7 15-15 0-4-2.5-8.5-5-11 2.5-3.5 5-8.5 5-13.5 0-10-10-20-22-20z"
                stroke="url(#aboutBrainGradient)"
                strokeWidth="2.5"
                fill="none"
              />
              <path d="M27 32l-6 8 6 8" stroke="url(#aboutCodeGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M53 32l6 8-6 8" stroke="url(#aboutCodeGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M35 48l10-20" stroke="url(#aboutCodeGradient)" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="aboutBrainGradient" x1="12" y1="8" x2="68" y2="72">
                  <stop offset="0%" stopColor="#1E88E5" />
                  <stop offset="100%" stopColor="#0D47A1" />
                </linearGradient>
                <linearGradient id="aboutCodeGradient" x1="20" y1="25" x2="60" y2="55">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA000" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="about-title">Vibe Model Switcher 4 GLM</h1>
          <p className="about-subtitle">Claude CLI Profile Manager</p>
          <span className="about-version">v1.0.0</span>
        </div>

        {/* Description */}
        <div className="about-description">
          <p>
            Manage multiple Claude CLI configurations with ease.
            Switch between different model settings, API configurations,
            and preferences instantly.
          </p>
        </div>

        {/* Company Section */}
        <div className="about-company">
          <div className="about-company-logo">
            <svg viewBox="0 0 80 80" fill="none">
              <path
                d="M40 8C24 8 12 18 12 28c0 5 2.5 10 5 13.5C14 44.5 12 48 12 52c0 8 7.5 15 15 15 4 0 7.5-1.5 10-4 2.5 2.5 6 4 10 4 7.5 0 15-7 15-15 0-4-2.5-8.5-5-11 2.5-3.5 5-8.5 5-13.5 0-10-10-20-22-20z"
                stroke="url(#companyBrainGrad)"
                strokeWidth="2"
                fill="none"
              />
              <path d="M27 32l-6 8 6 8" stroke="url(#companyCodeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M53 32l6 8-6 8" stroke="url(#companyCodeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M35 48l10-20" stroke="url(#companyCodeGrad)" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="companyBrainGrad" x1="12" y1="8" x2="68" y2="72">
                  <stop offset="0%" stopColor="#1E88E5" />
                  <stop offset="100%" stopColor="#0D47A1" />
                </linearGradient>
                <linearGradient id="companyCodeGrad" x1="20" y1="25" x2="60" y2="55">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA000" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="about-company-name">Brainy Tech Solutions</h2>
          <p className="about-company-desc">
            We create innovative software solutions that enhance productivity and simplify complex workflows.
          </p>

          {/* Contact Info */}
          <div className="about-contact">
            <a href="mailto:contact@brainytech.net" className="about-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@brainytech.net</span>
            </a>
            <a href="https://brainytech.net" target="_blank" rel="noopener noreferrer" className="about-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span>brainytech.net</span>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="about-footer-note">
          <p>This application is an independent tool for Claude CLI users and has no official affiliation with Anthropic.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
