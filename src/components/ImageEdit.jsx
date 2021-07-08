import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { getAllImages } from "functions";

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
  handleAddImage,
  handleDeleteImage,
}) {
  const classes = useStyles();
  const imgObj = getAllImages(images);

  return (
    <div>
      <h1>Imagenes</h1>
      <p>Haz click en cualquier imágen para volverla imágen principal.</p>
      <p>{JSON.stringify(imgObj)}</p>
      {imgObj.map((item, index) => {
        return (
          <Grid container spacing={1} key={index}>
            <Grid item xs={6} md={1}>
              <img
                style={{ cursor: "pointer" }}
                src={process.env.REACT_APP_PROD_IMG_URL + item.image}
                alt={item.color}
                onClick={() => handleMakeDefaultImage(index)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="filled"
              >
                <InputLabel htmlFor={"image-" + index}>
                  {process.env.REACT_APP_PROD_IMG_URL}
                </InputLabel>
                <FilledInput
                  id={"image-" + index}
                  value={item.image}
                  onChange={(e) =>
                    handleImageChange("image", index, e.target.value)
                  }
                  startAdornment={
                    <InputAdornment position="start">/</InputAdornment>
                  }
                  required
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
                  value={item.color}
                  onChange={(e) =>
                    handleImageChange("color", index, e.target.value)
                  }
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => handleDeleteImage(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Grid container spacing={1}>
        <Grid item xs={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AddToPhotosIcon />}
            onClick={handleAddImage}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
