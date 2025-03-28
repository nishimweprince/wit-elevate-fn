import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic, Spin, Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getAssessmentStatisticsAction } from '../store/assessments/action';

interface AssessmentStatisticsProps {
  assessmentId: string;
}

const AssessmentStatistics: React.FC<AssessmentStatisticsProps> = ({ assessmentId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { assessmentStatistics, isLoading } = useSelector((state: RootState) => state.assessment);

  useEffect(() => {
    dispatch(getAssessmentStatisticsAction(assessmentId));
  }, [dispatch, assessmentId]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!assessmentStatistics) {
    return <div>No statistics available</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2>Assessment Statistics</h2>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Attempts"
              value={assessmentStatistics.totalAttempts}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Pass Rate"
              value={assessmentStatistics.passRate}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Average Score"
              value={assessmentStatistics.averageScore}
              suffix="/100"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completion Rate"
              value={((assessmentStatistics.completedAttempts / assessmentStatistics.totalAttempts) * 100).toFixed(1)}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: '24px' }}>
        <h3>Attempt Distribution</h3>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Progress 
                percent={Math.round((assessmentStatistics.passedAttempts / assessmentStatistics.totalAttempts) * 100)} 
                status="success" 
                format={() => `Passed: ${assessmentStatistics.passedAttempts}`}
              />
            </Col>
            <Col span={12}>
              <Progress 
                percent={Math.round((assessmentStatistics.failedAttempts / assessmentStatistics.totalAttempts) * 100)} 
                status="exception" 
                format={() => `Failed: ${assessmentStatistics.failedAttempts}`}
              />
            </Col>
            <Col span={12}>
              <Progress 
                percent={Math.round((assessmentStatistics.completedAttempts / assessmentStatistics.totalAttempts) * 100)} 
                status="active" 
                format={() => `Completed: ${assessmentStatistics.completedAttempts}`}
              />
            </Col>
            <Col span={12}>
              <Progress 
                percent={Math.round((assessmentStatistics.notCompletedAttempts / assessmentStatistics.totalAttempts) * 100)} 
                status="normal" 
                format={() => `Not Completed: ${assessmentStatistics.notCompletedAttempts}`}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentStatistics; 