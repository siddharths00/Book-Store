import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Header from './Header';
const theme = createTheme();

// import {Redirect} from 'react-router-dom';
// https://www.youtube.com/watch?v=OUP-urBy1k4&ab_channel=ScalableScripts

function Register() {
    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })

    const [errors, setErrors] = useState('');

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user }).then(() => {
                // alert("B");
                localStorage.setItem('firstLogin', true)
                window.location.href = "/";
            })
                .catch(function (error) {
                    // alert("A");
                    // console.log("hello");
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
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
                        // return <Redirect to="/login"/>
                    }
                    // console.log(error.config);
                })


            // localStorage.setItem('firstLogin', true)


            // window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        // <div className="login-page">
        //     <p className="error"> {errors} </p>
        //     <form onSubmit={registerSubmit}>
        //         <h2>Register</h2>
        //         <input type="text" name="name" required
        //         placeholder="Name" value={user.name} onChange={onChangeInput} />

        //         <input type="email" name="email" required
        //         placeholder="Email" value={user.email} onChange={onChangeInput} />

        //         <input type="password" name="password" required autoComplete="on"
        //         placeholder="Password" value={user.password} onChange={onChangeInput} />

        //         <div className="row">
        //             <button type="submit">Register</button>
        //             <Link to="/login">Login</Link>
        //         </div>
        //     </form>
        <div>
            <Header/>
        <ThemeProvider theme={theme}>
            {/* <p className="error"> {errors} </p> */}

            {/* <ErrorMessage name="subject">
                <div style={{ color: 'red' }}>{errors}</div>
            </ErrorMessage> */}
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
                        Sign Up
                        {errors.length==0? null:<Alert severity="error">{errors}</Alert>}
                    </Typography>
                    <Box component="form" onSubmit={registerSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={user.name}
                            onChange={onChangeInput}
                            autoComplete="name"
                            autoFocus
                        />
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
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
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
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </div>
    )
}

export default Register