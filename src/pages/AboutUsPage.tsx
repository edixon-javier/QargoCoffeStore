import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Users, Globe, MapPin, ShoppingBag } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <motion.div 
        className="bg-primary-600 text-white rounded-xl p-8 md:p-12 mb-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10">          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">About Qargo Coffee</h1>
          <p className="text-xl mb-6 max-w-3xl">
            Blending Italian coffee tradition with American pace to create exceptional experiences, one cup at a time.
          </p>
        </div>
      </motion.div>

      {/* Nuestra Historia */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>            <h2 className="text-3xl font-serif mb-4">Our History</h2>
            <p className="text-secondary-700 mb-4">
              Qargo Coffee was born in May 2020, with the vision of revolutionizing coffee culture in the United States. Founded in Delaware and headquartered in Miami, Florida, our brand stems from a passion for high-quality Italian coffee and the belief that each cup has the power to transform everyday moments into memorable experiences.
            </p>
            <p className="text-secondary-700">
              Since our beginnings, we have distinguished ourselves by our innovative approach: cafes designed in shipping containers that reinvent the traditional concept, combining modern industrial design with the warmth and charm of an authentic Italian coffee shop.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-medium">
            <img 
              src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg" 
              alt="Café Qargo"
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </motion.section>

      {/* Misión y Visión */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16 bg-primary-50 rounded-xl p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>            <h3 className="flex items-center text-2xl font-serif mb-4">
              <Coffee className="text-primary-600 mr-3" size={28} />
              Our Mission
            </h3>
            <p className="text-secondary-700">
              To redefine coffee culture by restoring its importance in daily life, blending Italian tradition with American pace, and improving lives one cup at a time.
            </p>
          </div>
          <div>
            <h3 className="flex items-center text-2xl font-serif mb-4">
              <Globe className="text-primary-600 mr-3" size={28} />
              Our Vision
            </h3>
            <p className="text-secondary-700">
              To be a welcoming presence in every community, establishing new benchmarks in the industry for coffee care and quality, and offering a superior coffee experience in the USA.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >        <h2 className="text-3xl font-serif mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Award className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Quality",
              description: "We commit to offering premium Italian coffee, especially Lavazza, and take special care with each cup we serve."
            },
            {
              icon: <Coffee className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Tradition",
              description: "We honor the rich heritage and social importance of Italian coffee, keeping its traditions alive in every sip."
            },
            {
              icon: <ShoppingBag className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Modernity",
              description: "We adapt to contemporary American lifestyle with innovative store designs and efficient service without compromising quality."
            },
            {
              icon: <Users className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Community",
              description: "We aspire to be a local hub in each location, providing a welcoming space for connection, work, and relaxation."
            },
            {
              icon: <Award className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Customer Experience",
              description: "We focus on creating a top-tier European coffee experience, becoming a positive part of our customers' daily routine."
            },
            {
              icon: <Coffee className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Innovation",
              description: "We explore unique concepts, such as our shipping container stores and the incorporation of artistic elements in our spaces."
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-soft text-center"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{value.title}</h3>
              <p className="text-secondary-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Presencia y Expansión */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg" 
              alt="Mapa de expansión"
              className="w-full h-full object-cover rounded-lg shadow-medium" 
            />
          </div>
          <div>            <h2 className="text-3xl font-serif mb-4">Our Presence</h2>
            <p className="text-secondary-700 mb-4">
              Since our beginnings, Qargo Coffee has experienced rapid growth throughout the United States. We currently operate in various states such as California, Colorado, Florida, Michigan, Nevada, North Carolina, Texas, and Washington D.C.
            </p>
            <p className="text-secondary-700 mb-6">
              We are especially excited about our expansion in the Dallas-Fort Worth area, Texas, scheduled for summer 2025, where we will bring our unique coffee vision to new communities.
            </p>
            <div className="flex flex-wrap gap-3">
              {["California", "Colorado", "Florida", "Michigan", "Nevada", "North Carolina", "Texas", "Washington D.C."].map(state => (
                <span key={state} className="flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  <MapPin size={14} className="mr-1" />
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Modelo de Franquicia */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-16 bg-secondary-100 rounded-xl p-8"
      >        <h2 className="text-3xl font-serif mb-8 text-center">Franchise Model</h2>
        <p className="text-secondary-700 text-center max-w-3xl mx-auto mb-8">
          Qargo Coffee expands primarily through a franchise model, offering entrepreneurs the opportunity to be part of our revolutionary coffee vision.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Design",
              description: "Support in the unique design of stores, including our innovative shipping container models."
            },
            {
              title: "Installation",
              description: "Complete assistance in the assembly and equipment process of each new Qargo location."
            },
            {
              title: "Operations",
              description: "Training and continuous support in all operational aspects of the business."
            },
            {
              title: "Products",
              description: "Access to our premium Italian Lavazza coffee and our quality bakery selection."
            },
          ].map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="font-serif text-xl mb-2">{benefit.title}</h3>
              <p className="text-secondary-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Concepto Único */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mb-16"
      >        <h2 className="text-3xl font-serif mb-8 text-center">Unique Store Design</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden shadow-medium">
            <img 
              src="https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg" 
              alt="Store design"
              className="w-full h-64 object-cover" 
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-secondary-700 mb-4">
              A key aspect of our brand is our non-traditional approach to store construction and design. We stand out for the innovative use of repurposed shipping containers, which allow us to create unique, sustainable, and visually striking spaces.
            </p>
            <p className="text-secondary-700 mb-4">
              Our designs are elegant and modern, inspired by industrial design and contemporary architectural trends, while always maintaining the warmth and cozy atmosphere characteristic of traditional Italian cafes.
            </p>
            <p className="text-secondary-700">
              In addition to our main stores, we also offer kiosk and self-service formats, adapting to different needs and spaces, always maintaining our distinctive aesthetics and superior quality.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA - Contacto o Franquicia */}
      <motion.section 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-primary-600 text-white rounded-xl p-8 md:p-12 text-center"
      >        <h2 className="text-3xl font-serif mb-4 text-white">Join the Coffee Revolution</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Interested in becoming part of Qargo Coffee? Discover available franchise opportunities or contact us for more information.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/contact" 
            className="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Contact Us
          </a>

        </div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;
