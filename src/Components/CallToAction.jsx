import React from 'react';
import { Link } from 'react-router-dom';

function CallToAction() {
    return (
      <div className='cta-container'>
            <section className="call-to-action" >
                <h2>Ready to Exchange Skills?</h2>
                <p>Join our community and start bartering skills today!</p>
                <Link to="/auth" className="cta-button">Join Now</Link>
            </section>
      </div>
    );
}

export default CallToAction;
