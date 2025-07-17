import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Award, Truck, Clock, Users, Star, ArrowRight, Phone, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import { mockProducts, categories } from '../mockData';

const LandingPage: React.FC = () => {
  // Productos destacados por diferentes criterios
  const featuredProducts = {
    newest: mockProducts.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4),
    onSale: mockProducts.filter(p => p.salePrice && p.salePrice < p.price).slice(0, 4),
    popular: mockProducts.filter(p => p.stock < 50).slice(0, 4), // Suponiendo que los productos con menos stock son populares
  };

  // Productos por categoría para mostrar variedad
  const equipmentProducts = mockProducts.filter(p => p.category.id === '1').slice(0, 2);
  const coffeeProducts = mockProducts.filter(p => p.category.id === '5').slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative 0 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-primary-700/10"></div>
          <img 
            src="https://i.ibb.co/v6dZMMT3/Image-fx.png" 
            alt="Coffee shop interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-10 py-20 md:py-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white/90">
              Professional Equipment and Premium Coffee for Your Business
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
              At Qargo Connet we offer everything you need to equip and supply your cafe or business with high-quality products, from the best brands at competitive prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="accent" 
                size="lg"
                as={Link}
                to="/catalog"
                className="shadow-lg"
              >
                Explore Products
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                as={Link}
                to="/about-us"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="bg-secondary-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Solutions for Your Business</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              From cutting-edge professional equipment to the finest coffee beans. Everything you need in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <Link 
                key={category.id} 
                to={`/catalog?categoria=${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={category.image || 'https://images.pexels.com/photos/2875287/pexels-photo-2875287.jpeg'} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <span className="text-white/90 text-sm flex items-center">
                    Explorar <ArrowRight size={16} className="ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button 
              variant="outline"
              as={Link}
              to="/catalog"
              className="shadow-sm"
            >
              View All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Productos destacados - En oferta */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Special Offers</h2>
            <Link to="/catalog" className="text-primary-600 hover:text-primary-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.onSale.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.salePrice && (
                    <div className="absolute top-3 left-3 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-secondary-500">{product.category.name}</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-xs ml-1">4.5</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg md:text-xl leading-snug mb-2 line-clamp-2 h-24 group-hover:text-primary-700 transition-colors tracking-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-end gap-2">
                    {product.salePrice && (
                      <>
                        <span className="text-accent-600 font-semibold">
                          ${product.salePrice.toFixed(2)}
                        </span>
                        <span className="text-secondary-400 text-xs line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner equipo profesional */}
      <section className="relative bg-primary-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Professional Equipment for Your Coffee Shop</h2>
              <p className="text-secondary-600 mb-6">
                We offer a selection of the best Bunn equipment for brewing high-quality coffee. Our equipment is designed to meet the needs of professional coffee shops.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-2 mt-1">
                    <Coffee size={16} className="text-primary-700" />
                  </div>
                  <span className="text-secondary-700">Machines with advanced technology to ensure the best flavor</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-2 mt-1">
                    <Award size={16} className="text-primary-700" />
                  </div>
                  <span className="text-secondary-700">Products with official manufacturer warranty</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-2 mt-1">
                    <Truck size={16} className="text-primary-700" />
                  </div>
                  <span className="text-secondary-700">Fast and secure shipping nationwide</span>
                </li>
              </ul>
              <Button 
                variant="primary" 
                as={Link}
                to="/catalog?categoria=Bunn"
                className="shadow-md"
              >
                View Bunn Equipment
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {equipmentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-primary-700 font-semibold text-sm mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Productos más vendidos */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Our Best Sellers</h2>
            <Link to="/catalog" className="text-primary-600 hover:text-primary-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.popular.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.stock < 10 && (
                    <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Low Stock!
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-secondary-500">{product.category.name}</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-xs ml-1">4.8</span>
                    </div>
                  </div>
                  <h3 className="font-medium mb-2 line-clamp-2 h-20 group-hover:text-primary-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-end gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-accent-600 font-semibold">
                          ${product.salePrice.toFixed(2)}
                        </span>
                        <span className="text-secondary-400 text-xs line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-secondary-900 font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Café de especialidad */}
      <section className="bg-earth-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                {coffeeProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2 h-10">{product.name}</h3>
                      <p className="text-earth-700 font-semibold text-sm mt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">Specialty Coffee for Your Business</h2>
              <p className="text-secondary-600 mb-6">
                We offer a premium selection of specialty coffee, from Italian blends to unique origins from around the world.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-earth-100 p-1 rounded-full mr-2 mt-1">
                    <Coffee size={16} className="text-earth-700" />
                  </div>
                  <span className="text-secondary-700">Premium coffee roasted to the highest standards</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-earth-100 p-1 rounded-full mr-2 mt-1">
                    <Clock size={16} className="text-earth-700" />
                  </div>
                  <span className="text-secondary-700">Direct shipping from origin for maximum freshness</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-earth-100 p-1 rounded-full mr-2 mt-1">
                    <Users size={16} className="text-earth-700" />
                  </div>
                  <span className="text-secondary-700">Expert advice to find the perfect profile for your business</span>
                </li>
              </ul>
              <Button 
                variant="accent" 
                as={Link}
                to="/catalog?categoria=specialty-coffee"
                className="shadow-md"
              >
                View Specialty Coffee
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Franquicia */}
      <section className="bg-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white">Want to Open Your Own Coffee Shop?</h2>
            <p className="text-white/80 mb-8">
              Become a Qargo Connet franchisee and access our proven business model, exclusive products, and ongoing support to grow your coffee shop.
            </p>
            <Button 
              variant="accent"
              size="lg"
              as={Link}
              to="/contact"
              className="shadow-lg"
            >
              Request Information
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Coffee shops and businesses across the country trust our products to deliver the best coffee experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Gonzalez",
                business: "Aromatic Coffee",
                text: "The equipment we acquired from Qargo Connet has been key to the success of our coffee shop. The quality is exceptional and the after-sales service is unbeatable.",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                name: "Carlos Rodriguez",
                business: "The Coffee Corner",
                text: "Since we started working with Qargo Connet's specialty coffee, our sales have increased by 35%. Customers keep coming back for the quality and consistency.",
                avatar: "https://randomuser.me/api/portraits/men/43.jpg"
              },
              {
                name: "Laura Martinez",
                business: "Park Café",
                text: "Qargo Connet's franchise program has given us all the tools we need to succeed. The constant support has been fundamental to our growth.",
                avatar: "https://randomuser.me/api/portraits/women/33.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-secondary-600 text-sm">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-secondary-700 italic">"{testimonial.text}"</p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter y contacto */}
      <section className="bg-primary-100 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-secondary-700 mb-6">
                Subscribe to our newsletter to receive news about new products, special offers, and tips for your coffee business.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg border border-secondary-200 focus:outline-none focus:border-primary-600"
                  required
                />
                <Button 
                  variant="primary"
                  type="submit"
                >
                  Subscribe
                </Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-secondary-700 mb-6">
                Our customer service team is ready to assist you with any questions about our products or services.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary-200 p-2 rounded-full mr-3">
                    <Phone size={20} className="text-primary-700" />
                  </div>
                  <span className="text-secondary-700">+1 555 123 4567</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary-200 p-2 rounded-full mr-3">
                    <Mail size={20} className="text-primary-700" />
                  </div>
                  <span className="text-secondary-700">info@qargoconnet.com</span>
                </div>
                <Button 
                  variant="outline"
                  as={Link}
                  to="/contact"
                  className="mt-2"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;