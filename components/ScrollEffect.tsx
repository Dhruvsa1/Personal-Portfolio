'use client';

import { useState, useEffect, useMemo } from 'react';
import { AuroraText } from './ui/aurora-text';
import { TypingAnimation } from './ui/typing-animation';
import './ScrollEffect.css';

interface WordStyle {
  word: string;
  fontSize: string;
  animationDelay: string;
  fadeInDelay: string;
  left: string;
  top: string;
}

export default function ScrollEffect() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showNameReveal, setShowNameReveal] = useState(false);
  const [showAurora, setShowAurora] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [skipButtonOut, setSkipButtonOut] = useState(false);
  const [wordStyles, setWordStyles] = useState<WordStyle[]>([]);
  
  // Random tech/portfolio words for the loading animation
  const loadingWords = useMemo(() => [
    'React', 'TypeScript', 'Next.js', 'JavaScript', 'CSS',
    'HTML', 'Node.js', 'Git', 'Tailwind', 'UI/UX',
    'Design', 'Frontend', 'Backend', 'API', 'Database',
    'MongoDB', 'PostgreSQL', 'Python', 'Java', 'Docker',
    'AWS', 'Firebase', 'Vercel', 'GraphQL', 'REST',
    'Responsive', 'Animation', 'Performance', 'SEO', 'Testing',
    'Agile', 'Scrum', 'CI/CD', 'DevOps', 'Security',
    'Accessibility', 'Redux', 'Context', 'Hooks', 'Components',
    'State', 'Props', 'Async', 'Promise', 'OAuth',
    'JWT', 'Webpack', 'Vite', 'npm', 'yarn'
  ], []);
  
  // Generate stable random styles only on client-side mount
  useEffect(() => {
    const styles = loadingWords.map((word, index) => ({
      word,
      fontSize: `${Math.random() * 2 + 4}vmin`,
      animationDelay: `${Math.random() * -4}s`,
      fadeInDelay: `${index * 0.05}s`, // Staggered fade-in (0s, 0.05s, 0.1s, etc.)
      left: `${Math.random() * 60 + 20}%`, // Random position between 20% and 80%
      top: `${Math.random() * 60 + 20}%`   // Random position between 20% and 80%
    }));
    setWordStyles(styles);
  }, [loadingWords]);
  
  // Disable scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Auto-play the loading animation
  useEffect(() => {
    if (!loadingComplete) {
      // Start fade out before completing
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
        setSkipButtonOut(true); // Animate skip button out
      }, 5000); // Start fading at 5 seconds

      // Complete loading and show final reveal
      const completeTimer = setTimeout(() => {
        setLoadingComplete(true);
        // Trigger name reveal after transition
        setTimeout(() => {
          setShowNameReveal(true);
          // Show aurora after name is fully revealed
          setTimeout(() => {
            setShowAurora(true);
            // Show typing animation after aurora transition
            setTimeout(() => {
              setShowTyping(true);
              // Show socials shortly after typing starts
              setTimeout(() => setShowSocials(true), 1500);
            }, 1000);
          }, 2000);
        }, 800);
      }, 6500); // 6.5 seconds total

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [loadingComplete]);

  const handleSkip = () => {
    setFadeOut(true);
    setSkipButtonOut(true); // Animate skip button out
    setTimeout(() => {
      setLoadingComplete(true);
      setShowNameReveal(true);
      setShowAurora(true);
      setShowTyping(true);
      setShowSocials(true);
    }, 800);
  };

  return (
    <>
      {/* Starfield Background */}
      <div className="starfield-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      {/* Navigation Menu */}
      {loadingComplete && (
        <nav className="top-nav">
          <div className="nav-logo">DD</div>
          <div className="nav-links">
            <a href="/about" className="nav-link">About</a>
            <a href="/experience" className="nav-link">Experience</a>
            <a href="/projects" className="nav-link">Projects</a>
            <a href="/skills" className="nav-link">Skills</a>
            <a href="/blog" className="nav-link">Blog</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/resume" className="nav-link nav-link-resume">Resume</a>
          </div>
        </nav>
      )}

      {/* Loading Animation */}
      {!loadingComplete && wordStyles.length > 0 && (
        <div className={`loading-animation ${fadeOut ? 'fade-out' : ''}`}>
          <div className="stuck-grid">
            {wordStyles.map((style, index) => (
              <div 
                key={index} 
                className="grid-item loading-word"
                style={{
                  fontSize: style.fontSize,
                  left: style.left,
                  top: style.top,
                  animationDelay: `${style.fadeInDelay}, ${style.animationDelay}`
                }}
              >
                {style.word}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final DD with Name Reveal */}
      {loadingComplete && (
        <div className="final-reveal fade-in">
          <div className={`stuck-grid final-grid`}>
            <div className={`grid-item name-reveal ${showNameReveal ? 'show-name' : ''}`}>
              <h1 className="aurora-text-content">
                <div className="text-layers">
                  {/* White text layer */}
                  <span className={`text-layer white-layer ${showAurora ? 'fade-out' : ''}`}>
                    <span className="big-d">D</span>
                    <span className="slide-out slide-out-first">hruvsai</span>
                    <span className="name-spacer"></span>
                    <span className="big-d">D</span>
                    <span className="slide-out slide-out-second">hulipudi</span>
                  </span>
                  
                  {/* Aurora text layer */}
                  <span className={`text-layer aurora-layer ${showAurora ? 'fade-in' : ''}`}>
                    <span className="big-d">D</span>
                    <span className="slide-out slide-out-first">hruvsai</span>
                    <span className="name-spacer"></span>
                    <AuroraText 
                      className="big-d"
                      colors={["#ffffff", "#22d3ee", "#3b82f6", "#8b5cf6", "#60a5fa", "#a78bfa"]}
                      speed={1.2}
                    >
                      D
                    </AuroraText>
                    <AuroraText 
                      className="slide-out slide-out-second"
                      colors={["#ffffff", "#22d3ee", "#3b82f6", "#8b5cf6", "#60a5fa", "#a78bfa"]}
                      speed={1.2}
                    >
                      hulipudi
                    </AuroraText>
                  </span>
                </div>
              </h1>
              
              {/* Typing Animation - Introduction Text */}
              <div className={`intro-text ${showTyping ? 'visible' : ''}`}>
                {showTyping && (
                  <TypingAnimation
                    className="typing-intro"
                    typeSpeed={80}
                    showCursor={true}
                    blinkCursor={true}
                    startOnView={false}
                  >
                    Full-stack developer passionate about creating elegant solutions to complex problems
                  </TypingAnimation>
                )}
              </div>
              
              {/* Social Links */}
              {showSocials && (
                <div className="socials-container">
                  {/* LinkedIn */}
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* GitHub */}
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  {/* Email */}
                  <a href="mailto:your.email@example.com" className="social-link email-link">
                    <div className="letter-image">
                      <div className="animated-mail">
                        <div className="back-fold"></div>
                        <div className="letter">
                          <div className="letter-border"></div>
                          <div className="letter-title"></div>
                          <div className="letter-context"></div>
                          <div className="letter-stamp">
                            <div className="letter-stamp-inner"></div>
                          </div>
                        </div>
                        <div className="top-fold"></div>
                        <div className="body"></div>
                        <div className="left-fold"></div>
                      </div>
                      <div className="shadow"></div>
                    </div>
                  </a>
                  
                  {/* School Email */}
                  <a href="mailto:your.school@edu" className="social-link email-link school-email">
                    <div className="letter-image">
                      <div className="animated-mail">
                        <div className="back-fold"></div>
                        <div className="letter">
                          <div className="letter-border"></div>
                          <div className="letter-title"></div>
                          <div className="letter-context"></div>
                          <div className="letter-stamp">
                            <div className="letter-stamp-inner"></div>
                          </div>
                        </div>
                        <div className="top-fold"></div>
                        <div className="body"></div>
                        <div className="left-fold"></div>
                      </div>
                      <div className="shadow"></div>
                    </div>
                  </a>
                  
                  {/* Phone */}
                  <a href="tel:+1234567890" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                    </svg>
                  </a>
                  
                  {/* Resume */}
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Skip Button (only during loading) */}
      {!loadingComplete && (
        <div className={`navigation-controls ${skipButtonOut ? 'slide-out' : ''}`}>
          <button 
            className="nav-button skip-button" 
            onClick={handleSkip}
          >
            Skip <span className="button-icon">⏭</span>
          </button>
        </div>
      )}
    </>
  );
}

