import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserAction } from "../store/users/actions";
import { useSelector ,useDispatch} from "react-redux";

interface ProfileData {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  educationType: "REB" | "TVET" | "Other";
  rebCombination: string;
  tvetSpecialization: string;
  otherEducation: string;
  hasProgrammingExperience: boolean;
  programmingLanguages: string[];
  customProgrammingLanguages: string;

  // Career interest fields (Step 2)
  softwareInterest: string;
  priorLearningAttempts: string;
  excitingTechnology: string;
  careerAspirations: string;
  developmentInterest: string;
}

const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user,course } = useSelector((state: any) => state);
  console.log("usrrrr",course.userCourses)
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    lastName: user?.data?.lastName,
    firstName: user?.data?.firstName,
    phoneNumber: user?.data?.phoneNumber,
    educationType: "REB",
    rebCombination: "",
    tvetSpecialization: "",
    otherEducation: "",
    hasProgrammingExperience: false,
    programmingLanguages: [],
    customProgrammingLanguages: "",
    softwareInterest: "",
    priorLearningAttempts: "",
    excitingTechnology: "",
    careerAspirations: "",
    developmentInterest: "Frontend",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleToggleExperience = (value: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      hasProgrammingExperience: value,
      programmingLanguages: value ? prev.programmingLanguages : [],
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setProfileData((prev) => {
      const languages = prev.programmingLanguages.includes(language)
        ? prev.programmingLanguages.filter((lang) => lang !== language)
        : [...prev.programmingLanguages, language];
      return { ...prev, programmingLanguages: languages };
    });
  };

  const handleNextStep = () => {
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateUserAction(profileData,user.data._id)(dispatch)
       if(res ){

navigate("/portal/generate");
   }
   

   
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };


  const commonLanguages = [
    "JavaScript",
    "Python",
    "Java",
    "PHP",
    "C#",
    "Ruby",
    "HTML/CSS",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Django",
    "Flask",
    "Laravel",
  ];

  return (
    <div className="flex justify-center items-center p-4 md:p-8 min-h-screen bg-[#F8F9FB]">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Complete your Profile
        </h2>
        <div className="flex mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-indigo-600 text-white" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <div className="ml-2 text-sm font-medium">Personal Info</div>
          </div>
          <div className="h-0.5 w-8 bg-gray-300 self-center mx-2"></div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-indigo-600 text-white" : "bg-gray-300"
              }`}
            >
              2
            </div>
            <div className="ml-2 text-sm font-medium">Career Goals</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <section className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Personal Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="07XXXXXXXX"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Educational Background
                </h3>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Type
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="educationType"
                        value="REB"
                        checked={profileData.educationType === "REB"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2">REB Curriculum</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="educationType"
                        value="TVET"
                        checked={profileData.educationType === "TVET"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2">TVET Curriculum</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="educationType"
                        value="Other"
                        checked={profileData.educationType === "Other"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2">Other</span>
                    </label>
                  </div>
                </div>

                {profileData.educationType === "REB" && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <label
                      htmlFor="rebCombination"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Select your REB combination
                    </label>
                    <select
                      id="rebCombination"
                      name="rebCombination"
                      value={profileData.rebCombination}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="MCE">
                        Mathematics - Computer Science - Economics (MCE)
                      </option>
                      <option value="MPC">
                        Mathematics - Physics - Computer Science (MPC)
                      </option>
                      <option value="MCB">
                        Mathematics - Chemistry - Biology (MCB)
                      </option>
                      <option value="HEG">
                        History - Economics - Geography (HEG) (phasing out)
                      </option>
                      <option value="MEG">
                        Mathematics - Economics - Geography (MEG)
                      </option>
                      <option value="HLP">
                        History - Literature in English - Psychology (HLP)
                      </option>
                      <option value="HGL">
                        History - Geography - Literature in English (HGL)
                      </option>
                      <option value="Other">Other combination</option>
                    </select>
                  </div>
                )}

                {profileData.educationType === "TVET" && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <label
                      htmlFor="tvetSpecialization"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Select your TVET specialization
                    </label>
                    <select
                      id="tvetSpecialization"
                      name="tvetSpecialization"
                      value={profileData.tvetSpecialization}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Software Development">
                        Software Development
                      </option>
                      <option value="Networking">Networking</option>
                      <option value="Computer Maintenance">
                        Computer Maintenance
                      </option>
                      <option value="Electronics">Electronics</option>
                      <option value="Multimedia Technology">
                        Multimedia Technology
                      </option>
                      <option value="Other">Other specialization</option>
                    </select>

                    {profileData.tvetSpecialization === "Other" && (
                      <div className="mt-3">
                        <label
                          htmlFor="otherEducation"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Please specify your specialization
                        </label>
                        <input
                          type="text"
                          id="otherEducation"
                          name="otherEducation"
                          value={profileData.otherEducation}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {profileData.educationType === "Other" && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <label
                      htmlFor="otherEducation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Please describe your educational background
                    </label>
                    <textarea
                      id="otherEducation"
                      name="otherEducation"
                      value={profileData.otherEducation}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                )}
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Programming Skills Assessment
                </h3>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Do you have any programming skills?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleToggleExperience(true)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        profileData.hasProgrammingExperience
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleExperience(false)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        !profileData.hasProgrammingExperience
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {profileData.hasProgrammingExperience && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Which programming languages or technologies are you
                      proficient in?
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {commonLanguages.map((language) => (
                        <button
                          key={language}
                          type="button"
                          onClick={() => handleLanguageToggle(language)}
                          className={`py-1 px-3 rounded-full text-sm font-medium transition-colors ${
                            profileData.programmingLanguages.includes(language)
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label
                        htmlFor="customProgrammingLanguages"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Other programming skills (comma separated)
                      </label>
                      <input
                        type="text"
                        id="customProgrammingLanguages"
                        name="customProgrammingLanguages"
                        value={profileData.customProgrammingLanguages}
                        onChange={handleChange}
                        placeholder="e.g., Swift, Kotlin, Go, Rust"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </section>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 sm:px-6 sm:py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <section className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Career Interests & Goals
                </h3>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label
                    htmlFor="developmentInterest"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    What area of software development interests you the most?
                  </label>
                  <select
                    id="developmentInterest"
                    name="developmentInterest"
                    value={profileData.developmentInterest}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Frontend">Frontend Development</option>
                    <option value="Backend">Backend Development</option>
                    <option value="Full Stack">Full Stack Development</option>
                    <option value="Mobile">Mobile App Development</option>
                    <option value="DevOps">
                      DevOps & Cloud Infrastructure
                    </option>
                    <option value="Data Science">
                      Data Science & Analytics
                    </option>
                    <option value="AI/ML">
                      Artificial Intelligence & Machine Learning
                    </option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Blockchain">Blockchain Development</option>
                    <option value="Game Development">Game Development</option>
                  </select>
                </div>

                {!profileData.hasProgrammingExperience && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <label
                        htmlFor="softwareInterest"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        What interests you about software development?
                      </label>
                      <textarea
                        id="softwareInterest"
                        name="softwareInterest"
                        value={profileData.softwareInterest}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Share what aspects of software development interest you..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      ></textarea>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <label
                        htmlFor="priorLearningAttempts"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Have you ever tried learning any programming concepts
                        before?
                      </label>
                      <textarea
                        id="priorLearningAttempts"
                        name="priorLearningAttempts"
                        value={profileData.priorLearningAttempts}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Any previous attempts or experiences with coding..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      ></textarea>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <label
                        htmlFor="excitingTechnology"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        What kind of software or technology excites you the
                        most?
                      </label>
                      <textarea
                        id="excitingTechnology"
                        name="excitingTechnology"
                        value={profileData.excitingTechnology}
                        onChange={handleChange}
                        rows={2}
                        placeholder="E.g., mobile apps, websites, AI, games, etc."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      ></textarea>
                    </div>
                  </>
                )}

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <label
                    htmlFor="careerAspirations"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    What are your career aspirations in technology?
                  </label>
                  <textarea
                    id="careerAspirations"
                    name="careerAspirations"
                    value={profileData.careerAspirations}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Your goals and what you hope to achieve in your tech career..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
              </section>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 sm:px-6 sm:py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
