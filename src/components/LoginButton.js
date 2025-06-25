import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="login-page" className="active" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h2>Sign in to Continue</h2>
      <button
        style={{
          backgroundColor: '#4285F4',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.1em',
          padding: '12px 32px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={() => loginWithRedirect()}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default LoginPage;
