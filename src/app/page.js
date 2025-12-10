import React from 'react';
import Link from 'next/link';

// Define the icons as functional components using inline SVG to avoid external library dependencies
const ZapIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
const ShieldIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.617-5.617a6.25 6.25 0 00-8.834 0L12 5.166l-.75-1.071a6.25 6.25 0 00-8.834 0zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
);
const UsersIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-4a2 2 0 01-2-2V8a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2zM12 18H8a2 2 0 01-2-2v-4a2 2 0 012-2h4" /></svg>
);
const CheckCircleIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

// Inline SVG replacements for Font Awesome icons (FaTwitter, FaLinkedin, FaInstagram, FaEnvelope)
const TwitterIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.254 5.253c-.786.35-1.635.587-2.52.697.904-.543 1.594-1.401 1.92-2.433-.847.502-1.782.868-2.77 1.07-.8-.853-1.942-1.385-3.21-1.385-2.433 0-4.404 1.97-4.404 4.404 0 .346.039.682.115 1.006-3.66-.184-6.887-1.939-9.052-4.596-.378.648-.596 1.398-.596 2.222 0 1.528.777 2.876 1.956 3.66-.716-.024-1.383-.22-1.968-.544v.055c0 2.13 1.517 3.905 3.528 4.31-.369.102-.756.155-1.156.155-.282 0-.555-.027-.82-.078.56 1.748 2.185 3.02 4.113 3.054-1.506 1.182-3.4 1.89-5.46 1.89-.356 0-.705-.021-1.047-.061 1.95 1.252 4.264 1.98 6.757 1.98 8.102 0 12.55-6.702 12.55-12.548 0-.192-.004-.384-.012-.575.864-.622 1.61-1.397 2.2-2.285z"/></svg>
);
const LinkedinIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.366-4-3.235-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const InstagramIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07a7.218 7.218 0 012.333.454 4.5 4.5 0 011.66 1.054 4.5 4.5 0 011.054 1.66 7.218 7.218 0 01.454 2.333c.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85a7.218 7.218 0 01-.454 2.333 4.5 4.5 0 01-1.054 1.66 4.5 4.5 0 01-1.66 1.054 7.218 7.218 0 01-2.333.454c-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07a7.218 7.218 0 01-2.333-.454 4.5 4.5 0 01-1.66-1.054 4.5 4.5 0 01-1.054-1.66 7.218 7.218 0 01-.454-2.333c-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85a7.218 7.218 0 01.454-2.333 4.5 4.5 0 011.054-1.66 4.5 4.5 0 011.66-1.054 7.218 7.218 0 012.333-.454c1.266-.058 1.646-.07 4.85-.07zm0 2.214c-3.177 0-3.535.012-4.79.068a5.003 5.003 0 00-1.85.358 2.28 2.28 0 00-.853.582 2.28 2.28 0 00-.582.853 5.003 5.003 0 00-.358 1.85c-.056 1.255-.068 1.613-.068 4.79s.012 3.535.068 4.79a5.003 5.003 0 00.358 1.85 2.28 2.28 0 00.582.853 2.28 2.28 0 00.853.582 5.003 5.003 0 001.85.358c1.255.056 1.613.068 4.79.068s3.535-.012 4.79-.068a5.003 5.003 0 001.85-.358 2.28 2.28 0 00.853-.582 2.28 2.28 0 00.582-.853 5.003 5.003 0 00.358-1.85c.056-1.255.068-1.613.068-4.79s-.012-3.535-.068-4.79a5.003 5.003 0 00-.358-1.85 2.28 2.28 0 00-.582-.853 2.28 2.28 0 00-.853-.582 5.003 5.003 0 00-1.85-.358c-1.255-.056-1.613-.068-4.79-.068zm0 1.956c2.657 0 3.015.01 4.258.067a3.004 3.004 0 011.085.207 1.28 1.28 0 01.472.33 1.28 1.28 0 01.33.472 3.004 3.004 0 01.207 1.085c.057 1.243.067 1.601.067 4.258s-.01 3.015-.067 4.258a3.004 3.004 0 01-.207 1.085 1.28 1.28 0 01-.33.472 1.28 1.28 0 01-.472.33 3.004 3.004 0 01-1.085.207c-1.243.057-1.601.067-4.258.067s-3.015-.01-4.258-.067a3.004 3.004 0 01-1.085-.207 1.28 1.28 0 01-.472-.33 1.28 1.28 0 01-.33-.472 3.004 3.004 0 01-.207-1.085c-.057-1.243-.067-1.601-.067-4.258s.01-3.015.067-4.258a3.004 3.004 0 01.207-1.085 1.28 1.28 0 01.33-.472 1.28 1.28 0 01.472-.33 3.004 3.004 0 011.085-.207c1.243-.057 1.601-.067 4.258-.067zm0 2.214a4.83 4.83 0 100 9.66 4.83 4.83 0 000-9.66zm0 2.214a2.616 2.616 0 110 5.232 2.616 2.616 0 010-5.232zm5.77-.358a1.282 1.282 0 100 2.564 1.282 1.282 0 000-2.564z"/></svg>
);
const EnvelopeIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-6.623 5.619v-13.548l6.623 7.929zm.671-.705l3.52 2.816 3.52-2.816 4.791 4.072h-18.171l4.791-4.072zm.23 6.946l5.476-4.646 5.476 4.646h-10.952zm11.455-8.156l6.623-5.619v13.548l-6.623-5.619z"/></svg>
);


const Home = () => {

  // Data for the Features Section (using the new local SVG components)
  const features = [
    { icon: ZapIcon, title: "Lightning Speed", description: "Messages are delivered instantly, ensuring real-time communication without lag." },
    { icon: ShieldIcon, title: "End-to-End Encryption", description: "Your privacy is our priority. All conversations are secured by default." },
    { icon: UsersIcon, title: "Seamless Group Chats", description: "Create and manage groups easily, perfect for teams, family, and friends." },
    { icon: CheckCircleIcon, title: "Multi-Device Sync", description: "Switch between your phone, tablet, and desktop without missing a beat." },
  ];

  // Data for the Pricing Section
  const plans = [
    { 
      name: "Basic", 
      price: "$0", 
      period: "/month", 
      features: ["Unlimited Messaging", "Basic Support", "30-Day History", "1-on-1 Chats"], 
      buttonText: "Sign Up Free",
      isHighlighted: false
    },
    { 
      name: "Pro", 
      price: "$5", 
      period: "/month", 
      features: ["Everything in Basic", "Priority Support", "Unlimited History", "Group Chats (50 members)"], 
      buttonText: "Start Pro Trial",
      isHighlighted: true
    },
    { 
      name: "Business", 
      price: "$15", 
      period: "/user/month", 
      features: ["Everything in Pro", "Dedicated Account Manager", "Custom Integrations", "Group Chats (Unlimited)"], 
      buttonText: "Contact Sales",
      isHighlighted: false
    },
  ];

  const socialLinks = [
    { icon: TwitterIcon, link: "https://x.com/Dhruvtara1199", name: "Twitter" },
    { icon: LinkedinIcon, link: "https://www.linkedin.com/in/dhruv-giri-goswami-290074255/", name: "LinkedIn" },
    { icon: InstagramIcon, link: "https://www.instagram.com/dhruvv_gg?igsh=d3g5MTE5enBrZzl1", name: "Instagram" },
    { icon: EnvelopeIcon, link: "mailto:dhruvgoswami327@gmail.com", name: "Email" },
  ];


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-20 md:py-32 overflow-hidden">
        {/* Background Gradient Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black opacity-90"
          aria-hidden="true"
        ></div>
        
        {/* Decorative elements (Simplified, non-animated shapes) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

        {/* Content */}
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
            ChatSphere
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-indigo-300 mb-8">
            Connect Instantly. Communicate Seamlessly.
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-300 mb-12">
            Experience lightning-fast messaging with end-to-end encryption. Whether it&#39;s one-on-one or a group chat, ChatSphere keeps you connected.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/forums"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              Start Chatting Now
            </Link>
            <Link 
              href="chat/create"//"sign-up"
              className="px-8 py-3 bg-gray-700 text-indigo-300 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
            >
              Create Private Chat
            </Link>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Powerful Features, Simple Interface</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need for personal or professional communication, built for speed and security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="p-6 bg-gray-800 rounded-xl shadow-2xl hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]"
              >
                {/* Dynamically render the locally defined SVG icon */}
                <feature.icon className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Start free, scale seamlessly. Find the perfect plan for your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`p-8 rounded-xl shadow-2xl transition duration-300 ${
                  plan.isHighlighted 
                    ? 'bg-indigo-700 border-4 border-indigo-500 transform scale-[1.05]' 
                    : 'bg-gray-900 border-2 border-gray-700'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-4 ${plan.isHighlighted ? 'text-white' : 'text-indigo-400'}`}>{plan.name}</h3>
                <div className="flex justify-center items-end mb-6">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                
                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className={`w-5 h-5 mr-3 ${plan.isHighlighted ? 'text-indigo-200' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.name === 'Business' ? '/contact' : '/sign-up'}
                  className={`block w-full py-3 text-center font-semibold rounded-full transition duration-300 ${
                    plan.isHighlighted 
                      ? 'bg-white text-indigo-700 hover:bg-gray-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="w-full py-10 text-center text-gray-500 text-sm border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-6">
          <p className="mb-6">Dhruv Giri. &copy; {new Date().getFullYear()} ChatSphere. All rights reserved.</p>

          {/* Social Media Icons - Responsive */}
          <div className="flex flex-wrap justify-center space-x-4">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="text-2xl text-gray-400 hover:text-indigo-400 transition-transform transform hover:scale-125 p-2 rounded-full"
              >
                <item.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </footer>
      
      {/* Removed the style jsx block to ensure this file is a Server Component */}
    </div>
  );
};

export default Home;

// Metadata for SEO (This is now correctly placed in a Server Component)
export const metadata = {
  title: 'Home - ChatSphere | Connect Instantly',
  description: 'Experience lightning-fast and seamless communication with ChatSphere, the modern chat platform.',
}