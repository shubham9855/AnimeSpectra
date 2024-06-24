import "./ParticularCommunity.css";
import { HomePost } from "../HomePost";
// import CommunityJson from "../../CommunityJson";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const ParticularCommunity = () => {
  const [CommunityJson, setCommunityJson] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    // particular community fetch will get me all the post of that community and this particular comm. data

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/communities/id`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("data", data);
        setCommunityJson(data.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch data, Go to home page </div>;
  }

  return (
    <>
      <div className="particular-main">
        <div className="particular-header">
          <div className="thumnail-img-box">
            <img className="thumbnail-img" src={CommunityJson.imageUrl}></img>
          </div>
          <div className="community-thumbnail">
            {CommunityJson.communityName}
          </div>
        </div>
        <hr></hr>
        <div className="particular-body">
          <div className="particular-content">
            <HomePost Posts={CommunityJson} />
          </div>
        </div>
      </div>
    </>
  );
};
