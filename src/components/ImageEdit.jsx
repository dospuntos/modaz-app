import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "40%",
  },
}));

export default function ImageEdit({
  images,
  handleImageChange,
  handleMakeDefaultImage,
}) {
  const classes = useStyles();
  const imgObj = typeof images !== "undefined" ? JSON.parse(images) : "";

  return (
    <div>
      <h1>Imagenes</h1>
      {Object.keys(imgObj).map((item, index) => {
        return (
          <Grid container spacing={3} key={index}>
            <Grid item xs={12} md={8}>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="filled"
              >
                <InputLabel htmlFor={"image-" + index}>URL</InputLabel>
                <FilledInput
                  id={"image-" + index}
                  value={imgObj[item].image}
                  onChange={(e) =>
                    handleImageChange("image", index, e.target.value)
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      {process.env.REACT_APP_PROD_IMG_URL}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="filled"
              >
                <InputLabel htmlFor={"img-color-" + index}>Color</InputLabel>
                <FilledInput
                  id={"img-color-" + index}
                  value={imgObj[item].color}
                  onChange={(e) =>
                    handleImageChange("color", index, e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              {index !== 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleMakeDefaultImage(index)}
                >
                  ^
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
