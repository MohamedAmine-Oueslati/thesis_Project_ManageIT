import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// reactstrap components
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
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  CustomInput,
} from 'reactstrap';

class UserProfile extends React.Component {
  state = {
    profileInformations: '',
    modal: false,
    selectedFile: null,
    newInfos: {
      position: '',
      address: '',
      city: '',
      postalCode: '',
      aboutMe: '',
      profileImageURL: '',
    },
  };

  handleSave = () => {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .patch(`http://localhost:5000/users/${user._id}`, this.state.newInfos)
      .then((response) => {
        this.setState({ modal: !this.state.modal });
        console.log(response.data);
      })
      .catch((err) => console.log('Error', err));
  };

  handleChange = ({ currentTarget: input }) => {
    const newInfos = { ...this.state.newInfos };
    newInfos[input.name] = input.value;

    this.setState({ newInfos });
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
    if (this.state.selectedFile) {
      const newInfos = { ...this.state.newInfos };
      const data = new FormData();
      data.append('file', this.state.selectedFile);
      axios
        .post('http://localhost:5000/upload-images/', data, {
          // receive two    parameter endpoint url ,form data
        })
        .then((response) => {
          newInfos.profileImageURL = response.data.data[0].url;
          // then print response status
          console.log(response.data.data[0].url);
          this.setState({ newInfos });
        });
    }
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
    const { profileInformations } = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
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

                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Fullname</label>
                          <Input
                            defaultValue={profileInformations.fullname}
                            placeholder="Fullname"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                            defaultValue={profileInformations.email}
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Position</label>
                          <Input
                            defaultValue={profileInformations.position}
                            placeholder="Position"
                            type="text"
                            name="position"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue={profileInformations.address}
                            placeholder="Home Address"
                            type="text"
                            name="address"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue={profileInformations.city}
                            placeholder="City"
                            type="text"
                            name="city"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input
                            placeholder="ZIP Code"
                            type="number"
                            defaultValue={profileInformations.postalCode}
                            name="postalCode"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="10" md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue={profileInformations.aboutMe}
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                            name="aboutMe"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <Label for="exampleFile">
                            Change Your Profile Picture :
                          </Label>
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
                          Submit Picture
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSave}
                  >
                    Save
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
                            alt="profilephoto" width="200px"
                          />
                          <br />
                          Profile has been successfully updated !
                        </center>
                      </ModalBody>
                      <ModalFooter>
                        {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                        <Button
                          color="secondary"
                          onClick={this.toggle}
                          href="/admin/user-profile"
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

export default UserProfile;
