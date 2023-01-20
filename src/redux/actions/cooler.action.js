import { db } from "../../config/firebase";
import { fetchCoolers, fetchSingleCooler } from "../reducers/cooler.slice";


export const getCoolers = (uid) => async (dispatch) => {
    db.collection('groups').get().then((snapshot) => {
        const coolers = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        console.log('hello',coolers);
        dispatch(fetchCoolers(coolers));
        
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching coolers', errorMessage);
});

};

export const getSingleCooler = (id) => async (dispatch) => {
    var cooler = db.collection("groups").doc(id);

    cooler.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchSingleCooler(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};
  //9th Jan - not ready to actually add files to the groups collection, so havent changed the fields to the appropriate ones yet
export const addCooler = (job, setLoading, clearState) => async (dispatch) => {
    db.collection("groups").add({
        title: job.title,
        description: job.description,
        location: job.location,
        rate: job.rate
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        clearState();
        setLoading(false);
        alert('Job has been added.✔');
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Error adding job.❌')
    });

};

//9th Jan - not ready to actually add files to the groups collection, so havent changed the fields to the appropriate ones yet
export const updateCooler = (cooler, setLoading, navigate) => async (dispatch) => {
      
    var coolerRef = db.collection("groups").doc(cooler.id);
   
     coolerRef.update({
        amount: cooler.amount,
        admin: cooler.admin,
        members: cooler.members,
        noOfSavers: cooler.noOfSavers
    })
    .then(() => {
        

        setLoading(false);
        alert('cooler has been updated.✔');
        navigate('/dashboard/create-cooler');
        
    })
    .catch((error) => {
        console.error("Error updating document: ", error.message);
         alert(/*'Error updating job.❌',*/error.message)
        setLoading(false);
    });

};