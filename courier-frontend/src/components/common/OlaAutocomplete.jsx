import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { callOlaAutoCompleteApi } from "../../api/customer";

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

const OlaAutocomplete = (props) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const debounceRef = useRef(null);


  useEffect(() => {
    if (isSelected) return;
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout( () => {
            autoCompleteApi(query)
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query, isSelected]);

  const autoCompleteApi = async (query) => {
     try {
        const res = await callOlaAutoCompleteApi(query)
        console.log(res)
        setSuggestions(res?.data?.predictions || []);
      } catch (err) {
        console.log(err.response);
        console.error(err);
      }
  }

  const handleSelect = (item) => {
    const selectedAddress = item.description;

    setQuery(selectedAddress);
    setSuggestions([]);
    setIsSelected(true);

    props?.setLocation({
      address: item.terms[0]?.value,
      lat: item.geometry?.location?.lat,
      lng: item.geometry?.location?.lng,
    });
  };

  return (
    <div className="relative">
      <p className="text-gray-700 mb-2">{props?.placeholder}</p>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsSelected(false); // 🔁 allow searching again
        }}
        className="w-full border rounded-lg p-2 focus:ring focus:ring-orange-200"
        placeholder="Search area, landmark, street, city.."
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg shadow mt-1 max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OlaAutocomplete;
