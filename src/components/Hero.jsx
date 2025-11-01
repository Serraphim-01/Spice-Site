import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[400px] bg-gray-100 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to AfriSpice</h1>
      <p className="text-xl mb-8">The authentic taste of Africa, delivered to your doorstep.</p>
      <Button size="lg">Shop Now</Button>
    </section>
  );
};

export default Hero;
