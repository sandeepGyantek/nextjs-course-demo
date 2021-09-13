import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { useState, useEffect } from 'react';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://picsum.photos/seed/picsum/200/300',
//         address: 'Some address 5, 23243 some city',
//         description: 'This is a First Meetup'
//     },

//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://picsum.photos/seed/picsum/200/300',
//         address: 'Some address 5, 23243 some city',
//         description: 'This is a Second Meetup'
//     },

// ]


function HomePage(props) {
    // const [loadedMeetups, setlLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     ///Fetch data from server 


    //     setlLoadedMeetups(DUMMY_MEETUPS);
    // },[])

    return(
        <>
        <Head> 
            <title> React meetups </title>
            <meta 
                name='description'
                content='Browse a huge list of highly active react meetups'
            />
        </Head>
             <MeetupList meetups={props.meetups} />
        </>
    ) 
}

export async function getStaticProps(){
///fetch data from api
        const client = await MongoClient.connect('mongodb+srv://Sandeep:Gyantek2021@cluster0.2r23m.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();



    return{
        props: {
            meetups: meetups.map(meetup =>({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1   
    };
}

// export async function getServerSideProps(contex) {
//     const req = context.req;
//     const res = context.res;

//     return{
//         props:{
//             meetups: DUMMY_MEETUPS  
//         }
//     }
// };

export default HomePage;