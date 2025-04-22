
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MessageSquare, Phone } from 'lucide-react';

const ContactAgentPage = () => {
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Message sent successfully!");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-estate-primary-dark mb-6">Contact Agent</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Full Name
                </label>
                <Input 
                  type="text" 
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline-block w-4 h-4 mr-2" />
                  Email
                </label>
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline-block w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <Input 
                  type="tel" 
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="inline-block w-4 h-4 mr-2" />
                Message
              </label>
              <Textarea 
                placeholder="Type your message here..."
                className="min-h-[150px]"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-estate-primary hover:bg-estate-primary-dark"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactAgentPage;
