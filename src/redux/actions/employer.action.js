import { db } from "../../config/firebase";
import { fetchEmployers, fetchSingleEmployer, confirmDeletedEmployer } from "../reducers/employer.slice";


export const getEmployers = (uid) => async (dispatch) => {
    db.collection('employers').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchEmployers(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching employees', errorMessage);
});

};

export const getSingleEmployer = (id) => async (dispatch) => {
    var job = db.collection("employers").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchSingleEmployer(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};

export const addEmployer = (job, setLoading, clearState) => async (dispatch) => {
    db.collection("employers").add({
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
export const updateEmployer = (job,coolersToDelete,setLoading, history) => async (dispatch) => {

  
    coolersToDelete.forEach((item)=>{
        var coolerRef = db.collection("groups").doc(item);
       coolerRef.delete()


    })


    var jobRef = db.collection("employers").doc(job.id);
    const jobData = jobRef.update({
        firstName:job.firstName,
        lastName:job.lastName,
        email:job.email,
        employerNumber:job.employerNumber,
        companyName:job.companyName,
        /*coolers: job.coolers,
        groups: job.groups,*/
        
    })
    .then(() => {
        setLoading(false);
        alert('employers have been updated.✔');
        history('/dashboard/home');
        
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
        // alert('Error updating job.❌')
        setLoading(false);
    });

};


export const deleteSingleEmployer = (id) => async (dispatch) => {
    var job = db.collection("employers").doc(id);

    job.delete().then(() => {
     console.log("entry deleted")
}).catch((error) => {
    console.log("Error deleting document:", error);
});

};