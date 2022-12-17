import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Gellery from "../components/gellary";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineUpload } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../adminDashboard";
import { Button, Modal, Form, Row, FormControl } from "react-bootstrap";
import { MdOutlinePublic } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import { BiSave } from "react-icons/bi";
import PrevModal from "./components/PrevModal";
import { IoChevronBackOutline } from "react-icons/io5";
import Select from "react-select";
import Featureimage from "./components/featureimage";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Container = styled.div`
  padding: 1rem 2rem;
`;

const Box = styled.div`
  width: 100%;
  max-width: ${(props) => props.width}%;
  border-radius: 9px;
  overflow: hidden;
  // box-shadow: 0px 0px 22px -1px rgba(87, 76, 76, 0.75);
  background-color: white;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  grid-gap: 2rem;
`;
const Input = styled.input`
  width: 100%;
  display: inline-block;
  padding: 8px 10px;
  font-size: 15px;
  border: 1.7px solid #ccc;
  border-radius: 3px;
  margin: 12px 0;
  &:focus {
    outline: 2px solid #eff0f2;
  }
`;

const selectStyles = {
  menu: () => ({
    zIndex: 50,
    position: "absolute",
    backgroundColor: "#fff",
    width: "99.4%",
    left: "1px",
    outline: "2px solid #0D6EFD",
    borderTop: "none",
    borderRadius: "0 0 4px 4px",
  }),
};
const AddNew = ({ forEdit }) => {
  const editorRef = useRef(null);
  const [image, setImage] = useState({ prev: "", file: "", isUrl: false });
  const [show, setShow] = useState(false);
  const [prev, setPrev] = useState(false);
  const [data, setData] = useState({
    title: "",
    image: "",
    content: null,
    category: "",
    comments: [],
    isDraft: null,
  });
  const [category, setCategory] = useState("");
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [content, setContent] = useState("");
  const param = useParams();
  const addCategory = async () => {
    try {
      await updateDoc(doc(db, "blogs", "category"), {
        data: arrayUnion({
          label: category.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
          }),
          value: category.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
          }),
        }),
      });
      toast.success(`An new Category`);
      setModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getData = (val) => {
    if (editorRef.current) {
      setData({
        ...data,
        image: image,
        content: editorRef?.current?.getContent(),
        isDraft: val,
      });
      setPrev(true);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "category"), (doc) => {
      setOptions(doc.data().data);
    });
    return () => {
      unSub();
    };
  }, []);
  useEffect(() => {
    if (param?.id) {
      const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
        let blog = doc
          .data()
          ?.data.filter((el) => el?.id === param?.id?.slice(1));
        let arr = blog[0];
        setData({
          ...data,
          title: arr?.title,
          category: arr?.category,
          comments: arr?.comments,
        });
        editorRef?.current?.setContent(arr?.content);
        setContent(arr?.content);
        setImage({
          ...image,
          prev: arr?.image,
          isUrl: true,
          file: arr?.image,
        });
      });
      return () => {
        unSub();
      };
    }
  }, [param?.id]);
  useEffect(() => {
    if (data.category && content && data.title && image.file && image.prev) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (content === "") {
      editorRef?.current?.setContent("");
    }
  }, [image, data, content]);
  return (
    <Layout heading={forEdit ? "Edit Blog" : "Create Blog"}>
      <Container>
        <div className="d-flex justify-content-between gap-3  mb-3">
          <Button
            onClick={() => navigate("/all-blogs")}
            variant="info"
            className="text-white"
          >
            <IoChevronBackOutline
              style={{ position: "relative", top: "-2px" }}
            />
            &nbsp;Back
          </Button>
          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="primary"
              onClick={() => {
                getData(false);
              }}
              disabled={disabled}
            >
              Publish{" "}
              <MdOutlinePublic
                style={{ fontSize: "20px", position: "relative", top: "-2px" }}
              />
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                getData(true);
              }}
              disabled={disabled}
            >
              Draft{" "}
              <BiSave
                style={{ fontSize: "20px", position: "relative", top: "-2px" }}
              />
            </Button>
          </div>
        </div>
        <Wrapper>
          <Box width={70}>
            <div
              style={{
                width: "100%",
                padding: "12px",
              }}
              className="d-flex align-items-start gap-4"
            >
              <Form.Control
                type="text"
                placeholder="Add an title"
                className="w-75"
                value={data.title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
              <Select
                styles={selectStyles}
                className="w-25"
                placeholder={"Category"}
                value={
                  data?.category && {
                    label: data?.category,
                    value: data?.category,
                  }
                }
                onChange={(e) => setData({ ...data, category: e.label })}
                options={options}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-start gap-1">
                <h2 className="m-0 px-3">Feature Image - </h2>
                <Button
                  variant={image.file ? "primary" : "dark"}
                  className="py-2"
                  onClick={() => setShow(true)}
                >
                  {image.file ? "Change" : "Upload"} Image <MdOutlineUpload />
                </Button>
              </div>
              <div className="px-3">
                <Button variant="info" onClick={() => setModal(true)}>
                  Add Category
                </Button>
              </div>
            </div>
            <Editor
              id="hi"
              apiKey="8p7b5cr7v1jc30rynl5dwh6x8nywa0arh7brqb51i1ms7tvl"
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(newText, editor) => {
                setContent(newText);
              }}
              initialValue={<p>This is the initial content of the editor.</p>}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "insertdatetime",
                  "print",
                  "template",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "important",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, }",
              }}
            />
          </Box>
          <Box width={30}>
            <Gellery />
          </Box>
        </Wrapper>
      </Container>
      <Featureimage
        image={image}
        setImage={setImage}
        show={show}
        setShow={setShow}
      />
      <PrevModal
        data={data}
        setData={setData}
        setPrev={setPrev}
        prev={prev}
        image={image}
        setImage={setImage}
        isUpdate={param?.id ? param?.id?.slice(1) : false}
        setContent={setContent}
      />
      <Modal size="sm" show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>Add a Category</Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button
            className="my-3 w-100"
            variant="primary"
            disabled={!category ? true : false}
            onClick={() => addCategory()}
          >
            Add
          </Button>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default AddNew;
