import { Table, MenuProps, Space, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { allBlogs } from "../util/api";
import { blogProps } from "../util/types";
import { ColumnsType } from "antd/es/table";
import { MdDelete, MdOutlineAssignmentInd } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
const List = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    allBlogs(0).then((data) => {
      setBlogs(data);
    });
  }, []);
  const Data = blogs.map((blog) => {
    return blog;
  });

  const columns: ColumnsType<blogProps> = [
    {
      key: "title",
      title: "title",
      dataIndex: "title",
      width: 300,
    },
    {
      key: "description",
      title: "description",
      dataIndex: "description",
      render: (text: string, _record: any) => (
        <div className=" line-clamp-2">{text}</div>
      ),
      width: 250,
    },
    {
      key: "createdBy",
      title: "createdBy",
      dataIndex: "createdBy",
      render: (text: any, _record: any) => <div>{text?.fullName}</div>,
      width: 200,
    },

    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      className: "disable-navigation",
      render: (_, record: any) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <label className="flex gap-2 bg-[#0f0f4712] p-1 rounded-md cursor-pointer">
                <span className="text-[#0F0F47] text-[10px] font-normal pt-[5px]">
                  {" "}
                  Edit
                </span>
              </label>
            ),
          },

          {
            key: "3",
            label: (
              <label className="flex gap-2 bg-red-200 rounded-md p-1">
                <MdDelete className="pt-1 fill-red-500" size={20} />{" "}
                <span className="text-red-500 text-[12px] font-normal pt-[5px]">
                  Delete
                </span>
              </label>
            ),
          },
          {
            key: "4",
            label: record?.role?.toLowerCase() === "sales agent" && (
              <label className="flex gap-2  bg-gray-200 rounded-md p-1">
                <MdOutlineAssignmentInd
                  className="mt-1 fill-gray-500"
                  size={20}
                />
                <span className=" text-[12px] font-normal ">
                  <div className="text-xs  bg-transparent  py-1.5  rounded-md ">
                    <button>
                      {record?.data?.reference
                        ? "Re-Assign Shop"
                        : "Assign Shop"}
                    </button>
                  </div>
                </span>
              </label>
            ),
          },
        ];
        return (
          <>
            <div className="flex gap-2">
              <Space direction="vertical">
                <Dropdown menu={{ items }} placement="bottom">
                  <BiDotsHorizontalRounded size={25} />
                </Dropdown>
              </Space>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={Data} pagination={false} />
    </>
  );
};
export default List;
