import { useState } from "react";
import { loginUser } from "api/usersApi";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

function ShowAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://modaz.net">
        Moda Z
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//const defaultTheme = createTheme();

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/1600x900/?colors)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              loginUser({
                username,
                password,
              }).then((response) => {
                response?.success
                  ? setToken(response)
                  : setErrors(response.messages);
              });
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Ingresar
            </Button>
            {errors.length > 0 &&
              errors.map((error, index) => {
                return (
                  <ShowAlert key={index} severity="error">
                    {error}
                  </ShowAlert>
                );
              })}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
