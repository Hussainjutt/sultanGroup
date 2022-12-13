import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { BsImageFill } from "react-icons/bs";
import Dummy from "../../../../assets/image/blogs/dummy.jpg";
import ImageSelector from "./imageSelector";
import styled from "styled-components";

const ImagePrev = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  background-color: #0658c2;
  height: 250px;
  border: 1px solid #ccc;
`;
const Header = styled(Modal.Header)`
  align-items: flex-start;
  label {
    width: 90%;
    height: 60px;
  }
`;
const Featureimage = ({ image, setImage, show, setShow }) => {
  return (
    <Modal show={show} size="lg" onHide={() => setShow(false)}>
      <Header closeButton>
        <FileUploader
          handleChange={(e) => {
            setImage({
              ...image,
              prev: URL.createObjectURL(e),
              file: e,
              isUrl: false,
            });
          }}
          name="file"
          types={["JPG", "PNG", "GIF", "SVG"]}
          style={{ width: "92%" }}
        />
      </Header>
      <Modal.Body style={{ position: "relative" }}>
        <div className="row">
          <div className="col-7">
            <ImageSelector image={image} setImage={setImage} />
          </div>
          <div className="col-5">
            <ImagePrev src={image.prev ? image.prev : Dummy} />
            {image.file && image.prev && (
              <>
                <p className="p-2 m-0 d-flex align-items-center gap-3">
                  <BsImageFill />
                  <span
                    style={{
                      maxWidth: "80%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    {image.file?.name}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Featureimage;
