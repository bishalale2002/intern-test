import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);


  const [homeResetTrigger, setHomeResetTrigger] = useState(0);

  const limit = 12;

  

  // Fetch categories once
  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then((res) => {
      const cats = Array.isArray(res.data)
        ? res.data.map((c) => (typeof c === "string" ? { slug: c, name: c } : c))
        : [];
      setCategories(cats);
    });
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      let url = "";

      if (searchTrigger) {
        url = `https://dummyjson.com/products/search?q=${searchTrigger}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      try {
        const res = await axios.get(url);
        setProducts((prev) =>
          skip === 0 ? res.data.products : [...prev, ...res.data.products]
        );
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }

      setLoading(false);
    };

    loadProducts();
  }, [skip, category, searchTrigger, homeResetTrigger]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setSkip((prev) => prev + limit);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset Home (MyStore)
  const resetHome = () => {
    setCategory("");
    setSearch("");
    setSearchTrigger("");
    setProducts([]);
    setSkip(0);
    setHomeResetTrigger((prev) => prev + 1); // trigger fetch
  };

  return (
    <>
      <NavBar  onHomeClick={resetHome} />

      <div className="container py-4">
        <h2 className="mb-4 fw-bold text-center">🛍 Product List</h2>

        {/* Filters */}
        <div className="row mb-3">
          {/* Search */}
          <div className="col-md-4 mb-2 d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                setSkip(0);
                setProducts([]);
                setSearchTrigger(search);
              }}
            >
              Search
            </button>
          </div>

          {/* Category */}
          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSkip(0);
                setProducts([]);
                setSearchTrigger("");
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="row">
          {products.map((p) => (
            <div className="col-6 col-md-4 col-lg-3 mb-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center py-3">
            <div className="loader"></div>
            <p className="mt-2">Fetching products...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
