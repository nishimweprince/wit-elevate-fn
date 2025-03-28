import store from "store"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs/Blogs";
import Events from "./pages/Events";
import LogIn from "./pages/LogIn";
import BlogLayout from "./components/layout/BlogLayout";
import Motivation from "./pages/Blogs/Motivation";
import Experience from "./pages/Blogs/Experience";
import Opportunity from "./pages/Blogs/Opportunity";
import Testimony from "./pages/Blogs/Testimony";
import SignUp from "./pages/SignUp";
import BlogDetails from "./pages/BlogDetails";
import EventDetails from "./pages/EventDetails";
import CreateBlog from "./pages/createBlog";
import ListBlogs from "./pages/ListBlogs";
import CreateEvent from "./pages/CreateEvent";
import ListEvents from "./pages/ListEvents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import Assessment from "./pages/Assessment";
import { AdminAssessmentList } from "./pages/AdminAssessmentList";
import GetStarted from "./pages/GetStarted";
import PortalLayout from "./components/layout/PortalLayout";
import Generate from "./pages/Generate";
import Courses from "./pages/Courses";
import Projects from "./pages/Projects";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "./store/users";
import { courseAction } from "./store/courses";
import Overview from "./pages/Overview";
import ProfileDisplay from "./pages/ProfileDisplay";
import ProjectDetails from "./pages/ProjectDetails";
import { CreateAssessment } from "./pages/CreateAssessment";
import { EditAssessment } from "./pages/EditAssessment";
import { TakeAssessment } from "./pages/TakeAssessment";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const dispatch = useDispatch();
  const token = store.get("authToken");
  const data = store.get("userData");
  const userCourses = store.get("userCourses")
  useEffect(() => {
    if (token) {
      dispatch(userAction.setToken(token));
      dispatch(userAction.setData(data));
      dispatch(courseAction.setUserCourses(userCourses))
    }
  }, [dispatch, token, data,userCourses]);
// console.log("Data",data.role)
  return (
    <div className="bg-[#F8F9FB]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<BlogLayout />}>
              <Route index element={<Blogs />} />
              <Route path="motivation" element={<Motivation />} />
              <Route path="experience" element={<Experience />} />
              <Route path="opportunity" element={<Opportunity />} />
              <Route path="testimony" element={<Testimony />} />
            </Route>
            <Route path="blog/:id" element={<BlogDetails />} />
            <Route path="event/:id" element={<EventDetails />} />
            <Route path="events" element={<Events />} />
          </Route>
          <Route path="logIn" element={<LogIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="dashboard" element={<AdminDashboard />}>
            <Route path="blog/create" element={<CreateBlog />} />
            <Route path="blog/edit/:id" element={<CreateBlog />} />
            <Route path="blog/list" element={<ListBlogs />} />
            <Route path="event/create" element={<CreateEvent />} />
            <Route path="event/edit/:id" element={<CreateEvent />} />
            <Route path="event/list" element={<ListEvents />} />
          </Route>
          <Route path="portal" element={<PortalLayout />}>
          {data?.role === "admin" ?<Route index element={<AdminDashboard />} />: <Route index element={<Overview />} /> }
          
            <Route path="create" element={<CreateAssessment />} />
            {data?.role === "admin" ? <Route path="assessment" element={<AdminAssessmentList />} /> : <Route path="assessment" element={<Assessment />} />}
            <Route path="EditAssessment/:id" element={<EditAssessment />} />
            <Route path="take-assessment/:id" element={<TakeAssessment />} />
            <Route path="generate" element={<Generate />} />
            <Route path="courses" element={<Courses />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projectDetails" element={<ProjectDetails />} />
            <Route path="profileUpdate" element={<Profile />} />
            <Route path="profile" element={<ProfileDisplay />} />
            <Route path="getStarted" element={<GetStarted />} />
            <Route path="forum" element={<ThreadDetailPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};
export default App;
