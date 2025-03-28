import Events from "../components/section/Events";
import Blog from "../components/section/Blog";
import Hero from "../components/section/Hero";
import Stand from "../components/section/Stand";

import Testimonies from "../components/section/Testimonies";
import Faqs from "../components/section/Faqs";
const Home = () => {
  return (
    <div>
      <Hero />
      <Events />
      <Stand />
      <Testimonies />
      <Blog />
      <Faqs />
    </div>
  );
};
export default Home;
