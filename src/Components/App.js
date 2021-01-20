import { Container, makeStyles, Grid } from "@material-ui/core";
import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";

import ImageUpload from "./ImageUpload";
import PulseLogo from "../resources/PulseLogo.svg";
import background from "../resources/background";
import appstore from "../resources/appstore";
import googleplay from "../resources/googleplay";
import smartphone from "../resources/smartphone";

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
  bannerText: {
    marginLeft: "20%",
    marginRight: "20%",
    fontFamily: 'FSAlbert, sans-serif',
    position: 'relative',
    textAlign: "center",
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '26px',
    background: '#fff',
    color: '#687379'
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 30,
    backgroundImage: `url(${background})`
  },
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    color: "white",
    fontFamily: "FSAlbert, sans-serif",
    textAlign: "center",
    fontSize: "40px",
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
    padding: 25,
    backgroundColor: "#ed1b2e"
  },
  downloadSectionBigText: {
    color: "#fff",
    fontFamily: "FSAlbert, sans-serif",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "35px",
    lineHeight: 1.5,
    fontWeight: "700"
  },
  downloadSectionSmallText: {
    marginTop: 10,
    color: "#fff",
    fontFamily: "FSAlbert, sans-serif",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "10px",
    lineHeight: 1.5
  },
  downloadSectionButton: {
    width: 150
  },
  footer: {
    fontSize: "12px",
    display: "flex",
    flexWrap: "nowrap",
    "-webkit-box-pack": "justify",
    justifyContent: "space-between",
    color: "rgb(132, 146, 155) !important",
    background: "rgb(255, 255, 255)",
    padding: "1rem 15px 0px"
  },
  footerTNC: {
    padding: "30px 1rem 10px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "rgb(132, 146, 155)",
    textDecoration: "none"
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
      <a href="https://www.prudential.com.sg/wedopulse" target="_blank">
        <img className={classes.logo} src={PulseLogo} title="Pulse" />
      </a>
      <Grid container direction="column" justify="center" alignItems="center">
        <p className={classes.bannerText}>
          Do you remember when was the last time you SMILE and shared with your loved one?
        </p>
        <img width="70%" src={smartphone} title="Pulse" />
      </Grid>
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
              Congratulations! Try our happiness challenge in&nbsp;
              <a href="#download-now">Pulse</a>:
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
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
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
              <img className={classes.downloadSectionButton} src={googleplay} />
            </a>
          </Grid>

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
      <footer className={classes.footer}>
        <div>
          <a href="https://www.prudential.com.sg/wedopulse" target="_blank">
            <img
              class="footer-logo"
              src="https://www.prudential.com.sg/-/media/Prudential/campaigns/pulse/assets/media/brand2x.png"
              alt="Prudential英國保誠"
              title="Prudential英國保誠"
            />
          </a>
          <p>
            © 2021 Prudential Corporation Asia. <span />
            All Rights Reserved.
          </p>
        </div>
        <div>
          <a
            className={classes.footerTNC}
            href="https://www.prudential.com.sg/wedopulse/tc.aspx"
            target="_blank"
          >
            Terms and Conditions
          </a>
          <a
            className={classes.footerTNC}
            href="https://www.prudential.com.sg/wedopulse/privacy-notice.aspx"
            target="_blank"
          >
            Privacy Notice
          </a>
        </div>
      </footer>
    </Container>
  );
}
