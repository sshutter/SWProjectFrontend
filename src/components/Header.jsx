import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { GiCampingTent } from "react-icons/gi";
import { HiSearchCircle } from "react-icons/hi";

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <div className="row">
          <div className="col">
            <GiCampingTent
              size={70}
              style={{
                color: "#304b2e",
              }}
            />
            <Link to="/">
              <h3
                style={{
                  fontSize: "2em",
                  fontWeight: "bolder",
                }}
              >
                แคมป์กาว
              </h3>
            </Link>
          </div>
          <div className="col">
            <HiSearchCircle
              size={70}
              style={{
                color: "#304b2e",
              }}
            />

            <Link to="/campgrounds" className="search_link">
              <h3
                style={{
                  fontSize: "2em",
                  fontWeight: "600",
                }}
              >
                Search
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn btn-dark" onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                style={{
                  color: "#304b2e",
                }}
              >
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link
                to="register"
                style={{
                  color: "#304b2e",
                }}
              >
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
