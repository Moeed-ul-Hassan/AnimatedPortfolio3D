const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-2xl font-bold font-poppins gradient-text">Moeed<span className="text-gray-200">.</span></a>
          </div>
          
          <div className="text-gray-400 text-center md:text-right">
            <p>&copy; {currentYear} Moeed-ul-Hassan. All rights reserved.</p>
            <p className="text-sm mt-1">Web Developer & Interactive Designer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
