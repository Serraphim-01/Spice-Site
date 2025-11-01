import React from 'react';

const WhyUs = () => {
  return (
    <section id="why-us" className="p-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
      <div className="flex flex-col md:flex-row justify-around gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Quality Ingredients</h3>
          <p>We source the finest ingredients from across Africa.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Authentic Recipes</h3>
          <p>Our recipes are passed down through generations.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p>We deliver to your doorstep in no time.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
