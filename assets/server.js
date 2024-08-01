const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Discord = require("discord.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Discord Bot setup
const client = new Discord.Client();


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

// Endpoint to handle Roblox purchase requests
app.post("/purchase", (req, res) => {
  const itemId = req.body.itemId; // The ID of the purchased item
  const userId = req.body.userId; // The ID of the player making the purchase

  // Validate the purchase
  const purchasedItem = storeItems.find((item) => item.id === itemId);
  if (!purchasedItem) {
    return res.json({ success: false, message: "Invalid item ID" });
  }

  // Process the purchase and provide the item to the player
  // Your logic here...

  // Send a message to Discord with a link
  const player = client.users.cache.get(userId);
  if (player) {
    const message = `Thank you for your purchase! Here is your link: YOUR_LINK_HERE`;

    // Send a message to the specified Discord channel
    const channelId = "1191960129374007358"; // Replace with your actual Discord channel ID
    const channel = client.channels.cache.get(channelId);
    if (channel && channel.type === "text") {
      channel.send(message);
    }
  }

  // Respond to Roblox indicating the result of the purchase
  res.json({ success: true, message: "Purchase successful" });
});

app.get("/", (req, res) => {
  res.send("Hello, Glitch!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
