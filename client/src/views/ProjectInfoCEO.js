import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import socketIOClient from 'socket.io-client';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse,
  Table,
} from 'reactstrap';
const ENDPOINT = 'http://127.0.0.1:5000';

class ProjectInfoEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneProjectInfo: [],
      relatedFeatures: [],
      profileInformations: '',
      usersList: [],
      modal: false,
      modal1: false,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggle1 = () => {
    this.setState({ modal1: !this.state.modal1 });
  };

  handleDecline(featureTitle, e) {
    e.preventDefault();
    this.setState({ modal1: !this.state.modal1 });
    axios.post('http://localhost:5000/project/decline', {
      status: 'Finished',
      progress: 'Declined by the Head of Department',
    });
    //notification
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    const socket = socketIOClient(ENDPOINT);
    socket.emit('messageSent', {
      featureTitle,
      featureStatus: 'Finished',
      sentdepartment: 'CEO',
    });
    axios.post('http://localhost:5000/notification/store', {
      featureTitle,
      featureStatus: 'Finished',
      sentdepartment: 'CEO',
    });
    //-----------------
  }

  handleSubmit(featureTitle, e) {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
    axios
      .patch(`http://localhost:5000/project/update/${featureTitle}`, {
        featureStatus: 'Validated by CEO',
        featureProgress: 'Validated and planned for production',
      })
      .then((response) => {
        console.log(response.data);
      });
    //notification
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    const socket = socketIOClient(ENDPOINT);
    socket.emit('messageSent', {
      featureTitle,
      featureStatus: 'In Progress',
      featureProgress: 'Sent to IT Department',
      receiveddepartment: 'IT',
      sentdepartment: 'CEO',
    });
    axios.post('http://localhost:5000/notification/store', {
      featureTitle,
      featureStatus: 'In Progress',
      featureProgress: 'Sent to IT Department',
      receiveddepartment: 'IT',
      sentdepartment: 'CEO',
    });
    //-----------------
  }

  getFeatureCreator = (id) => {
    for (var i in this.state.usersList) {
      if (this.state.usersList[i]._id === id) {
        return this.state.usersList[i].fullname;
      }
    }
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .get(`http://localhost:5000/users/${user._id}`)
      .then((response) => {
        // console.log(response.data);
        this.setState(
          {
            profileInformations: response.data[0],
          }
          // () => console.log(this.state.profileInformations)
        );
      })
      .catch((err) => console.log('Error', err));
    //-------------------------------
    // get the index of the project from projecthistoryemployee component by props and get its informations
    axios
      .get(`http://localhost:5000/project/create/${this.props.currentIndex}`)
      .then((response) => {
        // console.log(response.data[0]);
        this.setState({ oneProjectInfo: response.data[0] });
        console.log(this.state.oneProjectInfo);
      });

    //get all the list of all users for feature creator
    axios.get('http://localhost:5000/users/').then((response) => {
      console.log(response.data);
      this.setState({ usersList: response.data });
    });

    //
    // axios
    //   .get(`http://localhost:5000/project/projectsByEmployee/${user._id}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     // this.setState({ projects: response.data });
    //   });
  }

  render() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    const { oneProjectInfo } = this.state;
    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={this.toggle}
      >
        &times;
      </button>
    );
    const externalCloseBtn1 = (
      <button
        className="close"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={this.toggle1}
      >
        &times;
      </button>
    );
    var list;
    oneProjectInfo.feature
      ? (list = oneProjectInfo.feature.map((feat, key) => {
          if (
            feat.featureProgress === 'Sent to CEO' ||
            feat.featureProgress === 'Validated and planned for production'
          ) {
            return (
              <div key={key}>
                <Table striped>
                  <tbody>
                    <tr>
                      <th scope="row">Creator</th>
                      <td>{this.getFeatureCreator(feat.featureCreator)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Title</th>
                      <td>{feat.featureTitle}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description</th>
                      <td>{feat.featureDescription}</td>
                    </tr>
                    <tr>
                      <th scope="row">Deadline</th>
                      <td>{feat.featureDeadline}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <td>{feat.featureStatus}</td>
                    </tr>
                    <tr>
                      <th scope="row">Progress</th>
                      <td>{feat.featureProgress}</td>
                    </tr>
                    {feat.featureSpecificationsFile ? (
                      <tr>
                        <th scope="row">Specifications File</th>
                        <td>
                          <a href={feat.featureSpecificationsFile}>Download</a>
                        </td>
                      </tr>
                    ) : null}
                    {feat.featureEstimateFile ? (
                      <tr>
                        <th scope="row">Estimate File</th>
                        <td>
                          <a href={feat.featureEstimateFile}>Download</a>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </Table>
                <br></br>

                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit.bind(this, feat._id)}
                >
                  Final Validation
                </Button>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={this.handleDecline.bind(this, feat._id)}
                >
                  Decline
                </Button>
                <div>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    external={externalCloseBtn}
                  >
                    {/* <ModalHeader>Adding Alert !</ModalHeader> */}
                    <ModalBody>
                      {' '}
                      <br />{' '}
                      <center>
                        <img
                          src="https://images.assetsdelivery.com/compings_v2/alonastep/alonastep1605/alonastep160500181.jpg"
                          alt="logo"
                          width="200px"
                        />
                        <br />
                        Feature has been successfully validated
                      </center>
                    </ModalBody>
                    <ModalFooter>
                      {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                      <Button
                        color="secondary"
                        onClick={this.toggle}
                        href="/admin/projects-history-CEO"
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div>
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={this.toggle1}
                    external={externalCloseBtn1}
                  >
                    <ModalBody>
                      {' '}
                      <br />{' '}
                      <center>
                        <img
                          src="https://fotomelia.com/wp-content/uploads/edd/2015/03/croix-rouge-logo-1560x1548.png"
                          alt="logo"
                          width="200px"
                        />
                        <br />
                        Project has been Declined !
                      </center>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        onClick={this.toggle1}
                        href="/admin/projects-history-CEO"
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <br></br>
                <br></br>
              </div>
            );
          }
        }))
      : (list = undefined);

    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Project Info</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="py-2 service-19 pb-0">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-10 pt-7">
                            <span className="badge badge-primary rounded-pill px-4 py-2 font-weight-light">
                              {oneProjectInfo.department}
                            </span>
                            <h2 className="my-3">{oneProjectInfo.title}</h2>
                            <h4 className="col-md-12 subtitle font-weight-light">
                              {oneProjectInfo.description}
                            </h4>
                            <Row>
                              <Col
                                style={{ marginTop: '30px' }}
                                className="pr-md-1"
                                md="6"
                              >
                                <span className="mr-2">
                                  Deadline : {oneProjectInfo.deadline}
                                </span>
                              </Col>
                            </Row>
                            <br></br>
                            <Row>
                              <Col>
                                <div>
                                  <Button
                                    color="primary"
                                    id="toggler"
                                    style={{ marginBottom: '1rem' }}
                                  >
                                    My Features
                                  </Button>
                                  <UncontrolledCollapse toggler="#toggler">
                                    <Card>
                                      <CardBody>{list}</CardBody>
                                    </Card>
                                  </UncontrolledCollapse>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ProjectInfoEmployees;
