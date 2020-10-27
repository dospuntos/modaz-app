import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Categories({ categories, prodCats, handleChange }) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  /* const handleChange = (event) => {
    setPersonName(event.target.value);
  }; */

  useEffect(() => {
    setPersonName(prodCats);
  }, [prodCats]);

  function getCategoryName(id) {
    let categoryName = categories.find((data) => data.id === String(id))?.title;
    return categoryName !== undefined ? categoryName : false;
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="categories">Categorías</InputLabel>
        <Select
          labelId="categories"
          multiple
          value={personName}
          onChange={(event) => handleChange(event.target.value)}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value, key) => (
                <Chip
                  key={key}
                  label={getCategoryName(value)}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((cat) => (
            <MenuItem
              key={cat.id}
              value={cat.id}
              style={getStyles(cat.title, personName, theme)}
            >
              {cat.title} ({cat.path})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
