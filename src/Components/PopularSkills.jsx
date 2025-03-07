import React from "react";
import { FaChalkboardTeacher, FaCode, FaPalette, FaLanguage } from "react-icons/fa";

function PopularSkills() {
    return (
        <section className="popular-skills" id="services" aria-labelledby="popular-skills-heading">
            <h2 id="popular-skills-heading">Popular Skills</h2>
            <div className="skills-grid">
                <div className="skill">
                    <FaChalkboardTeacher className="skill-icon" />
                    <span>Tutoring</span>
                </div>
                <div className="skill">
                    <FaCode className="skill-icon" />
                    <span>Web Development</span>
                </div>
                <div className="skill">
                    <FaPalette className="skill-icon" />
                    <span>Art & Design</span>
                </div>
                <div className="skill">
                    <FaLanguage className="skill-icon" />
                    <span>Language Exchange</span>
                </div>
            </div>
        </section>
    );
}

export default PopularSkills;
