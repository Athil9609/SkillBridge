import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Exchange Skills, Build Community</h1>
                <p>Trade skills and services using time-based currency in a decentralized, trust-driven platform.</p>
                <Link to={'/auth'} className="cta">Sign Up</Link>
            </div>
        </section>
    );
}

export default HeroSection;
