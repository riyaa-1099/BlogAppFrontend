import React, { useState, useEffect } from "react";
import axios from "axios";
import { back_url } from "./url";
import Cookies from "js-cookie";

interface Blog {
  _id: number;
  title: string;
  content: string;
  image: string;
  userID: string;
  updatedAt: string;
}

interface BlogListProps {}

const BlogList: React.FC<BlogListProps> = () => {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [userID, setUserID] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [blogsPerPage] = useState<number>(5); // You can adjust the number of blogs displayed per page
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(`${back_url}/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: blogsPerPage,
        }
      })
      .then((response) => {
        const data = response.data.All_Blogs;
        const user_ID = response.data.userID;
       const total=response.data.total;

        const pagesCount = Math.ceil(total / blogsPerPage);

        setBlogs(data);
        setUserID(user_ID);
        setPagesCount(pagesCount);
      }).catch((error) => {
        console.error(error);
      });
  }, [currentPage, token, blogsPerPage]);


  // Change page
   const paginate = (pageNumber: number) =>{
     setCurrentPage(pageNumber);
   }


  const handleEdit = (blogID: number) => {
    const newTitle = prompt("Enter the new title:");
    const newContent = prompt("Enter the new content:");
    // send a request to update the blog on the backend
    axios
    .put(
        `${back_url}/blog/${blogID}`,
        { title: newTitle, content: newContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        axios.get(`${back_url}/blog`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // console.log(response)
          setBlogs(response.data.All_Blogs);
        });
      });
  };


  const handleDelete = (blogId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      axios
        .delete(`${back_url}/blog/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // console.log("deleted")
          
          axios.get(`${back_url}/blog`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            // console.log(response.data)
            setBlogs(response.data.All_Blogs);
          });
        });
    }
  };


  return (
    <div>
      {blogs.map((blog) => (
        <div className="eachblog" key={blog._id}>
          <img src={blog.image} alt="blogimg" />
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>

          {String(blog.userID) === userID && (
            <div>
              <button onClick={() => handleEdit(blog._id)}>Edit</button>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}


<div className="pagination">
        {currentPage > 1 && (
          <div>
            <button onClick={() => paginate(currentPage - 1)}>Prev</button>
          </div>
        )}
        {  <div>Page: {currentPage}</div>}
        {currentPage < pagesCount && (
          <div>
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          </div>
        )}
      </div>
    
    </div>
  );
};
      
     export default BlogList;    
