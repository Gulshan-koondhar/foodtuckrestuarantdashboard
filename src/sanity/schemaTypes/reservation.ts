export default {
  name: "reservation",
  title: "Reservations",
  type: "document",
  fields: [
    { name: "customerName", title: "Customer Name", type: "string" },
    { name: "tableNo", title: "Table No", type: "number" },
    { name: "noOfPersons", title: "No of Persons", type: "number" },
    { name: "dateTime", title: "Date & Time", type: "datetime" },
    { name: "contactNumber", title: "Contact Number", type: "string" },
    { name: "email", title: "Email Address", type: "string" },
    { name: "specialRequests", title: "Special Requests", type: "text" },
    { name: "status", title: "Status", type: "string" },
  ],
};
