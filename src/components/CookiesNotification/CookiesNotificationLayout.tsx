import React from "react";
import CookieBanner from "react-cookie-banner";

export const CookiesNotificationLayout = () => {
  return (
    <CookieBanner
      message="Yes, we use cookies. If you don't like it change website, we won't miss you!"
      onAccept={() => {}}
      cookie="user-has-accepted-cookies"
    />
  );
};
