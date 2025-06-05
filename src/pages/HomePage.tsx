import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Package, Award, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-[url('https://images.pexels.com/photos/4820714/pexels-photo-4820714.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container-custom min-h-[600px] flex items-center">
          <motion.div 
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white font-serif mb-4">
              La calidad del café italiano con la innovación americana
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Descubre nuestra selección premium de productos para tu negocio de café. 
              Desde granos selectos hasta equipamiento profesional.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                rightIcon={<ArrowRight size={16} />}
                onClick={() => window.location.href = '/catalogo'}
              >
                Explorar catálogo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary-800"
                onClick={() => window.location.href = '/registro'}
              >
                Crear una cuenta
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">¿Por qué elegirnos?</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              En Qargo Coffee combinamos la tradición cafetera italiana con el estilo de vida estadounidense 
              para ofrecer la mejor experiencia a nuestros socios.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Coffee className="h-10 w-10 text-primary-700" />,
                title: "Calidad Premium",
                description: "Productos seleccionados con los más altos estándares de calidad para garantizar la excelencia."
              },
              {
                icon: <Package className="h-10 w-10 text-primary-700" />,
                title: "Envíos Rápidos",
                description: "Sistema logístico optimizado para entregas puntuales y en perfectas condiciones."
              },
              {
                icon: <Award className="h-10 w-10 text-primary-700" />,
                title: "Certificaciones",
                description: "Todos nuestros productos cuentan con certificaciones nacionales e internacionales."
              },
              {
                icon: <Clock className="h-10 w-10 text-primary-700" />,
                title: "Soporte 24/7",
                description: "Equipo de atención al cliente disponible en todo momento para resolver tus dudas."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-soft text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary-100 p-3 inline-flex mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif">Categorías destacadas</h2>
            <Link to="/catalogo" className="text-primary-700 hover:text-primary-800 font-medium flex items-center">
              Ver todas <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Café en grano",
                image: "https://images.pexels.com/photos/4829098/pexels-photo-4829098.jpeg",
                link: "/catalogo?categoria=cafe-grano"
              },
              {
                title: "Máquinas profesionales",
                image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
                link: "/catalogo?categoria=maquinas"
              },
              {
                title: "Accesorios",
                image: "https://images.pexels.com/photos/2879812/pexels-photo-2879812.jpeg",
                link: "/catalogo?categoria=accesorios"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg overflow-hidden h-64 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                  <Link 
                    to={category.link}
                    className="inline-flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Explorar <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">Lo que nuestros clientes dicen</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Miles de franquiciados confían en nosotros para abastecer sus negocios con los mejores productos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Mendoza",
                role: "Propietario de Café Lunatico",
                quote: "Desde que empezamos a trabajar con Qargo Coffee, la calidad de nuestro café ha mejorado notablemente y nuestros clientes lo han notado.",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              },
              {
                name: "María González",
                role: "Gerente de Café Central",
                quote: "El servicio al cliente es excepcional. Siempre responden rápidamente a nuestras necesidades y los envíos llegan en perfecto estado.",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              },
              {
                name: "Juan Pérez",
                role: "Dueño de Coffee Corner",
                quote: "La plataforma es intuitiva y hace que realizar pedidos sea extremadamente fácil. Recomiendo Qargo Coffee a todos mis colegas en la industria.",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-lg">{testimonial.name}</h4>
                    <p className="text-secondary-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-secondary-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif mb-4 text-white">¿Listo para elevar la calidad de tu negocio?</h2>
            <p className="text-lg text-primary-100 mb-8">
              Únete a la familia Qargo Coffee y descubre cómo podemos ayudarte a crecer tu negocio con productos de la más alta calidad.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => window.location.href = '/registro'}
              >
                Registrarse ahora
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-700"
                onClick={() => window.location.href = '/contacto'}
              >
                Contactar a ventas
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;