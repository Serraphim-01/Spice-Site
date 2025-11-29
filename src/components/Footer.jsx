import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-orange-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/logo/LOGO-2-removebg.png" 
              alt="RichJoash Logo" 
              className="h-20 w-auto"
            />
            <p className="text-orange-100 text-sm leading-relaxed">
              Bringing you the authentic taste of Africa through premium,
              natural spices sourced directly from local farmers across the continent.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-orange-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-orange-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-orange-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-orange-300">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#home" className="block text-orange-100 hover:text-white transition-colors">
                Home
              </a>
              <a href="#products" className="block text-orange-100 hover:text-white transition-colors">
                Products
              </a>
              <a href="#about" className="block text-orange-100 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#contact" className="block text-orange-100 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-orange-300">Customer Care</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-orange-100 hover:text-white transition-colors">
                Shipping Info
              </a>
              <a href="#" className="block text-orange-100 hover:text-white transition-colors">
                Return Policy
              </a>
              <a href="#" className="block text-orange-100 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#" className="block text-orange-100 hover:text-white transition-colors">
                Track Order
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-orange-300">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-300" />
                <span className="text-orange-100">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-300" />
                <span className="text-orange-100">hello@richjoash.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-300 mt-0.5" />
                <span className="text-orange-100">
                  123 Spice Street,<br />
                  Lagos, Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-orange-200">
            <p>&copy; 2024 RichJoash. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}