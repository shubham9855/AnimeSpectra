import "./Sidebar.css";
import img from "../../images/one-piece.jpg";
import CommunityJson from "../../CommunityJson";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
export const Sidebar = () => {
  const navigate = useNavigate();
  const Community_list_dec = useSelector(
    (state) => state.communityreducer.community
  );
  console.log(Community_list_dec);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/communities`
  //       );
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await res.json();
  //       setCommunityData(data.communities);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  //   // setCommunityData(CommunityJson);
  // }, []);
  const handleOnClick = () => {
    navigate("/communities");
  };

  // const Community_list_dec = CommunityJson.slice().sort(
  //   (a, b) => b.Total_posts - a.Total_posts
  // );
  const Top_comm = Community_list_dec.slice(0, 3);
  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar-heading">Top Communities</div>
        {Top_comm.map((item) => {
          return (
            <div className="sidebar-box" onClick={handleOnClick}>
              <img src={item.imageUrl} alt={item.name} className="box-img" />
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
