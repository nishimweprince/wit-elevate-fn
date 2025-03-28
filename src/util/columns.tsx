import { MenuProps, Space, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import { blogProps, eventProps } from "./types";
import {
  MdDelete,
  MdOutlineAssignmentInd,
  MdModeEditOutline,
} from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { deleteBlog, deleteEvent } from "./api";
import { toast } from "react-toastify";

export const columns: ColumnsType<blogProps> = [
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
            <label
              onClick={() => {
                console.log("....", record);
                record.navigate(`/dashboard/blog/edit/${record?._id}`);
              }}
              className="flex gap-2 bg-[#0f0f4712] p-1 rounded-md cursor-pointer"
            >
              <span className="text-[#0F0F47] text-[16px] font-normal pt-[5px] flex items-center">
                <MdModeEditOutline className="pt-1  size={20}" />
                Edit
              </span>
            </label>
          ),
        },

        {
          key: "3",
          label: (
            <label
              onClick={() => {
                deleteBlog(record._id).then(() => {
                  toast.success("Blog deleted successfully");
                  console.log("Deleted successfully");
                });
              }}
              className="flex gap-2 bg-red-200 rounded-md p-1"
            >
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
                    {record?.data?.reference ? "Re-Assign Shop" : "Assign Shop"}
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

export const eventConlumns: ColumnsType<eventProps> = [
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
    key: "date",
    title: "date",
    dataIndex: "date",
    width: 200,
  },
  {
    key: "time",
    title: "time",
    dataIndex: "time",
    width: 200,
  },
  {
    key: "location",
    title: "location",
    dataIndex: "location",
    width: 200,
  },
  {
    key: "cost",
    title: "cost",
    dataIndex: "cost",
    width: 200,
  },
  {
    key: "organiser",
    title: "organiser",
    dataIndex: "organiser",
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
            <label
              onClick={() => {
                console.log("....", record);
                record.navigate(`/dashboard/event/edit/${record?._id}`);
              }}
              className="flex gap-2 bg-[#0f0f4712] p-1 rounded-md cursor-pointer"
            >
              <span className="text-[#0F0F47] text-[10px] font-normal pt-[5px]">
                <MdModeEditOutline />
                Edit
              </span>
            </label>
          ),
        },

        {
          key: "3",
          label: (
            <label
              onClick={() => {
                deleteEvent(record._id).then(() => {
                  toast.success("Blog deleted successfully");
                  console.log("Deleted successfully");
                });
              }}
              className="flex gap-2 bg-red-200 rounded-md p-1"
            >
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
                    {record?.data?.reference ? "Re-Assign Shop" : "Assign Shop"}
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
