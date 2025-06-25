import React from "react";
import TextLink from "../components/ui/TextLink/TextLink";
import "./NotFound.scss";
import { ReactComponent as ArrowLeft } from "../assets/icons/arrow-left.svg";
import { ReactComponent as Smokey } from "../assets/images/smokey-bumgah.svg";

const NotFound = () => {
  return (
    <>
    <section className="blank">
      <Smokey/>  
      <h1>You lost, fam?</h1>
      <p>Smokey says &ldquo;Shoo!&rdquo;.</p>
      <TextLink to="/" label="Listen to Smokey and go home" iconLeft={ArrowLeft} />
    
    </section>
    </>
  );
};

export default NotFound;