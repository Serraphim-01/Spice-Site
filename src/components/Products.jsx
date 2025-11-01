import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Products = () => {
  return (
    <section id="products" className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-8">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-200 mb-4"></div>
            <p>$10.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-200 mb-4"></div>
            <p>$10.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-200 mb-4"></div>
            <p>$10.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-200 mb-4"></div>
            <p>$10.00</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Products;
