import React from "react";
import BlogList from "../../components/BLogList";
import "./BlogPage.css";

interface BlogPageProps {}

const BlogPage: React.FC<BlogPageProps> = () => {
  return (
    <div>
      <h1>Blog Page</h1>
      <BlogList />
    </div>
  );
};

export default BlogPage;
