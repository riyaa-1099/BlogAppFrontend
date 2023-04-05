import React from "react";
import CreateBlogPage from "../../components/createBlog";
import "./createPage.css";

const CreateBlog: React.FC = () => {
  return (
    <div className="createpage">
      <h1>Create Blog</h1>
      <CreateBlogPage />
    </div>
  );
};

export default CreateBlog;
