import "./Sidebar.css";
import img from "../../images/one-piece.jpg";
import CommunityJson from "../../CommunityJson";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/communities");
  };

  const Community_list_dec = CommunityJson.slice().sort(
    (a, b) => b.Total_posts - a.Total_posts
  );
  const Top_comm = Community_list_dec.slice(0, 3);
  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar-heading">Top Communities</div>
        {Top_comm.map((item) => {
          return (
            <div className="sidebar-box" onClick={handleOnClick}>
              <img src={item.img} alt={item.name} className="box-img" />
            </div>
          );
        })}
        <div className="sidebar-info" style={{ marginTop: "30px" }}>
          Made with
          <span style={{ marginLeft: "7px", marginRight: "7px" }}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#dba570", fontSize: "20px" }}
            />
          </span>
          in India
        </div>
      </div>
    </>
  );
};
