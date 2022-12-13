import React from "react";
import Layout from "../../layout";
import About from "./components/about";
import ContactForm from "./components/form";
import LocationCards from "./components/locationCards";
const Index = () => {
  return (
    <Layout>
      <About />
      <LocationCards />
      <ContactForm />
    </Layout>
  );
};
{
  /* <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure distance on map</a></iframe> */
}
export default Index;
