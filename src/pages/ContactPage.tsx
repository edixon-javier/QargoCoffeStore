import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Simulación de envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <motion.div 
        className="bg-primary-600 text-white rounded-xl p-8 md:p-12 mb-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4226805/pexels-photo-4226805.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Contacto</h1>
          <p className="text-xl mb-0 max-w-3xl">
            Estamos aquí para responder a tus preguntas y recibir tus comentarios. ¡Contáctanos!
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información de contacto */}
        <motion.div
          className="lg:col-span-1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
            <h2 className="text-2xl font-serif mb-6">Información de Contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Oficina Principal</h3>
                  <p className="text-secondary-600">
                    1234 Café Avenue<br />
                    Miami, FL 33101<br />
                    Estados Unidos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Teléfono</h3>
                  <p className="text-secondary-600">+1 (305) 555-0123</p>
                  <p className="text-secondary-600">+1 (800) QARGO-CF</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-secondary-600">info@qargocoffee.com</p>
                  <p className="text-secondary-600">franchise@qargocoffee.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Horario de Atención</h3>
                  <p className="text-secondary-600">
                    Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                    Sábados: 10:00 AM - 2:00 PM<br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
        
        {/* Formulario de contacto */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-2xl font-serif mb-6">Envíanos un mensaje</h2>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-success-50 border border-success-200 text-success-800 p-6 rounded-lg flex items-start"
              >
                <CheckCircle className="mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium mb-2">¡Mensaje enviado correctamente!</h3>
                  <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad posible.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-error-500' : 'border-gray-300'}`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && <p className="mt-1 text-sm text-error-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-error-500' : 'border-gray-300'}`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-error-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                      Teléfono
                    </label>                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="(opcional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-1">
                      Asunto
                    </label>                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="">Seleccionar asunto</option>
                      <option value="Información general">Información general</option>
                      <option value="Franquicia">Información sobre franquicias</option>
                      <option value="Colaboración">Propuestas de colaboración</option>
                      <option value="Prensa">Prensa y medios</option>
                      <option value="Sugerencia">Sugerencias</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.message ? 'border-error-500' : 'border-gray-300'}`}
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-error-600">{errors.message}</p>}
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                    rightIcon={isSubmitting ? undefined : <Send size={16} />}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* FAQ - Preguntas Frecuentes */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-serif mb-6">Preguntas Frecuentes</h2>
        
        <div className="bg-white rounded-lg shadow-soft divide-y">
          {[
            { 
              question: "¿Cómo puedo obtener información sobre franquicias?", 
              answer: "Para obtener información detallada sobre nuestras oportunidades de franquicia, puede completar el formulario de contacto seleccionando 'Información sobre franquicias' en el campo de asunto, o escribirnos directamente a franchise@qargocoffee.com. Un miembro de nuestro equipo se pondrá en contacto con usted para proporcionarle toda la información necesaria." 
            },
            { 
              question: "¿Dónde puedo encontrar mi Qargo Coffee más cercano?", 
              answer: "Puede encontrar la ubicación de Qargo Coffee más cercana utilizando el localizador de tiendas en nuestra aplicación móvil o visitando la sección 'Ubicaciones' en nuestro sitio web. Allí encontrará un mapa interactivo con todas nuestras tiendas." 
            },
            { 
              question: "¿Qué hace único a Qargo Coffee?", 
              answer: "Qargo Coffee se distingue por su enfoque innovador que fusiona la tradición cafetera italiana con el ritmo de vida estadounidense. Nuestro diseño único de tiendas en contenedores de envío reconvertidos, nuestro café premium Lavazza y nuestra dedicación a crear experiencias excepcionales nos diferencian en el mercado." 
            },
            { 
              question: "¿Tienen opciones de catering para eventos?", 
              answer: "Sí, ofrecemos servicios de catering para eventos corporativos, celebraciones privadas y eventos especiales. Contáctenos a través del formulario o llámenos directamente para discutir sus necesidades específicas y recibir un presupuesto personalizado." 
            },
          ].map((faq, index) => (
            <div key={index} className="p-6">
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p className="text-secondary-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
