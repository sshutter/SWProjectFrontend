import React, { useState, useEffect } from "react";
import myImage from "../images/default_img.jpg";

function Home() {
  const [campgrounds, setCampgrounds] = useState([]);

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    // Fetch province options from API
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProvinceOptions(data.map((province) => province.name_en));
      })
      .catch((error) => console.log(error));
  }, []);

  function handleProvinceChange(event) {
    setSelectedProvince(event.target.value);
  }

  let endpoint = "http://localhost:3000/api/v1/campgrounds";
  if (selectedProvince !== "") {
    endpoint += `?province=${selectedProvince}`;
  }

  function handleSearch() {
    // Fetch campgrounds by selected province
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setCampgrounds(data.data);
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-3 mb-3">
              <div className="form-group">
                <label htmlFor="province-select" className="search_label">
                  Please select the province you want to reserve.
                </label>
                <select
                  className="form-control"
                  id="province-select"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">-- Select Province --</option>
                  {provinceOptions.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <button className="search_btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedProvince === "" ? (
        <>
          <h2>All Camps</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {campgrounds.map((campground, index) => (
              <div key={campground._id} className="col">
                <div className="card mb-3 mt-0">
                  {/* eslint-disable-next-line */}
                  <img
                    className="card-img-top"
                    src={myImage}
                    alt="Empty Image"
                  />
                  <div className="card-body">
                    <p>
                      <b>Name: </b>
                      {campground.name}
                    </p>
                    <p>
                      <b>Address: </b>
                      {campground.address}
                    </p>
                    <p>
                      <b>District: </b>
                      {campground.district}
                    </p>
                    <p>
                      <b>Region: </b>
                      {campground.region}
                    </p>
                    <p>
                      <b>Province: </b>
                      {campground.province}
                    </p>
                    <p>
                      <b>Postal Code: </b>
                      {campground.postalcode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <>
            <h2>{campgrounds[0].province} Camps</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {campgrounds.map((campground, index) => (
                <div key={campground._id} className="col">
                  <div className="card mb-3 mt-0">
                    {/* eslint-disable-next-line */}
                    <img
                      className="card-img-top"
                      src={myImage}
                      alt="Empty Image"
                    />
                    <div className="card-body">
                      <p>
                        <b>Name: </b>
                        {campground.name}
                      </p>
                      <p>
                        <b>Address: </b>
                        {campground.address}
                      </p>
                      <p>
                        <b>District: </b>
                        {campground.district}
                      </p>
                      <p>
                        <b>Region: </b>
                        {campground.region}
                      </p>
                      <p>
                        <b>Province: </b>
                        {campground.province}
                      </p>
                      <p>
                        <b>Postal Code: </b>
                        {campground.postalcode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        </>
      )}
    </div>
  );
}

export default Home;
