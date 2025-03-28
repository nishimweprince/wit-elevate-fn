import Input from "../components/ui/Input";
import { DatePicker, TimePicker } from "antd";
import type { DatePickerProps, TimePickerProps } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { createEvent, editEvent, event } from "../util/api";
import { formData } from "../util/types";
import { Dayjs } from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [eventContent, setEventContent] = useState<formData>({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      event(id).then((data) => {
        setEventContent(data);
      });
    }
  }, [id]);

  const handleDateChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setEventContent({ ...eventContent, date: dateString });
  };
  const handleTimeChange: TimePickerProps["onChange"] = (
    _time: Dayjs | null,
    dateString
  ) => {
    setEventContent({ ...eventContent, time: dateString });
  };

  const handleChange = (e: any) => {
    setEventContent({ ...eventContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createEvent(eventContent).then((data: SetStateAction<formData>) => {
      setEventContent(data);
      navigate("/dashboard/event/list");
    });
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    editEvent(eventContent, id).then(() => {
      toast.success("Edited successfully");
      navigate("/dashboard/event/list");
    });
  };

  const handlePicChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <div className="flex justify-center- py-14 px-12">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Event title</label>
            <Input
              value={eventContent.title}
              name="title"
              className="w-[550px]"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Event Details</label>
            <Input
              value={eventContent.description}
              name="description"
              className="w-[550px] h-[140px]"
              onChange={handleChange}
            />
          </div>
          <div className="flex py-2">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handlePicChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
            <div className="flex flex-col">
              <label>Picture Url</label>
              <Input
                value={eventContent.picture}
                name="picture"
                className="w-[550px]-"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <h1>Date</h1>
              <DatePicker
                name="date"
                onChange={handleDateChange}
                className={"w-48"}
              />
            </div>
            <div>
              <h1>Time</h1>
              <TimePicker
                name="time"
                onChange={handleTimeChange}
                className={"w-48"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label> Location</label>
            <Input
              value={eventContent.location}
              name="location"
              className="w-[550px]"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <label>Price</label>
              <Input
                value={eventContent.cost}
                name="cost"
                className="w-[300px]"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Organiser</label>
              <Input
                value={eventContent.organiser}
                name="organiser"
                className="w-[300px]"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="pt-2 flex justify-start">
            <button
              type="submit"
              onClick={id ? handleEdit : handleSubmit}
              className="border-secondary border px-4  text-secondary py-2 hover:bg-primary hover:text-white hover:border-none"
            >
              {id ? "Edit" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateEvent;
