export default {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "customerName",
      type: "string",
      title: "Customer Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
    },
    {
      name: "address",
      type: "string",
      title: "Address",
    },
    {
      name: "city",
      type: "string",
      title: "City",
    },

    {
      name: "country",
      type: "string",
      title: "Country",
    },
    {
      name: "cartItems",
      type: "array",
      title: "Cart Items",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Product Name",
            },
            {
              name: "price",
              type: "number",
              title: "Price",
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity",
            },
            {
              name: "image",
              type: "string",
              title: "Image URL",
            },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
    },
    {
      name: "status",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "Pending" },
          { title: "Order Confirmed", value: "Confirmed" },
          { title: "Shipped", value: "Shipped" },
          { title: "Delivered", value: "Delivered" },
        ],
      },
      initialValue: "Pending",
    },
  ],
};
