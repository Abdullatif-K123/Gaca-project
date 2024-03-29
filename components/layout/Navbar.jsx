import React, { useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import Feedback from "../home/Home-main/Feedback";
import { useRouter } from "next/router";
const Navbar = ({ isFeedbackVisible, handleToggleFeedback, conVersion }) => {
  // creating function menu hamburger
  const [addClass, setAddClass] = useState(false);
  const mobileMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
    setAddClass(!addClass);
  };
  const router = useRouter();
  const path = router.pathname.split("/").pop();

  const aboutPath = path.length > 2;
  const likeAndOpenLink = (link) => {
    // Perform the action to simulate a "like" (replace with your actual like functionality)

    // Open a new tab or window with the specified URL
    window.open(link, "_blank");
  };
  return (
    <>
      <div
        className={`${classes.navModified} ${
          aboutPath ? classes.aboutModified : null
        }`}
        onClick={() => {
          isFeedbackVisible ? handleToggleFeedback() : null;
        }}
        style={{
          filter: isFeedbackVisible ? "brightness(0.5)" : "brightness(1)",
          transition: "all 0.6s ease-in-out",
        }}
        id="home"
      >
        <nav
          className={`${classes.navMain} ${
            aboutPath ? classes.aboutNav : null
          }`}
        >
          <div className={classes.logo}>
            <Image
              src={
                aboutPath
                  ? "/assets/svg/LogoAbout.svg"
                  : "/assets/svg/logo-green.svg"
              }
              width={140}
              height={aboutPath ? 64 : 47}
              alt="logo"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          <div
            className={`${classes.navSections} ${
              addClass ? classes.navContentHam : null
            }`}
          >
            <ul
              className={`${classes.section} ${
                aboutPath ? classes.secAbout : null
              }`}
            >
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/");
                }}
                className={`${path.length ? null : classes.activeHome}`}
              >
                Home
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/about");
                }}
                className={`${path === "about" ? classes.active : null}`}
              >
                About SNAP
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/download");
                }}
                className={`${path === "download" ? classes.active : null}`}
              >
                Downloads
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  router.push("/news");
                }}
                className={`${path === "news" ? classes.active : null}`}
              >
                News
              </li>
              <li
                onClick={() => {
                  mobileMenu();
                  likeAndOpenLink(conVersion.constructor);
                }}
              >
                Constructor{" "}
                <Image
                  src={
                    aboutPath
                      ? "/assets/svg/share1Gray.svg"
                      : "/assets/svg/share1.svg"
                  }
                  width={17}
                  height={17}
                  className={classes.imgMini}
                  alt="share1"
                />
              </li>
            </ul>
          </div>

          <div
            className={`${classes.feedBackSection} ${
              addClass ? classes.navAuthHam : null
            }`}
            onClick={handleToggleFeedback}
          >
            <div className={classes.vision}>
              {!aboutPath && (
                <Image
                  src={"/assets/svg/vision-2030.svg"}
                  width={98}
                  height={67}
                  alt="vision-2030"
                />
              )}
            </div>
            <div className={classes.btnFeedback} onClick={mobileMenu}>
              <Image
                src="/assets/svg/review1.svg"
                width={23}
                height={23}
                alt="review"
              />
              <p>Feedback</p>
            </div>
          </div>
          <div className="hamburger" onClick={mobileMenu}>
            <span className={`bar ${aboutPath ? "aboutBar" : null}`}></span>
            <span className={`bar ${aboutPath ? "aboutBar" : null}`}></span>
            <span className={`bar ${aboutPath ? "aboutBar" : null}`}></span>
          </div>
        </nav>
      </div>
      <Feedback
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
      />
    </>
  );
};

export default Navbar;
