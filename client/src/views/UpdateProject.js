import React from 'react';
// import Select from 'react-select';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
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

class UpdateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleSelect: '',
      projects: [],
      modal: false,
      profileInformations: '',
      newFeature: {
        featureCreator: '',
        featureTitle: '',
        featureDescription: '',
        featureDeadline: '',
        featureStatus: '',
        featureProgress: '',
      },
      titleError: '',
      descriptionError: '',
      deadlineError: '',
      singleSelectError: '',
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChange = ({ currentTarget: input }) => {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    const newFeature = { ...this.state.newFeature };
    newFeature.featureCreator = user._id;
    newFeature[input.name] = input.value;
    switch (user.role) {
      case 'Employee':
        newFeature.featureStatus = 'Created';
        newFeature.featureProgress = `Created by ${this.state.profileInformations.fullname}`;
        break;
      case 'Head':
        newFeature.featureStatus = 'Created';
        newFeature.featureProgress = `Created by ${this.state.profileInformations.department} Head`;
        break;
    }
    this.setState({ newFeature });
  };

  handleSubmit = (e) => {
    var isValid = this.validate();
    if (isValid) {
      e.preventDefault();
      this.setState({ modal: !this.state.modal });
      console.log(this.state.singleSelect);
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      axios
        .patch(
          `http://localhost:5000/project/create/${this.state.singleSelect}`,
          this.state.newFeature
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.log('Error', err));

      axios
        .post('http://localhost:5000/notification/store', {
          featureCreator: this.state.newFeature.featureCreator,
          featureTitle: this.state.newFeature.featureTitle,
          featureDeadline: this.state.newFeature.featureDeadline,
          featureStatus: this.state.newFeature.featureStatus,
          featureProgress: this.state.newFeature.featureProgress,
          singleSelect: this.state.singleSelect,
          fullname: user.fullname,
          department: user.department,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.log('Error', err));
    }
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    // switch (user.role) {
    //   case 'Employee':
    //     this.state.featureStatus =
    //       'Created by ' + user.department + ' Employee';
    //     break;
    //   case 'Head':
    //     this.state.featureStatus = 'Created by ' + user.department + ' Head';
    //     break;
    // }
    //getting user department
    axios
      .get(`http://localhost:5000/users/${user._id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          profileInformations: response.data[0],
        });
      })
      .catch((err) => console.log('Error', err));

    // ---------------------------
    //getting user projects by department
    axios
      .get(
        `http://localhost:5000/project/update/projectsByDepartment/${user.department}`
      )
      .then((response) => {
        // console.log(response.data);
        this.setState({ projects: response.data });
      });
  }

  validate = () => {
    let singleSelectError = '';
    let titleError = '';
    let descriptionError = '';
    let deadlineError = '';
    if (this.state.newFeature.featureTitle.length < 6) {
      titleError = 'invalid title';
    }
    if (this.state.newFeature.featureDescription.length < 16) {
      descriptionError = 'invalid description';
    }
    if (!this.state.newFeature.featureDeadline) {
      deadlineError = 'you need to set a deadline';
    }
    if (!this.state.singleSelect) {
      singleSelectError = 'you need to choose a project';
    }
    if (titleError || descriptionError || deadlineError || singleSelectError) {
      this.setState({
        titleError,
        descriptionError,
        deadlineError,
        singleSelectError,
      });
      return false;
    }
    return true;
  };

  render() {
    const defaultImageURL =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjGSxm1_lBkpyvSzWDPI9EPOmlwLCtxD0B_g&usqp=CAU';
    const { newFeature } = this.state;
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
    var options = this.state.projects.map((project, key) => {
      return (
        <option key={key} value={project.title}>
          {project.title}
        </option>
      );
    });
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Add a New Feature</h5>
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
                      <Col lg="6" md="6" sm="3" className="pr-md-1">
                        <FormGroup>
                          <Label for="singleSelect">
                            Choose an Existing Project :
                          </Label>
                          <Input
                            type="select"
                            name="singleSelect"
                            onChange={(e) => {
                              this.setState({
                                singleSelect: e.currentTarget.value,
                              });
                            }}
                            id="inputSelect"
                            required
                          >
                            <option selected="selected" disabled>
                              Choose a Project
                            </option>
                            {options}
                          </Input>
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.singleSelectError}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Feature Title</label>
                          <Input
                            placeholder="Enter the feature title"
                            type="text"
                            value={newFeature.featureTitle}
                            onChange={this.handleChange}
                            name="featureTitle"
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
                          <label>Feature Description</label>
                          <Input
                            cols="100"
                            id="inputDescription"
                            placeholder="Here can be your description"
                            rows="10"
                            type="textarea"
                            value={newFeature.featureDescription}
                            onChange={this.handleChange}
                            name="featureDescription"
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
                              <Label for="exampleDate">Do it before :</Label>
                              <Input
                                type="date"
                                name="featureDeadline"
                                id="inputDate"
                                placeholder="date placeholder"
                                min="2020-08-08"
                                value={newFeature.featureDeadline}
                                onChange={this.handleChange}
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
                            alt="logo"
                            width="200px"
                          />
                          <br />
                          Feature has been successfully added !
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

export default UpdateProject;
