import { useContext, useEffect, useState } from "react";
import "./reservation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
// import { useNavigate } from "react-router-dom";

const Reservation = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { data } = useFetch(`/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  // const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getDatesInRange = (startDate, endDate) => {
    // const start = new Date(startDate);
    // const end = new Date(endDate);
    const date = new Date(startDate.getTime());

    let list = [];

    while (date <= endDate) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log("All Dates:", allDates);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log("Selected Room:", selectedRooms);

  const handleCLick = async () => {
    if (selectedRooms.length === 0) {
      setErrorMsg(""); // Clear first to reset
      // Delay to force re-render
      setTimeout(() => {
        setErrorMsg("Please select at least one room.");
      }, 10); // Tiny delay
      return;
    }

    setErrorMsg(""); // Clear any previous error
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await fetch(`/api/rooms/availability/${roomId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dates: allDates }),
          });

          if (!res.ok) {
            throw new Error(`Failed to update room ${roomId}: ${res.status}`);
          }

          return res.json(); // if backend returns JSON
        })
      );

      setOpen(false);
    } catch (error) {
      console.error("Error updating rooms:", error);
    }
  };

  return (
    <div className="reservation">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <h2 style={{ paddingBottom: "8px" }}>Select your rooms:</h2>
        <div className="scrollable-content">
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.description}</div>
                <div className="rMax">
                  <span>
                    Max People: <b>{item.maxPeople}</b>
                  </span>
                  <div className="rPrice">{item.price}</div>
                </div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label
                      style={{
                        color: !isAvailable(roomNumber) ? "grey" : "black",
                      }}
                    >
                      {roomNumber.number}
                    </label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      disabled={!isAvailable(roomNumber)}
                      onChange={handleSelect}
                    />
                    {!isAvailable(roomNumber) && (
                      <div className="unavailable-note">
                        <span className="line">Already</span>
                        <span className="line">Reserved</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errorMsg && (
          <div className="error-tooltip-overlay" key={errorMsg + Math.random()}>
            <div className="error-tooltip-content">
              {errorMsg}
              <div className="tooltip-arrow" />
            </div>
          </div>
        )}
        <button className="rButton" onClick={handleCLick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reservation;
