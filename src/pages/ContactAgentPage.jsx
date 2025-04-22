
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MessageSquare, Phone } from 'lucide-react';

const ContactAgentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const supabase = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      property_id: id,
      full_name: formData.get('fullName'),
      email: formData.get('email'),
      phone_number: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      navigate(`/property/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  name="fullName"
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
                  name="email"
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
                  name="phone"
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
                name="message"
                placeholder="Type your message here..."
                className="min-h-[150px]"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-estate-primary hover:bg-estate-primary-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactAgentPage;
