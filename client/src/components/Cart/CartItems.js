import React, { useEffect, useState } from "react";
import { Table } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import cartReducer from "../../redux/reducers/cartReducer";
import ItemQty from "./ItemQty";
import { FiDelete } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart } from "../../redux/actions/actionCart";
import "./Cart.css";

const CartItems = () => {
  const [total, setTotal] = useState();

  const { cartItems } = useSelector((state) => state.cartReducer);
  console.log(cartItems);
  const calculateAmount = (quantity, price) => {
    const quantityNumber = parseFloat(quantity) || 1;
    const priceNumber = parseFloat(price) || 0;
    let amount = 0;

    if (quantityNumber && priceNumber) {
      amount = quantityNumber * priceNumber;
    }
    return amount.toFixed(2);
  };

  useEffect(() => {
    let total = 0;

    cartItems.forEach((el) => {
      total += parseFloat(calculateAmount(el.qty, el.product.price));
    });

    setTotal(total);
  }, [total, cartItems]);

  const dispatch = useDispatch();
  return (
    <div>
      <Table
        css={{
          height: "auto",
          minWidth: "40%",
          width: "100%",
        }}
      >
        <Table.Header>
          <Table.Column className=" title">Product Image</Table.Column>
          <Table.Column className=" title">Name Product</Table.Column>
          <Table.Column className=" title">Price</Table.Column>
          <Table.Column className=" title">Available</Table.Column>
          <Table.Column className=" title">Quantity</Table.Column>
          <Table.Column className=" title">Delete</Table.Column>
        </Table.Header>

        <Table.Body>
          {cartItems.map((el, index) => (
            <Table.Row key={index} className="desc">
              <Table.Cell>
                <img
                  className="imageCart"
                  src={el.product.cover.front}
                  alt=""
                />
              </Table.Cell>
              <Table.Cell className="desc">{el.product.productName}</Table.Cell>
              <Table.Cell className="desc">{el.product.price} TND</Table.Cell>
              <Table.Cell className="desc">{el.product.avQuantity}</Table.Cell>
              <Table.Cell>
                {" "}
                <ItemQty el={el} />
              </Table.Cell>
              <Table.Cell>
                {" "}
                <AiFillDelete
                  onClick={() => dispatch(removeFromCart(el.product))}
                >
                  <FiDelete />
                </AiFillDelete>{" "}
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>{total} TND</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default CartItems;
