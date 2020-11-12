import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import green from "@material-ui/core/colors/green";
import ListItemText from "@material-ui/core/ListItemText";
import AnnouncementIcon from "@material-ui/icons/Announcement";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const news = [
  "Carrito de compras mejorado",
  "Nuevo dashboard",
  "Nuevo diseño para manejo de Stock",
];

export default function TodoList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
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
