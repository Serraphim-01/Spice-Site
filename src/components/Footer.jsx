import React from 'react';

const Footer = () => {
  return (
    <footer className="p-8 border-t">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">AfriSpice</div>
        <div>
          <p>contact@afrispice.com</p>
          <p>+1 234 567 890</p>
        </div>
        <div className="flex gap-4">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
