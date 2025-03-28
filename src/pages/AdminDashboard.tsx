import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Table, Tag, Spin, Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getOverallAssessmentStatisticsAction, getUserAssessmentStatisticsAction } from '../store/assessments/action';

const { Title } = Typography;

interface UserStatistics {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  totalAttempts: number;
  passRate: number;
  averageScore: number;
  lastAttemptDate: string;
}

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { overallStatistics, userStatistics, isLoading } = useSelector((state: RootState) => state.assessment);

  useEffect(() => {
    dispatch(getOverallAssessmentStatisticsAction());
    dispatch(getUserAssessmentStatisticsAction());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!overallStatistics) {
    return <div>No statistics available</div>;
  }

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (text: string, record: UserStatistics) => (
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
      render: (text: string, record: UserStatistics) => (
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
            <Title level={3}>{overallStatistics.totalUniqueUsers}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Attempts" bordered={false}>
            <Title level={3}>{overallStatistics.totalAttempts}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Overall Pass Rate" bordered={false}>
            <Title level={3}>{overallStatistics.passRate}%</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Average Score" bordered={false}>
            <Title level={3}>{overallStatistics.averageScore}</Title>
          </Card>
        </Col>
      </Row>

      <Card title="Overall Attempt Distribution" className="mb-8">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStatistics.passedAttempts / overallStatistics.totalAttempts) * 100)} 
              status="success" 
              format={() => `Passed: ${overallStatistics.passedAttempts}`}
            />
          </Col>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStatistics.failedAttempts / overallStatistics.totalAttempts) * 100)} 
              status="exception" 
              format={() => `Failed: ${overallStatistics.failedAttempts}`}
            />
          </Col>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStatistics.completedAttempts / overallStatistics.totalAttempts) * 100)} 
              status="active" 
              format={() => `Completed: ${overallStatistics.completedAttempts}`}
            />
          </Col>
          <Col span={12}>
            <Progress 
              percent={Math.round((overallStatistics.notCompletedAttempts / overallStatistics.totalAttempts) * 100)} 
              status="normal" 
              format={() => `Not Completed: ${overallStatistics.notCompletedAttempts}`}
            />
          </Col>
        </Row>
      </Card>

      <Card title="User Assessment Statistics">
        <Table
          columns={columns}
          dataSource={userStatistics}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard; 