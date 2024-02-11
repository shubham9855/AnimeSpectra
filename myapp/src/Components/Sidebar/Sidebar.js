import "./Sidebar.css";
import img from "../../images/one-piece.jpg";
export const Sidebar = () => {
  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar-heading">Top Communities.</div>
        <div className="sidebar-box">
          <img src={img} alt="one-piece" className="box-img" />
          {/* <div>one-piece</div> */}
        </div>
        <div className="sidebar-box">
          <img src={img} alt="one-piece" className="box-img" />
        </div>
        <div className="sidebar-box">
          <img src={img} alt="one-piece" className="box-img" />
        </div>
      </div>
    </>
  );
};
