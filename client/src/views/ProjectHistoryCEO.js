import React from 'react';
import axios from 'axios';
import ProjectInfoCEO from './ProjectInfoCEO';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from 'reactstrap';

class ProjectHistoryCEO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      users: [],
      currentIndex: '',
      view: 'false',
    };
  }

  findUser = (projectUser) => {
    var user = this.state.users.find((u) => u._id === projectUser);
    if (user) return user.fullname;
  };

  handleInfo = (id) => {
    // console.log(id);
    this.setState({ currentIndex: id, view: 'true' });
  };
  componentDidMount() {
    axios.get('http://localhost:5000/project/ceo/').then((response) => {
      var projects = response.data;
      console.log(projects);
      this.setState({ projects });
    });

    //get the the list of users
    axios.get('http://localhost:5000/users').then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });
  }

  handleSubmit(i) {
    // e.preventDefault();
    axios
      .post('http://localhost:5000/project/index', { index: i })
      .then((response) => {
        console.log(response.data);
        window.location = '/admin/project-Info';
      });
    // .catch((err) => console.log('Error', err));
  }

  render() {
    var ProjectHistory = this.state.projects.map((proj, i) => {
      return (
        <tr key={i}>
          <td>{proj.title}</td>
          <td>{this.findUser(proj.user)}</td>
          <td>{proj.department}</td>
          <td>{proj.deadline.slice(0, 10)}</td>
          <th>{proj.status}</th>
          <th>{proj.progress}</th>
          <td className="text-center">
            <Button
              onClick={() => this.handleInfo(proj._id)}
              color="link"
              id="buttonInfo"
              title=""
              type="button"
            >
              <i className="tim-icons icon-notes" />
            </Button>
          </td>
        </tr>
      );
    });
    if (this.state.view === 'false') {
      return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Project List</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Title</th>
                          <th>Creator</th>
                          <th>Department</th>
                          <th>Do it before</th>
                          <th>Status</th>
                          <th>Progress</th>
                          <th className="text-center">Info</th>
                        </tr>
                      </thead>
                      <tbody>{ProjectHistory}</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    } else {
      return <ProjectInfoCEO currentIndex={this.state.currentIndex} />;
    }
  }
}

export default ProjectHistoryCEO;
