import  {  useRef } from 'react';

const Footer = () => {
  const footerRef = useRef(null);
  
 
    
   

  return (
    <section 
      ref={footerRef}
      className="footer relative bg-gradient-to-br from-slate-950 to-slate-900 text-white py-12 px-4 overflow-hidden"
    >
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-grid-slate-800/10 opacity-30 
                    after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-slate-950"></div>
      
      {/* Animated neon glow elements */}
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-purple-500 rounded-full filter blur-2xl opacity-20"></div>
      
     
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* About Section */}
        <div className="group relative">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 rounded-xl transition-all duration-300"></span>
          <h2 className="text-lg font-semibold mb-4 
                        bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
            About Us
          </h2>
          <p className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
            We provide cutting-edge solutions powered by AI and innovation. Explore our services and transform your business with technology.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="group relative">
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 rounded-xl transition-all duration-300"></span>
          <h2 className="text-lg font-semibold mb-4 
                        bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Quick Links
          </h2>
          <ul className="text-sm text-slate-300 space-y-2">
            {['Home', 'Products', 'About Us', 'Contact', 'FAQs'].map((link) => (
              <li key={link} className="transition-transform duration-300 hover:-translate-y-1">
                <a href={`/${link.toLowerCase().replace(' ', '')}`} 
                   className="hover:text-cyan-400 transition-colors duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.7)] relative group">
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-400 
                                  group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="group relative">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 rounded-xl transition-all duration-300"></span>
          <h2 className="text-lg font-semibold mb-4 
                        bg-gradient-to-r from-purple-400 to-cyan-300 text-transparent bg-clip-text">
            Contact Us
          </h2>
          <ul className="text-sm text-slate-300 space-y-2 group-hover:text-white transition-colors duration-300">
            <li><span className="font-semibold text-blue-400">Email:</span> support@yourdomain.com</li>
            <li><span className="font-semibold text-blue-400">Phone:</span> +91-123-456-7890</li>
            <li><span className="font-semibold text-blue-400">Address:</span> 123 Tech Park, City, Country</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur"></div>
      </div>

      {/* Social Media and Copyright */}
      <div className="flex flex-col items-center space-y-4 relative z-10">
        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a href="https://instagram.com" target="_blank" 
             className="text-slate-300 hover:text-pink-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_8px_rgba(244,114,182,0.7)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2a5.75 5.75 0 0 0-5.75 5.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5a5.75 5.75 0 0 0 5.75-5.75v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm8.5 1.5a4.25 4.25 0 0 1 4.25 4.25v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5h8.5zM17.25 4.9a.85.85 0 1 0 0 1.7.85.85 0 0 0 0-1.7zm-5.25 2.6a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" 
             className="text-slate-300 hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_8px_rgba(96,165,250,0.7)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-400 text-center">&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </section>
  );
};

export default Footer;