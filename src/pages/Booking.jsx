import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
import { Alert, Modal } from "react-bootstrap";

function Booking() {
  const { campId } = useParams();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleStartDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log(formattedDate); // e.g. "2019-01-02"
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log(formattedDate); // e.g. "2019-01-02"
    setEndDate(date);
  };

  const handleBooking = () => {
    if (!upTo3Night(startDate, endDate)) {
      setErrorMessage("End date must be up to 3 days from start date");
      return;
    }

    fetch(`http://localhost:3000/api/v1/campgrounds/${campId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
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
        console.error("There was a problem with the booking request:", error);
      });
    setShowModal(true);
  };

  function upTo3Night(startDate, endDate) {
    const oneDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
    const diffInDays = Math.round(Math.abs((endDate - startDate) / oneDay));
    return diffInDays <= 3;
  }

  function validateDate(startDate, endDate) {
    return startDate <= endDate;
  }

  return (
    <>
      <div className="inform_container">
        <div className="top_inform">
          <Link
            to="/campgrounds"
            className="link_inform"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowAltCircleLeft /> &nbsp;Back
          </Link>
        </div>
        <div className="row">
          <div className="col">
            <p>Select Start Date:</p>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="Start Date"
            />
          </div>
          <div className="col">
            <p>Select End Date:</p>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="End Date"
            />
          </div>
        </div>

        {!validateDate(startDate, endDate) ? (
          <div className="error_message">
            <Alert
              variant="danger"
              style={{
                marginTop: "20px",
              }}
            >
              The end date must be greater than the start date.
            </Alert>
          </div>
        ) : !upTo3Night(startDate, endDate) ? (
          <div className="error_message">
            <Alert
              variant="danger"
              style={{
                marginTop: "20px",
              }}
            >
              The end date must be within 3 days of the start date.
            </Alert>
          </div>
        ) : (
          <></>
        )}
        <div className="book_btn_container">
          <Button className="book_btn" onClick={handleBooking}>
            Book your campground
          </Button>
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false);
            }}
          >
            <Modal.Header closeButton>
              <div className="alert" role="alert">
                <h5>
                  <b>You have booked the campground.</b>
                </h5>
              </div>
            </Modal.Header>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Booking;
