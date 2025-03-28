import { useState, useEffect } from "react";
import { allEvents } from "../util/api";
import { eventConlumns } from "../util/columns";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
const ListEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    allEvents(0).then((data) => {
      setEvents(data);
    });
  }, []);
  const Data = events.map((event: any) => {
    return { ...event, navigate };
  });
  return (
    <>
      <Table columns={eventConlumns} dataSource={Data} pagination={false} />
    </>
  );
};
export default ListEvents;
