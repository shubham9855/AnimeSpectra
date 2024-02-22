import "./Sidebar.css";
import img from "../../images/one-piece.jpg";
import CommunityJson from "../../CommunityJson";

export const Sidebar = () => {
  const Community_list_dec = CommunityJson.slice().sort(
    (a, b) => b.Total_posts - a.Total_posts
  );
  const Top_comm = Community_list_dec.slice(0, 3);
  console.log(Community_list_dec);
  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar-heading">Top Communities.</div>
        {Top_comm.map((item) => {
          return (
            <div className="sidebar-box">
              <img src={item.img} alt={item.name} className="box-img" />
            </div>
          );
        })}
      </div>
    </>
  );
};
