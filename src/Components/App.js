import { Container, makeStyles, Typography } from "@material-ui/core";
import PulseLogo from "../resources/PulseLogo.svg";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: "100%" // Fix IE 11 issue.
  }
}));

export const api = file => {
  const formData = new FormData();
  formData.append("image", file);
  return fetch(
    "https://facialanalyticsuat.prudential.com.sg/pulse/oral/oralImage",
    {
      headers: {
        "Content-Type": "application/json",
        api_key: "aicoe_test_token"
      },
      body: { base64Img: file },
      method: "POST"
    }
  );
};

export default function App() {
  const classes = useStyles();

  const onImageUpload = image => {};
  const reset = () => {
    setOpen(false);
    // window.location.reload(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img
          src={PulseLogo}
          alt="Pulse by Prudential"
          className={classes.logo}
        />
        <Typography component="h1" variant="h5">
          Smile and take a photo today!
        </Typography>
        <ImageUpload onImageUpload={onImageUpload} />
      </div>
    </Container>
  );
}
