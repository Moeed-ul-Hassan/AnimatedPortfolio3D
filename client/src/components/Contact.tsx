import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Using Formspree for form submission
      const response = await fetch("https://formspree.io/f/yourformid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully!",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        throw new Error("Failed to submit the form.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">Get In <span className="gradient-text">Touch</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-dark-light p-3 rounded-lg mr-4">
                  <i className="fas fa-envelope text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-400">hello@moeedhassan.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-dark-light p-3 rounded-lg mr-4">
                  <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-gray-400">Lahore, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-dark-light p-3 rounded-lg mr-4">
                  <i className="fas fa-globe text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Social Profiles</h4>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://github.com/Moeed-ul-Hassan" target="_blank" rel="noopener noreferrer" className="bg-dark-light hover:bg-primary text-white p-2 rounded-lg transition-colors duration-300">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="bg-dark-light hover:bg-primary text-white p-2 rounded-lg transition-colors duration-300">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="bg-dark-light hover:bg-primary text-white p-2 rounded-lg transition-colors duration-300">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-6">Send Me a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  className="w-full px-4 py-3 bg-dark-light border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-3 bg-dark-light border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="Subject" 
                  className="w-full px-4 py-3 bg-dark-light border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder="Your message" 
                  className="w-full px-4 py-3 bg-dark-light border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-white resize-none"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Sending...</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane ml-2"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
