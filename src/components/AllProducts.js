import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcFullTrash } from "react-icons/fc";

const AllProducts = () => {
  const [productsList, setProductList] = useState([]);

  useEffect(() => {
    productsResult();
  }, []);

  const deleteProduct=async(productId)=>{
    try {

      const response=await axios.delete(`http://localhost:4000/product/${productId}`)
      if(response.status){
        setProductList(productsList.filter((product)=>product._id!==productId))
        alert('Product Deleted Successfully');
      }
      
    } catch (error) {
      console.log('Failed To Delete The Product')
      
    }

  }

  const productsResult = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const result = await axios.get(
        `http://localhost:4000/product/${firmId}/products`
      );
      setProductList(result.data.products);
      console.log(result);
    } catch (error) {
      console.log("Failed to load products", error);
    }
  };
  return (
    <>
      {productsList.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              {/* <th scope="col">Description</th> */}
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    {/* <td>{item.description}</td> */}
                    <td>
                      {item.image ? (
                        <img style={{height:'50px',width:'50px'}}
                          src={`http://localhost:4000/uploads/${item.image}`}
                          alt={item.productName}
                        />
                      ):(
                        <p>No Image Found</p>
                      )
                      }
                    </td>
                    <td>
                      <button className="del-button" onClick={()=>deleteProduct(item._id)}><FcFullTrash /></button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllProducts;
