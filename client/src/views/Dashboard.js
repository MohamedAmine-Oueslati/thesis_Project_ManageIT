
import React from "react";
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  // CardFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      projMonth: [],
      projData: [],
      UserData: [],
      projBudget: [],
      sumBudget: 0,
      numProj: 0,
      numUser: 0
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/project/dashboardProject")
      .then((response) => {
        // console.log(response.data);
        var numProj = response.data.pop()
        var projData = response.data
        this.setState({ projData, numProj })
      })
    axios.get("http://localhost:5000/project/dashboardUser")
      .then((response) => {
        console.log(response.data);
        var numUser = response.data.pop()
        var UserData = response.data
        this.setState({ UserData, numUser })
      })
    axios.get("http://localhost:5000/project/projectMonth")
      .then((response) => {
        console.log(response.data);
        var projMonth = response.data
        this.setState({ projMonth })
      })
    axios.get("http://localhost:5000/project/projectbudget")
      .then((response) => {
        console.log(response.data);
        var sumBudget = response.data.pop()
        console.log(sumBudget)
        var projBudget = response.data
        this.setState({ projBudget, sumBudget })
      })
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    // #########################################
    // // // used inside src/views/Dashboard.js
    // #########################################
    let chartExample1 = {
      data1: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
          ],
          datasets: [
            {
              label: "Project stats",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.projMonth
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 2,
                suggestedMax: 10,
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ]
        }
      }
    }
    // #########################################
    // // // used inside src/views/Dashboard.js
    // #########################################
    let chartExample2 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: ["FIN", "ACC", "MARK", "H.R", "METH", "IT"],
          datasets: [
            {
              label: "Employees",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.UserData
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 2,
                suggestedMax: 10,
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ]
        }
      }
    };

    // #########################################
    // // // used inside src/views/Dashboard.js
    // #########################################
    let chartExample3 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

        return {
          labels: ["FIN", "ACC", "MARK", "H.R", "METH", "IT"],
          datasets: [
            {
              label: "Money",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.state.projBudget
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };
    // #########################################
    // // // used inside src/views/Dashboard.js
    // #########################################
    const chartExample4 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
        gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
        gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

        return {
          labels: ["FIN", "ACC", "MARK", "H.R", "METH", "IT"],
          datasets: [
            {
              label: "Project per department",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#00d6b4",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#00d6b4",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#00d6b4",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.projData
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 2,
                suggestedMax: 10,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,242,195,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Project Per Month ({this.state.numProj})</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
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
                            active: this.state.bigChartData === "data1"
                          })}
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
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
                            active: this.state.bigChartData === "data1"
                          })}
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">number of employees</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    {this.state.numUser}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Project Cost</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    {this.state.sumBudget}€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Number of Projects</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> {this.state.numProj}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-warning">
                        <i className="tim-icons icon-chat-33" />
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Number</p>
                        <CardTitle tag="h3">150GB</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="tim-icons icon-refresh-01" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-primary">
                        <i className="tim-icons icon-shape-star" />
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Followers</p>
                        <CardTitle tag="h3">+45k</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="tim-icons icon-sound-wave" /> Last Research
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Users</p>
                        <CardTitle tag="h3">150,000</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="tim-icons icon-trophy" /> Customers feedback
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col xs="5">
                      <div className="info-icon text-center icon-danger">
                        <i className="tim-icons icon-molecule-40" />
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Errors</p>
                        <CardTitle tag="h3">12</CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="tim-icons icon-watch-time" /> In the last
                    hours
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
          <Row>
            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Projects(5)</h6>
                  <p className="card-category d-inline"> this week</p>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Update the Documentation</p>
                            <p className="text-muted">
                              Human Resources Department
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip636901683"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Creating new Project</p>
                            <p className="text-muted">
                              Methods Department
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip457194718"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip457194718"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Solve the issues</p>
                            <p className="text-muted">
                              Accounting Department
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip362404923"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip362404923"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Release v2.0.0</p>
                            <p className="text-muted">
                              Finance Department
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip818217463"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip818217463"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Export the processed files</p>
                            <p className="text-muted">
                              Human Resources Department
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip831835125"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip831835125"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Arival at export process</p>
                            <p className="text-muted">
                              Methods Department
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip217595172"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip217595172"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Employees List</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mohamed Amine</td>
                        <td>Oueslati</td>
                        <td>Finance</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Oussema</td>
                        <td>Sferi</td>
                        <td>IT</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Adam</td>
                        <td>Boulawdhen</td>
                        <td>Methods</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Ranoua</td>
                        <td>Lachheb</td>
                        <td>Accounting</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Hamza</td>
                        <td>Ouni</td>
                        <td>Methods</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Khaled</td>
                        <td>Hbaieb</td>
                        <td>Accounting</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Ahmed</td>
                        <td>Fenny</td>
                        <td>Human Resources</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
