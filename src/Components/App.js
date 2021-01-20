import { Container, makeStyles, Grid } from "@material-ui/core";
import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";

import ImageUpload from "./ImageUpload";
import PulseLogo from "../resources/PulseLogo.svg";
import background from "../resources/background";
import appstore from "../resources/appstore";
import googleplay from "../resources/googleplay";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

const useStyles = makeStyles(theme => ({
  logo: {
    height: "50px",
    width: "auto"
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 30,
    height: 250,
    backgroundImage: `url(${background})`
  },
  headerText: {
    color: "white",
    fontFamily: "FSAlbert, sans-serif",
    textAlign: "center",
    fontSize: "45px",
    lineHeight: "75px",
    fontWeight: "700",
    textShadow: "none"
  },
  result: {
    padding: 30,
    backgroundColor: "lightGrey",
    fontFamily: "FSAlbert, sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: 1.5,
    borderRadius: 30,
    color: "#ed1b2e"
  },
  videoPlayer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
    width: "100%"
  },
  downloadSection: {
    backgroundColor: "#ed1b2e"
  },
  downloadSectionBigText: {
    color: "#fff",
    fontFamily: "FSAlbert, sans-serif",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: 1.5,
    fontWeight: "700"
  },
  downloadSectionSmallText: {
    marginTop: 10,
    color: "#fff",
    fontFamily: "FSAlbert, sans-serif",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: 1.5
  },
  downloadSectionButton: {
    width: 170
  }
}));

export const api = file => {
  const [prefix, ...base64] = file.split(",");
  return fetch(
    "https://facialanalyticsuat.prudential.com.sg/pulse/oral/oralImage",
    {
      headers: {
        "Content-Type": "application/json",
        api_key: "51b02d6f2faa8c79c70fe58131529e90"
      },
      body: JSON.stringify({
        pulseId: "00099",
        PartnerCode: "the1",
        PartnerUserId: "00098",
        profileId: "R1603888131790973139",
        base64Img: base64.join(""),
        lang: "en_US"
      }),
      method: "POST"
    }
  );
};

export default function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const onImageUpload = image => {
    setLoading(true);
    api(image)
      .then(res => res.json())
      .then(setData)
      .catch(console.warn)
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container component="main" maxWidth="md">
      <a href="https://www.prudential.com.sg/wedopulse">
        <img className={classes.logo} src={PulseLogo} title="Pulse" />
      </a>
      <div className={classes.header}>
        <p className={classes.headerText}>
          Happiness Campaign by Prudential
          <br />
          Smile! And get 2$ on Pulse
        </p>
      </div>
      <div style={{ paddingTop: 30 }}>
        <ImageUpload onImageUpload={onImageUpload} />
      </div>
      <DarkBackground disappear={loading}>
        <LoadingOverlay active={loading} spinner={true} text="Loading ..." />
      </DarkBackground>
      {Object.keys(data).length > 0 && (
        <Grid container direction="column" justify="center" alignItems="center">
          {(data.status === 200 && (
            <p className={classes.result}>
              Congratulations! Try our happiness challenge in Pulse:
              <ul>
                <li>Smile for 15 seconds</li>
                <li>Watch the 4-minute family challenge</li>
                <li>Forward the video to a family member</li>
                <li>Get 2$ for passing the challenge</li>
              </ul>
            </p>
          )) || (
            <p className={classes.result}>
              No selfie smile was detected. Please try again.
            </p>
          )}
        </Grid>
      )}
      <div className={classes.videoPlayer}>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube-nocookie.com/embed/VsojBgHqeg4?controls=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <section id="download-now" className={classes.downloadSection}>
        <Grid container direction="column" justify="center" alignItems="center">
          <h2 className={classes.downloadSectionBigText}>
            Understand your health better today!
            <br />
            Download Now.
          </h2>
          <div class="download">
            <div>
              <a
                href="https://apps.apple.com/sg/app/we-do-pulse/id1498404821"
                target="_blank"
                alt="Download on the App Store"
                title="Download on the App Store"
              >
                <img className={classes.downloadSectionButton} src={appstore} />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.prudential.pulse.onepulse"
                target="_blank"
                alt="Get it on Google Play"
                title="Get it on Google Play"
              >
                <img
                  className={classes.downloadSectionButton}
                  src={googleplay}
                />
              </a>
            </div>
          </div>

          <div className={classes.downloadSectionSmallText}>
            <p>
              Apple, the Apple logo, and iPhone are trademarks of Apple Inc.,
              registered in the U.S. and other countries.
              <br />
              App Store is a service mark of Apple Inc., registered in the U.S.
              and other countries.
              <br />
              Google Play and the Google Play logo are trademarks of Google LLC.
            </p>
          </div>
        </Grid>
      </section>
    </Container>
  );
}
