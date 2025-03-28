import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAssessment } from '../util/api';
import { Assessment } from '../util/types';
import {AssessmentForm} from '../components/ui/AssessmentForm';

export const CreateAssessment: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: Omit<Assessment, '_id'>) => {
    try {
      setIsLoading(true);
      await createAssessment(data);
      navigate('/portal/assessment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Assessment</h1>
        <p className="text-gray-600">Create a new assessment with questions and options.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <AssessmentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};