const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sample store data (replace with your actual data)
const storeItems = [
  {
    id: 1,
    name: "Clocking System",
    price: 54,
    image: 16141263907,
    purchase: 1742823251,
    desc: "Get the most out of your employees! Be able to know when they check in and take breaks. Inspired by Kybo's Clock In system its just that I built it quicker than them lol.(Exact same thing)",
  },
  {
    id: 2,
    name: "Item 2",
    price: 30,
    image: 16072285822,
    purchase: 4,
    desc: "LALALALL",
  },
  {
    id: 3,
    name: "Hello",
    price: 30,
    image: 16072285822,
    purchase: 4,
    desc: "LALALALL",
  },
  // Add more items as needed
];

// Endpoint to provide item data
app.get("/getitems", (req, res) => {
  res.json(storeItems);
});



 

app.get("/", (req, res) => {
  res.send("Hello, Glitch!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
