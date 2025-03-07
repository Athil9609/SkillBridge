import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
    const testimonials = [
        { text: "This platform has connected me with incredible people and opportunities!", author: "Alex" },
        { text: "A fantastic way to learn and exchange skills without using traditional currency.", author: "Jamie" },
        { text: "Skill barter has never been this easy and effective!", author: "Morgan" }
    ];

    return (
        <section className="testimonials" id="testimonials">
            <h2>Testimonials</h2>
            <div className="testimonials-container">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        <FaQuoteLeft className="quote-icon" />
                        <p>{testimonial.text}</p>
                        <h4>- {testimonial.author}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
