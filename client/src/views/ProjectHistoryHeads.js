import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ProjectInfoHeads from './ProjectInfoHeads.js';
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

class ProjectHistoryHeads extends React.Component {
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
  componentDidMount() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .get(
        `http://localhost:5000/project/projectsByDepartment/${user.department}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ projects: response.data });
      });

    //get the the list of projects by user
    axios.get('http://localhost:5000/users').then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });
  }

  handleInfo = (id) => {
    // console.log(id);
    this.setState({ currentIndex: id, view: 'true' });
  };

  // handleSubmit(i) {
  //   // e.preventDefault();
  //   axios
  //     .post('http://localhost:5000/project/index', { index: i })
  //     .then((response) => {
  //       console.log(response.data);
  //       window.location = '/admin/project-info-heads';
  //     });
  //   // .catch((err) => console.log('Error', err));
  // }

  render() {
    var ProjectHistory = this.state.projects.map((project) => {
      return (
        <tr key={project._id}>
          <td>{project.title}</td>
          <td>{this.findUser(project.user)}</td>
          <td>{project.deadline.slice(0, 10)}</td>
          <th>{project.status}</th>
          <th>{project.progress}</th>
          <td className="text-center">
            <Button
              onClick={() => this.handleInfo(project._id)}
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
      return <ProjectInfoHeads currentIndex={this.state.currentIndex} />;
    }
  }
}

export default ProjectHistoryHeads;
