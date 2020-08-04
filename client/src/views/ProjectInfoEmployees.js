import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  Button,
  Card,
  CardHeader,
  CustomInput,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse,
  Table,
} from 'reactstrap';

class ProjectInfoEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneProjectInfo: [],
      relatedFeatures: [],
      profileInformations: '',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleDecline = () => {
    this.setState({ modal: !this.state.modal });
    axios.post('http://localhost:5000/project/decline', {
      status: 'Finished',
      progress: 'Declined by the Head of Department',
      title: this.state.info.title,
    });
  };

  handleAccept = (featureTitle) => {
    this.setState({ modal: !this.state.modal });
    axios.patch(`http://localhost:5000/project/update/${featureTitle}`, {
      featureStatus: 'In Progress',
      featureProgress: 'Sent to the Head of Department',
    });
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

    //
    // axios
    //   .get(`http://localhost:5000/project/projectsByEmployee/${user._id}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     // this.setState({ projects: response.data });
    //   });
  }

  render() {
    const { oneProjectInfo, profileInformations } = this.state;
    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={this.toggle}
      >
        &times;
      </button>
    );
    var list;
    oneProjectInfo.feature
      ? (list = oneProjectInfo.feature.map((feat, key) => {
          return (
            <>
              <Table striped key={key}>
                <tbody>
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
                    <th scope="row">In Progress</th>
                    <td>{feat.featureProgress}</td>
                  </tr>
                </tbody>
              </Table>
              <br></br>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={() => this.handleAccept(feat.featureTitle)}
              >
                Submit To Head
              </Button>
            </>
          );
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
                                      <CardHeader>
                                        <h5 className="feature-title">
                                          Feature title
                                        </h5>
                                      </CardHeader>
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
