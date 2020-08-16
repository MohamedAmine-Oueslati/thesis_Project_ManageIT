import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import socketIOClient from 'socket.io-client';
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
  Label,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse,
  Table,
} from 'reactstrap';
const ENDPOINT = 'http://127.0.0.1:5000';

class ProjectInfoMethods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneProjectInfo: [],
      profileInformations: '',
      usersList: [],
      modal: false,
      modal1: false,
      selectedFile: null,
      specFileStatus: 'false',
      featureSpecificationsFile: '',
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggle1 = () => {
    this.setState({ modal1: !this.state.modal1 });
  };

  getFeatureCreator = (id) => {
    for (var i in this.state.usersList) {
      if (this.state.usersList[i]._id === id) {
        return this.state.usersList[i].fullname;
      }
    }
  };

  onChangeFile = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios
      .post('http://localhost:5000/upload-images/', data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((response) => {
        // then print response status
        console.log(response.data.data[0].url);
        this.setState({ featureSpecificationsFile: response.data.data[0].url });
      });
  };

  handleAccept(featureTitle, e) {
    e.preventDefault()
    this.setState({ modal: !this.state.modal });
    axios.patch(`http://localhost:5000/project/update/spec/${featureTitle}`, {
      featureStatus: 'In Progress',
      featureProgress: 'Sent to IT Department',
      featureSpecificationsFile: this.state.featureSpecificationsFile,
    });
    this.setState({ specFileStatus: 'true' });

    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    const socket = socketIOClient(ENDPOINT);
    socket.emit('messageSent', {
      featureTitle,
      featureStatus: 'In Progress',
      featureProgress: 'Sent to IT Department',
      receiveddepartment: 'IT',
      sentdepartment: user.department,
    });
    axios.post('http://localhost:5000/notification/store', {
      featureTitle,
      featureStatus: 'In Progress',
      featureProgress: 'Sent to IT Department',
      receiveddepartment: 'IT',
      sentdepartment: user.department,
    });
  };

  handleSendToCEO(featureTitle, e) {
    e.preventDefault()
    this.setState({ modal1: !this.state.modal1 });
    axios
      .patch(`http://localhost:5000/project/update/${featureTitle}`, {
        featureStatus: 'In Progress',
        featureProgress: 'Sent to CEO',
      })
      .then((response) => {
        console.log(response.data);
      });

    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    const socket = socketIOClient(ENDPOINT);
    socket.emit('messageSent', {
      featureTitle,
      featureStatus: 'In Progress',
      featureProgress: 'Sent to CEO',
      receiveddepartment: 'CEO',
      sentdepartment: user.department,
    });
    axios.post('http://localhost:5000/notification/store', {
      featureTitle,
      featureStatus: 'In Progress',
      featureProgress: 'Sent to CEO',
      receiveddepartment: 'CEO',
      sentdepartment: user.department,
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

    //get all the list of all users for feature creator
    axios.get('http://localhost:5000/users/').then((response) => {
      console.log(response.data);
      this.setState({ usersList: response.data });
    });
  }

  render() {
    const defaultImageURL =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjGSxm1_lBkpyvSzWDPI9EPOmlwLCtxD0B_g&usqp=CAU';
    const { infoView } = this.props;

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
          (feat.featureStatus !== 'Created' &&
            feat.featureProgress !== 'Sent to the Head of Department' &&
            infoView === 'data2') ||
          (feat.featureStatus === 'In Progress' && infoView === 'data1') ||
          (feat.featureProgress === 'Estimate Sent back from IT' &&
            infoView === 'data3') ||
          (feat.featureProgress === 'Sent to CEO' && infoView === 'data3')
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

              {infoView === 'data3' ? (
                <>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSendToCEO.bind(this, feat._id)}
                  >
                    Submit To CEO
                    </Button>{' '}
                </>
              ) : (
                  <>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label for="exampleFile">Upload your files :</Label>
                          <CustomInput
                            type="file"
                            id="exampleFile"
                            name="customFile"
                            onChange={this.onChangeFile}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <Button
                          style={{ marginTop: 24 }}
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.onClickHandler}
                        >
                          Upload
                        </Button>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={this.handleAccept.bind(this, feat._id)}
                    >
                      Submit To IT
                    </Button>{' '}
                  </>
                )}
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
                        Feature has been successfully sent to IT department !
                      </center>
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                    <Button
                      color="secondary"
                      onClick={this.toggle}
                      href="/admin/Update-Project"
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
                        Feature has been successfully sent to CEO !
                      </center>
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                    <Button
                      color="secondary"
                      onClick={this.toggle1}
                      href="/admin/Update-Project"
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
                        src={
                          profileInformations.profileImageURL
                            ? profileInformations.profileImageURL
                            : defaultImageURL
                        }
                      />
                      <h5 className="title">{profileInformations.fullname}</h5>
                    </a>
                    <p className="description">
                      {profileInformations.department} Department{' '}
                      {jwtDecode(localStorage.getItem('token')).role}
                    </p>
                  </div>
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
