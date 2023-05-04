import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function Edit() {
  const { campId } = useParams();
  const [campData, setCampData] = useState({});
  const [provinceOptions, setProvinceOptions] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [province, setProvince] = useState("");
  const [telephone, setTelephone] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/campgrounds/${campId}`)
      .then((response) => response.json())
      .then((data) => setCampData(data.data))
      .catch((error) => console.log(error));
  }, [campId]);

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

  useEffect(() => {
    if (campData.name) {
      setName(campData.name);
    }
    if (campData.address) {
      setAddress(campData.address);
    }
    if (campData.district) {
      setDistrict(campData.district);
    }
    if (campData.region) {
      setRegion(campData.region);
    }
    if (campData.postalcode) {
      setPostalcode(campData.postalcode);
    }
    if (campData.province) {
      setProvince(campData.province);
    }
    if (campData.telephone) {
      setTelephone(campData.telephone);
    }
  }, [campData]);

  function handleProvinceChange(event) {
    setProvince(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  function handleDistrictChange(event) {
    setDistrict(event.target.value);
  }

  function handleRegionChange(event) {
    setRegion(event.target.value);
  }

  function handlePostalChange(event) {
    setPostalcode(event.target.value);
  }

  function handleTelChange(event) {
    setTelephone(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with formData, such as submit it to a server
    fetch(`http://localhost:3000/api/v1/campgrounds/${campId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        address,
        district,
        region,
        postalcode,
        province,
        telephone,
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
    navigate("/campgrounds");
  };

  return (
    <>
      {role === "admin" ? (
        <div>
          <div className="top_inform">
            <Link
              className="link_inform"
              onClick={() => {
                navigate(-1);
              }}
            >
              <FaArrowAltCircleLeft /> &nbsp;Back
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>Edit {campData.name}'s Campground</h1>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div class="form-group">
              <label for="district">District</label>
              <input
                type="text"
                className="form-control"
                id="district"
                value={district}
                onChange={handleDistrictChange}
              />
            </div>
            <div class="form-group">
              <label for="region">Region</label>
              <input
                type="text"
                className="form-control"
                id="region"
                value={region}
                onChange={handleRegionChange}
              />
            </div>
            <div class="form-group">
              <label for="postalcode">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postalcode"
                value={postalcode}
                onChange={handlePostalChange}
              />
            </div>
            <div class="form-group">
              <label for="province">Province</label>
              <select
                className="form-control"
                id="province-select"
                value={province}
                onChange={handleProvinceChange}
              >
                {provinceOptions.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="tel">Telephone Number</label>
              <input
                type="text"
                className="form-control"
                id="tel"
                value={telephone}
                onChange={handleTelChange}
              />
            </div>
            <button type="submit" className="btn">
              Edit campground
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>You are not authorized for this route</h1>
          <Link
            className="link_inform"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back to Home
          </Link>
        </div>
      )}
    </>
  );
}

export default Edit;
