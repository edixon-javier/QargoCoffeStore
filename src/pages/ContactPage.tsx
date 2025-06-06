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
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
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
        <div className="relative z-10">          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl mb-0 max-w-3xl">
            We're here to answer your questions and receive your feedback. Get in touch with us!
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
          <div className="bg-white rounded-lg shadow-soft p-6 mb-6">            <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Main Office</h3>
                  <p className="text-secondary-600">
                    1234 Café Avenue<br />
                    Miami, FL 33101<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
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
                  <h3 className="font-medium mb-1">Business Hours</h3>
                  <p className="text-secondary-600">
                    Monday to Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
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
          <div className="bg-white rounded-lg shadow-soft p-6">            <h2 className="text-2xl font-serif mb-6">Send us a message</h2>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-success-50 border border-success-200 text-success-800 p-6 rounded-lg flex items-start"
              >
                <CheckCircle className="mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium mb-2">Message sent successfully!</h3>
                  <p>Thank you for contacting us. We have received your message and will respond as soon as possible.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                      Full name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-error-500' : 'border-gray-300'}`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-error-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                      Email *
                    </label>                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-error-500' : 'border-gray-300'}`}
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-error-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                      Phone
                    </label>                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="(optional)"
                    />
                  </div>
                  <div>                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-1">
                      Subject
                    </label>                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="">Select subject</option>
                      <option value="General Information">General Information</option>
                      <option value="Franchise">Franchise Information</option>
                      <option value="Collaboration">Collaboration Proposals</option>
                      <option value="Press">Press and Media</option>
                      <option value="Suggestion">Suggestions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.message ? 'border-error-500' : 'border-gray-300'}`}
                    placeholder="How can we help you?"
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
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
      >        <h2 className="text-2xl font-serif mb-6">Frequently Asked Questions</h2>
        
        <div className="bg-white rounded-lg shadow-soft divide-y">
          {[
            { 
              question: "How can I get information about franchises?", 
              answer: "To obtain detailed information about our franchise opportunities, you can complete the contact form by selecting 'Franchise Information' in the subject field, or write to us directly at franchise@qargocoffee.com. A member of our team will contact you to provide all the necessary information." 
            },
            { 
              question: "Where can I find my nearest Qargo Coffee?", 
              answer: "You can find the nearest Qargo Coffee location using the store locator in our mobile app or by visiting the 'Locations' section on our website. There you will find an interactive map with all our stores." 
            },
            { 
              question: "What makes Qargo Coffee unique?", 
              answer: "Qargo Coffee is distinguished by its innovative approach that fuses Italian coffee tradition with the American pace of life. Our unique store design in repurposed shipping containers, our premium Lavazza coffee, and our dedication to creating exceptional experiences set us apart in the market." 
            },
            { 
              question: "Do you offer catering options for events?", 
              answer: "Yes, we offer catering services for corporate events, private celebrations, and special occasions. Contact us through the form or call us directly to discuss your specific needs and receive a personalized quote." 
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
