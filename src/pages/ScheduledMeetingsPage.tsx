
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useMongoDB, COLLECTIONS } from '@/lib/mongodb';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, Home } from 'lucide-react';

interface ScheduledViewing {
  _id: string;
  property_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  preferred_date: string;
  preferred_time: string;
  additional_notes?: string;
  created_at: string;
}

const ScheduledMeetingsPage: React.FC = () => {
  const [scheduledViewings, setScheduledViewings] = useState<ScheduledViewing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const mongodb = useMongoDB();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const fetchScheduledViewings = async () => {
      try {
        setLoading(true);
        // Get viewings for the current user's email
        const viewings = await mongodb.collection(COLLECTIONS.VIEWING_REQUESTS)
          .find({ email: user?.email });
        
        setScheduledViewings(viewings);
        setError(null);
      } catch (err) {
        console.error('Error fetching scheduled viewings:', err);
        setError('Failed to load your scheduled viewings');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduledViewings();
  }, [user?.email, isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-estate-primary-dark mb-6">My Scheduled Viewings</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="spinner border-estate-primary"></div>
            <p className="mt-4 text-gray-600">Loading your scheduled viewings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : scheduledViewings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No scheduled viewings</h3>
            <p className="text-gray-600 mb-6">You haven't scheduled any property viewings yet</p>
            <Button
              onClick={() => navigate('/properties')}
              className="bg-estate-primary hover:bg-estate-primary-dark"
            >
              Browse Properties
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scheduledViewings.map((viewing) => (
              <div
                key={viewing._id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Property ID: {viewing.property_id}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {new Date(viewing.preferred_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Time: {viewing.preferred_time}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-estate-primary border-estate-primary hover:bg-estate-primary/10"
                    onClick={() => navigate(`/property/${viewing.property_id}`)}
                  >
                    <Home className="h-4 w-4 mr-1" />
                    View Property
                  </Button>
                </div>
                {viewing.additional_notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{viewing.additional_notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScheduledMeetingsPage;
