'use client';

import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
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
  const [showTyping, setShowTyping] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [skipButtonOut, setSkipButtonOut] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [wordStyles, setWordStyles] = useState<WordStyle[]>([]);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
  const [showExperience1, setShowExperience1] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState<string>('https://website-file-manager.b-cdn.net/Website%20Assets/IMG_3473.jpg');
  const [showProfilePlaceholder, setShowProfilePlaceholder] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
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
  
  // Disable scrolling during loading, enable after
  useEffect(() => {
    if (!loadingComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loadingComplete]);

  // Scroll spy - detect active section
  useEffect(() => {
    if (!loadingComplete) return;

    const handleScroll = () => {
          // Projects section removed from scroll spy since it's hidden
          const sections = ['home', 'about', 'resume'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingComplete]);

  // Scroll reveal animation observer
  useEffect(() => {
    if (!loadingComplete) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute('data-reveal-id');
          if (elementId) {
            setRevealedElements(prev => new Set([...prev, elementId]));
          }
        }
      });
    }, observerOptions);

    // Observe all elements with data-reveal-id attribute
    const revealElements = document.querySelectorAll('[data-reveal-id]');
    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      revealElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [loadingComplete]);


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
          // Show typing animation after name is fully revealed
          setTimeout(() => {
            setShowTyping(true);
            // Show socials shortly after typing starts
            setTimeout(() => setShowSocials(true), 1500);
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
    // Fast-forward to the same staged sequence as autoplay
    setTimeout(() => {
      setLoadingComplete(true);
      // Keep the same timings as the normal flow
      setTimeout(() => {
        setShowNameReveal(true);
        setTimeout(() => {
          setShowTyping(true);
          setTimeout(() => setShowSocials(true), 1500);
        }, 2000);
      }, 800);
    }, 100);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Copy to clipboard function with toast notification
  const copyToClipboard = async (text: string, message: string = 'Copied to clipboard!') => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage(message);
      setShowToast(true);
      // Hide toast after 2 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setToastMessage('Failed to copy');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
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
            <button onClick={() => scrollToSection('home')} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</button>
            <button onClick={() => scrollToSection('about')} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Me</button>
            <button onClick={() => scrollToSection('resume')} className={`nav-link ${activeSection === 'resume' ? 'active' : ''}`}>Resume</button>
            {/* Projects tab hidden - might add back later if owner wants */}
            {/* <button onClick={() => scrollToSection('projects')} className={`nav-link nav-link-projects ${activeSection === 'projects' ? 'active' : ''}`}>Projects</button> */}
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

      {/* Home Section - Final DD with Name Reveal */}
      {loadingComplete && (
        <section id="home" className="page-section home-section">
          <div className="final-reveal fade-in">
            <div className={`stuck-grid final-grid`}>
              <div className={`grid-item name-reveal ${showNameReveal ? 'show-name' : ''}`}>
              <h1 className="aurora-text-content">
                <AuroraText 
                  className="big-d"
                  colors={["#ffffff", "#22d3ee", "#3b82f6", "#8b5cf6", "#60a5fa", "#a78bfa"]}
                  speed={1.2}
                >
                  D
                </AuroraText>
                <span className="slide-out slide-out-first">hruvsai</span>
                <span className="name-spacer"></span>
                <AuroraText 
                  className="big-d"
                  colors={["#ffffff", "#22d3ee", "#3b82f6", "#8b5cf6", "#60a5fa", "#a78bfa"]}
                  speed={1.2}
                >
                  D
                </AuroraText>
                <span className="slide-out slide-out-second">hulipudi</span>
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
                  <a href="https://www.linkedin.com/in/dhruvsai-dhulipudi-259a83293/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* GitHub */}
                  <a href="https://github.com/Dhruvsa1/Personal-Portfolio" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  {/* School Email */}
                  <button 
                    onClick={() => copyToClipboard('ddhulipudi3@gatech.edu')} 
                    className="social-link email-link school-email"
                    title="Copy school email to clipboard"
                  >
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
                      <div className="shadow">                      </div>
                    </div>
                  </button>
                  
                  {/* Phone */}
                  <button 
                    onClick={() => copyToClipboard('4703573785', 'Phone number copied!')} 
                    className="social-link"
                    title="Copy phone number to clipboard"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                    </svg>
                  </button>
                  
                  {/* Resume */}
                  <a href="https://drive.google.com/file/d/1lB2u6K1f3o5IvdyWAFXVCZOQA5uAL39s/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
          </div>
        </section>
      )}

      

      {/* About Me Section */}
      {loadingComplete && (
        <section id="about" className="page-section content-section">
          <div className="about-container">
            <div className="about-header">
              <h2 className="section-title">About Me</h2>
            </div>
            
            <div className="about-content two-pane">
              {/* Left Sidebar */}
              <aside className="about-sidebar">
                <div className="profile-card">
                  <div className="profile-image-container">
                    {!showProfilePlaceholder ? (
                      <img 
                        src={profileImageSrc}
                        alt="Dhruvsai Dhulipudi"
                        className="profile-image"
                        onError={() => {
                          // If image fails to load, show placeholder
                          setShowProfilePlaceholder(true);
                        }}
                      />
                    ) : (
                    <div className="profile-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    )}
                  </div>
                </div>
                {/* Name + Education stacked */}
                <div className="sidebar-section">
                  <h3 className="sidebar-name">Dhruvsai Dhulipudi</h3>
                  <div className="education-card compact">
                    <h3 className="card-title">
                      <span className="card-icon">🎓</span>
                      Education
                    </h3>
                    <div className="education-details">
                      <div className="school-name">Georgia Institute of Technology</div>
                      <div className="degree">B.S. in Computer Engineering</div>
                      <div className="gpa">GPA: 3.85/4.0 • Dec 2027</div>
                      <div className="location">Atlanta, GA</div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right Content */}
              <main className="about-main-content">
                {/* Header with Contact Information */}
                <div className="about-content-section">
                  <div className="about-header-info">
                    <h1 className="about-name">Dhruvsai Dhulipudi</h1>
                    <div className="contact-info">
                      <span>US Citizen</span>
                      <span>|</span>
                      <a href="mailto:ddhulipudi3@gatech.edu" className="contact-link">ddhulipudi3@gatech.edu</a>
                      <span>|</span>
                      <a href="tel:4703573785" className="contact-link">4703573785</a>
                      <span>|</span>
                      <a href="https://www.linkedin.com/in/dhruvsai-dhulipudi-259a83293/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn: Dhruvsai Dhulipudi</a>
                      <span>|</span>
                      <a href="https://github.com/dhruvsa1" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub: dhruvsa1</a>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="about-content-section">
                  <h2 className="content-section-title">Education</h2>
                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">Georgia Institute of Technology</h3>
                      <span className="info-location">Atlanta, GA</span>
                    </div>
                    <div className="info-subtitle">Bachelor of Science in Computer Engineering | GPA: 3.85/4.0</div>
                    <div className="info-date">Expected Graduation: Dec 2027</div>
                    <ul className="info-list">
                      <li>Relevant Coursework: Linear Algebra, Multivariable Calculus, Combinatorics, Differential Equations, Discrete Mathematics, Data Structures & Algorithms, Object-Oriented Programming, Physics I & II</li>
                    </ul>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="about-content-section">
                  <h2 className="content-section-title">Experience</h2>
                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">KKTutors</h3>
                      <span className="info-location">Suwanee, GA</span>
                    </div>
                    <div className="info-subtitle">Full Stack Website Developer Intern</div>
                    <div className="info-date">May 2025 – June 2025</div>
                    <ul className="info-list">
                      <li>Led the migration of the tutoring platform's frontend from Angular to React, modernizing the UI architecture, improving load times by 40%, and enabling reusable components.</li>
                      <li>Built and maintained full-stack web applications for a tutoring platform serving 100+ active students, leveraging the MERN stack (MongoDB, Express.js, React, Node.js) to deliver scalable REST APIs and responsive UIs.</li>
                      <li>Developed AI-powered problem generator and assessment software using Python, Flask, MongoDB, and the OpenAI API, reducing manual test creation time by 80%.</li>
                      <li>Implemented real-time analytics dashboards tracking performance metrics across 100+ students using React state management and Node.js APIs with sub-200ms latency.</li>
                      <li>Deployed and managed web services on AWS Lightsail using containerized environments for high availability and scalable infrastructure.</li>
                      <li>Applied best practices in version control, debugging, and agile iteration, cutting bug resolution time by 30%.</li>
                    </ul>
                  </div>
                </div>

                {/* Projects Section */}
                <div className="about-content-section">
                  <h2 className="content-section-title">Projects</h2>
                  
                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">GTDormLaundry</h3>
                      <span className="info-tech">SwiftUI, Firebase, REST API</span>
                    </div>
                    <ul className="info-list">
                      <li>Developed an iOS app using SwiftUI to monitor washer/dryer availability with real-time Firebase updates.</li>
                      <li>Implemented state management and push notifications for cycle completion and machine status.</li>
                      <li>Designed backend schema for session tracking, machine logging, and IoT extensibility.</li>
                      <li>Integrated camera-based scanning for fast student check-ins.</li>
                    </ul>
                  </div>

                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">Local Whisper Transcriber</h3>
                      <span className="info-tech">Python, Rust, Faster-Whisper, CTranslate2</span>
                    </div>
                    <ul className="info-list">
                      <li>Built an offline audio-to-text transcription app using Whisper + Faster-Whisper supporting GPU/CPU inference.</li>
                      <li>Implemented preprocessing (VAD, normalization) for improved accuracy and reduced latency.</li>
                      <li>Extended modular pipeline for summarization, quiz generation, and LaTeX parsing.</li>
                      <li>Optimized inference with Rust extensions for memory efficiency and concurrency, using int8 (CPU) and fp16 (GPU) quantization.</li>
                    </ul>
                  </div>

                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">AeroTrack Drone</h3>
                      <span className="info-tech">Raspberry Pi, YOLOv8, Computer Vision</span>
                    </div>
                    <ul className="info-list">
                      <li>Built a custom drone integrating Raspberry Pi, camera module, and soldered hardware for autonomous vision-based tracking.</li>
                      <li>Implemented YOLOv8 model for real-time person detection and motion tracking.</li>
                      <li>Developed a Python control system enabling dynamic subject following, designed for third-person POV applications.</li>
                    </ul>
                  </div>

                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">FIRST Robotics Competition</h3>
                      <span className="info-tech">Java, C++, PlatformIO, ROS, Raspberry Pi, WPILib, SolidWorks, OnShape</span>
                    </div>
                    <ul className="info-list">
                      <li>Programming Lead and CAD Subcommittee Lead; qualified for World Championships and placed Top 10 at Georgia State.</li>
                      <li>Developed robot subsystems and automation pipelines in Java and C++ using WPILib's Command-Based framework and PlatformIO for embedded development.</li>
                      <li>Integrated the ROS (Robot Operating System) framework for inter-process communication between vision, control, and localization nodes, enabling modular and distributed robotics software architecture.</li>
                      <li>Programmed microcontrollers for real-time motor control, sensor fusion, and PID-based automation with emphasis on low-latency reliability.</li>
                      <li>Implemented computer vision and autonomous decision-making on Raspberry Pi, integrating with drivetrain and targeting systems.</li>
                    </ul>
                  </div>

                  <div className="info-block">
                    <div className="info-header">
                      <h3 className="info-title">MediSync - Diamond Challenge Finalist</h3>
                      <span className="info-tech">AI, Inventory Management</span>
                    </div>
                    <ul className="info-list">
                      <li>Ranked in the top 8% globally in the Diamond Challenge Business Competition.</li>
                      <li>Developed an AI-driven medical inventory management platform using Python, Flask, and MongoDB for automated stock tracking and optimization.</li>
                    </ul>
                  </div>
                </div>

                {/* Technical Skills Section */}
                <div className="about-content-section">
                  <h2 className="content-section-title">Technical Skills</h2>
                  <div className="info-block">
                    <div className="skills-category">
                      <strong>Languages:</strong> Java, Python, JavaScript, TypeScript, C++, Rust, HTML/CSS, Node.js, React, SwiftUI (iOS), Express.js
                    </div>
                    <div className="skills-category">
                      <strong>Developer Tools:</strong> Xcode, IntelliJ, PyCharm, VSCode, Git, Docker, MongoDB, PostgreSQL, Redis, Tailwind CSS, Firebase, Fusion 360, OnShape, AWS (Lightsail), GitHub, GitLab, SolidWorks
                    </div>
                    <div className="skills-category">
                      <strong>APIs & Frameworks:</strong> Flask, OpenAI API, Faster-Whisper, CTranslate2
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>
      )}

      {/* Resume Section */}
      {loadingComplete && (
        <section id="resume" className="page-section content-section">
          <div className="section-content">
            <h2 className="section-title">Resume</h2>
            <div className="resume-container">
              <iframe 
                src="https://drive.google.com/file/d/1lB2u6K1f3o5IvdyWAFXVCZOQA5uAL39s/preview" 
                width="100%" 
                height="800px"
                style={{ border: 'none', borderRadius: '8px' }}
                title="Resume"
              />
              <div className="resume-link-container">
                <a 
                  href="https://drive.google.com/file/d/1lB2u6K1f3o5IvdyWAFXVCZOQA5uAL39s/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resume-download-link"
                >
                  Open in Google Drive
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section - Hidden for now, might add back later if owner wants */}
      {/* {loadingComplete && (
        <section id="projects" className="page-section content-section">
          <div className="section-content">
            <h2 className="section-title">Projects</h2>
            <p className="section-text">Content coming soon...</p>
          </div>
        </section>
      )} */}

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

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <svg className="toast-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="toast-message">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}

