import "./ParticularCommunity.css";
import { HomePost } from "../HomePost";
// import CommunityJson from "../../CommunityJson";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const ParticularCommunity = () => {
  const [CommunityJson, setCommunityJson] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // particular community fetch will get me all the post of that community and this particular comm. data

    const fetchData = async () => {
      try {
        // console.log(`${process.env.REACT_APP_BACKEND_URL}/api/posts`);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/communities`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
        console.log(data.communities.find((s) => s.communityId === id));
        // const partCommunity  = data.communities.
        setCommunityJson(data.communities.find((s) => s.communityId === id));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
            <HomePost />
          </div>
          {/* <div className="particular-anime-info">
            <span className="about-anime-info">About</span>
            <hr></hr>
            <div className="anime-info-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              fuga quod omnis ad, quis quam alias nulla natus eius molestias!
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
