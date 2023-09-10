import { useStickyState } from "hooks";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const tasks = [
  "Include users name in quotes when available",
  "Fix bug when pressing enter in product edit",
  "Switch from useState to useReducer for cart",
  "Create product",
  "Duplicate product (and create an empty variant)",
  "Add filtered items to cart (empty cart first?)",
  "Support multiple images (JSON-encode images)",
  "Fix editing and deleting items with same name from cart",
  "Handle categories",
  "Filter by category",
  "Implement material-ui",
  "Filter by product size",
  "Create new variant",
  "Search, add and reduce by UPC",
  "Update order state",
  "Deleting product also removes variants",
  "Different API URL for staging and deployed app",
  "Select fields to display in print view",
  "Print PDF",
];

export default function TodoList() {
  const classes = useStyles();
  const [checked, setChecked] = useStickyState([0], "todolist");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {tasks.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
