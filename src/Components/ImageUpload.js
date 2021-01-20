// imports the React Javascript Library
import React, { useState } from "react";
//Card
import { Button, Grid } from "@material-ui/core";
import face from "../resources/face";

//Tabs
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imageBox: {
    height: 100,
    margin: 20,
    width: 100,
    borderRadius: "50%",
    boxShadow: "0 0 5px red",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    backgroundSize: "60%",
    backgroundColor: "#fff"
  },
  imageBox2: {
    height: "100%",
    width: "100%",
    background: "#fff",
    borderRadius: "50%",
    overflow: "hidden"
  },
  imageBox3: {
    width: "100%"
  },
  button: {
    borderRadius: 25,
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    display: "none"
  }
}));

export default function ImageUploadCard({ onImageUpload }) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadClick = event => {
    var file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(e) {
      setSelectedImage(reader.result);
      onImageUpload(reader.result);
    }.bind(this);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <div className={classes.imageBox}>
          <div className={classes.imageBox2}>
            <img className={classes.imageBox3} src={selectedImage ?? face} />
          </div>
        </div>
      </Grid>
      <Grid item>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="contained-button-file">
          <Button
            component="span"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            SUBMIT a selfie
          </Button>
        </label>
      </Grid>
    </Grid>
  );
}
