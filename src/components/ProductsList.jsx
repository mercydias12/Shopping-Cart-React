import { useEffect, useState } from "react";
import { GetProducts } from "./GetProducts";
import Card from "./Card";

export const ProductsList = () => {
  const [data, setData] = useState([]);

  const getProductsData = async () => {
    try {
      const response = await GetProducts();
      setData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 sm:p-6">
      {data.map((product) => (
        <li key={product.id}>
          <Card productData={product} />
        </li>
      ))}
    </ul>
  );
};
