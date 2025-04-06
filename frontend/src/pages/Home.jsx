import React, { useState, useEffect } from "react";
import list_view from "../images/list_view.png";
import map_pin from "../images/map_pin.png";
import wishlist from "../images/wishlist.png";
import home from "../images/home.png";

const Home = () => {
  const [data, setData] = useState(null);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ticker`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setCurrentProperty(result.property_listing[1]); // Set the first property as the current property
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePropertyClick = (property) => {
    setCurrentProperty(property);
  };

  const getLastBidDifferenceColor = (property) => {

    if (!property || property.last_bid_difference === undefined) {
      return 'text-gray-600'; // Default color if property is not defined
    }

    return property.last_bid_difference > 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center font-poppins"
      style={{ backgroundImage: `url('${currentProperty?.images[0]}')` }}
    >
      <div className="absolute top-0 w-full h-[240px] px-16 flex items-center justify-between bg-white bg-opacity-60 backdrop-blur-lg z-10">
        <div className="flex items-center justify-center w-[200px]">
          <img src={list_view} alt="Notepad Icon" className="w-70 h-95" />
        </div>

        <div className="flex flex-col items-center justify-center w-[300px]">
          <span className="text-base text-gray-700 header-text">Own</span>
          <h1 className="header-heading-text text-black">
            {currentProperty?.street_address}
          </h1>
          <span className="text-sm text-gray-600 header-text">
            {currentProperty?.city ?? 'City'}, {currentProperty?.state ?? 'State'}{" "}
            {currentProperty?.zip ?? '0000000'}
          </span>
        </div>

        <div className="flex items-center justify-center w-[150px]">
          <img src={map_pin} alt="Location Icon" className="w-70 h-95" />
        </div>

        <div className="flex flex-col items-center justify-center w-[240px] text-center">
          <div className="text-sm text-gray-600 header-text">To</div>
          <div className="header-heading-text">Start</div>
          <div className="text-sm text-gray-600 header-text">Place deposit</div>
        </div>

        <div className="flex items-center justify-center w-[200px]">
          <img src={wishlist} alt="Bookmark Icon" className="w-70 h-95" />
        </div>

        <div className="flex flex-col items-center justify-center w-[300px] text-center">
          <div className="text-sm text-gray-700 uppercase header-text">Market Value</div>
          <div className="header-heading-text">
            ${currentProperty?.market_value}
          </div>
          <div className="text-sm text-gray-700 header-text">Reserve Price</div>
          <div className="header-heading-text">
            ${currentProperty?.reservation_price}
          </div>
        </div>

        <div className="flex items-center justify-center w-[120px]">
          <img src={home} alt="Home Icon" className="w-70 h-95" />
        </div>
      </div>

      <div className="absolute top-[240px] w-full h-[60px] flex items-center bg-gray-100 border-t border-b border-gray-300 z-10" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
        <div className="flex items-center justify-left w-1/4 text-center">
          <div>
            <div className="text-lg font-semibold text-red-600">Outbid</div>
            <div className="text-lg text-gray-700">{data.your_bids.outbid}</div>
          </div>
          <div className="mx-4">
            <div className="text-lg font-semibold text-yellow-600">Active</div>
            <div className="text-lg text-gray-700">{data.your_bids.active}</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">Winning</div>
            <div className="text-lg text-gray-700">{data.your_bids.winning}</div>
          </div>
        </div>

        <div className="flex items-center justify-left w-1/2 text-center" style={{ justifyContent: "space-evenly", cursor: "pointer"}}>
          {data.property_listing.map((property, index) => (
            <div key={index} className={`mx-4 ${property.id === currentProperty.id ? 'active-property' : ''}`} onClick={() => handlePropertyClick(property)}>
              <div className="text-lg font-semibold text-gray-800">
                {property?.street_address || ''}
              </div>
              <div className="text-lg">
                <span className={`mr-5 ${getLastBidDifferenceColor(property)}`}>${property?.last_bid_difference}</span> ${property?.current_winning_bid || ''}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center w-1/4 text-center" style={{ justifyContent: "flex-end"}}>
          <div>
            <div className="text-lg font-semibold text-green-600">Winning</div>
            <div className="text-lg text-gray-700">
              ${data.your_bid_amounts.winning}
            </div>
          </div>
          <div className="mx-4">
            <div className="text-lg font-semibold text-yellow-600">Active</div>
            <div className="text-lg text-gray-700">
              ${data.your_bid_amounts.active}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-red-600">Outbid</div>
            <div className="text-lg text-gray-700">
              ${data.your_bid_amounts.outbid}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[750px] left-[1100px] w-[420px]">
        <div className="relative w-[380px] h-[373px]">
            <div className="absolute left-0 top-0 h-full w-2 bg-blue-600"></div>

            <div className="absolute left-0 top-0 w-full h-8 bg-white bg-opacity-80 border border-blue-600 flex items-center justify-center font-semibold text-gray-800 text-sm rounded-t-md shadow">
                Public Auction
            </div>

            {/* Sign Box (Frosted Glass Effect) */}
            <div className="absolute top-10 left-6 w-[340px] h-[280px] bg-white/60 backdrop-blur-md border-4 border-blue-600 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
                <div className="text-gray-900 font-semibold text-lg mb-2">
                Market Value ${currentProperty?.market_value}
                </div>
                <div className="text-gray-700 text-md mb-1">{currentProperty?.street_address}</div>
                <div className="text-sm text-gray-500 mb-3">
                {`${currentProperty?.city ?? 'City'}, ${currentProperty?.state ?? 'State'} ${currentProperty?.zip ?? '0000000'}`}
                </div>
                <div className="text-sm text-gray-800">
                Reserve Bid <span className="font-bold">${currentProperty?.reservation_price}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
