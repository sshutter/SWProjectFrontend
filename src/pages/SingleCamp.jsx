import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import myImage from "../images/default_img.jpg";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SingleCamp() {
  const { campId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [campData, setCampData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/campgrounds/${campId}`)
      .then((response) => response.json())
      .then((data) => setCampData(data.data))
      .catch((error) => console.log(error));
  }, [campId]);

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/campgrounds/${campId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    handleShow();
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <div className="inform_container">
        <div className="top_inform">
          <Link to="/campgrounds" className="link_inform">
            <FaArrowAltCircleLeft /> &nbsp;Back
          </Link>
        </div>
        {/* eslint-disable-next-line */}
        <img src={myImage} alt="Empty Image" className="inform_pic" />
        <p>
          <b>Name: </b>
          {campData.name}
        </p>
        <p>
          <b>Address: </b>
          {campData.address}
        </p>
        <p>
          <b>District: </b>
          {campData.district}
        </p>
        <p>
          <b>Region: </b>
          {campData.region}
        </p>
        <p>
          <b>Province: </b>
          {campData.province}
        </p>
        <p>
          <b>Telephone Number: </b>
          {campData.telephone}
        </p>
        <p>
          <b>Postal Code: </b>
          {campData.postalcode}
        </p>
        <div className="book_btn_container">
          <Button
            onClick={() => {
              navigate(`/campgrounds/${campId}/booking`);
            }}
            className="book_btn"
          >
            Book the campground
          </Button>
        </div>
      </div>
      {role === "admin" ? (
        <>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Deleted Campground</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="alert" role="alert">
                Campground has been deleted.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="row mt-4 mb-4">
            <div className="col d-flex align-items-center justify-content-center mb-4">
              <Button
                className="edit_btn"
                onClick={() => {
                  navigate(`/campgrounds/${campId}/edit`);
                }}
              >
                Edit campground
              </Button>
            </div>
            <div className="col d-flex align-items-center justify-content-center mb-4">
              <Button className="del_btn" onClick={handleDelete}>
                Delete campground
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SingleCamp;
