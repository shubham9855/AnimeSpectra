import "./Interest.css";
import one_piece from "../../images/one-piece.jpg";
import { useState } from "react";
import CommunityJson from "../../CommunityJson";

export const Interest = () => {
  const [style, setStyle] = useState({});
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <form>
        <div className="interest-main-container">
          {CommunityJson.map((item, index) => {
            return (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="languages"
                  value={item.name}
                  id={index}
                  // onChange={handleChange}
                ></input>
                <label className="form-check-label" htmlFor={index}>
                  <div
                    style={style}
                    className="interest-box"
                    onClick={() => setStyle({ backgroundColor: "#00B1E1" })}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="interest-box-img"
                    />
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </form>
      {/* </div> */}
    </>
  );
};
