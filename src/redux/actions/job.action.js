import { db } from "../../config/firebase";
import { fetchJobs, fetchSingleJob } from "../reducers/job.slice";


export const getJobs = (uid) => async (dispatch) => {
    db.collection('employees').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchJobs(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching employees', errorMessage);
});

};

export const getSingleJob = (id) => async (dispatch) => {
    var job = db.collection("employees").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchSingleJob(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};

export const addJob = (job, setLoading, clearState) => async (dispatch) => {
    db.collection("employees").add({
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
export const updateJob = (job, setLoading, history) => async (dispatch) => {

    var jobRef = db.collection("employees").doc(job.id);
    const jobData = jobRef.update({
        accruedBalance: job.amountAccrued,
        coolers: job.coolers,
        walletBalance: job.walletBalance,
        job: job.firstName
    })
    .then(() => {
        setLoading(false);
        alert('employees have been updated.✔');
        history('/dashboard/home');
        
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
        // alert('Error updating job.❌')
        setLoading(false);
    });

};

export const deleteSingleJob = (id) => async (dispatch) => {
    var job = db.collection("employees").doc(id);

    job.delete().then(() => {
     console.log("employee deleted")
}).catch((error) => {
    console.log("Error deleting document:", error);
});

};