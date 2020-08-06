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

class ProjectInfoMethods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneProjectInfo: [],
      profileInformations: '',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleAccept = (featureTitle) => {
    this.setState({ modal: !this.state.modal });
    axios.patch(`http://localhost:5000/project/update/${featureTitle}`, {
      featureStatus: 'In Progress',
      featureProgress: 'Sent to IT Department',
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
        console.log(response.data[0]);
        this.setState({ oneProjectInfo: response.data[0] });
      });
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
          if (feat.featureProgress === 'Sent to Methods Department') {
            return (
              <div key={key}>
                <Table striped>
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
                      <th scope="row">Progress</th>
                      <td>{feat.featureProgress}</td>
                    </tr>
                  </tbody>
                </Table>
                <br></br>

                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label for="exampleFile">Upload your files :</Label>
                      <CustomInput
                        type="file"
                        id="exampleFile"
                        name="customFile"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <Button
                      style={{ marginTop: 24 }}
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={(e) => e.preventDefault()}
                    >
                      Upload
                    </Button>
                  </Col>
                </Row>

                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={() => this.handleAccept(feat.featureTitle)}
                >
                  Submit To IT
                </Button>

                <div>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    external={externalCloseBtn}
                  >
                    <ModalBody>
                      {' '}
                      <br />{' '}
                      <center>
                        <Label for="exampleText">Reason :</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                        <br />
                        Project has been declined !
                      </center>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        onClick={this.toggle}
                        href="/admin/projects-history"
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
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
                                    Related Features
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
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src="https://i.postimg.cc/2ysnx7H8/photo-1511367461989-f85a21fda167.jpg"
                      />
                      <h5 className="title">{profileInformations.fullname}</h5>
                    </a>
                    <p className="description">
                      {profileInformations.department} Department Employee
                    </p>
                  </div>
                  <div className="card-description">ME .......</div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ProjectInfoMethods;
