import { Table, Tag } from "antd";
import GetScore from "./GetScore";

const columns = [
  {
    title: "Text",
    dataIndex: "text",
    key: "text",
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: "Status",
    key: "text",
    dataIndex: "prediction",
    render: (prediction) => (
      <Tag color={prediction === "accepted" ? "green" : "red"}>
        {prediction}
      </Tag>
    ),
  },
  {
    title: "Score",
    dataIndex: "text",
    key: "text",
    render: (text) => (
      <div size="middle">
        <GetScore text={text} />
      </div>
    ),
  },
];

const ListUsers = ({ userData }) => {
  return (
    <div style={{ margin: "auto", width: 900, marginTop: 20 }}>
      <Table columns={columns} dataSource={userData} bordered />
      <div style={{ margin: "auto" }}>Develped by Jayanth for Logora</div>
    </div>
  );
};

export default ListUsers;
