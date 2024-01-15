import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Products.css";

const Products = () => {
  const navigation = useNavigate();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token == null) {
      navigation("/loginpage");
    }

    async function fetchData() {
      try {
        const headers = {
          Authorization: "Bearer " + token,
        };
        const response = await axios.get(
          "https://junior-test.mntzdevs.com/api/products/",
          { headers }
        );
        const products = response.data.products;
        setData(products);
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
    fetchData();
  }, []);

  const flattenJSON = (data) => {
    const flattenedData = [];
    for (const key in data) {
      const product = data[key];
      flattenedData.push({
        id: key,
        name: product.name,
        price: product.price,
      });

      if (product.linkedProducts) {
        flattenedData.push(...flattenJSON(product.linkedProducts));
      }
    }
    return flattenedData;
  };

  const filterDuplicates = (data) => {
    const uniqueData = [];
    const seenIds = new Set();

    data.forEach((item) => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        uniqueData.push(item);
      }
    });

    return uniqueData;
  };

  const applyFilters = (data) => {
    return data.filter(
      (item) =>
        (nameFilter === "" ||
          item.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (priceFilter === "" || item.price.toString().includes(priceFilter))
    );
  };

  // Calculate total pages based on the flattened and filtered data
  const flattenedAndFilteredData = applyFilters(
    filterDuplicates(flattenJSON(data))
  );
  const totalPages = Math.ceil(flattenedAndFilteredData.length / pageSize);

  // Slice the data to get the items for the current page
  const paginatedData = flattenedAndFilteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="products-wrapper">
      <div className="products">
        <div className="products-table">
          {/* Filter inputs */}
          <label className="search-label">
            Name:
            <input
              className="name-input"
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </label>
          <label className="search-label">
            Price:
            <input
              className="price-input"
              type="text"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="page-table">
          <label>
            Page Size:
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
        </div>

        <div className="pagination">
          {/* Pagination buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
