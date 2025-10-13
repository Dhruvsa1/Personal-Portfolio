'use client';

import Link from 'next/link';
import './Cabinet.css';

interface DrawerProps {
  position: number;
  label: string;
  link: string;
  isLetters?: boolean;
}

const Drawer = ({ position, label, link, isLetters }: DrawerProps) => {
  return (
    <div className="chest__drawer drawer" data-position={position}>
      <details>
        <summary></summary>
      </details>
      <div className="drawer__structure">
        <div className="drawer__panel drawer__panel--back">
          {isLetters ? (
            label.split('').map((letter, index) => (
              <span key={index} className="letter">{letter}</span>
            ))
          ) : (
            <Link href={link} className="drawer-link">
              <span>{label}</span>
            </Link>
          )}
        </div>
        <div className="drawer__panel drawer__panel--bottom"></div>
        <div className="drawer__panel drawer__panel--right"></div>
        <div className="drawer__panel drawer__panel--left"></div>
        <div className="drawer__panel drawer__panel--front"></div>
      </div>
    </div>
  );
};

export default function Cabinet() {
  return (
    <div className="cabinet-container">
      <div className="chest">
        <div className="chest__panel chest__panel--back"></div>
        <div className="chest__panel chest__panel--top"></div>
        <div className="chest__panel chest__panel--bottom"></div>
        <div className="chest__panel chest__panel--right"></div>
        <div className="chest__panel chest__panel--front">
          <div className="chest__panel chest__panel--front-frame"></div>
        </div>
        <div className="chest__panel chest__panel--left"></div>
        
        <Drawer position={1} label="Home" link="/" />
        <Drawer position={2} label="About" link="/about" />
        <Drawer position={3} label="Projects" link="/projects" />
        <Drawer position={4} label="Blog" link="/blog" />
        <Drawer position={5} label="Contact" link="/contact" isLetters={true} />
      </div>
    </div>
  );
}

