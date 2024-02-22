import "./Communities.css";
import one_piece from "../../images/one-piece.jpg";
// import naruto from "../../images/naruto.jpeg";
// import solo_leveling from "../../images/solo_leveling.jpeg";
import CommunityJson from "../../CommunityJson";

export const Communities = () => {
  const Community_list_dec = CommunityJson.slice().sort(
    (a, b) => b.Total_posts - a.Total_posts
  );
  console.log(CommunityJson);
  return (
    <>
      <div className="communities-main-container">
        {Community_list_dec.map((item) => {
          console.log(item.img);
          return (
            <div className="communities-box">
              <img
                src={item.img}
                alt={item.name}
                className="communities-box-img"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
