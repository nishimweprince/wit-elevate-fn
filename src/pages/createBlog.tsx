import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { blog, createBlog, editBlog } from "../util/api";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState<formData>({});

  useEffect(() => {
    if (id) {
      blog(id).then((data) => {
        setContent(data);
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    createBlog(content).then((data) => {
      toast.success("Blog created successfully");
      setContent(data);
      navigate("/dashboard/blog/list");
    });
  };
  const handleEdit = (e: any) => {
    e.preventDefault();
    editBlog(content, id).then(() => {
      navigate("/dashboard/blog/list");
    });
  };
  console.log("editor", content);

  const editorRef = useRef<any>(null);
  return (
    <div className="py-12 px-12">
      <form
        className="flex flex-col gap-8"
        onSubmit={id ? handleEdit : handleSubmit}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label>Title</label>
            <Input
              name="title"
              value={content?.title}
              className="bg-white border"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="flex flex-col">
              <label>Picture</label>
              <Input
                name="picture"
                value={content?.picture}
                className="bg-white border"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
         
          <Input
            name="description"
            value={content?.description}
            className="bg-white border h-52"
            onChange={handleChange}
          />
        </div>
        <div className="pt-2- flex justify-start">
          <button
            type="submit"
            onClick={id ? handleEdit : handleSubmit}
            className="border-secondary  border px-4  text-secondary py-2 hover:bg-primary hover:text-white hover:border-none"
          >
            {id ? "Edit Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBlog;
