import { MongoClient } from 'mongodb';
async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://Sandeep:Gyantek2021@cluster0.2r23m.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);

        client.close();
        res.status(201).json({ message: 'meetup inserted!' });
    }
}

export default handler;