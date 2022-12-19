import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: -4px;
  z-index: 999;
  overflow: hidden;
  max-width: 158px;
  max-height: 40px;
`;
const App = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  //   useEffect(() => {
  //     let wrapper = document.getElementsByClassName("skiptranslate")[0];
  //     let select = document.getElementById(":0.targetLanguage");
  //     if (wrapper) {
  //       wrapper.innerHTML = "";
  //       if (select) {
  //         wrapper.appendChild(select);
  //       }
  //     }
  //   }, [
  //     document.getElementsByClassName("skiptranslate")[0],
  //     document.getElementById(":0.targetLanguage"),
  //   ]);
  return (
    <>
      <Container id="google_translate_element"></Container>
    </>
  );
};

export default App;
