import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <section id="contact" className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
      <form className="flex flex-col max-w-md mx-auto gap-4">
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Textarea placeholder="Message" />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
};

export default Contact;
