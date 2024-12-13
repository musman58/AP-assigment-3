import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://muhammadusman01645:Usman586..@cluster0.q1z7epv.mongodb.net/?retryWrites=true&w=majority';

async function handler(req, res) {
  const client = new MongoClient(uri);

 
    await client.connect();
    const db = client.db('BOOKSHOP');
    const collection = db.collection('search'); // Assuming the collection name is 'search'

    if (req.method === "POST") {
      const { url, userid } = req.body; // Extract search and userid from the body

      if (!url || !userid) {
        return res.status(400).json({ success: false, message: 'Search string and userid are required' });
      }
console.log(url);
      // Insert the new search entry into the collection
      const newSearchEntry = { url, userid, createdAt: new Date() }; // Add a timestamp or any other fields
      const result = await collection.insertOne(newSearchEntry);

     
      return res.status(201).json({ success: true, message: 'Search entry inserted successfully', data: newSearchEntry });
     
    } 
}

export default handler;
