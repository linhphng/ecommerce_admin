import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(event) {
    event.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update product
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create product
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <label>Description</label>
      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      ></input>
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
