import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";

const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openClendar, setOpenCalendar] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openCount, setOpenCount] = useState(false);
    const [count, setCount] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleCount = (name, operation) => {
        setCount((prev) => {
            return {
                ...prev,
                [name]:
                    operation === "i" ? count[name] + 1 : count[name] - 1,
            };
        });
    };

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
            payload: { destination, dates: date, options: count },
        });
        navigate("/hotels", { state: { destination, dates: date, options: count } });
    };

    return (
        <div className="header">
            <div
                className={
                    type === "list"
                        ? "headerContainer listMode"
                        : "headerContainer"
                }
            >
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant
                            savings of 10% or more with a free Lamabooking
                            account
                        </p>
                        {!user && (
                            <button className="headerBtn">
                                Sign in / Register
                            </button>
                        )}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon
                                    icon={faBed}
                                    className="headerIcon"
                                />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="headerSearchInput"
                                    onChange={(e) =>
                                        setDestination(e.target.value)
                                    }
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="headerIcon"
                                />
                                <span
                                    onClick={() => setOpenCalendar(!openClendar)}
                                    className="headerSearchText"
                                >{`${format(
                                    date[0].startDate,
                                    "MM/dd/yyyy"
                                )} to ${format(
                                    date[0].endDate,
                                    "MM/dd/yyyy"
                                )}`}</span>
                                {openClendar && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) =>
                                            setDate([item.selection])
                                        }
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon
                                    icon={faPerson}
                                    className="headerIcon"
                                />
                                <span
                                    onClick={() => setOpenCount(!openCount)}
                                    className="headerSearchText"
                                >{`${count.adult} adult · ${count.children} children · ${count.room} room`}</span>
                                {openCount && (
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">
                                                Adult
                                            </span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={
                                                        count.adult <= 1
                                                    }
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleCount(
                                                            "adult",
                                                            "d"
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {count.adult}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleCount(
                                                            "adult",
                                                            "i"
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">
                                                Children
                                            </span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={
                                                        count.children <= 0
                                                    }
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleCount(
                                                            "children",
                                                            "d"
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {count.children}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleCount(
                                                            "children",
                                                            "i"
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">
                                                Room
                                            </span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={count.room <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleCount(
                                                            "room",
                                                            "d"
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {count.room}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleCount(
                                                            "room",
                                                            "i"
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <button
                                    className="headerBtn"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
