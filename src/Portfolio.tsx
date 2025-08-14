import React, { useEffect, useRef, useState } from 'react';
import { 
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Eye,
  Instagram
} from 'lucide-react';

// Type definitions
interface LetterDisplayProps {
  word: string;
  isMain?: boolean;
}

interface VisibilityState {
  [key: string]: boolean;
}

// Letter Display Component
function LetterDisplay({ word, isMain = false }: LetterDisplayProps) {
  const getRandomSpeed = () => 0.6 + Math.random() * 0.8;
  
  return (
    <>
      {word.split('').map((char: string, i: number) => (
        <div
          key={i}
          className={`letter inline-block font-bold transition-all duration-300 hover:scale-105 ${
            isMain 
              ? 'text-6xl md:text-8xl lg:text-9xl text-gray-900' 
              : 'text-3xl md:text-5xl lg:text-6xl text-gray-700'
          }`}
          data-speed={getRandomSpeed()}
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </div>
      ))}
    </>
  );
}

// Hero Section
function CreativeHero() {
  const ref = useRef<HTMLDivElement>(null);
  
  const lines = [
    { text: 'Hi, I am', isMain: false },
    { text: 'DURE MANSUR', isMain: true },
    { text: 'Product Manager • Analyst • Creative', isMain: false }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      
      const letters = ref.current.querySelectorAll('.letter');
      letters.forEach((letter: Element, index: number) => {
        const htmlElement = letter as HTMLElement;
        const speed = parseFloat(htmlElement.dataset.speed || '1');
        const translateY = (1 - speed) * scrollProgress * 600;
        const rotation = (Math.sin(index * 0.5) * 15) * scrollProgress;
        const scale = Math.max(1 - scrollProgress * 0.3, 0.7);
        
        htmlElement.style.transform = `translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`;
        htmlElement.style.opacity = Math.max(1 - scrollProgress * 1.2, 0).toString();
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={ref} 
      className="h-screen flex flex-col justify-center items-center text-center px-8 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 mb-12">
        {lines.map((line, index) => (
          <div key={index} className="flex flex-wrap justify-center mb-6">
            <LetterDisplay word={line.text} isMain={line.isMain} />
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 relative z-10">
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-6">
          Bridging <span className="font-semibold text-gray-900">financial innovation</span> with 
          <span className="font-semibold text-gray-900"> creative excellence</span>
        </p>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
          Transforming complex fintech challenges into elegant solutions while crafting visual stories that drive 
          <span className="font-semibold text-gray-900"> measurable impact</span>
        </p>
      </div>
      
      <div className="mt-16 animate-bounce">
        <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-gray-600 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));
    
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">
              D. Mansur
            </div>
            <div className="hidden md:flex space-x-8">
              {['story', 'expertise', 'tools', 'work', 'connect'].map((section) => (
                <a 
                  key={section}
                  href={`#${section}`} 
                  className="capitalize text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {section}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative">
        <CreativeHero />
      </section>
      
      {/* Impact Metrics */}
      <section className="py-24 relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Impact & Results
            </h2>
            <p className="text-xl text-gray-600">Measurable outcomes from strategic innovation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl">⭐</div>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 text-center">2+</div>
              <p className="text-gray-600 font-medium text-center group-hover:text-gray-800 transition-colors">Years Experience</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl">📈</div>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 text-center">25K+</div>
              <p className="text-gray-600 font-medium text-center group-hover:text-gray-800 transition-colors">Merchants Enabled</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl">⚡</div>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 text-center">300%</div>
              <p className="text-gray-600 font-medium text-center group-hover:text-gray-800 transition-colors">Engagement Growth</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl">💰</div>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 text-center">15M+</div>
              <p className="text-gray-600 font-medium text-center group-hover:text-gray-800 transition-colors">USD Throughput</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section id="story" className="py-24 bg-white" data-animate>
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">My Journey</h2>
              <p className="text-xl text-gray-600">Where analytical precision meets creative vision</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gray-400 rounded-full"></div>
                  <div className="pl-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">💼</span>
                      Fintech Expertise
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      I specialize in transforming complex payment ecosystems and financial processes. At Bank Alfalah, 
                      I led initiatives that enabled 25,000+ merchants and drove significant transaction volumes while 
                      ensuring compliance and operational excellence.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gray-600 rounded-full"></div>
                  <div className="pl-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">🎨</span>
                      Creative Excellence
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      My creative practice spans photography, visual design, and digital storytelling. 
                      This artistic foundation enhances my approach to product design and user experience, 
                      creating solutions that are both functional and engaging.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-lg">
                  <div className="text-center space-y-6">
                    <div className="text-6xl">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-900">My Approach</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Combining analytical rigor with creative thinking to solve complex challenges. 
                      Whether optimizing payment flows or crafting visual narratives, I believe the best 
                      solutions emerge from the intersection of data and design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Competencies Section */}
      <section id="expertise" className="py-24 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible.expertise ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Core Competencies</h2>
              <p className="text-xl text-gray-600">Strategic expertise that drives measurable business impact</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <span className="text-3xl">💼</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Product & Portfolio Management</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors">
                    Skilled in POS and e-commerce product development, merchant lifecycle management, feature enhancement, and pricing strategy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Product Development', 'POS Systems', 'E-commerce', 'Merchant Management', 'Pricing Strategy', 'Feature Enhancement'].map((tool, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
                      <span className="text-3xl">📊</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Business & Data Analysis</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors">
                    Experienced in KPI tracking, volume variance analysis, ad hoc reporting, and dashboard development using advanced analytics tools.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['KPI Tracking', 'Volume Analysis', 'Ad Hoc Reporting', 'Dashboard Development', 'Data Visualization'].map((tool, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
                      <span className="text-3xl">💳</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Payments & Compliance</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors">
                    Working knowledge of Visa/Mastercard scheme requirements, audit documentation, billing optimization, and regulatory reporting.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Visa/Mastercard Schemes', 'Audit Documentation', 'Billing Optimization', 'Regulatory Reporting', 'Compliance'].map((tool, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-colors">
                      <span className="text-3xl">📢</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Marketing & Brand Strategy</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors">
                    Proficient in social media planning, campaign execution, content optimization, and driving audience engagement across digital platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Social Media Planning', 'Campaign Execution', 'Content Optimization', 'Audience Engagement', 'Digital Marketing'].map((tool, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-red-100 p-3 rounded-xl group-hover:bg-red-200 transition-colors">
                      <span className="text-3xl">⚙️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Cross-Functional Project Execution</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors">
                    Strong ability to align with stakeholders across product, sales, tech, compliance, and finance to deliver high-impact solutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Stakeholder Alignment', 'Project Management', 'Cross-functional Collaboration', 'Solution Delivery', 'Team Leadership'].map((tool, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-pink-100 p-3 rounded-xl group-hover:bg-pink-200 transition-colors">
                      <span className="text-3xl">🎨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Creative & Visual Innovation</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors">
                    Combining creative thinking with analytical reasoning in photography, visual arts, brand design, and innovative storytelling approaches.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Photography', 'Visual Arts', 'Brand Design', 'UI/UX Design', 'Creative Direction', 'Visual Storytelling'].map((tool, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Tech Section */}
      <section id="tools" className="py-24 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible.tools ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Tools & Technologies</h2>
              <p className="text-xl text-gray-600">Comprehensive toolkit for modern product management and analytics</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Data & Analytics</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Excel (Advanced)', 'Google Sheets', 'Power BI', 'Looker Studio', 'Tableau', 'SQL', 'Google Analytics'].map((tool, index) => (
                    <span key={index} className="bg-white/30 text-gray-800 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Programming & Development</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python (Basic)', 'R (Basic)', 'Data Flow', 'SQL'].map((tool, index) => (
                    <span key={index} className="bg-white/30 text-gray-800 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-2xl">📢</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Digital Marketing</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Meta Business Suite', 'Google Ads', 'Google Analytics'].map((tool, index) => (
                    <span key={index} className="bg-white/30 text-gray-800 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Project Management</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['JIRA', 'Agile (Scrum & Kanban)'].map((tool, index) => (
                    <span key={index} className="bg-white/30 text-gray-800 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Design & Creative</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Canva'].map((tool, index) => (
                    <span key={index} className="bg-white/30 text-gray-800 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Business Intelligence</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Power BI', 'Looker Studio', 'Tableau', 'Dashboard Development'].map((tool, index) => (
                    <span key={index} className="bg-white/30 text-gray-800 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Project */}
      <section id="work" className="py-24 bg-gray-50" data-animate>
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Featured Work</h2>
              <p className="text-xl text-gray-600">Meaningful solutions for real-world challenges</p>
            </div>
            
            <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-6">CredWise Canada</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    A comprehensive financial wellness platform designed specifically for new Canadian immigrants. 
                    This project combines user-centered design with practical financial education to help newcomers 
                    navigate the Canadian banking system with confidence.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Product Design', 'User Research', 'Financial Planning', 'User Experience'].map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-6">
                    <a 
                      href="https://credwise-presentation.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Project
                    </a>
                    <a 
                      href="https://github.com/duremansur/credwise" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="text-center space-y-6">
                      <div className="text-7xl">💡</div>
                      <h4 className="text-2xl font-bold text-gray-900">The Challenge</h4>
                      <p className="text-gray-600">
                        Creating an intuitive platform that empowers newcomers to Canada with the financial knowledge 
                        and tools they need to establish themselves successfully in their new home.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</section>
      
{/* Store Sales Forecasting Project */}
<section className="py-24 bg-white" data-animate>
  <div className="max-w-6xl mx-auto px-6">
    <div className={`transition-all duration-1000 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-500">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Store Sales Forecasting</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Advanced retail analytics dashboard with predictive modeling capabilities. 
              Analyzed $1.07B+ in historical sales data using statistical algorithms and seasonal intelligence 
              to generate 28,512 precise forecasts for inventory optimization and business planning.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {['Data Science', 'Machine Learning', 'Statistical Computing', 'Business Intelligence', 'Time Series Analysis', 'R Programming'].map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-800">$1.07B</div>
                <div className="text-sm text-gray-500">Revenue Analyzed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-800">28,512</div>
                <div className="text-sm text-gray-500">Predictions</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-800">533.62</div>
                <div class‐Name="text-sm text-gray-500">RMSE Accuracy</div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <a
                href="https://store-sales-dashboard.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                View Dashboard
              </a>
              <a
                href="https://github.com/duremansur/store-sales-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg">
              <div className="text-center space-y-6">
                <div className="text-7xl">📊</div>
                <h4 className="text-2xl font-bold text-gray-900">The Innovation</h4>
                <p className="text-gray-600">
                  Transforming 3+ million raw transaction records into intelligent business predictions 
                  using advanced statistical modeling, seasonal pattern recognition, and economic factor integration.
                </p>
                
                {/* Technical Highlights */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    50% Christmas seasonal boost automation
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    95% performance optimization via vectorization
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                    Multi-dimensional time series analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Contact Section */}
      <section id="connect" className="py-24 bg-white" data-animate>
        <div className="max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible.connect ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Let's Connect</h2>
              <p className="text-xl text-gray-600">Ready to collaborate? Let's create something meaningful together.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <a 
                href="mailto:duremansur02@gmail.com" 
                className="group bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600">duremansur02@gmail.com</p>
                  </div>
                </div>
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors">Let's discuss your next project</p>
              </a>
              
              <a 
                href="https://linkedin.com/in/duremansur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                    <Linkedin className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">LinkedIn</h3>
                    <p className="text-gray-600">Professional Network</p>
                  </div>
                </div>
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors">Connect for opportunities</p>
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <a 
                href="https://behance.net/duremansur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Behance</h3>
                    <p className="text-gray-600">Design Portfolio</p>
                  </div>
                </div>
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors">Explore my creative work</p>
              </a>
              
              <a 
                href="https://instagram.com/duremansur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                    <Instagram className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Instagram</h3>
                    <p className="text-gray-600">Visual Stories</p>
                  </div>
                </div>
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors">Follow my creative journey</p>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg">
            © 2025 Dure Mansur - Where Innovation Meets Creativity
          </p>
        </div>
      </footer>
    </div>
  );
}
