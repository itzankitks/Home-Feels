import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]); // ✅ start with []
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${url}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(fullUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setData(result || []); // fallback safe
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData([]); // safe fallback
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fullUrl]); // ✅ depend on fullUrl, not just url

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setData(result || []); // safe fallback
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setData([]); // safe fallback
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
