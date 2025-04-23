
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMongoDB, COLLECTIONS } from '@/lib/mongodb';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

const ScheduleViewingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mongodb = useMongoDB();
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
      preferred_date: formData.get('date'),
      preferred_time: formData.get('time'),
      additional_notes: formData.get('notes'),
      created_at: new Date().toISOString()
    };

    try {
      const { error } = await mongodb.collection(COLLECTIONS.VIEWING_REQUESTS)
        .insertOne(data);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your viewing request has been scheduled successfully.",
      });
      navigate(`/property/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule viewing. Please try again.",
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
          <h1 className="text-3xl font-bold text-estate-primary-dark mb-6">Schedule a Viewing</h1>
          
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Preferred Date
                </label>
                <Input 
                  name="date"
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
                  name="time"
                  type="time" 
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <Textarea 
                name="notes"
                placeholder="Any specific requirements or questions..."
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-estate-primary hover:bg-estate-primary-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Viewing'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleViewingPage;
