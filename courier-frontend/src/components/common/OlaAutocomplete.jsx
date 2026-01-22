import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const styles = {
  wrapper: {
    width: "420px",
    position: "relative",
    fontFamily: "Inter, sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "6px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxHeight: "260px",
    overflowY: "auto",
    zIndex: 10,
  },
  item: {
    padding: "10px 14px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
  },
  loading: {
    padding: "12px",
    textAlign: "center",
    color: "#666",
  },
  noResult: {
    padding: "12px",
    textAlign: "center",
    color: "#999",
  },
};


const OlaAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);
  const isSelectingRef = useRef(false);

  // Debounced API call
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSelectingRef.current) {
        isSelectingRef.current = false;
        return;
      }

      if (query.trim().length > 0) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (input) => {
    try {
      setLoading(true);
      setOpen(true);

      const response = await axios.get(
        "http://localhost:5000/api/olamaps/autocomplete",
        { params: { input } }
      );

      setSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error("Autocomplete error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place) => {
    isSelectingRef.current = true;

    const selectedPlace = {
      description: place.description,
      lat: place.geometry?.location?.lat,
      lng: place.geometry?.location?.lng,
      raw: place,
    };

    setQuery(place.description);
    setSuggestions([]);
    setOpen(false);

    if (onSelect) {
      onSelect(selectedPlace);
    }
  };

  return (
    <div ref={containerRef} style={styles.wrapper}>
      <input
        type="text"
        value={query}
        placeholder="Search location..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setOpen(true)}
        style={styles.input}
      />

      {open && (
        <div style={styles.dropdown}>
          {loading && <div style={styles.loading}>Loading...</div>}

          {!loading && suggestions.length === 0 && (
            <div style={styles.noResult}>No results found</div>
          )}

          {!loading &&
            suggestions.map((item, index) => (
              <div
                key={index}
                style={styles.item}
                onClick={() => handleSelect(item)}
              >
                {item.description}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OlaAutocomplete;
