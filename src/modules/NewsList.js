import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import green from "@mui/material/colors/green";
import ListItemText from "@mui/material/ListItemText";
import AnnouncementIcon from "@mui/icons-material/Announcement";

/* const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
})); */

const news = [
  "Nuevo sistema de carrito",
  "Nuevo sistema de login (API v2)",
  "Mostrar descuentos en cotizaciónes",
  "Carrito de compras mejorado",
  "Nuevo dashboard",
  "Nuevo diseño para manejo de Stock",
];

export default function TodoList() {
  return (
    <List /* className={classes.root} */>
      {news.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button>
            <ListItemIcon>
              <AnnouncementIcon style={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
      })}
    </List>
  );
}
