// import React from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col,
//   Label,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
// } from 'reactstrap';

// class RemoveHead extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     role: '',
//     name: '',
//     email: '',
//     message: '',
//     heads: [],
//   };
// }

// getEmployees = (e) => {
//   e.preventDefault();
//   //getting user projects by department
//   axios
//     .get(
//       `http://localhost:5000/users/usersByDepartment/${e.currentTarget.value}`
//     )
//     .then((response) => {
//       console.log(response.data);
//       this.setState({ employees: response.data });
//     });
// };

// getInfos = (e) => {
//   //getting user email
//   axios
//     .get(
//       `http://localhost:5000/users/usersByFullname/${e.currentTarget.value}`
//     )
//     .then((response) => {
//       console.log(response.data);
//       this.setState({
//         email: response.data[0].email,
//       });
//     })
//     .catch((err) => console.log('Error', err));
// };

// onNameChange(event) {
//   this.setState({ name: event.target.value });
// }
// onRoleChoose(event) {
//   this.setState({ role: event.target.value });
// }
// onEmailChange(event) {
//   this.setState({ email: event.target.value });
// }

// onMessageChange(event) {
//   this.setState({ message: event.target.value });
// }

// handleSubmit(e) {
//   e.preventDefault();
//   fetch('http://localhost:5000/deleteEmployee', {
//     method: 'POST',
//     body: JSON.stringify(this.state),
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.status === 'success') {
//         alert('Message Sent.');
//         this.resetForm();
//       } else if (response.status === 'fail') {
//         alert('Message failed to send.');
//       }
//     });
//   this.setState({ role: '', name: '', email: '', message: '' });
// }

//   render() {
// var options = this.state.employees.map((employee, key) => {
//   if (employee.role === 'Employee') {
//     return (
//       <option key={key} value={employee.fullname}>
//         {employee.fullname}
//       </option>
//     );
//   }
// });
//     return (
//       <>
//         <div className="content">
//           <Row>
//             <Col md="8">
//               <Card>
//                 <CardHeader>
//                   <h5 className="title">Remove Head of Department</h5>
//                 </CardHeader>
//                 <CardBody>
//                   <Form>
//                     <Row>
//                       <Col className="pr-md-1" md="10">
//                         <FormGroup>
// <Label for="select">select a department</Label>
// <Input
//   type="select"
//   name="select"
//   id="role"
//   required
//   // value={this.state.role}
//   // onChange={this.onRoleChoose.bind(this)}
//   onChange={this.getEmployees}
// >
//   <option selected="selected" disabled>
//     Choose a department
//   </option>
//   <option>Accounting</option>
//   <option>Financial</option>
//   <option>Marketing</option>
//   <option>Human Ressources</option>
//   <option>Methods</option>
//   <option>IT</option>
// </Input>
//                         </FormGroup>
//                       </Col>
//                     </Row>
// <Row>
//   <Col className="pr-md-1" md="10">
//     <FormGroup>
// <Label for="exampleSelect">Select an employee</Label>
// <Input
//   type="select"
//   name="singleSelect"
//   id="inputSelect"
//   onChange={this.getInfos}
//   required
// >
//   <option selected="selected" disabled>
//     Choose an Employee
//   </option>
//   {options}
// </Input>
//     </FormGroup>
//   </Col>
// </Row>

// <Row>
//   <Col lg="10" md="8">
//     <FormGroup>
//       <label>Message</label>
//       <Input
//         cols="80"
//         placeholder="Message"
//         rows="4"
//         type="textarea"
//         value={this.state.message}
//         onChange={this.onMessageChange.bind(this)}
//       />
//     </FormGroup>
//   </Col>
// </Row>
//                   </Form>
//                 </CardBody>
//                 <CardFooter>
// <Button
//   className="btn-fill"
//   color="primary"
//   type="submit"
//   onClick={this.handleSubmit.bind(this)}
// >
//   Confirm
// </Button>
//                 </CardFooter>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }

// export default RemoveHead;

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
  Label,
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

class RemoveHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      name: '',
      email: '',
      message: '',
      heads: [],
      modal: false,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  getHeads = (e) => {
    console.log(e.currentTarget.value);
    e.preventDefault();
    //getting user projects by department
    axios
      .get(
        `http://localhost:5000/users/usersByDepartment/${e.currentTarget.value}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ heads: response.data });
      });
  };

  getInfos = (e) => {
    //getting user email
    axios
      .get(
        `http://localhost:5000/users/usersByFullname/${e.currentTarget.value}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          email: response.data[0].email,
        });
      })
      .catch((err) => console.log('Error', err));
  };

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onRoleChoose(event) {
    this.setState({ role: event.target.value });
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
    fetch('http://localhost:5000/deleteEmployee', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 'success') {
          alert('Message Sent.');
          this.resetForm();
        } else if (response.status === 'fail') {
          alert('Message failed to send.');
        }
      });
    this.setState({ role: '', name: '', email: '', message: '' });
  }
  render() {
    var options = this.state.heads.map((head, key) => {
      if (head.role === 'Head') {
        return (
          <option key={key} value={head.fullname}>
            {head.fullname}
          </option>
        );
      }
    });
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
            <Col className="mr-auto" lg="8" md="6">
              <Form className="form">
                <Card className="card-register card-white">
                  <CardHeader>
                    <img alt="..." src={require('./card-primary.png')} />
                    <CardTitle tag="h1">Remove Head</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="10" md="10" sm="3">
                        <FormGroup>
                          <Label for="select">select a department</Label>
                          <Input
                            type="select"
                            name="select"
                            id="role"
                            required
                            // value={this.state.role}
                            // onChange={this.onRoleChoose.bind(this)}
                            onChange={this.getHeads}
                          >
                            <option selected="selected" disabled>
                              Choose a department
                            </option>
                            <option>Accounting</option>
                            <option>Financial</option>
                            <option>Marketing</option>
                            <option>Human Ressources</option>
                            <option>Methods</option>
                            <option>IT</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="10" md="10" sm="3">
                        <FormGroup>
                          <Label for="exampleSelect">Select a head</Label>
                          <Input
                            type="select"
                            name="singleSelect"
                            id="inputSelect"
                            onChange={this.getInfos}
                            required
                          >
                            <option selected="selected" disabled>
                              Choose a head
                            </option>
                            {options}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="10" md="8">
                        <FormGroup>
                          <label>Message</label>
                          <Input
                            cols="80"
                            placeholder="Message"
                            rows="4"
                            type="textarea"
                            value={this.state.message}
                            onChange={this.onMessageChange.bind(this)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={this.handleSubmit.bind(this)}
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
                              src="https://fotomelia.com/wp-content/uploads/edd/2015/03/croix-rouge-logo-1560x1548.png"
                              alt="logo"
                              width="200px"
                            />
                            <br />
                        Head has been successfully removed !
                      </center>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="secondary"
                            onClick={this.toggle}
                            href="/admin/RemoveHead"
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

export default RemoveHead;
