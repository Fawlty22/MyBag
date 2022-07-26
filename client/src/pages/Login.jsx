import * as React from "react";
import { useState } from "react";
import { useStoreContext } from "../utils/GlobalContext";
import { UPDATE_USER } from "../utils/actions";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HeaderSmall from "../components/HeaderSmall";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../utils/theme'
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import Auth from "../utils/auth";

export default function SignIn() {
  const [state, dispatch] = useStoreContext();
  const [loginError, setLoginError] = useState(false);
  const [emptyLineError, setEmptyLineError] = useState(false);
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(false);
    setEmptyLineError(false);

    //invalid email and empty field error triggers
    if (Object.values(formState).includes("")) {
      setEmptyLineError(true);
      return;
    }

    try {
      const mutationResponse = await login({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });

      const { token, user } = mutationResponse.data.login;

      dispatch({
        type: UPDATE_USER,
        payload: { token: token, _id: user._id },
      });

      Auth.login(token);
    } catch (e) {
      setLoginError(true);
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderSmall />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontFamily: "Fredoka One" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {loginError && (
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontFamily: "Fredoka One", mt: 1 }}
              >
                Incorrect Username or Password!
              </Typography>
            )}
            {emptyLineError && (
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontFamily: "Fredoka One", mt: 1 }}
              >
                Please fill out every field!
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontFamily: "Fredoka One" }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ fontFamily: "Fredoka One" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ fontFamily: "Fredoka One" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
