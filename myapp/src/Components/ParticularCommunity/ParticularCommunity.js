import "./ParticularCommunity.css";
import { HomePost } from "../HomePost";
import CommunityJson from "../../CommunityJson";
import { useParams } from "react-router-dom";
export const ParticularCommunity = () => {
  const { id } = useParams();
  console.log(id);
  const community = CommunityJson.find((s) => s.id === parseInt(id));
  console.log(community);
  return (
    <>
      <div className="particular-main">
        <div className="particular-header">
          <div className="community-thumbnail">{community.name}</div>
        </div>
        <div className="particular-body">
          <div className="particular-content">
            <HomePost />
          </div>
          <div className="particular-anime-info">
            <span className="about-anime-info">About</span>
            <hr></hr>
            <div className="anime-info-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              fuga quod omnis ad, quis quam alias nulla natus eius molestias!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
