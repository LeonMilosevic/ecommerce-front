import React from "react";
// import icon
import { FaFacebook } from "react-icons/fa";
// import helpers
import { oauthFacebook, authenticate } from "../auth/index";
import FacebookLogin from "react-facebook-login";

const Facebook = () => {
  const responseFacebook = response => {
    oauthFacebook({ access_token: response.accessToken }).then(data => {
      authenticate(data, () => {
        window.location.reload();
      });
    });
  };

  let fbContent;

  fbContent = (
    <FacebookLogin
      appId="399376367617802"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon={<FaFacebook className="mr-2" />}
      cssClass="my-facebook-button my-2"
      textButton="Sign in with facebook"
    />
  );

  return <div>{fbContent}</div>;
};

export default Facebook;
