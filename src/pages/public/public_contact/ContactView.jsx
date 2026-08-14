import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Send,
  MessageCircle,
  Clock,
  Github,
  MessageSquare,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadySection from '../public_Home/section/ReadySection';
import { sendContactMessage } from '../../../services/contactService';

const ContactView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await sendContactMessage(formData);

      if (response) {
        toast.success(
          response.message || "Thank you for your message! We'll get back to you soon."
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast.error(error || 'Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[550px] w-full bg-cover bg-center bg-no-repeat px-4 py-14 md:h-[650px]"
        style={{ backgroundImage: `url('/img/img_7.jpeg')` }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-600/60 to-black/20"
          style={{ boxShadow: 'inset 0 40px 80px rgba(0,0,0,0.45)' }}
        />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="pt-[127px] pb-[250px] text-center text-white">
            <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
              Get in <span className="inline text-white">Touch</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80 md:text-xl">
              Need help getting started or want to explore how Addvanced AI can support your
              business? Send us a message and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      {/* <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {contactCards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-[#f7f9ff] p-8 shadow-sm "
              >
                <div className="mb-4 inline-flex rounded-lg bg-blue-600 p-3 text-white">
                  {card.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{card.title}</h3>
                <p className="mb-1 font-semibold text-gray-700">{card.detail}</p>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Contact Form Section */}
      <section className="bg-gray-50 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left Side - Info */}
            <div className="lg:col-span-2">
              <div className="sticky top-8">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Send us a message
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  Need help getting started or want to explore how Addvanced AI can support your
                  business? Send us a message and our team will get back to you as soon as possible.
                </p>

                {/* Response Time Card */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Response Time</h3>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    We typically respond to messages within{' '}
                    <span className="font-semibold text-blue-600">24-48 hours</span>. For urgent
                    matters, please reach out through our GitHub issues or community Discord.
                  </p>
                  <p className="text-sm text-gray-600">
                    Or email :{' '}
                    <a
                      href="mailto:support@addvancedai.dev"
                      className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >
                      support@addvancedai.dev
                    </a>
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    'Fast and professional support',
                    'Free consultation available',
                    'Active community engagement',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* CTA Section */}
      {/* <section className="bg-gray-50 px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-lg bg-blue-600 p-12 text-center shadow-lg">
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-lg text-blue-100">
                Join thousands of developers building amazing applications with our boilerplate
              </p>
              <button className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 shadow-sm transition-all hover:bg-gray-50">
                <span>Start Building Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section> */}
      <ReadySection />
    </div>
  );
};

export default ContactView;
