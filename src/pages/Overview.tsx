import React, { useEffect, useState } from 'react';
import { 
  PiBookOpenThin, 
  PiClipboardTextThin, 
  PiTargetThin,
  PiGraduationCapThin
} from 'react-icons/pi';
import { MdOutlineQuiz, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCoursesAction } from '../store/courses/action';
import { getUserBadgesAction } from "../store/badges/action";
import { RootState } from "../store";
import { Badge } from '../store/badges';
import Button from '../components/ui/Button';

import { Link } from 'react-router-dom';

interface Course {
  title: string;
  description: string;
  duration: string;
  type: string;
  userCourses?: Array<{
    _id: string;
    title: string;
    description: string;
    duration: string;
    type: string;
  }>;
}

interface UserData {
  name: string;
  completedCourses: number;
  totalCourses: number;
  assessmentScore: number;
  projectsCompleted: number;
  careerGoalProgress: number;
  badges: Badge[];
}

const CourseModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  courses: Course;
}> = ({ isOpen, onClose, courses }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = async () => {
    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseTitle: courses.title })
      });

      if (!response.ok) {
        throw new Error('Enrollment failed');
      }

      setIsEnrolled(true);
      onClose();
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{courses.title}</h2>
        <p className="text-gray-600 mb-4">{courses.description}</p>
        <div className="mb-4">
          <strong>Type:</strong> {courses.type}
          <br />
          <strong>Duration:</strong> {courses.duration}
        </div>
        <button 
          onClick={handleEnroll}
          disabled={isEnrolled}
          className={`w-full py-2 rounded-lg ${
            isEnrolled 
              ? 'bg-gray-300 text-gray-500' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEnrolled ? 'Enrolled' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

const MentorshipModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const availableSlots = [
    "Monday, 10:00 AM", 
    "Wednesday, 2:00 PM", 
    "Friday, 4:00 PM"
  ];

  

  const handleBookSlot = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const response = await fetch('/api/mentorship/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slot: selectedSlot })
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      toast.success(`Mentorship session booked for ${selectedSlot}`);
      onClose();
    } catch (error) {
      console.error('Mentorship booking error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Book Mentorship Session</h2>
        <div className="space-y-2 mb-4">
          {availableSlots.map((slot) => (
            <div 
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedSlot === slot 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {slot}
            </div>
          ))}
        </div>
        <button 
          onClick={handleBookSlot}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Session
        </button>
      </div>
    </div>
  );
};

const Overview = () => {

  const dispatch = useDispatch();
  const { user,course } = useSelector((state: RootState) => state);
  const { userBadges, isLoading: badgesLoading } = useSelector((state: RootState) => state.badge);
  const [userData, setUserData] = useState<UserData>({
    name: user?.data?.name || '',
    completedCourses: 0,
    totalCourses: 0,
    assessmentScore: 0,
    projectsCompleted: 0,
    careerGoalProgress: 0,
    badges: []
  });

useEffect(() => {
    if (user?.data?._id) {
      getUserCoursesAction(user.data._id)(dispatch);
    }
  }, [dispatch, user?.data?._id]);
  const allCourses = course?.userCourses?.map(
    (item: any) => item?.courses )

  
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (user?.data?._id) {
      getUserBadgesAction(user.data._id)(dispatch);
    }
  }, [dispatch, user?.data?._id]);

  const statsCards = [
    {
      icon: <PiBookOpenThin className="w-6 h-6 text-blue-500" />,
      title: 'Courses Completed',
      value: `${userData.completedCourses}/${userData.totalCourses}`,
      progress: Math.round((userData.completedCourses / userData.totalCourses) * 100)
    },
    {
      icon: <MdOutlineQuiz className="w-6 h-6 text-green-500" />,
      title: 'Assessment Score',
      value: `${userData.assessmentScore}`,
      progress: userData.assessmentScore
    },
    {
      icon: <PiClipboardTextThin className="w-6 h-6 text-purple-500" />,
      title: 'Projects',
      value: `${userData.projectsCompleted} Completed`,
      progress: Math.round((userData.projectsCompleted / 5) * 100)
    },
    {
      icon: <PiTargetThin className="w-6 h-6 text-red-500" />,
      title: 'Career Goal Progress',
      value: `${userData.careerGoalProgress}%`,
      progress: userData.careerGoalProgress
    }
  ];

  return (
    <>

{course.isLoading ? <h1>Loading...</h1> : allCourses?.length<0 ? (
      <div className="flex flex-col gap-14">
      
      <div className="bg-white flex flex-col items-center gap-11 px-28 py-28 rounded-3xl ml-5 mt-10">
        <h1 className="text-3xl font-semibold">First Time on Platform?</h1>
        <p className="text-sm max-w-md text-center">
          Welcome! Now  complet your profile, to be able to start your
          journey by creating your learning path. Complete you profile to get started.
        </p>
        <Link to="/portal/profileUpdate">
        <Button
          text="Complete your profile"
          loading={course.isLoading}
          className="bg-primary px-16 py-4 rounded-xl text-white flex-row-reverse"
      
         
        />
         </Link>
      </div>

    </div>
    ) : <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userData.name}
        </h1>
        <div className="text-sm text-gray-500">
          Dashboard / Overview
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              {card.icon}
              <div className="text-right">
                <h3 className="text-sm text-gray-500">{card.title}</h3>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${card.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        </div>


        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        </div>
      </div>


      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <PiGraduationCapThin className="w-6 h-6 text-indigo-600" />
          <span>Your Badges</span>
        </h2>
        
        {badgesLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : userBadges && userBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBadges.map((badge) => (
              <div
                key={badge._id}
                className="bg-indigo-50 rounded-xl p-4 flex items-center space-x-4"
              >
                <div className="bg-indigo-100 rounded-full p-3">
                  <PiGraduationCapThin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                  <p className="text-xs text-indigo-600 mt-1">
                    Earned {badge.count} time{badge.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No badges earned yet. Complete assessments to earn badges!</p>
          </div>
        )}
      </div>


      {selectedCourse && (
        <CourseModal 
          isOpen={courseModalOpen} 
          onClose={() => setCourseModalOpen(false)}
          courses={selectedCourse}
        />
      )}

    
      <MentorshipModal 
        isOpen={mentorshipModalOpen}
        onClose={() => setMentorshipModalOpen(false)}
      />
    </div>
  </div>}
    </>
   
    
  );
};

export default Overview;