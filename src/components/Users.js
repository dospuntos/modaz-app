import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { getUsers } from "api/usersApi";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Gravatar from "modules/Gravatar";

const columns = [
  { id: "icon", label: "", minWidth: 50 },
  { id: "name", label: "Nombre", minWidth: 180 },
  {
    id: "username",
    label: "Usuario",
    minWidth: 170,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    // Get users
    getUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* Filter by search */
  let filteredUsers = users;
  filteredUsers = filteredUsers.filter((eachItem) => {
    return (
      eachItem["name"].toLowerCase().includes(searchText.toLowerCase()) ||
      eachItem["username"].toLowerCase().includes(searchText.toLowerCase()) ||
      eachItem["email"].toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography variant="h3">Usuarios</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Mostrando {filteredUsers.length} de {users.length} usuarios en el
            sistema.
          </Typography>
        </Grid>

        <Grid item xs={6} style={{ textAlign: "right" }}>
          <TextField
            label="Buscar usuario"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>
                        <Gravatar email={row.email} />
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/users/${row.id}`}
                          style={{ textTransform: "capitalize" }}
                        >
                          {row.name} ({row.id})
                        </Link>
                      </TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>
                        <a href={`mailto:${row.email}`}>{row.email}</a>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
