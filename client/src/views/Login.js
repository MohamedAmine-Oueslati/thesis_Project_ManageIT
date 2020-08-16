// import React from 'react';
// import axios from 'axios';
// // import { Link } from "react-router-dom";
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Col,
// } from 'reactstrap';

// class Login extends React.Component {
//   state = { loginInformations: { email: '', password: '' } };

//   componentDidMount() {
//     document.body.classList.toggle('login-page');
//   }
//   componentWillUnmount() {
//     document.body.classList.toggle('login-page');
//   }

//   handleChange = ({ currentTarget: input }) => {
//     const loginInformations = { ...this.state.loginInformations };
//     loginInformations[input.name] = input.value;
//     this.setState({ loginInformations });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       axios
//         .post('http://localhost:5000/auth/', this.state.loginInformations)
//         .then((response) => {
//           console.log(response.data);
//           localStorage.setItem('token', response.data);
//           window.location = '/admin/user-profile';
//         });
//     } catch (ex) {}
//   };

//   render() {
//     const { loginInformations } = this.state;
//     return (
//       <>
//         <div className="content">
//           <Container>
//             <Col className="ml-auto mr-auto" lg="4" md="6">
//               <Form className="form">
//                 <Card className="card-login card-white">
//                   <CardHeader>
//                     <img alt="..." src={require('./card-primary.png')} />
//                     <CardTitle tag="h1">Log in</CardTitle>
//                   </CardHeader>
//                   <CardBody>
//                     <InputGroup>
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="tim-icons icon-email-85" />
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input
//                         placeholder="Email"
//                         type="text"
//                         name="email"
//                         id="email"
//                         value={loginInformations.email}
//                         onChange={this.handleChange}
//                       />
//                     </InputGroup>
//                     <InputGroup>
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="tim-icons icon-lock-circle" />
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input
//                         placeholder="Password"
//                         type="password"
//                         name="password"
//                         id="password"
//                         value={loginInformations.password}
//                         onChange={this.handleChange}
//                       />
//                     </InputGroup>
//                   </CardBody>
//                   <CardFooter>
//                     <Button
//                       block
//                       className="mb-3"
//                       color="primary"
//                       href="#pablo"
//                       onClick={this.handleSubmit}
//                       // href="/admin/dashboard"
//                       // onClick={e => e.preventDefault()}
//                       size="lg"
//                     >
//                       Get Started
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </Form>
//             </Col>
//           </Container>
//         </div>
//       </>
//     );
//   }
// }

// export default Login;
import React from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";
// reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Col,
// } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Login extends React.Component {
  state = {
    loginInformations: {
      email: '',
      password: '',
    },
    userError: ''
  };

  componentDidMount() {
    document.body.classList.toggle('login-page');
  }
  componentWillUnmount() {
    document.body.classList.toggle('login-page');
  }

  handleChange = ({ currentTarget: input }) => {
    const loginInformations = { ...this.state.loginInformations };
    loginInformations[input.name] = input.value;
    this.setState({ loginInformations });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.loginInformations.password !== "AZERTYazerty0000") {
      let userError = 'invalid email or password'
      this.setState({ userError })
    }
    if (this.state.loginInformations.password === "AZERTYazerty0000") {
      let userError = ''
      this.setState({ userError })
    }
    try {
      axios
        .post('http://localhost:5000/auth/', this.state.loginInformations)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('token', response.data);
          window.location = '/admin/user-profile';
        });
    } catch (ex) { }
  };


  classes = () => {
    useStyles();
  };

  render() {
    const { loginInformations } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.classes.paper} style={{ marginTop: '18%' }}>
          <Avatar
            className={this.classes.avatar}
            style={{ backgroundColor: 'red', marginLeft: '45%' }}
          >
            <LockOutlinedIcon />
            {/* <img src='https://files.slack.com/files-pri/TU6783FFV-F018WG0NPND/manageit.png' /> */}
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: 'black',
              marginLeft: '40%',
              marginTop: '3%',
              marginBottom: '3%',
            }}
          >
            Sign in
          </Typography>
          <form className={this.classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={loginInformations.email}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginInformations.password}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
              onClick={this.handleSubmit}
            // href="/admin/dashboard"
            // onClick={e => e.preventDefault()}
            >
              Get Started
            </Button>
          </form>
        </div>
        <div style={{ fontSize: 17, color: 'red', marginLeft: '24%' }}>
          {this.state.userError}
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              ManageIT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default Login;
