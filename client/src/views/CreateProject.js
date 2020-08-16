import React from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import jwtDecode from 'jwt-decode';
import {
  Button,
  Card,
  CardHeader,
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
} from 'reactstrap';
const ENDPOINT = "http://127.0.0.1:5000";

class CreateProject extends React.Component {
  state = {
    newProject: {
      title: '',
      department: '',
      description: '',
      deadline: '',
      user: jwtDecode(localStorage.getItem('token')),
    },
    profileInformations: '',
    modal: false,
    titleError: '',
    descriptionError: '',
    deadlineError: '',
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .get(`http://localhost:5000/users/${user._id}`)
      .then((response) => {
        console.log(response.data);
        this.state.newProject.department = response.data[0].department;
        this.setState(
          {
            profileInformations: response.data[0],
          }
          // () => console.log(this.state.profileInformations.fullname)
        );
      })
      .catch((err) => console.log('Error', err));
  }
  handleChange = ({ currentTarget: input }) => {
    const newProject = { ...this.state.newProject };
    newProject[input.name] = input.value;
    this.setState({ newProject });
  };

  handleSubmit = (e) => {
    var isValid = this.validate();
    if (isValid) {
      this.setState({ modal: !this.state.modal });
      e.preventDefault();
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      axios
        .post('http://localhost:5000/project/create', {
          department: this.state.profileInformations.department,
          ...this.state.newProject,
          status: 'Created',
          progress: `Created by ${this.state.profileInformations.fullname}`,
        })
        .then((response) => { })

        .catch((err) => console.log('Error', err));

      // notification
      const socket = socketIOClient(ENDPOINT);
      socket.emit("messageSent", {
        department: this.state.profileInformations.department,
        ...this.state.newProject,
        status: 'Created',
        progress: `Created by ${this.state.profileInformations.fullname}`,
        fullname: user.fullname
      })
      axios.post('http://localhost:5000/notification/store', {
        department: this.state.profileInformations.department,
        ...this.state.newProject,
        status: 'Created',
        progress: `Created by ${this.state.profileInformations.fullname}`,
        fullname: user.fullname
      });
      //-----------------
    };
  }

  validate = () => {
    let titleError = '';
    let descriptionError = '';
    let deadlineError = '';

    if (this.state.newProject.title.length < 6) {
      titleError = 'invalid title';
    }
    if (this.state.newProject.description.length < 16) {
      descriptionError = 'invalid description';
    }
    if (!this.state.newProject.deadline) {
      deadlineError = 'you need to set a deadline';
    }
    if (titleError || descriptionError || deadlineError) {
      this.setState({ titleError, descriptionError, deadlineError });
      return false;
    }
    return true;
  };

  render() {
    const defaultImageURL =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjGSxm1_lBkpyvSzWDPI9EPOmlwLCtxD0B_g&usqp=CAU';
    const { newProject, profileInformations } = this.state;
    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={this.toggle}
      >
        &times;
      </button>
    );

    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Create a New Project</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Department</label>
                          <Input
                            defaultValue={profileInformations.department}
                            disabled
                            placeholder="Department"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            placeholder="Project Title"
                            type="text"
                            value={newProject.title}
                            onChange={this.handleChange}
                            id="title"
                            name="title"
                          />
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.titleError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="11">
                        <FormGroup>
                          <label>Project Description</label>
                          <Input
                            cols="100"
                            // defaultValue=""
                            placeholder="Here can be your description"
                            rows="10"
                            type="textarea"
                            value={newProject.description}
                            onChange={this.handleChange}
                            id="description"
                            name="description"
                          />
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.descriptionError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={5} md={10} className="px-md-1">
                        <Card>
                          <CardBody>
                            <FormGroup>
                              <Label className="label-control">
                                Do it before :
                              </Label>
                              <Input
                                value={newProject.deadline}
                                onChange={this.handleChange}
                                className="form-control datetimepicker"
                                type="date"
                                id="deadline"
                                name="deadline"
                                min="2020-07-18"
                                placeholder="date placeholder"
                              />
                              <div style={{ fontSize: 12, color: 'red' }}>
                                {this.state.deadlineError}
                              </div>
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
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
                            alt="logo" width="200px"
                          />
                          <br />
                          Project has been successfully created !
                        </center>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={this.toggle}
                          href="/admin/create-project"
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </CardFooter>
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

export default CreateProject;
