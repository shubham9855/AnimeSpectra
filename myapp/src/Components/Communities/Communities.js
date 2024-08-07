import "./Communities.css";
import one_piece from "../../images/one-piece.jpg";
// import naruto from "../../images/naruto.jpeg";
// import solo_leveling from "../../images/solo_leveling.jpeg";
// import CommunityJson from "../../CommunityJson";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setcommunity } from "../../redux/action/communityaction";

export const Communities = () => {
  const [Communitydata, setCommunityData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/communities?limit=50`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("community", data);
        dispatch(setcommunity(data.communities));
        setCommunityData(data.communities);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    // setCommunityData(CommunityJson);
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div className="main-community">
        <div className="communities-heading">Communities</div>
        <hr></hr>
        <div className="communities-main-container">
          {Communitydata.map((item) => {
            return (
              <Link
                to={`/communities/${item.communityId}`}
                className="link-community-box"
              >
                <div className="communities-box">
                  <img
                    src={item.imageUrl}
                    alt={item.communityName}
                    className="communities-box-img"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
