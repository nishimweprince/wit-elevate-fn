import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAssessmentById } from '../util/api';
import { submitAssessment } from '../store/assessments/service';
import { BadgeCelebration } from '../components/ui/BadgeCelebration';
import { Assessment, Question } from '../util/types';

interface Answer {
  questionId: string;
  selectedOption: string;
}

interface AssessmentQuestion extends Question {
  _id: string;
}

interface AssessmentWithIds extends Assessment {
  questions: AssessmentQuestion[];
}

export const TakeAssessment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentWithIds | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssessment = async () => {
      if (!id) return;
      
      try {
        const data = await fetchAssessmentById(id);
        setAssessment(data as AssessmentWithIds);
        setTimeLeft(data.duration * 60); // Convert minutes to seconds
      } catch (err) {
        setError('Failed to load assessment');
      }
    };

    loadAssessment();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults]);

  const handleOptionSelect = (option: string) => {
    if (!assessment) return;

    const currentQuestion = assessment.questions[currentQuestionIndex];
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === currentQuestion._id
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex].selectedOption = option;
      setAnswers(updatedAnswers);
    } else {
      setAnswers([
        ...answers,
        { questionId: currentQuestion._id, selectedOption: option }
      ]);
    }
  };

  const handleNext = () => {
    if (!assessment) return;
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!assessment || !id) return;

    try {
      setIsSubmitting(true);
      const response = await submitAssessment(id, { answers });
      setScore(response.data.score);
      setShowResults(true);
      if (response.data.badgeEarned) {
        setShowCelebration(true);
      }
    } catch (err) {
      setError('Failed to submit assessment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/portal/assessment')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading assessment...</div>
      </div>
    );
  }

  if (showResults) {
    const passingScore = assessment.passingScore;
    const passed = score >= passingScore;

    return (
      <div className="container mx-auto p-4">
        <BadgeCelebration 
          isVisible={showCelebration} 
          onComplete={() => setShowCelebration(false)} 
        />
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Assessment Results</h2>
          
          <div className="text-center mb-8">
            <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <div className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Congratulations! You passed!' : 'Keep practicing! You can try again.'}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Passing Score:</span>
                <span className="font-medium">{passingScore}%</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Your Score:</span>
                <span className="font-medium">{score}%</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/portal/assessment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const selectedAnswer = answers.find(
    (a) => a.questionId === currentQuestion._id
  )?.selectedOption;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{assessment.title}</h2>
          <div className="text-lg font-medium text-blue-600">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
            <span>Points: {currentQuestion.points}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${((currentQuestionIndex + 1) / assessment.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Previous
          </button>
          {currentQuestionIndex === assessment.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 