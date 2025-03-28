import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAssessmentById, updateAssessment } from '../util/api';
import { Assessment } from '../util/types';
import {AssessmentForm} from '../components/ui/AssessmentForm';

export const EditAssessment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAssessment = async () => {
      if (!id) return;
      
      try {
        setFetchLoading(true);
        const data = await fetchAssessmentById(id);
        setAssessment(data);
      } catch (err) {
        setError('Failed to load assessment');
      } finally {
        setFetchLoading(false);
      }
    };

    loadAssessment();
  }, [id]);

  const handleSubmit = async (data: Omit<Assessment, '_id'>) => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      await updateAssessment(id, data);
      navigate('/portal/assessment');
    } catch (error) {
      console.error('Error updating assessment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading assessment...</div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error || 'Assessment not found'}</p>
        </div>
        <button
          onClick={() => navigate('/admin/assessments')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Assessment</h1>
        <p className="text-gray-600">Update assessment details and questions.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <AssessmentForm
          initialData={assessment}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};