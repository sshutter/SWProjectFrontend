import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import myImage from "../images/default_img.jpg";

function SingleCamp() {
  const { campId } = useParams();

  const [campData, setCampData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/campgrounds/${campId}`)
      .then((response) => response.json())
      .then((data) => setCampData(data.data))
      .catch((error) => console.log(error));
  }, [campId]);

  return (
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
      <div className="book_container">
        <Link to={`/campgrounds/${campId}/booking`} className="booking_btn">
          Book the campground
        </Link>
      </div>
    </div>
  );
}

export default SingleCamp;
