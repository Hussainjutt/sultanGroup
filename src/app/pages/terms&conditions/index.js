import React from "react";
import styled from "styled-components";
import Layout from "../../layout";
const Container = styled.div`
  padding: 2rem 6%;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: left;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#28be11, #00a8e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 35px;
    line-height: 43px;
  }
`;
const Box = styled.div`
  margin: 2rem 0;
  h2 {
    margin-bottom: 1rem;
    font-weight: 600;
  }
  p {
    margin-bottom: 0.4rem;
  }
`;
const Index = () => {
  return (
    <Layout>
      <Container>
        <H1>Terms & Conditions</H1>
        <Box>
          <h2>
            Terms and Conditions for F. A Trader (Sultan Group) ® Introduction
          </h2>
          <p>
            These Website Standard Terms and Conditions written on this webpage
            shall manage your use of our website, sultan group accessible at
            www.sultangroup.org.
            <br />
            <br />
            These Terms will be applied fully and affect to your use of this
            Website. By using this Website, you agreed to accept all terms and
            conditions written in here. You must not use this Website if you
            disagree with any of these Website Standard Terms and Conditions.
            These Terms and Conditions have been generated with our hired
            cooperate lawyer.
            <br />
            <br />
            Minors or people below 18 years old are not allowed to use this
            Website.
          </p>
        </Box>
        <Box>
          <h2>Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, F. A Trader
            (Sultan Group) and/or its licensors own all the intellectual
            property rights and materials contained in this Website.
            <br /> <br /> You are granted limited license only for purposes of
            viewing the material contained on this Website.
          </p>
        </Box>
        <Box>
          <h2>Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul>
            {[
              "publishing any Website material in any other media;",
              "selling, sublicensing and/or otherwise commercializing any Website material;",
              "publicly performing and/or showing any Website material;",
              "using this Website in any way that is or may be damaging to this Website;",
              "using this Website in any way that impacts user access to this Website;",
              "using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;",
              "engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;",
              "using this Website to engage in any advertising or marketing;",
            ].map((el, i) => (
              <li key={i}>{el}</li>
            ))}
            <p className="mt-3">
              Certain areas of this Website are restricted from being access by
              you and F. A Trader (Sultan Group) may further restrict access by
              you to any areas of this Website, at any time, in absolute
              discretion. Any user ID and password you may have for this Website
              are confidential and you must maintain confidentiality as well.
            </p>
          </ul>
        </Box>
        <H1>Your Privacy</H1>
        {[
          {
            a: "No warranties",
            b: "This Website is provided as is, with all faults, and F. A Trader (Sultan Group) express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.",
          },
          {
            a: "Limitation of liability",
            b: "In no event shall F. A Trader (Sultan Group), nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  F. A Trader (Sultan Group), including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.",
          },
          {
            a: "Indemnification",
            b: "You hereby indemnify to the fullest extent F. A Trader (Sultan Group) from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.",
          },
          {
            a: "Severability",
            b: "If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.",
          },
          {
            a: "Variation of Terms",
            b: "F. A Trader (Sultan Group) is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.",
          },
          {
            a: "Assignment",
            b: "The F. A Trader (Sultan Group) is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.",
          },
          {
            a: "Entire Agreement",
            b: "These Terms constitute the entire agreement between F. A Trader (Sultan Group) and you in relation to your use of this Website, and supersede all prior agreements and understandings.",
          },
          {
            a: "Governing Law & Jurisdiction",
            b: "These Terms will be governed by and interpreted in accordance with the laws of the State of pk, and you submit to the non-exclusive jurisdiction of the state and federal courts located in pk for the resolution of any disputes.",
          },
        ].map((el, i) => (
          <Box key={i}>
            <h2>{el?.a}</h2>
            <p>{el?.b}</p>
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

export default Index;
