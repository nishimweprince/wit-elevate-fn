import { Table } from "antd";
import { useState, useEffect } from "react";
import { allBlogs } from "../util/api";
import { columns } from "../util/columns";
import { useNavigate } from "react-router-dom";

const ListBlogs = () => {
  const userId: any = localStorage.getItem("userId");
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    allBlogs(0, userId).then((data) => {
      setBlogs(data);
    });
  }, []);
  const Data = blogs.map((blog: any) => {
    return { ...blog, navigate };
  });
  return (
    <>
      <Table columns={columns} dataSource={Data} pagination={false} />
    </>
  );
};
export default ListBlogs;
