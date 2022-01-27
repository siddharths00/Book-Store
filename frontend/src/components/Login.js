import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '@mui/material/Alert';


// function Login() {
//     const [user, setUser] = useState({
//         email: '', password: ''
//     });

//     const [errors, setErrors] = useState('');

//     const onChangeInput = e => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value })
//     }

//     const loginSubmit = async e => {
//         e.preventDefault()
//         try {
//             await axios.post('/user/login', { ...user }, {withCredentials: true})
//                 .then(() => {
//                     localStorage.setItem('firstLogin', true)
//                     window.location.href = "/";
//                 })
//                 .catch(function (error) {
//                     console.log("hello");
//                     if (error.response) {
//                         // The request was made and the server responded with a status code
//                         // that falls out of the range of 2xx
//                         console.log(error.response.data);
//                         console.log(error.response.status);
//                         setErrors(`${error.response.data.msg}-${error.response.status}`);
//                         // console.log("hello",errors);

//                         //   console.log(error.response.headers);
//                     }
//                     // else if (error.request) {
//                     //     // The request was made but no response was received
//                     //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                     //     // http.ClientRequest in node.js
//                     //     console.log(error.request);
//                     // } 
//                     else {
//                         // Something happened in setting up the request that triggered an Error
//                         // console.log('Error', error.message);
//                         localStorage.setItem('firstLogin', true)

//                         window.location.href = "/";
//                     }
//                     // console.log(error.config);
//                 })


//         } catch (err) {
//             console.log(user, err)
//         }
//     }

//     let anyError = "yo";
//     // useEffect(()=>{
//     //     anyError=`${errors.msg}-${errors.status}`;
//     //     // anyError="HELLO";
//     //     // console.log(errors);
//     // }, [errors]);

//     return (
//         <div className="login-page col-4 mt-5" >
//             <form>

//                 <p className="error"> {errors} </p>
//                 <h2>Login</h2>
//                 <input type="email" name="email" required
//                     placeholder="Email" value={user.email} onChange={onChangeInput} />

//                 <input type="password" name="password" required autoComplete="on"
//                     placeholder="Password" value={user.password} onChange={onChangeInput} />

//                 <div className="row">
//                     <button onClick={loginSubmit}>Login</button>
//                     <Link to="/register">Register</Link>
//                 </div>
//             </form>

//         </div>
//     )
// }

// export default Login











// // import Form from "react-bootstrap/Form";
// // import Button from "react-bootstrap/Button";
// // import "./Login.css";

// // export default function Login() {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");

// //     function validateForm() {
// //         return email.length > 0 && password.length > 0;
// //     }

// //     function handleSubmit(event) {
// //         event.preventDefault();
// //     }

// //     return (
// //         <div className="Login">
// //             <Form onSubmit={handleSubmit}>
// //                 <Form.Group size="lg" controlId="email">
// //                     <Form.Label>Email</Form.Label>
// //                     <Form.Control
// //                         autoFocus
// //                         type="email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                     />
// //                 </Form.Group>
// //                 <Form.Group size="lg" controlId="password">
// //                     <Form.Label>Password</Form.Label>
// //                     <Form.Control
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                     />
// //                 </Form.Group>
// //                 <Button block size="lg" type="submit" disabled={!validateForm()}>
// //                     Login
// //                 </Button>
// //             </Form>
// //         </div>
// //     );
// // }




// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';


const theme = createTheme();

export default function Login() {
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     // eslint-disable-next-line no-console
    //     console.log({
    //       email: data.get('email'),
    //       password: data.get('password'),
    //     });
    //   };


    const [user, setUser] = useState({
        email: '', password: ''
    });

    const [errors, setErrors] = useState('');

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user }, { withCredentials: true })
                .then(() => {
                    localStorage.setItem('firstLogin', true)
                    window.location.href = "/";
                })
                .catch(function (error) {
                    console.log("hello");
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        setErrors(`Status code-${error.response.status}    ${error.response.data.msg}`);
                        // console.log("hello",errors);

                        //   console.log(error.response.headers);
                    }
                    // else if (error.request) {
                    //     // The request was made but no response was received
                    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    //     // http.ClientRequest in node.js
                    //     console.log(error.request);
                    // } 
                    else {
                        // Something happened in setting up the request that triggered an Error
                        // console.log('Error', error.message);
                        localStorage.setItem('firstLogin', true)

                        window.location.href = "/";
                    }
                    // console.log(error.config);
                })


        } catch (err) {
            console.log(user, err)
        }
    }


    return (
        <div>
            <Header/>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                        {errors.length == 0 ? null : <Alert severity="error">{errors}</Alert>}
                    </Typography>
                    <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={user.email}
                            onChange={onChangeInput}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={onChangeInput}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </div>
    );
}