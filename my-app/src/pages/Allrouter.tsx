import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import BlogPage from "./BlogPage/BLogPage";
import CreateBlog from "./CreatePage/createPage";

const Allrouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createaccount" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default Allrouter;
