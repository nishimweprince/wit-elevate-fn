import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Table, Tag, Progress } from 'antd';
import axios from 'axios';
import { SERVER_URL } from '../util/constant';

const { Title } = Typography;

interface OverallStats {
  totalAttempts: number;
  passedAttempts: number;
  failedAttempts: number;
  completedAttempts: number;
  notCompletedAttempts: number;
  averageScore: number;
  passRate: number;
  totalUniqueUsers: number;
}

interface UserStats {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalAttempts: number;
  passedAttempts: number;
  failedAttempts: number;
  completedAttempts: number;
  averageScore: number;
  lastAttemptDate: string;
  passRate: number;
}

const AdminDashboard: React.FC = () => {
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [overallResponse, usersResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/assessments/statistics/overall`),
          axios.get(`${SERVER_URL}/assessments/statistics/users`)
        ]);
        setOverallStats(overallResponse.data.data);
        setUserStats(usersResponse.data.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!overallStats) {
    return <div>No statistics available</div>;
  }

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (text: string, record: UserStats) => (
        <span>{record.firstName} {record.lastName}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Total Attempts',
      dataIndex: 'totalAttempts',
      key: 'totalAttempts',
    },
    {
      title: 'Pass Rate',
      key: 'passRate',
      render: (text: string, record: UserStats) => (
        <Tag color={record.passRate >= 70 ? 'success' : record.passRate >= 40 ? 'warning' : 'error'}>
          {record.passRate}%
        </Tag>
      ),
    },
    {
      title: 'Average Score',
      dataIndex: 'averageScore',
      key: 'averageScore',
      render: (score: number) => `${score.toFixed(1)}`,
    },
    {
      title: 'Last Attempt',
      dataIndex: 'lastAttemptDate',
      key: 'lastAttemptDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Assessment Dashboard</Title>
      
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Users" bordered={false}>
            <Title level={3}>{overallStats.totalUniqueUsers}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Attempts" bordered={false}>
            <Title level={3}>{overallStats.totalAttempts}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Overall Pass Rate" bordered={false}>
            <Title level={3}>{overallStats.passRate}%</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Average Score" bordered={false}>
            <Title level={3}>{overallStats.averageScore}</Title>
          </Card>
        </Col>
      </Row>

      <Card title="Overall Attempt Distribution" className="mb-8">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStats.passedAttempts / overallStats.totalAttempts) * 100)} 
              status="success" 
              format={() => `Passed: ${overallStats.passedAttempts}`}
            />
          </Col>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStats.failedAttempts / overallStats.totalAttempts) * 100)} 
              status="exception" 
              format={() => `Failed: ${overallStats.failedAttempts}`}
            />
          </Col>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStats.completedAttempts / overallStats.totalAttempts) * 100)} 
              status="active" 
              format={() => `Completed: ${overallStats.completedAttempts}`}
            />
          </Col>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStats.notCompletedAttempts / overallStats.totalAttempts) * 100)} 
              status="normal" 
              format={() => `Not Completed: ${overallStats.notCompletedAttempts}`}
            />
          </Col>
        </Row>
      </Card>

      <Card title="User Assessment Statistics">
        <Table
          columns={columns}
          dataSource={userStats}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard; 