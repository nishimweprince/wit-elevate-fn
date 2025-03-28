import { useState, useEffect } from "react";
import {
  getAssessmentsAction,
  getSelectedAssessmentAction,
  submitAssessmentAction,
  getStudentAssessmentsAction,
} from "../store/assessments/action";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { assessmentAction } from "../store/assessments";
import { toast } from "react-toastify";
import { BadgeCelebration } from "../components/ui/BadgeCelebration";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  BookOpenIcon,
  ArrowPathIcon,
  HomeIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

interface Question {
  _id: string;
  question: string;
  options: string[];
  points: number;
  correctAnswer: string;
}

interface Assessment {
  _id: string;
  title: string;
  duration: number;
  totalQuestions: number;
  skillLevel: string;
  category: string;
  questions: Question[];
  passingScore: number;
  attempted: boolean;
  score: number;
}

interface AssessmentAttempt {
  assessment: Assessment;
  score: number;
  attempted: boolean;
}

interface Badge {
  name: string;
  image: string;
  description: string;
  count: number;
}

interface FeedbackItem {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  points: number;
}

interface AssessmentResponse {
  score: number;
  totalPoints: number;
  passed: boolean;
  feedback: FeedbackItem[];
  earnedBadges: Badge[];
}

interface ActionResponse {
  type: boolean;
  data?: {
    score: number;
    totalPoints: number;
    passed: boolean;
    feedback: string[];
    earnedBadges: Badge[];
  };
  error?: string;
}

interface User {
  developmentInterest: string;
  // ... other user properties
}

interface RootState {
  assessment: {
    isLoading: boolean;
    allAssessment: Assessment[];
    selectedAssessment: Assessment;
    submitedAnswer: ActionResponse;
  };
  user: {
    data: User;
  };
}

const Assessment = () => {
  const dispatch = useDispatch();
  const { assessment, user } = useSelector((state: RootState) => state);
  const [isStarted, setIsStarted] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | undefined>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [canRetake, setCanRetake] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [passed, setPassed] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Filter assessments based on user's developmentInterest
  const filteredAssessments = assessment?.allAssessment?.filter(
    (assessment) => assessment.category.toLowerCase() === user?.data?.developmentInterest?.toLowerCase()
  ) || [];

  useEffect(() => {
    Promise.all([
      getAssessmentsAction()(dispatch),
      getStudentAssessmentsAction()(dispatch)
    ])
      .then(([assessmentsRes, attemptsRes]) => {
        
        
        if (!assessmentsRes?.type) {
          setError("Failed to fetch assessments");
          return;
        }


        dispatch(assessmentAction.setAllAssessment(assessmentsRes.data));


        if (attemptsRes?.type && attemptsRes?.data) {
          const attempts = attemptsRes.data as AssessmentAttempt[];
          const updatedAssessments = assessmentsRes.data.map((assessment: Assessment) => {
            const attempt = attempts.find((a) => a.assessment._id === assessment._id);
            if (attempt) {
              return {
                ...assessment,
                attempted: true,
                score: attempt.score,
                passingScore: attempt.assessment.passingScore
              };
            }
            return assessment;
          });
          dispatch(assessmentAction.setAllAssessment(updatedAssessments));
        }
      })
      .catch((err) => {
        setError("Failed to fetch assessments");
      });
  }, [dispatch]);

  useEffect(() => {
    if (assessmentId) {
 
      getSelectedAssessmentAction(assessmentId)(dispatch)
        .then((res) => {
  
          if (!res?.type) {
            setError("Failed to fetch selected assessment");
          }
          setCanRetake(true);
        })
        .catch((err) => {
          setError("Failed to fetch selected assessment");
        });
    }
  }, [dispatch, assessmentId]);

  const questions = assessment?.selectedAssessment?.questions || [];

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStart = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getSelectedAssessmentAction(id)(dispatch);
      if (res?.type) {
        setAssessmentId(id);
        setIsStarted(true);
        setError(null);
      } else {
        setError("Failed to load assessment questions");
      }
    } catch (err) {
      setError("Failed to load assessment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion]._id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!assessmentId) {
      setError("No assessment selected");
      return;
    }

    setIsSubmitting(true);
    const formattedAnswers = Object.entries(selectedAnswers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })
    );

    const payload = {
      answers: formattedAnswers,
      timeSpent: 300 - timeLeft,
    };

    try {
      console.log("Submitting assessment:", {
        assessmentId,
        payload,
        selectedAnswers,
        questions
      });
      const res = await submitAssessmentAction(assessmentId, payload)(dispatch);


      if (res?.type && res?.data) {
        const { score, totalPoints, passed, earnedBadges} = res.data as AssessmentResponse;
        setScore(score);
        setTotalPoints(totalPoints);
        setPassed(passed);
        setEarnedBadges(earnedBadges || []);
        setCompleted(true);
      

       
        if (passed && earnedBadges && earnedBadges.length > 0) {

          const newBadge = earnedBadges[0];
          setNewBadge(newBadge);
          setShowBadgePopup(true);
          setShowCelebration(true);
          toast.success(`You've earned the ${newBadge.name} badge!`);
        }

  
        setTimeout(() => setShowSuccess(false), 1000);
      } else {
        setError(res?.error || "Failed to submit assessment");
      }
    } catch (err) {
      console.error("Error submitting assessment:", err);
      setError("Failed to submit assessment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setCompleted(false);
    setScore(0);
    setError(null);
  };


  const BadgePopup = () => (
    <AnimatePresence>
      {showBadgePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowBadgePopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="mb-4">
                <RiVerifiedBadgeFill className="w-24 h-24 mx-auto"/>

              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                New Badge Earned!
              </h3>
              <p className="text-xl font-semibold text-indigo-600 mb-2">
                {newBadge?.name}
              </p>
              <p className="text-gray-600 mb-2">
                {newBadge?.description}
              </p>
              <p className="text-sm text-indigo-500">
                Total Badges: {newBadge?.count}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full transform hover:scale-105 transition-transform duration-300">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </motion.div>
    );
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <AcademicCapIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Available Assessments</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessment?.isLoading ? (
              <div className="col-span-full text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading assessments...</p>
              </div>
            ) : filteredAssessments.length > 0 ? (
              filteredAssessments.map((assessment: Assessment) => (
                <motion.div
                  key={assessment._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpenIcon className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-gray-800">{assessment.title}</h2>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-5 h-5 text-indigo-500" />
                      <p>Duration: {assessment.duration} minutes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LightBulbIcon className="w-5 h-5 text-indigo-500" />
                      <p>Questions: {assessment.totalQuestions}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ChartBarIcon className="w-5 h-5 text-indigo-500" />
                      <p>Level: {assessment.skillLevel}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AcademicCapIcon className="w-5 h-5 text-indigo-500" />
                      <p>Category: {assessment.category}</p>
                    </div>
                    { assessment.attempted && (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <p>Score: {assessment.score}/{assessment.passingScore}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleStart(assessment._id!)}
                    disabled={isLoading}
                    className={`mt-6 w-full py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 ${
                      assessment.attempted
                        ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <ArrowRightIcon className="w-5 h-5" />
                        <span>{ assessment.attempted ? "Retake Assessment" : "Start Assessment"}</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-gray-600">No assessments available for your development interest at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6"
      >
        <BadgeCelebration 
          isVisible={showCelebration} 
          onComplete={() => setShowCelebration(false)} 
        />
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-6xl mb-4"
          >
            {passed ? "🎉" : "💪"}
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            {passed ? (
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            ) : (
              <XCircleIcon className="w-8 h-8 text-red-500" />
            )}
            <span>Assessment Completed</span>
          </h2>
          <div className="text-5xl font-extrabold text-indigo-600 mb-4">
            {score}/{totalPoints}
          </div>
          <p className={`text-lg mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed
              ? "Congratulations! You passed the assessment."
              : "You did not pass the assessment."}
          </p>

          {earnedBadges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Earned Badges:</h3>
              <div className="flex justify-center space-x-4">
                {earnedBadges.map((badge: Badge, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <RiVerifiedBadgeFill className="w-12 h-12 mb-2" />
                    <span className="text-sm text-gray-600">{badge.name}</span>
                    <span className="text-xs text-indigo-600">Count: {badge.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            {canRetake && (
              <button
                onClick={handleRetake}
                disabled={isLoading}
                className={`bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center space-x-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="w-5 h-5" />
                    <span>Retake Assessment</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center space-x-2"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-base text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BadgePopup />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-800">
                {assessment?.selectedAssessment?.title || "Assessment"}
              </h1>
            </div>
            <div className="bg-white rounded-full px-6 py-2 shadow-lg flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-600 font-semibold text-sm">
                Time Left: {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-gray-500 flex items-center space-x-2">
                <LightBulbIcon className="w-4 h-4" />
                <span>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
              <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {questions[currentQuestion] && (
              <>
                <h2 className="text-base font-semibold mb-6 text-gray-800">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3 mb-6">
                  {questions[currentQuestion].options.map((option: string, index: number) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAnswers[questions[currentQuestion]._id] === option
                          ? "border-indigo-600 bg-indigo-50 shadow-md"
                          : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="answer"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedAnswers[questions[currentQuestion]._id] === option}
                        onChange={() => handleAnswer(option)}
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="ml-3 text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {option}
                      </label>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 text-sm ${
                      currentQuestion === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  {currentQuestion === questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm"
                    >
                      <span>Next Question</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Assessment;