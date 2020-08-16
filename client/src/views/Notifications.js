import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// react plugin for creating notifications over the dashboard
import NotificationAlert from 'react-notification-alert';

// reactstrap components
import {
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    axios
      .get('http://localhost:5000/notification/retrieve')
      .then((response) => {
        var notifs = response.data;
        var arr = [];
        for (var i = notifs.length - 1; i >= 0; i--) {
          if (user.role !== 'Head' && user.role !== 'CEO') {
            for (var j = 0; j < notifs[i].employees.length; j++)
              // filter meeting notif
              if (notifs[i].employees[j].label === user.fullname) {
                arr.push(notifs[i]);
              }
          }
          // filter feature creation notif
          else if (
            user.role === 'Head' &&
            notifs[i].department === user.department &&
            notifs[i].singleSelect
          ) {
            arr.push(notifs[i]);
          }
          // filter project sent to methods notif
          else if (
            user.role === 'Head' &&
            notifs[i].receiveddepartment === user.department &&
            notifs[i].receiveddepartment === 'Methods'
          ) {
            arr.push(notifs[i]);
          }
          // filter project sent to IT notif
          else if (
            user.role === 'Head' &&
            notifs[i].receiveddepartment === user.department &&
            notifs[i].receiveddepartment === 'IT'
          ) {
            arr.push(notifs[i]);
          }
          // filter project sent to CEO notif
          else if (
            user.role === 'CEO' &&
            notifs[i].receiveddepartment === 'CEO'
          ) {
            arr.push(notifs[i]);
          }
          // filter feature declined by CEO notif
          else if (
            user.department === 'IT' &&
            notifs[i].featureStatus === 'Finished' &&
            notifs[i].sentdepartment === 'CEO'
          ) {
            arr.push(notifs[i]);
          }
          // filter project creation notif
          else if (
            user.role === 'Head' &&
            notifs[i].department === user.department
          ) {
            arr.push(notifs[i]);
          }
        }
        this.setState({ notifs: arr });
      });
  }

  notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = 'primary';
        break;
      case 2:
        type = 'success';
        break;
      case 3:
        type = 'danger';
        break;
      case 4:
        type = 'warning';
        break;
      case 5:
        type = 'info';
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: 'tim-icons icon-bell-55',
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  render() {
    console.log(this.state.notifs);
    var notification = this.state.notifs.map((notif) => {
      if (notif.employees.length !== 0) {
        return (
          <UncontrolledAlert className="alert-with-icon" color="info">
            <span className="tim-icons icon-bell-55" data-notify="icon" />
            <span data-notify="message">
              New message : you have a new meeting entitled {notif.subject} at{' '}
              {notif.date} from the head of your department
            </span>
          </UncontrolledAlert>
        );
      } else if (notif.status) {
        return (
          <UncontrolledAlert className="alert-with-icon" color="info">
            <span className="tim-icons icon-bell-55" data-notify="icon" />
            <span data-notify="message">
              New message : You have received a new project entitled{' '}
              {notif.title} {notif.progress}
            </span>
          </UncontrolledAlert>
        );
      } else if (notif.featureStatus === 'Finished') {
        return (
          <UncontrolledAlert className="alert-with-icon" color="info">
            <span className="tim-icons icon-bell-55" data-notify="icon" />
            <span data-notify="message">
              New message : Your feature has been declined by CEO
            </span>
          </UncontrolledAlert>
        );
      } else if (notif.singleSelect) {
        return (
          <UncontrolledAlert className="alert-with-icon" color="info">
            <span className="tim-icons icon-bell-55" data-notify="icon" />
            <span data-notify="message">
              New message : You have received a new project entitled{' '}
              {notif.featureTitle} {notif.featureProgress}
            </span>
          </UncontrolledAlert>
        );
      } else if (notif.receiveddepartment && notif.sentdepartment !== 'CEO') {
        return (
          <UncontrolledAlert className="alert-with-icon" color="info">
            <span className="tim-icons icon-bell-55" data-notify="icon" />
            <span data-notify="message">
              New message : You have received a new feature from{' '}
              {notif.sentdepartment} department entitled {notif.featureTitle}
            </span>
          </UncontrolledAlert>
        );
      } else if (notif.receiveddepartment) {
        return (
          <UncontrolledAlert className="alert-with-icon" color="info">
            <span className="tim-icons icon-bell-55" data-notify="icon" />
            <span data-notify="message">
              New message : You have received a new feature from{' '}
              {notif.sentdepartment} entitled {notif.featureTitle}
            </span>
          </UncontrolledAlert>
        );
      }
    });
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="10">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Notifications</CardTitle>
                </CardHeader>
                <CardBody>{notification}</CardBody>
              </Card>
            </Col>
            {/* <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Notification states</CardTitle>
                </CardHeader>
                <CardBody>
                  <UncontrolledAlert color="primary">
                    <span>
                      <b>Primary - </b>
                      This is a regular notification made with ".alert-primary"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="info">
                    <span>
                      <b>Info - </b>
                      This is a regular notification made with ".alert-info"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="success">
                    <span>
                      <b>Success - </b>
                      This is a regular notification made with ".alert-success"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="warning">
                    <span>
                      <b>Warning - </b>
                      This is a regular notification made with ".alert-warning"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="danger">
                    <span>
                      <b>Danger - </b>
                      This is a regular notification made with ".alert-danger"
                    </span>
                  </UncontrolledAlert>
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <div className="places-buttons">
                    <Row>
                      <Col className="ml-auto mr-auto text-center" md="6">
                        <CardTitle tag="h4">
                          Notifications Places<p className="category">
                            Click to view notifications
                          </p>
                        </CardTitle>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" lg="8">
                        <Row>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tl")}
                            >
                              Top Left
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tc")}
                            >
                              Top Center
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tr")}
                            >
                              Top Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" lg="8">
                        <Row>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("bl")}
                            >
                              Bottom Left
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("bc")}
                            >
                              Bottom Center
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("br")}
                            >
                              Bottom Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>
      </>
    );
  }
}

export default Notifications;
