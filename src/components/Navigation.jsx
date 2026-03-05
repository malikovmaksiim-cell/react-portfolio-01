import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { t } from "../i18n";

const Navigation = ({ language = "ru", onLanguageChange }) => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            const navHeight = 60;
            const elementPosition = element.offsetTop - navHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
        closeMobileMenu(); // Close mobile menu after clicking
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
  { href: "#about", label: t("about", language) },
  { href: "#projects", label: t("projects", language) },
  { href: "#skills", label: t("skills", language) },
  { href: "#contact", label: t("contact", language) },
];


    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className={`text-xl font-bold transition-colors cursor-pointer hover:opacity-80 ${isScrolled ? 'text-black' : 'text-black'}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Portfolio
                    </div>

                    {/* Desktop Menu */}
<div className="hidden md:flex items-center space-x-8">
  {navItems.map((item) => (
    <a
      key={item.href}
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(item.href);
      }}
      className="text-gray-600 hover:text-black transition-colors text-sm"
    >
      {item.label}
    </a>
  ))}

  {/* Переключатель языка */}
  <div className="flex items-center gap-2 ml-4">
    <button
      type="button"
      onClick={() => onLanguageChange && onLanguageChange("ru")}
      className={`text-xs px-2 py-1 rounded border ${
        language === "ru"
          ? "bg-black text-white border-black"
          : "border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}
    >
      RU
    </button>
    <button
      type="button"
      onClick={() => onLanguageChange && onLanguageChange("et")}
      className={`text-xs px-2 py-1 rounded border ${
        language === "et"
          ? "bg-black text-white border-black"
          : "border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}
    >
      ET
    </button>
  </div>
</div>


                    { /* Mobile Men Button */}
                    <button onClick={toggleMobileMenu} className={`md:hidden p-2 transition-colors cursor-pointer ${isScrolled ? 'text-gray-600 hover:text-black' : 'text-gray-700 hover:text-black'}`}>
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                { /* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-4 space-y-4">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href} onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                            }} className="block text-gray-600 hover:text-black transition-colors py-2">
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;