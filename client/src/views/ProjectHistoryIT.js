import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import ProjectInfoIT from './ProjectInfoIT.js';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
} from 'reactstrap';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: '',
      view: 'false',
      projects1: [],
      projects2: [],
      projects3: [],
      users: [],
      ProjHistory: 'data1',
    };
  }

  findUser = (projectUser) => {
    var user = this.state.users.find((u) => u._id === projectUser);
    if (user) return user.fullname;
  };

  setProject = (name) => {
    this.setState({
      ProjHistory: name,
    });
  };

  componentDidMount() {
    axios.get('http://localhost:5000/project/it/').then((response) => {
      var projects1 = response.data[0];
      var projects2 = response.data[1];
      var projects3 = response.data[2];
      console.log(response.data);
      this.setState({ projects1, projects2, projects3 });
    });

    //get the the list of users
    axios.get('http://localhost:5000/users').then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });
  }

  handleInfo = (id) => {
    console.log(id);
    this.setState({ currentIndex: id, view: 'true' });
  };

  handleSubmit(i) {
    // e.preventDefault();
    axios
      .post('http://localhost:5000/project/index', { index: i })
      .then((response) => {
        console.log(response.data);
        window.location = '/admin/project-Info';
      });
    // .catch((err) => console.log('Error', err));
  }

  render() {
    var ProjectHistory1 = this.state.projects1.map((proj, i) => {
      return (
        <tr key={i}>
          <td>{proj.title}</td>
          <td>{this.findUser(proj.user)}</td>
          <td>{proj.department}</td>
          <td>{proj.deadline}</td>
          <th>{proj.status}</th>
          <th>{proj.progress}</th>
          <td className="text-center">
            <Button
              onClick={() => this.handleInfo(proj._id)}
              color="link"
              id="buttonInfo"
              title=""
              type="button"
            >
              <i className="tim-icons icon-notes" />
            </Button>
          </td>
        </tr>
      );
    });
    var ProjectHistory2 = this.state.projects2.map((proj, i) => {
      return (
        <tr key={i}>
          <td>{proj.title}</td>
          <td>{this.findUser(proj.user)}</td>
          <td>{proj.department}</td>
          <td>{proj.deadline}</td>
          <th>{proj.status}</th>
          <th>{proj.progress}</th>
          <td className="text-center">
            <Button
              onClick={() => this.handleInfo(proj._id)}
              color="link"
              id="buttonInfo"
              title=""
              type="button"
            >
              <i className="tim-icons icon-notes" />
            </Button>
          </td>
        </tr>
      );
    });
    var ProjectHistory3 = this.state.projects3.map((proj, i) => {
      return (
        <tr key={i}>
          <td>{proj.title}</td>
          <td>{this.findUser(proj.user)}</td>
          <td>{proj.department}</td>
          <td>{proj.deadline}</td>
          <th>{proj.status}</th>
          <th>{proj.progress}</th>
          <td className="text-center">
            <Button
              onClick={() => this.handleInfo(proj._id)}
              color="link"
              id="buttonInfo"
              title=""
              type="button"
            >
              <i className="tim-icons icon-notes" />
            </Button>
          </td>
        </tr>
      );
    });
    if (this.state.view === 'false') {
      return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Project List</CardTitle>
                    <Row>
                      <Col className="text-left" sm="6"></Col>
                      <Col sm="6">
                        <ButtonGroup
                          className="btn-group-toggle float-right"
                          data-toggle="buttons"
                        >
                          <Button
                            tag="label"
                            className={classNames('btn-simple', {
                              active: this.state.ProjHistory === 'data1',
                            })}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => this.setProject('data1')}
                          >
                            <input
                              defaultChecked
                              className="d-none"
                              name="options"
                              type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Internal
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
                            className={classNames('btn-simple', {
                              active: this.state.ProjHistory === 'data2',
                            })}
                            onClick={() => this.setProject('data2')}
                          >
                            <input
                              className="d-none"
                              name="options"
                              type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              From Methods
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-gift-2" />
                            </span>
                          </Button>

                          <Button
                            color="info"
                            id="1"
                            size="sm"
                            tag="label"
                            className={classNames('btn-simple', {
                              active: this.state.ProjHistory === 'data3',
                            })}
                            onClick={() => this.setProject('data3')}
                          >
                            <input
                              className="d-none"
                              name="options"
                              type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Validated by CEO
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-gift-2" />
                            </span>
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Title</th>
                          <th>Creator</th>
                          <th>Department</th>
                          <th>Do it before</th>
                          <th>Status</th>
                          <th>Progress</th>
                          <th className="text-center">Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.ProjHistory === 'data1'
                          ? ProjectHistory1
                          : this.state.ProjHistory === 'data2'
                          ? ProjectHistory2
                          : ProjectHistory3}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    } else {
      return (
        <ProjectInfoIT
          currentIndex={this.state.currentIndex}
          infoView={this.state.ProjHistory}
        />
      );
    }
  }
}

export default Tables;
