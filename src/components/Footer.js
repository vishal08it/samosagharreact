
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>@samosaghar</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#ff9800',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
};

export default Footer;
