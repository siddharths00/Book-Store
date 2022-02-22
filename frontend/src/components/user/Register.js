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
import Header from '../main/Header';
const theme = createTheme();

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
            alert(err.response.data.msg)
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
                            Sign Up
                            {errors.length === 0 ? null : <Alert severity="error">{errors}</Alert>}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
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