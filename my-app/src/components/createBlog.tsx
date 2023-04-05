import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { back_url } from "./url";
import Cookies from "js-cookie";

interface CreateProps {}

const CreateBlogPage: React.FC<CreateProps> = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const img = event.target.files?.[0];
    if (img) {
      const form = new FormData();
      form.append("image", img);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=ed68c179b77264ff04fd7b3dbdf94056`,
        {
          method: "POST",
          body: form,
        }
      );
      const data = await res.json();
      const imageUrl = data.data.display_url;
      setImage(imageUrl);
    }
  };

  const handleCreateBlogSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${back_url}/blog`,
        { title, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("createblog", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateBlogSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" id="image" onChange={handleImageChange} />
        </label>
        <br />
        {image && <img src={image} alt="selected" />}
        <br />
        <button className="button" type="submit">
          Create Blog
        </button>
      </form>
      <Link to="/">All Blogs</Link>
    </div>
  );
};

export default CreateBlogPage;