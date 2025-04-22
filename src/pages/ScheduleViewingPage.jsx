
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

const ScheduleViewingPage = () => {
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Viewing request submitted successfully!");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-estate-primary-dark mb-6">Schedule a Viewing</h1>
          
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Preferred Date
                </label>
                <Input 
                  type="date" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  Preferred Time
                </label>
                <Input 
                  type="time" 
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <Textarea 
                placeholder="Any specific requirements or questions..."
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-estate-primary hover:bg-estate-primary-dark"
            >
              Schedule Viewing
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleViewingPage;
