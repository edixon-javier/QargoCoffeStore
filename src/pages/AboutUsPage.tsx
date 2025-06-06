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
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Sobre Qargo Coffee</h1>
          <p className="text-xl mb-6 max-w-3xl">
            Fusionando la tradición cafetera italiana con el ritmo estadounidense para crear experiencias excepcionales, una taza a la vez.
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
          <div>
            <h2 className="text-3xl font-serif mb-4">Nuestra Historia</h2>
            <p className="text-secondary-700 mb-4">
              Qargo Coffee nació en mayo de 2020, con la visión de revolucionar la cultura del café en Estados Unidos. Fundada en Delaware y con sede en Miami, Florida, nuestra marca surge de la pasión por el café italiano de alta calidad y la creencia de que cada taza tiene el poder de transformar momentos cotidianos en experiencias memorables.
            </p>
            <p className="text-secondary-700">
              Desde nuestros inicios, nos hemos distinguido por nuestro enfoque innovador: cafeterías diseñadas en contenedores de envío que reinventan el concepto tradicional, combinando diseño industrial moderno con la calidez y el encanto de una auténtica cafetería italiana.
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
          <div>
            <h3 className="flex items-center text-2xl font-serif mb-4">
              <Coffee className="text-primary-600 mr-3" size={28} />
              Nuestra Misión
            </h3>
            <p className="text-secondary-700">
              Redefinir la cultura del café restaurando su importancia en la vida diaria, fusionando la tradición italiana con el ritmo estadounidense y mejorando vidas una taza a la vez.
            </p>
          </div>
          <div>
            <h3 className="flex items-center text-2xl font-serif mb-4">
              <Globe className="text-primary-600 mr-3" size={28} />
              Nuestra Visión
            </h3>
            <p className="text-secondary-700">
              Ser una presencia acogedora en cada comunidad, estableciendo nuevos puntos de referencia en la industria para el cuidado y la calidad del café, y ofreciendo una experiencia de café superior en los EE. UU.
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
      >
        <h2 className="text-3xl font-serif mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Award className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Calidad",
              description: "Nos comprometemos a ofrecer café italiano premium, especialmente Lavazza, y ponemos especial cuidado en cada taza que servimos."
            },
            {
              icon: <Coffee className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Tradición",
              description: "Honramos la rica herencia y la importancia social del café italiano, manteniendo vivas sus tradiciones en cada sorbo."
            },
            {
              icon: <ShoppingBag className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Modernidad",
              description: "Nos adaptamos al estilo de vida americano contemporáneo con diseños de tiendas innovadores y un servicio eficiente sin comprometer la calidad."
            },
            {
              icon: <Users className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Comunidad",
              description: "Aspiramos a ser un centro local en cada ubicación, proporcionando un espacio acogedor para la conexión, el trabajo y la relajación."
            },
            {
              icon: <Award className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Experiencia del cliente",
              description: "Nos enfocamos en crear una experiencia de café europeo de primer nivel, convirtiéndonos en una parte positiva de la rutina diaria de nuestros clientes."
            },
            {
              icon: <Coffee className="h-12 w-12 text-primary-600 mb-4" />,
              title: "Innovación",
              description: "Exploramos conceptos únicos, como nuestras tiendas en contenedores de envío y la incorporación de elementos artísticos en nuestros espacios."
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
          <div>
            <h2 className="text-3xl font-serif mb-4">Nuestra Presencia</h2>
            <p className="text-secondary-700 mb-4">
              Desde nuestros inicios, Qargo Coffee ha experimentado un rápido crecimiento en todo el territorio estadounidense. Actualmente operamos en diversos estados como California, Colorado, Florida, Michigan, Nevada, Carolina del Norte, Texas y Washington D.C.
            </p>
            <p className="text-secondary-700 mb-6">
              Estamos especialmente emocionados por nuestra expansión en el área de Dallas-Fort Worth, Texas, programada para el verano de 2025, donde llevaremos nuestra visión única del café a nuevas comunidades.
            </p>
            <div className="flex flex-wrap gap-3">
              {["California", "Colorado", "Florida", "Michigan", "Nevada", "Carolina del Norte", "Texas", "Washington D.C."].map(state => (
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
      >
        <h2 className="text-3xl font-serif mb-8 text-center">Modelo de Franquicia</h2>
        <p className="text-secondary-700 text-center max-w-3xl mx-auto mb-8">
          Qargo Coffee se expande principalmente mediante un modelo de franquicia, ofreciendo a emprendedores la oportunidad de formar parte de nuestra visión revolucionaria del café.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Diseño",
              description: "Apoyo en el diseño único de tiendas, incluyendo nuestros innovadores modelos de contenedores de envío."
            },
            {
              title: "Instalación",
              description: "Asistencia completa en el proceso de montaje y equipamiento de cada nueva ubicación Qargo."
            },
            {
              title: "Operaciones",
              description: "Capacitación y soporte continuo en todos los aspectos operativos del negocio."
            },
            {
              title: "Productos",
              description: "Acceso a nuestro café italiano premium Lavazza y a nuestra selección de repostería de calidad."
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
      >
        <h2 className="text-3xl font-serif mb-8 text-center">Diseño Único de Tiendas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden shadow-medium">
            <img 
              src="https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg" 
              alt="Diseño de tienda"
              className="w-full h-64 object-cover" 
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-secondary-700 mb-4">
              Un aspecto clave de nuestra marca es nuestro enfoque no tradicional en la construcción y el diseño de tiendas. Nos destacamos por el uso innovador de contenedores de envío reconvertidos, que nos permiten crear espacios únicos, sostenibles y visualmente impactantes.
            </p>
            <p className="text-secondary-700 mb-4">
              Nuestros diseños son elegantes y modernos, inspirados en el diseño industrial y las tendencias arquitectónicas contemporáneas, pero manteniendo siempre la calidez y el ambiente acogedor característicos de las cafeterías italianas tradicionales.
            </p>
            <p className="text-secondary-700">
              Además de nuestras tiendas principales, también ofrecemos formatos de quioscos y autoservicio, adaptándonos a diferentes necesidades y espacios, siempre manteniendo nuestra distintiva estética y calidad superior.
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
      >
        <h2 className="text-3xl font-serif mb-4 text-white">Únete a la Revolución del Café</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          ¿Interesado en formar parte de Qargo Coffee? Descubre las oportunidades de franquicia disponibles o contáctanos para más información.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/contacto" 
            className="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Contactar
          </a>
          <a 
            href="/franquicia" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Información de Franquicia
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;
