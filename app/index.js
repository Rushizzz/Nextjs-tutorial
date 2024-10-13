const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors"); // Import CORS
const { S3 } = require("@aws-sdk/client-s3"); // Import S3 client from AWS SDK v3
const serverless = require("serverless-http"); // Import serverless-http

// MongoDB connection URI and client setup
const uri = "mongodb+srv://harshu592002:Harshu*12345@cluster0.tv3mu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// AWS S3 configuration
const s3 = new S3({
  region: "ap-south-1", // Specify your region
  credentials: {
    accessKeyId: "AKIA3MKATSR56HWCAF7Z",
    secretAccessKey: "PBKJAh1pJyVBFnaydciiWRrL3A9/L7Z6m2wgm6Ge",
  },
});

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "2mb" })); // Increase the limit as needed
app.use(cors()); // Use CORS middleware

// Global variables for MongoDB collections
let usersCollection;
let countersCollection;

// Initialize MongoDB client and set up collections
async function initializeMongoDB() {
  try {
    await client.connect(); // Attempt to connect to MongoDB

    const db = client.db("engineers_cell"); // Use static db_name
    usersCollection = db.collection("users"); // Set global usersCollection
    countersCollection = db.collection("counters"); // Set global countersCollection

    // Ensure counters collection exists and initialize it if not
    const counterExists = await countersCollection.findOne({ _id: "platformId" });

    if (!counterExists) {
      await countersCollection.insertOne({ _id: "platformId", sequence_value: 0 });
      console.log("Initialized counters collection with default document.");
    }

    console.log("MongoDB connection established successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err); // Log the error
    throw new Error("Failed to connect to MongoDB. Please check your connection settings and try again."); // Propagate error
  }
}

// Middleware to initialize database before handling requests
app.use(async (req, res, next) => {
  if (!usersCollection || !countersCollection) {
    try {
      await initializeMongoDB(); // Initialize DB if not already done
      next(); // Proceed to the next middleware/route handler
    } catch (err) {
      return res.status(500).send("Failed to initialize database.");
    }
  } else {
    next(); // Proceed if already initialized
  }
});

// Function to upload an image to S3 using platformId
async function uploadImageToS3(imageBase64, platformId) {
  const buffer = Buffer.from(imageBase64, "base64");
  const fileName = `user_img/${platformId}.jpg`; // Use platformId for file name

  const params = {
    Bucket: "engineers-cell",
    Key: fileName,
    Body: buffer,
    ContentType: "image/jpeg", // Adjust based on your image type
  };

  try {
    await s3.putObject(params); // Use putObject instead of upload

    // Construct the S3 URL for the uploaded image
    const imageUrl = `https://${params.Bucket}.s3.ap-south-1.amazonaws.com/${params.Key}`;
    console.log("Constructed Image URL:", imageUrl); // Log the constructed URL
    return imageUrl; // Ensure the correct URL is returned
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
}

// Function to get next sequence value for platform ID
async function getNextSequenceValue() {
  const sequenceDocument = await countersCollection.findOne({ _id: "platformId" });

  if (!sequenceDocument) {
    throw new Error("Counter document not found.");
  }

  // Increment the sequence value
  await countersCollection.updateOne(
    { _id: "platformId" },
    { $inc: { sequence_value: 1 } }
  );

  return sequenceDocument.sequence_value; // Return the old value before increment
}

// Function to check if a user exists by email or phone
async function userExists(email, phone) {
  const user = await usersCollection.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  return user !== null; // Returns true if the user exists, false otherwise
}

// Route to add a user
app.post("/engineers-cell-register", async (req, res) => {
  const user = req.body; // Get the user data from the request body

  // Check if the user already exists by email or phone
  const exists = await userExists(user.email, user.phone);
  if (exists) {
    return res.status(409).send("User already registered with this email or phone number");
  }

  try {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format
    const seqNumber = await getNextSequenceValue(); // Get next sequence number
    const platformId = `NPSP${currentDate}${seqNumber}`; // Construct platformId

    user.platformId = platformId; // Add platformId to the user object

    // Upload image to S3 and get the URL if applicable
    if (user.prof_img) {
      const imageUrl = await uploadImageToS3(user.prof_img.split(",")[1], platformId);
      user.prof_img = imageUrl; // Update user object with the S3 URL
    }

    const result = await usersCollection.insertOne(user); // Insert user into MongoDB

    // Respond with the inserted ObjectId and platformId
    res.status(201).json({
      message: "User added successfully",
      insertedId: result.insertedId,
      platformId: platformId,
    });
  } catch (err) {
    console.error("Error during user addition:", err); // Log error
    res.status(500).send("Server error");
  }
});

// Route to get all users
app.get("/engineers-cell-users", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray(); // Retrieve all users

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).send("No users found");
    }
  } catch (err) {
    console.error("Error fetching users:", err); // Log error
    res.status(500).send("Server error");
  }
});

// Export the app wrapped in serverless-http for AWS Lambda
module.exports.handler = serverless(app);
