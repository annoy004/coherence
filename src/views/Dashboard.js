import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function Dashboard() {
  const [bigChartData, setBigChartData] = useState("data1");
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("analyticsData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setDashboardData(parsedData);
        } else {
          console.log("No data found in local storage");
          setDashboardData([]);
        }
      } catch (error) {
        console.error("Error fetching data from local storage:", error);
        setDashboardData([]);
      }
    };

    fetchData();
  }, []);

  const chartLabels = dashboardData.map((data, index) => `Data ${index + 1}`);
  const viewCountData = dashboardData.map((data) => data.viewCount);
  const likeCountData = dashboardData.map((data) => data.likeCount);
  const commentCountData = dashboardData.map((data) => data.commentCount);
  const engagementRateData = dashboardData.map((data) => data.engagementRate);

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0, 0, 0, 0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            padding: 20,
            fontColor: "#9a9a9a",
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0, 0, 0, 0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a",
          },
        },
      ],
    },
  };

  return (
    <>
     <div className="text-center">
  <h1>Dashboard</h1>
  {dashboardData.length > 0 ? (
    <div>
      <h2>Data from Local Storage:</h2>
      <ul>
        {dashboardData.map((data, index) => (
          <li key={index}>
            View Count: {data.viewCount}, Like Count: {data.likeCount}, Comment Count: {data.commentCount}, Engagement Rate: {data.engagementRate}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No data available</p>
  )}
</div>

      <div className="content">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <h5 className="card-category">Traffic</h5>
                <CardTitle tag="h2">Total Data</CardTitle>
                <ButtonGroup className="btn-group-toggle float-right">
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: bigChartData === "data1",
                    })}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={() => setBigChartData("data1")}
                    style={{ backgroundColor: bigChartData === "data1" ? "blue" : "gray", color: "white" }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Posts
                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-single-02" />
                    </span>
                  </Button>
                  <Button
                    color="info"
                    id="1"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: bigChartData === "data2",
                    })}
                    onClick={() => setBigChartData("data2")}
                    style={{ backgroundColor: bigChartData === "data2" ? "blue" : "gray", color: "white" }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    likes
                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-gift-2" />
                    </span>
                  </Button>
                  <Button
                    color="info"
                    id="2"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: bigChartData === "data3",
                    })}
                    onClick={() => setBigChartData("data3")}
                    style={{ backgroundColor: bigChartData === "data3" ? "blue" : "gray", color: "white" }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      comment
                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-tap-02" />
                    </span>
                  </Button>
                  <Button
                    color="info"
                    id="3"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: bigChartData === "data4",
                    })}
                    onClick={() => setBigChartData("data4")}
                    style={{ backgroundColor: bigChartData === "data4" ? "blue" : "gray", color: "white" }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    engagement

                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-chat-33" />
                    </span>
                  </Button>
                </ButtonGroup>
              </CardHeader>
              <CardBody>
  <div className="chart-area">
    {bigChartData === "data1" && (
      <Bar
        data={{
          labels: chartLabels,
          datasets: [
            { label: "View Count", data: viewCountData, backgroundColor: "#007bff" }
          ]
        }}
        options={chartOptions}
      />
    )}
    {bigChartData === "data2" && (
      <Line
        data={{
          labels: chartLabels,
          datasets: [
            { label: "Like Count", data: likeCountData, borderColor: "#007bff", fill: false }
          ]
        }}
        options={chartOptions}
      />
    )}
    {bigChartData === "data3" && (
      <Line
        data={{
          labels: chartLabels,
          datasets: [
            { label: "Comment Count", data: commentCountData, borderColor: "#007bff", fill: false }
          ]
        }}
        options={chartOptions}
      />
    )}
    {bigChartData === "data4" && (
      <Bar
        data={{
          labels: chartLabels,
          datasets: [
            { label: "Engagement Rate", data: engagementRateData, backgroundColor: "#007bff" }
          ]
        }}
        options={chartOptions}
      />
    )}
  </div>
</CardBody>

              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default Dashboard;
  