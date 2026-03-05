import React, { useState } from "react";
import Navigation from "./components/Navigation";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [language, setLanguage] = useState("ru"); 

  const hasAnimated = useIntersectionObserver();
  const showScrollTop = useScrollToTop();

  return (
  <div className="min-h-screen bg-white text-black">
    <Navigation language={language} onLanguageChange={setLanguage} />

    <Hero hasAnimated={hasAnimated} language={language} />
    <About hasAnimated={hasAnimated} language={language} />
    <Projects hasAnimated={hasAnimated} language={language} />
    <Skills hasAnimated={hasAnimated} language={language} />
    <Contact hasAnimated={hasAnimated} language={language} />
    <Footer language={language} />

    <ScrollToTop showScrollTop={showScrollTop} />
  </div>
);

};

export default App;