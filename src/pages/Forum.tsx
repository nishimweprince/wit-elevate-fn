import { useState } from "react";
import { Card, Modal, Form, Avatar, Badge, Dropdown } from "antd";
import { Button, Input, Layout, Menu, Typography, Space } from "antd";
import { LikeOutlined, MessageOutlined, PlusOutlined, BellOutlined, UserOutlined, MoreOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface Thread {
  id: number;
  title: string;
  content: string;
  replies: number;
  likes: number;
  author: string;
  avatar: string;
}

const Forum = () => {
  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, title: "How to start with React?", content: "I'm new to React, any tips?", replies: 5, likes: 10, author: "John Doe", avatar: "https://via.placeholder.com/40" },
    { id: 2, title: "Best practices for TypeScript", content: "How do you manage types efficiently?", replies: 3, likes: 7, author: "Jane Smith", avatar: "https://via.placeholder.com/40" }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "" });

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleCreateThread = () => {
    if (newThread.title && newThread.content) {
      setThreads([...threads, { id: threads.length + 1, title: newThread.title, content: newThread.content, replies: 0, likes: 0, author: "You", avatar: "https://via.placeholder.com/40" }]);
      setNewThread({ title: "", content: "" });
      setIsModalVisible(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Sidebar */}
      <Sider theme="light" width={280} className="p-4 shadow-lg">
        <Title level={3} style={{ padding: "16px" }}>Forum</Title>
        <Menu mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">All Threads</Menu.Item>
          <Menu.Item key="2">My Posts</Menu.Item>
          <Menu.Item key="3">Categories</Menu.Item>
        </Menu>
      </Sider>
      
      <Layout>
        <Header style={{ background: "#fff", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Title level={2}>Forum Threads</Title>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Badge count={3}>
              <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            </Badge>
            <Avatar size={40} icon={<UserOutlined />} />
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>New Thread</Button>
          </div>
        </Header>
        
        <Content style={{ padding: "24px" }}>
          <Input.Search placeholder="Search threads..." style={{ marginBottom: "16px", maxWidth: "400px" }} />
          <Space direction="vertical" style={{ width: "100%" }}>
            {threads.map((thread) => (
              <Card key={thread.id} title={thread.title} hoverable extra={<Dropdown overlay={<Menu><Menu.Item>Report</Menu.Item><Menu.Item>Follow</Menu.Item></Menu>}><MoreOutlined /></Dropdown>}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <Avatar src={thread.avatar} />
                  <Text strong>{thread.author}</Text>
                </div>
                <Text>{thread.content}</Text>
                <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
                  <Text><MessageOutlined /> {thread.replies} Replies</Text>
                  <Text><LikeOutlined /> {thread.likes} Likes</Text>
                </div>
              </Card>
            ))}
          </Space>
        </Content>
      </Layout>

      {/* Create New Thread Modal */}
      <Modal title="Create a New Thread" visible={isModalVisible} onCancel={handleCancel} onOk={handleCreateThread}>
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={newThread.title} onChange={(e) => setNewThread({ ...newThread, title: e.target.value })} />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea rows={4} value={newThread.content} onChange={(e) => setNewThread({ ...newThread, content: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Forum;