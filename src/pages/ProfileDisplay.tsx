import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileDisplay = () => {
  const { user } = useSelector((state: any) => state);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/portal/profileUpdate");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
     
        <div className="relative h-32 bg-indigo-600 rounded-t-lg">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">
                {user?.data?.firstName?.[0]}
                {user?.data?.lastName?.[0]}
              </span>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.data?.firstName} {user?.data?.lastName}
          </h1>
          <p className="text-gray-600 mt-1">{user?.data?.phoneNumber}</p>

          {/* Education Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-700">
                {user?.data?.educationType === "REB" && "REB Curriculum"}
                {user?.data?.educationType === "TVET" && "TVET Curriculum"}
                {user?.data?.educationType === "Other" && "Other Education"}
              </p>
              {user?.data?.educationType === "REB" && (
                <p className="text-gray-600 mt-1">Combination: {user?.data?.rebCombination}</p>
              )}
              {user?.data?.educationType === "TVET" && (
                <p className="text-gray-600 mt-1">
                  Specialization: {user?.data?.tvetSpecialization}
                </p>
              )}
              {user?.data?.educationType === "Other" && (
                <p className="text-gray-600 mt-1">{user?.data?.otherEducation}</p>
              )}
            </div>
          </div>


          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Programming Skills</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {user?.data?.hasProgrammingExperience ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {user?.data?.programmingLanguages?.map((lang: string) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  {user?.data?.customProgrammingLanguages && (
                    <p className="text-gray-600 mt-2">
                      Additional skills: {user?.data?.customProgrammingLanguages}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-600">No programming experience yet</p>
              )}
            </div>
          </div>

  
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Interests</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-700">
                Development Interest: {user?.data?.developmentInterest}
              </p>
              {user?.data?.softwareInterest && (
                <p className="text-gray-600 mt-2">
                  Interest in Software: {user?.data?.softwareInterest}
                </p>
              )}
              {user?.data?.careerAspirations && (
                <p className="text-gray-600 mt-2">
                  Career Aspirations: {user?.data?.careerAspirations}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay; 