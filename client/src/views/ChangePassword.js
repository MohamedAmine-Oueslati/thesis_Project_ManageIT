import React from 'react';
// import Select from 'react-select';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// import { InvalidatedProjectKind } from 'typescript';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleSelect: '',
      projects: [],
      modal: false,
      profileInformations: '',
      newCredentials: {
        existingPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      titleError: '',
      descriptionError: '',
      deadlineError: '',
      singleSelectError: '',
    };
  }

  handleChange = ({ currentTarget: input }) => {
    const newCredentials = { ...this.state.newCredentials };
    newCredentials[input.name] = input.value;

    this.setState({ newCredentials });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .patch(
        `http://localhost:5000/users/changepassword/${user._id}`,
        this.state.newCredentials
      )
      .then((response) => {
        this.setState({ modal: !this.state.modal });
        console.log(response.data);
      })
      .catch((err) => console.log('Error', err));
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .get(`http://localhost:5000/users/${user._id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          profileInformations: response.data[0],
        });
      })
      .catch((err) => console.log('Error', err));
  }

  render() {
    const defaultImageURL =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjGSxm1_lBkpyvSzWDPI9EPOmlwLCtxD0B_g&usqp=CAU';
    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={this.toggle}
      >
        &times;
      </button>
    );

    const { newCredentials, profileInformations } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Change Password</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Existing Password</label>
                          <Input
                            placeholder="Enter your actual password"
                            type="text"
                            value={newCredentials.existingPassword}
                            onChange={this.handleChange}
                            name="existingPassword"
                          />
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.titleError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>New Password</label>
                          <Input
                            placeholder="Enter your new password"
                            type="password"
                            value={newCredentials.newPassword}
                            onChange={this.handleChange}
                            name="newPassword"
                          />
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.titleError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Confirm New Password</label>
                          <Input
                            placeholder="Confirm your new password"
                            type="text"
                            value={newCredentials.confirmNewPassword}
                            onChange={this.handleChange}
                            name="confirmNewPassword"
                          />
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.titleError}
                          </div>
                        </FormGroup>
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
                            width="200px"
                          />
                          <br />
                          Project has been successfully updated !
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

export default ChangePassword;
