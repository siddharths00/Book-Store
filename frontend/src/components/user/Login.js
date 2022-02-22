import React, { useState } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../main/Header';


const theme = createTheme();

export default function Login() {

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
                    if (error.response) {
                        setErrors(`Status code-${error.response.status}    ${error.response.data.msg}`);
                    }
                    else {
                        localStorage.setItem('firstLogin', true)

                        window.location.href = "/";
                    }
                })


        } catch (err) {
            console.log(user, err)
        }
    }


    return (
        <div>
            <Header />
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
                            {errors.length === 0 ? null : <Alert severity="error">{errors}</Alert>}
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
                                helperText="hulo"
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