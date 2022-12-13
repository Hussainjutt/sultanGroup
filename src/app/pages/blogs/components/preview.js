import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { db } from "../../../../firebase";
import Img1 from "../../../assets/image/blogs/1.jpg";
import Img2 from "../../../assets/image/blogs/2.jpg";
import Img3 from "../../../assets/image/blogs/3.jpg";
import Img4 from "../../../assets/image/blogs/4.png";
import Img5 from "../../../assets/image/blogs/5.jpeg";
import Img6 from "../../../assets/image/blogs/6.jpg";
import Img7 from "../../../assets/image/blogs/7.png";
import Layout from "../../../layout";
import SideBar from "./sidebar";
const arr = [
  {
    h: "NUST’S COVID-19 TESTING KIT",
    category: "CASE STUDY",
    date: "Apr 06, 2020",
    img: Img1,
    text: [
      <span>
        The two young scientists of the Attaur Rahman School of Applied
        Biosciences (Asab) at the National University of Sciences and Technology
        (Nust), Islamabad had been constantly discussing research work to curb
        the spread of coronavirus, with each other and with the virologists’
        community in Pakistan and abroad. With the world in the grip of an
        unprecedented pandemic and with the number of infected people rising by
        the hour, Javed and Zohaib put aside their other research activities in
        the lab to develop an indigenous diagnostic kit to test for Covid-19.
        The cost of the current coronavirus diagnostic test is reportedly over
        8,000 rupees, but this scientist duo says that with the development of
        their indigenous kit, the test will cost only one-fourth of that price.
        <br />
        Initially, they discussed their research with ASAB principal Dr Hussnain
        Janjua and got his approval. By February 14, they informed him that they
        had the capability of developing Covid-19 test kits. With smiles on
        their faces, the Nust scientists tell Eos that whenever they got
        discouraged due to various reasons, they turned to Dr Janjua. “He was
        the person who was always available for us and remained a great source
        of motivation,” says Javed. “He always facilitated us whenever we sought
        help in completing our research project.”
        <br />
        “Every year, there is a dengue outbreak in our country and we have never
        thought why it happens,” principal Janjua says. “A basic reason is the
        lack of screening technologies. NIH is not responsible for dealing with
        such outbreaks [alone]. It needs support of research institutions and
        collective efforts,” he adds.
        <br />
        “Our focus this time is to build up our indigenous capabilities, in our
        own institutions. So if any such virus reoccurs in the future, we can
        minimize its risk.”
        <br />
        Sultan Group ® facilitate the researchers to smooth the communication
        with foreign collaborators and import indigenous testing kit from China
        & Germany by using their special way and protocols in pandemic.
        <br />
        We are proud the be a part of NUST team during indigenous test kit
        development.
        <br />
        All rights reserved to Sultan Group for this content!
      </span>,
    ],
  },
  {
    h: "Send Papers and Receive Cash Red Envelopes",
    category: "LATEST NEWS",
    date: "Jun 20, 2021",
    img: Img2,
    text: [
      <span>
        Sultan Group Pakistan has been committed to building a world-class
        national brand for more than ten years, providing comprehensive,
        innovative, high-quality and convenient scientific research products and
        services. At present, its self-developed recombinant proteins,
        antibodies, and ELISA test kits have been recognized by a large number
        of scientific research users, and have been published in international
        authoritative journals for many times, which has further promoted the
        internationalization of national brands.
        <br />
        In order to thank and repay the support of our customers, our company
        has set up a special scholarship program to establish a product
        application database and provide reference value for the use of products
        for the majority of scientific researchers. We look forward to working
        with you to make more brilliant achievements on the path of life science
        exploration.
        <br />
        Sultan Group Pakistan solemnly declares that as long as the product used
        belongs to the product category within the scope of the award, and an
        article is published in an international journal, and the article
        clearly states that the product used is purchased from Sultan Group
        Pakistan All domestic and foreign researchers have the right to apply
        for this scholarship.
        <br />
        <br />
        <h3>1. Reward products</h3>
        <br />
        Main products independently developed and produced: recombinant
        proteins, antibodies, ELISA test kits.
        <br />
        <br />
        <h3>2. Reward standard</h3>
        <ul>
          <li>
            {" "}
            The reward for publishing papers in nature/Science/cell or other
            first-line journals is 30,000 PKR
          </li>
          <li> Impact factor</li>
          <table>
            <tr>
              <th style={{ border: "1px solid #000" }}>Impact factor (IF)</th>
              <th style={{ border: "1px solid #000" }}>Scholarship (PKR)</th>
            </tr>
            {[
              { a: "20≤IF", b: "40,000" },
              { a: "15≤IF<20", b: "20,000" },
              { a: "10≤IF<15", b: "10,000" },
              { a: "5≤IF<10", b: "5000" },
              { a: "3≤IF<5", b: "3000" },
              { a: "1≤IF<3", b: "2000" },
              { a: "IF≤1", b: "2000" },
            ].map((el, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #000" }}>{el?.a}</td>
                <td style={{ border: "1px solid #000" }}>{el?.b}</td>
              </tr>
            ))}
          </table>
        </ul>
        <br />
        <h3>3. Reward application and collection</h3>
        a. The reward object is the first author (co-first author) or
        corresponding author of an article included in SCI, and only one person
        can apply; b. The article must clearly indicate that the product used
        was purchased from Sultan Group Pakistan c. If the product cited in the
        article is a trial package, it will not participate in the reward
        activities; d. Fill in the application materials and upload the full
        text of the PDF to the Sultan Group Pakistan mailbox:
        sultangroup@gmail.com , You can submit the award application; e. After
        the application materials are reviewed and approved by the company, the
        staff will contact the applicant for confirmation (within 5 working
        days); f. The scholarships received can be exchanged for cash red
        envelopes, gifts (cards) or product coupons.
        <br />
        <h2>
          The right to interpret this event belongs to{" "}
          <i>Sultan Group Pakistan</i>
        </h2>
      </span>,
    ],
  },
  {
    h: "Impact of Coronavirus pandemic on Agriculture and food prices",
    category: "CASE STUDY",
    date: "Sep 03, 2021",
    img: Img3,
    text: [
      <span>
        The spread of Coronavirus (COVID-19) pandemic in March 2020 and the
        actions taken in response to its drastically shifted prepared food from
        restaurants to homes as stay at home orders went into effect. Collecting
        price data at the same time became difficult as the stores and
        businesses were closed, this particularly effect the Consumer Price
        Index (CPI).
        <br />
        Pakistan’s gross domestic product (GDP) before COVID-19 outbreak was
        projected at 3.2% with a 2.9% share of agriculture. However, Coronavirus
        pandemic affected Pakistan’s economy at various channels, slowing it
        down; consequently, the provisional GDP growth for 2019-20 has been
        estimated at -0.4%, but agriculture is the only sector showed a positive
        response with 2.7% growth rate. Agriculture is central to the economy of
        Pakistan, contributing 19% of GDP, employing about 39% of the labor
        force. Being the backbone of a rural populace makes up 63% of the
        Pakistan’s total population that supplies a large share to the exports
        of the country.
        <br />
        The first case of Coronavirus in Pakistan was declared on February 26,
        2020 and by March, all four provinces registered the cases. On March 24,
        2020, Balochistan and Sindh governments declared the province-wide
        lockdowns. The federal government imposed nationwide lockdown on 1 April
        2020. Pakistan faced the dual challenges of responding to the
        health-related crisis while mitigating the economic devastation.
        Lockdown from April 2020 to May 2021, precisely affected the informal
        sector that accounts for the 72% of the daily wage-earning employment.
        United Nations Development Programme (UNDP) estimated that the Punjab
        and the Sindh faced the maximum loss as elevated poverty. The
        manufacturing hubs of Lahore, Sialkot and small to medium-sized
        enterprises affected the most. According to the estimate of the Pakistan
        Institute of Development Economics, about 58% of the workforce of Punjab
        is vulnerable to job loss. Pakistan is facing a very high inflation
        (food and general items) which have adverse effects on the purchasing
        power of middle-income groups and poor. The CPI inflation data released
        by PBS (Pakistan Bureau of Statistics) estimated that the overall CPI
        inflation has been increased by 10.2%. The CPI inflation increased by
        9.3% for Urban consumers, whereas Whole price Index (WPI) and Sensitive
        Price Index (SPI) increased by 9.2% and 11.8% respectively. For rural
        and urban consumers, food inflation rose by 15.5% and 13% respectively
        over the same period.
        <br />
        The nationwide pandemic of Coronavirus has mostly halted the
        non-agricultural economic activities with potentially having a
        detrimental effect on food supply chains. Our country largely relies on
        interprovincial supply of food to equilibrate the demand and supply
        across all the seasons and to gain benefit of different agroecological
        regions. Wheat is a major commodity associated with food security
        through interprovincial trade. The lockdown took place just as the
        harvesting of wheat and sowing of summer crops (Kharif) started.
        Although the government exempted input providers, machinery service
        providers, markets and other agriculture sector components from
        Coronavirus pandemic related restrictions, disruptions such as higher
        rental charges, labor shortage and farmers’ limited access to markets
        were nonetheless reported. Other reports also proposed anecdotal
        evidence of farmers facing severe problems getting their yield to the
        marketplace during the month of April and May. Pakistani farmers sell
        their produce primarily to wholesale markets, but reports suggested that
        movement restrictions prevented some from taking their crops to the
        market.
        <br />
        Punjab, being the largest province of Pakistan in terms of population
        and its 57% contribution to the value of national agriculture
        production. Punjab produces approximately 80% of the Pakistan’s cotton
        and wheat, two third sugarcane, half of its maize and 67% outputs
        represents the horticulture out of total production. The Punjab surveys
        indicated that the wheat marketing and harvesting was spared the adverse
        effects of the movement restrictions of foodstuff due to lockdowns in
        Coronavirus pandemic. These restrictions on goods upset the market of
        highly perishable products like fruits, milk, vegetables because of
        their difficulty in storage. The disruption in food supply results in a
        direct income loss for the producers and impacted the increase in food
        prices. This rise in prices of inputs raised the grave concern about the
        upcoming rise cultivating season. This brief indicated the loss of cash
        earnings for the farmers during the pandemic season, coupled with high
        prices of inputs unable for the farmers to buy inputs for rise
        cultivation. This could be a loss of major staple crops for local
        customers and also an import export product that could cause a
        significant burden on the economy of Pakistan. The locust swarms are
        another issue resulted in production losses for the farmers already
        suffered the effects of Coronavirus disease. Quick mitigation response
        and preventive measures are needed to prevent the future resurgence.
      </span>,
    ],
  },
  {
    h: "Human Biological Sampling from all over the Pakistan",
    category: "LATEST NEWS",
    date: "Apr 09, 2022",
    img: Img4,
    text: [
      <span>
        We are proudly announce that our team successfully completed the "Human
        Biological Samples" from all four provinces of Pakistan. Our dedicated
        team is highly expert in sampling protocol.
        <br />
        <ol>
          <li>Collection of human biological samples with protectives. </li>

          <li>Preservation at low temperature. </li>

          <li>
            Safe passage from collection site to Laboratory for DNA/RNA
            extraction.{" "}
          </li>
        </ol>
        <br />
        Collection tube is a collection kit that preserves live microbiome
        samples (such as stool or fecal samples) for growth and isolation of
        anaerobic and facultatively anaerobic microorganisms. The product
        effectively preserves microorganisms under anaerobic conditions at room
        temperature for up to 5 days without substantial loss of viability.
        Organisms are preserved alive in collection tube, this kit is not
        intended to preserve samples for metagenomic sequencing analysis. While
        DNA is inherently preserved inside of the live microorganisms, the
        population distribution and abundance of species is not necessarily
        maintained and preserved.
        <br />
        Sample Transport and Storage: Transport samples to laboratory and
        process samples within 120 hours of collection. Samples are intended to
        be stored and transported at room temperature. Samples should not be
        frozen for transport unless the sample will remain frozen until final
        processing. Refrigerating a sample is not necessary but may help slow
        potential growth and metabolism of organisms. Check local/state/country
        regulations for required labeling and packaging requirements for
        shipping stool samples.
        <br />
        Until now we have completed multiples projects. Any research
        institute/professor required our services for sample collection and
        training. Please let us know and feel free to contact us!
        <br />
        Email: <a href="mailto:info@sultangroup.org">info@sultangroup.org</a>
      </span>,
    ],
  },
  {
    h: "Laboratory Safety Training",
    category: "LATEST NEWS",
    date: "May 20, 2022",
    img: Img5,
    text: [
      <span>
        Laboratory Safety Laboratory safety involves the development of skills
        and responsibility and must be an integral part of every laboratory
        safety training. This means that safety awareness must be integrated
        into each laboratory training including research with an increasingly
        broader scope at more advanced levels. The creation of a culture of
        laboratory safety requires a broad commitment from all levels of the
        educational institution. At the department level, faculty need to assume
        responsibility for continuing review of safety issues with students in
        teaching and research laboratories, especially the persons responsible
        for undergraduate instruction, often graduate students or instructors.
        Faculty must lead by example in a coordinated departmental safety
        effort. At the administrative level, this will involve implementing a
        chemical hygiene plan that agrees with any campus chemical
        hygiene/safety efforts and must address the safe handling, storage, and
        disposal of chemicals. Eyewash and showers must be in operating
        condition, and fume hoods with proper sashes are essential. Anyone
        working or visiting the lab must wear goggles, and consumption of food
        or drinks must not be permitted. A clean, uncluttered laboratory is more
        likely to encourage careful work.
        <br />
        The development of safety skills may be divided into four emphasis
        areas.
        <br />
        • Recognize Hazards
        <br />
        • Assess Risks • Minimize Risks
        <br />
        • Prepare for Emergencies
        <br />
        <br />
        The ACS Committee on Chemical Safety has recently published three useful
        resources that provide guidelines for chemical safety in academic
        institutions.2 and help in the identification and evaluation of hazards
        in research laboratories.
        <br />
        <h3>Recognize Hazards</h3>A hazard is a potential source of danger or
        harm and can result from working with chemicals, equipment, and
        instrumentation. Introduction to this topic can start with an
        understanding of the terms describing chemical hazards, such as “toxic”,
        “flammable”, or “corrosive”, and how to obtain information from chemical
        labels, Safety Data Sheets (SDS), and other reference sources. Chemical
        hazards encountered in early undergraduate laboratories should be
        explained in more detail – for example, acids, bases, flammables, and
        toxic compounds. At more advanced levels, more details of chemical and
        physical hazards should be explained so that students are able to
        identify hazards themselves in experiments – for example, types of toxic
        compounds, compressed gases, cryogenics, pressurized systems, peroxides,
        reactive, unstable compounds, pyrophoric, explosives, and
        water-reactive. Other topics might include toxicology, nanomaterials,
        biohazards, and radiological hazards, which become relevant when the
        chemistry curriculum becomes broader in scope.
        <h4>Assess Risks</h4>
        Once a hazard(s) is recognized, laboratory safety necessarily requires
        assessing or evaluating risk from potential exposure to the hazard.
        Identifying potential routes of exposure is followed by judging the
        relative risk posed by the hazards of the experiment. The hazardous
        physical, chemical, and toxic properties of solvents, reactants,
        catalysts, products, and wastes should be considered as well as the
        circumstances of the experiment – for example, how much is being used,
        is the right equipment available, can the hazard be controlled or
        minimized? - Are the reactions exothermic or water- or air-sensitive?
        Are there risks associated, for example, with the use of lasers or
        equipment utilizing high voltages (electrophoresis)?
        <h3>Minimize Risks</h3>
        Based on a risk assessment, experiments should be designed to minimize
        potential risks. These steps may involve carrying out experiments in a
        fume hood with a protective shield and wearing protective gloves and
        goggles. The handling and storage of wastes are critical components. It
        is often useful to consider case histories of incidents that have
        resulted in injury or damage.
        <h3>Prepare for Emergencies</h3>
        Since it is essential to react promptly and deliberately to emergencies,
        students should learn what to do in various emergencies and be prepared
        to act accordingly – for example, fires, injuries, and spills. Safety
        devices such as showers, eyewashes, fire extinguishers, and spill kits,
        must be clearly labeled and their use and location are known to all
        those working in a laboratory. Emergency phone numbers, alarms, and
        escape routes should be clear to everyone.
        <h3>The Culture of Laboratory Safety</h3>
        Faculty and staff must be leaders in safety: teaching safety to
        students, continuously promoting safety, demonstrating the importance of
        safety through their actions, and accepting responsibility for safety.
        At some institutions, the graduate students teach the undergraduate
        labs, in which case the graduate students TAs must be champions of
        safety ethics. The Safety Ethic is, above all, a value, stated as: I
        value safety, work safely, prevent any risk-behavior, promote safety,
        and accept responsibility for safety. It emphasizes the personal
        responsibility of each person involved. In order for this culture to
        thrive, everyone must be promoting it. It is, of course, necessary to be
        familiar with Occupational Safety and Health Administration (OSHA),
        Environmental Protection Agency (EPA), Department of Transportation
        (DOT), and Department of Energy (DOE) regulations, but responsibility
        goes beyond simply complying with federal, state and local regulations –
        it is about caring for the safety of fellow students, faculty, and
        staff. There are several chemical and laboratory safety resources that
        can be very useful in building a strong culture of safety.
        <h3>Curricular Approaches</h3>
        Laboratory safety education and training is an ongoing process and
        therefore must be integrated into every laboratory course. In research
        laboratories, the responsibility for necessary instruction will lie with
        the research director. Because of time and resource constraints,
        presentation and discussion may be limited in lab lectures prior to the
        start of a laboratory or pre-lab assignments.
        <br />
        Three possible approaches are suggested:
        <ol>
          <li>A seminar course devoted entirely to laboratory safety.</li>

          <li>
            Laboratory safety as part of a seminar devoted to chemistry as a
            profession.
          </li>

          <li>
            Online materials where students would be required to do reading and
            then pass exams, the grades being recorded.
          </li>
        </ol>
        <br />
        It is very important to emphasize that safety is about learning how to
        carry out laboratory work safely and not only about rules and
        regulations, so students are required to think about responsibility for
        safety in the conduct of their work. Working safely is a basic
        responsibility of every employee and every student. Reduce unnecessary
        risks, - 3 - insure that regulations are followed by others, and always
        bring safety concerns to the attention of a supervisor or a departmental
        safety committee. A departmental safety committee should be established
        if it does not exist.
        <h2>By Management Sultan Group ®</h2>
      </span>,
    ],
  },
  {
    h: "One day workshop on “National Training Workshop on ELISA Based Diagnostics” was organized on 26-05-2022 by Sultan Group.",
    category: "LATEST NEWS",
    date: "Jun 10, 2022",
    img: Img6,
    text: [
      <span>
        <b>Top Row, from right to left : </b> Dr. Muhamad Shahid, Prof. Dr.
        Abdul Haque, Prof. Dr. Muhammad Asghar, Prof. Amer Jamil, Prof. Dr.
        Sajjad ur Rahman
        <br />
        <b>Bottom Row, from right to left : </b> Dr. Sultan Ali, Dr. Muhammad
        Ali, Dr. Sanaullah Sajid, Dr. Faheem Azher
        <br />
        <br />
        One day workshop on “National Training Workshop on ELISA Based
        Diagnostics” was organized on 26-05-2022 by the Department of
        Biochemistry, Institute of Microbiology and Sultan Group.
        <br />
        Prof. Dr. Muhammad Asgher, Prof. Amer Jamil, and Prof. Dr. Abdul Haque
        Rector Akhuwat-FIRST emphasized the importance of practical training in
        inaugural session. The Chairman extended gratitude to Prof. Dr. Iqrar
        Ahmad Khan, worth Vice Chancellor University of Agriculture, Faisalabad
        for providing a conducive environment and support for academics and
        research activities in the University. The training was meant to train
        the young researchers to have a true experience of accurate, efficient,
        and easy techniques like ELISA. It was a joint venture of scientific
        supplies and academia. The resource persons Prof. Dr. Sajjad ur Rahman,
        Dr. Sultan Ali and Dr. Muhammad Shahid delivered valuable talks on the
        types and applications of ELISA. Practical training was conducted by Dr.
        Muhammad Ali and Dr. Sanaullah Sajid in the new Postgraduate
        Biochemistry Block. Dr. Faheem CEO of Sultan Group®, presented a talk on
        the selection of chemicals for research and the services he is offering
        to academics. He also presented how he help academia and students and
        his team. Their team is experienced & professional in providing
        laboratory supplies in less than 24 hours across the country. The
        Workshop was sponsored by Sultan Group. This event was a nice example of
        cooperation between the private and public sectors. The Chairman
        appreciated Dr. Muhammad Ali, Convener of the workshop and faculty and
        staff of the department for a successful event where participants had
        practical training on the technique.
      </span>,
    ],
  },
  {
    h: "18th National Training course on Modern Techniques in Biotechnology (NIBGE)",
    category: "LATEST NEWS",
    date: "Oct 17, 2022",
    img: Img7,
    text: [
      <span>
        <h3 style={{ textAlign: "center" }}>
          18th National Training Course Modern Techniques in Biotechnology
        </h3>
        National Institute for Biotechnology and Genetic Engineering (NIBGE),
        has widely been recognized as the “Center of Excellence in
        Biotechnology” at the international level. Scientists of NIBGE perform
        leading-edge research in the discipline of Biotechnology and train human
        resources for productive and rewarding scientific careers. Keeping
        emerging and cutting-edge technologies in focus, NIBGE harbors
        state-of-the-art equipment for research and outsourcing analytical
        services on a commercial level. NIBGE by all means promotes
        collaboration in research with local and international organizations. It
        is an affiliated center of the International Center of Genetic
        Engineering and Biotechnology (ICDEB). Italy and its library have been
        designated as the National Library of Biological Sciences. Training of
        manpower at postgraduate and doctorate levels is one mandate of NIBGE
        and it is declared as a constituent college of the Pakistan Institute of
        Engineering and Applied Sciences (PIEAS) for the awarding of M.Phil and
        Ph.D. degrees in Biotechnology to develop the best innovation
        intellectuals.
        <h3 style={{ textAlign: "center" }}> Course Overview</h3>
        Biotechnology is a field integrating many areas like microbiology,
        molecular biology, biochemistry, cell biology, and immunology.
        Biotechnology has applications in medicine, agriculture, aquaculture,
        chemical manufacturing, textile processing and the food processing
        industry. Basic biotechnological information clearnedlearnt without any
        ex- pensive resources, but the modern techniques have to be throughout
        experience at the bench. Moreover, in response to the expanding
        frontiers in bio-technology,, training and reorientation of the teaching
        faculty is essentially required to meet the rapidly changing
        professional and scientific needs of the stakeholders. This training
        course focuses on basic concepts, theoretical,l knowledge, and hands-on
        training of skills and in-depth understanding of methods in modern
        biotechnology by experts in their field.
        <br />
        The National Institute for Biotechnology & Genetic Engineering (NIBGE)
        Faisalabad, being a Federal research body in the country has a mandate
        to apply modern and innovative research techniques in agriculture,
        heal,th, industry and the environment and routinely offers up-to-date
        training programs to support the study of discipline of science and
        technology in the country. Now NIBGE is pleased to announce the 18th
        training course in a series of short-term training program techniques
        Techniques in Biotechnology”.
      </span>,
    ],
  },
];

const BlogWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  box-shadow: 0px 0px 16px 6px rgba(204, 204, 204, 0.75);
  border-radius: 0.75rem;
  position: relative;
  background-color: white;
`;
const Img = styled.img`
  width: 100%;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #00a8e6, #28be11) border-box;
  border-radius: 0.75rem;
  border: 4px solid transparent;
  margin: 1rem 0;
`;
const H1 = styled.h1`
  font-family: "Comfortaa";
  margin: 1rem 0;
`;
const Text = styled.p`
  font-family: "Comfortaa";
  line-height: 26px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  align-items: flex-start;
  padding: 2rem;
`;
const Btn = styled.span`
  position: absolute;
  font-size: 33px;
  color: white;
  height: 41px;
  border-radius: 0.75rem 0;
  top: 0;
  left: 0;
  background-image: linear-gradient(316deg, #00a8e6, #28be11);
  cursor: pointer;
  transition: 1s;

  &::after {
    content: "";
    position: absolute;
    border-radius: 0.75rem 0;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background-image: linear-gradient(145deg, #00a8e6, #28be11);
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  }
  svg {
    position: relative;
    top: -7px;
    padding: 2px;
    z-index: 99;
  }
`;
const Preview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  let id = useParams().id.slice(1);
  useEffect(() => {
    if (id) {
      setLoader(true);
      const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
        doc.data().data.map((el, i) => {
          if (el?.id === id) {
            setData(el);
          }
        });
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
      return () => {
        unSub();
      };
    }
  }, [id]);
  return (
    <Layout>
      <Container>
        <BlogWrapper>
          <Btn onClick={() => navigate("/blogs")}>
            <HiOutlineArrowNarrowLeft />
          </Btn>
          {loader ? (
            <Spinner variant="info" animation="border" size={200} />
          ) : (
            <>
              <H1>{data?.title}</H1>
              <Img src={data?.image} width="100%" />
              {data?.content && (
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              )}
            </>
          )}
        </BlogWrapper>
        <SideBar />
      </Container>
    </Layout>
  );
};

export default Preview;
