import React, { useState, useEffect } from "react";

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

  function handleSearch() {
    // Fetch campgrounds by selected province
    fetch(
      `http://localhost:3000/api/v1/campgrounds?province=${selectedProvince}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCampgrounds(data.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-3">
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
                  <option>-- Select Province --</option>
                  {provinceOptions.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="search_btn"
                onClick={handleSearch}
                disabled={!selectedProvince}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {campgrounds.length > 0 ? (
        <div>
          <h2>Our Camps</h2>
          {campgrounds.map((campground) => (
            <div key={campground._id} className="result_card">
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
          ))}
        </div>
      ) : (
        <>
          <h2>Campgrounds not available</h2>
        </>
      )}
    </div>
  );
}

export default Home;
