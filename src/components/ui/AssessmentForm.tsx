import React, { useState } from 'react';
import { Assessment, Question } from '../../util/types';

interface AssessmentFormProps {
  initialData?: Assessment;
  onSubmit: (data: Omit<Assessment, '_id'>) => Promise<void>;
  isLoading: boolean;
}

const emptyQuestion: Question = {
  question: '',
  options: ['', '', '', ''],
  correctAnswer: '',
  points: 1
};

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Omit<Assessment, '_id'>>({
    title: initialData?.title || '',
    questions: initialData?.questions || [{ ...emptyQuestion }],
    duration: initialData?.duration || 30,
    totalQuestions: initialData?.questions?.length || 1,
    passingScore: initialData?.passingScore || 70,
    skillLevel: initialData?.skillLevel || 'beginner',
    category: initialData?.category || 'frontend',
    isActive: initialData?.isActive ?? true
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string | string[] | number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions,
      totalQuestions: updatedQuestions.length
    }));
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...formData.questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex] = value;
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options
    };
    
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { ...emptyQuestion }],
      totalQuestions: prev.questions.length + 1
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length <= 1) {
      return; // Don't remove the last question
    }
    
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions,
      totalQuestions: updatedQuestions.length
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title) {
      setError('Assessment title is required');
      return false;
    }
    
    if (formData.questions.some(q => !q.question)) {
      setError('All questions must have content');
      return false;
    }
    
    if (formData.questions.some(q => q.options.some(opt => !opt))) {
      setError('All options must have content');
      return false;
    }
    
    if (formData.questions.some(q => !q.correctAnswer)) {
      setError('All questions must have a correct answer selected');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      setError(null);
    } catch (err) {
      setError('Failed to save assessment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
          <input
            type="number"
            name="passingScore"
            value={formData.passingScore}
            onChange={handleInputChange}
            min="1"
            max="100"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Questions</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
          >
            + Add Question
          </button>
        </div>

        {formData.questions.map((question, qIndex) => (
          <div key={qIndex} className="border border-gray-300 rounded p-4 mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Question {qIndex + 1}</h4>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="text-red-600 hover:text-red-800"
                disabled={formData.questions.length <= 1}
              >
                Remove
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
              <textarea
                value={question.question}
                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={2}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`correctAnswer-${qIndex}`}
                    checked={question.correctAnswer === option}
                    onChange={() => handleQuestionChange(qIndex, 'correctAnswer', option)}
                    className="mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              <input
                type="number"
                value={question.points}
                onChange={(e) => handleQuestionChange(qIndex, 'points', parseInt(e.target.value))}
                min="1"
                className="w-32 border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-4 py-2 rounded`}
        >
          {isLoading ? 'Saving...' : 'Save Assessment'}
        </button>
      </div>
    </form>
  );
};