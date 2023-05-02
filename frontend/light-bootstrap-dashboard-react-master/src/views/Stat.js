import React, {useState, useEffect} from 'react'
import axios from "axios";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Modal,
    Form,
  } from "react-bootstrap";

export default function Stat() {
    const [stats, setStats] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/stats");
            setStats(response.data);
          } catch (e) {
            console.error(e);
          }
        };
        fetchStats();
      }, []);
    
      const getUniqueUsersCount = (exhibitionId) => {
        const uniqueUsers = new Set(stats.filter((s) => s.exhibitionId === exhibitionId).map((s) => s.userId));
        return uniqueUsers.size;
      };
    
      const getDurationStats = (exhibitionId) => {
        const durations = stats.filter((s) => s.exhibitionId === exhibitionId).map((s) => s.duration);
        const avg = durations.reduce((acc, val) => acc + val) / durations.length;
        const sorted = durations.sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
        const max = Math.max(...durations);
        const min = Math.min(...durations);
        return { avg, median, max, min };
      };

  return (
    <>
    <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Statistics</Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={{overflow: "scroll" }}>
              <Table striped bordered hover>
      <thead>
        <tr>
          <th>Exhibition ID</th>
          <th>Unique Users</th>
          <th>Average Duration</th>
          <th>Median Duration</th>
          <th>Max Duration</th>
          <th>Min Duration</th>
        </tr>
      </thead>
      <tbody>
      {stats.length < 0 ? (
                <>
                 {stats.map((item) => (
          <tr key={item.exhibitionId}>
            <td>{item.exhibitionId}</td>
            <td>{getUniqueUsersCount(item.exhibitionId)}</td>
            <td>{getDurationStats(item.exhibitionId).avg.toFixed(2)}</td>
            <td>{getDurationStats(item.exhibitionId).median.toFixed(2)}</td>
            <td>{getDurationStats(item.exhibitionId).max.toFixed(2)}</td>
            <td>{getDurationStats(item.exhibitionId).min.toFixed(2)}</td>
          </tr>
        ))}
               
              </>)
                :(<><p>Loading statistics...</p></>)}
        </tbody>
        </Table>
        </div>
              
                </Card.Body>
                </Card>
                </Col>
                </Row>
                </Container>
                </>
  )
}
