import React from 'react';

const SocialLogin = () => {
    return (
    <div className="social-login">
      <button className="social-button"><img src="/logos/google.svg" alt="Google" className="social-icon" /> Google</button>
      <button className="social-button"><img src="/logos/apple.svg" alt="Apple" className="social-icon" /> Apple</button>
    </div>
    );
};

export default SocialLogin;
