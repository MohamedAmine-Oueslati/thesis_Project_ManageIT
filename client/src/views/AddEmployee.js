import React from 'react';
import axios from 'axios';
import Select from 'react-select';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  // CardImg,
  CardTitle,
  // Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class AddEmployee extends React.Component {
  state = {
    RegisterInformations: {
      department: '',
      fullname: '',
      email: '',
      password: '',
      role: 'Employee',
    },
    departmentError: '',
    fullnameError: '',
    emailError: '',
    passwordError: '',
    modal: false,
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  componentDidMount() {
    document.body.classList.toggle('register-page');
  }
  componentWillUnmount() {
    document.body.classList.toggle('register-page');
  }

  handleChangeSelect = (e) => {
    const RegisterInformations = { ...this.state.RegisterInformations };
    RegisterInformations.department = e.value;
    this.setState({ RegisterInformations });
  };

  handleChange = ({ currentTarget: input }) => {
    const RegisterInformations = { ...this.state.RegisterInformations };
    RegisterInformations[input.name] = input.value;
    this.setState({ RegisterInformations });
  };

  handleSubmit = (e) => {
    // var isValid = this.validate();
    // if (isValid) {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
    console.log(this.state.RegisterInformations);
    axios
      .post('http://localhost:5000/users', this.state.RegisterInformations)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log('Error', err));
    // }
  };

  validate = () => {
    let departmentError = '';
    let fullnameError = '';
    let emailError = '';
    let passwordError = '';
    if (!this.state.RegisterInformations.department) {
      departmentError = 'you need to choose a department';
    }
    if (this.state.RegisterInformations.fullname.length < 6) {
      fullnameError = 'invalid fullName';
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.state.RegisterInformations.email
      )
    ) {
      emailError = 'invalid or existing email';
    }
    if (
      !this.state.RegisterInformations.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      )
    ) {
      passwordError = 'invalid password';
    }
    if (departmentError || fullnameError || emailError || passwordError) {
      this.setState({
        departmentError,
        fullnameError,
        emailError,
        passwordError,
      });
      return false;
    }
    return true;
  };

  render() {
    const { RegisterInformations } = this.state;
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
          <Container>
            {/* <Row> */}
            {/* <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-wifi" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Marketing</h3>
                    <p className="description">
                      We've created the marketing campaign of the website. It
                      was a very interesting collaboration.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Fully Coded in HTML5</h3>
                    <p className="description">
                      We've developed the website with HTML5 and CSS3. The
                      client has access to the code using GitHub.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-trophy" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Built Audience</h3>
                    <p className="description">
                      There is also a Fully Customizable CMS Admin Dashboard for
                      this product.
                    </p>
                  </div>
                </div>
              </Col> */}

            <Col className="mr-auto" lg="8" md="6">
              <Form className="form">
                <Card className="card-register card-white">
                  <CardHeader>
                    <img alt="..." src={require('./card-primary.png')} />
                    <CardTitle tag="h1">Add a New Employee</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="10" md="10" sm="3">
                        <FormGroup>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Choose Department"
                            name="department"
                            id="department"
                            value={this.state.department}
                            onChange={this.handleChangeSelect}
                            options={[
                              {
                                value: 'Financial',
                                label: 'financial Department',
                              },
                              {
                                value: 'Accounting',
                                label: 'Accounting Department',
                              },
                              {
                                value: 'Marketing',
                                label: 'Marketing Department',
                              },
                              {
                                value: 'Human Ressources',
                                label: 'Human Ressources Department',
                              },
                              { value: 'Methods', label: 'Methods Department' },
                              { value: 'IT', label: 'IT Department' },
                            ]}
                          />
                          <div style={{ fontSize: 12, color: 'red' }}>
                            {this.state.departmentError}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Fullname"
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={RegisterInformations.fullname}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.fullnameError}
                    </div>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        id="email"
                        value={RegisterInformations.email}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.emailError}
                    </div>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        value={RegisterInformations.password}
                        onChange={this.handleChange}
                      />
                      <br />
                    </InputGroup>
                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.passwordError}
                    </div>
                    {/* <FormGroup check className="text-left">
                      <Label check>
                        <Input type="checkbox" />
                        <span className="form-check-sign" />I agree to the{' '}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          terms and conditions
                        </a>
                        .
                      </Label>
                    </FormGroup> */}
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="primary"
                      href="#pablo"
                      onClick={this.handleSubmit}
                      size="lg"
                    >
                      Confirm
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
                            <img
                              src="https://images.assetsdelivery.com/compings_v2/alonastep/alonastep1605/alonastep160500181.jpg"
                              alt="logo"
                              width="200px"
                            />
                            <br />
                        Employee has been successfully added !
                      </center>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="secondary"
                            onClick={this.toggle}
                            href="/admin/AddEmployee"
                          >
                            Close
                      </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
            {/* </Row> */}
          </Container>
        </div>
      </>
    );
  }
}

export default AddEmployee;
