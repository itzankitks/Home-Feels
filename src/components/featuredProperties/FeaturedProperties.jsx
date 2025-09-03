import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=4"
  );

  if (loading) return <div>Loading please wait...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !Array.isArray(data)) return <div>No properties found</div>;

  return (
    <div className="fp">
      {data.map((item) => (
        <div className="fpItem" key={item._id}>
          <img
            src={item.photos?.[0] || "/no-image.jpg"}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && (
            <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
