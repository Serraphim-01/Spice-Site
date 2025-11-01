import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-bold">AfriSpice</div>
      <nav>
        <ul className="flex gap-4">
          <li><a href="#products">Products</a></li>
          <li><a href="#why-us">Why Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <Button>Sign Up</Button>
    </header>
  );
};

export default Header;
