const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const path = require("path");

// Serve static files (frontend)
app.use(express.static(__dirname));

// Show index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// MongoDB connection string - UPDATE THIS with your MongoDB connection stringconst MONGODB_URI = process.env.MONGO_URI;
const MONGODB_URI = process.env.MONGO_URI;
const DB_NAME = 'academy_management';

let db;
let client;

// Connect to MongoDB 
async function connectDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
}

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const collection = db.collection('academy_data');
    const data = await collection.find({}).toArray();
    // Map MongoDB _id to __backendId for compatibility
    const mappedData = data.map(item => ({
      ...item,
      __backendId: item._id.toString()
    }));
    res.json(mappedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Create new data
app.post('/api/data', async (req, res) => {
  try {
    const collection = db.collection('academy_data');
    const result = await collection.insertOne(req.body);
    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ error: 'Failed to create data' });
  }
});

// Update data
app.put('/api/data/:id', async (req, res) => {
  try {
    const collection = db.collection('academy_data');
    const { _id, __backendId, ...updateData } = req.body;
    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// Delete data
app.delete('/api/data/:id', async (req, res) => {
  try {
    const collection = db.collection('academy_data');
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

// Start server
connectDB().then((connected) => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (!connected) {
      console.log('⚠️  Running without database connection');
    }
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
  }
  process.exit(0);
});
