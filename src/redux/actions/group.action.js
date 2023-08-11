import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import {
  isItLoading,
  saveAllGroup,
  saveGroupMembers,
  saveGroups,
  saveMyGroup,
  savePrivateGroup,
  savePublicGroup,
} from '../reducers/group.slice';

export const createGroup = (groupData, user, file, navigate, setLoading, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today = new Date();

  db.collection('groups')
    .add({
      groupName: groupData.groupName,
      noOfSavers: parseInt(groupData.noOfSavers),
      startDate: groupData.startDate,
      payoutDate: groupData.payoutDate,
      isMonthPayout: false,
      amount: parseInt(groupData.amount),
      imageUrl: url,
      admin: user.id,
      members: [], //[user.id],
      payoutIndex: 0,
      numOfBatchPayment: 0,
      accountBalance: 0, //parseInt(groupData.amount),
      accountCreated: today.toLocaleDateString('en-US', options),
    })
    .then((res) => {
      console.log('RESPONSE ID: ', res.id);
      setLoading(false);
      db.collection('groups')
        .doc(res.id)
        .update({
          groupId: res.id,
        })
        // .then(() => {
        //   console.log('RESPONSE 2: ', res.id);
        //   setLoading(false);
        //   db.collection('groups')
        //     .doc(res.id)
        //     .collection('membersCollection')
        //     .add({
        //       memberName: user.name,
        //       memberEmail: user.email,
        //       memberImageUrl: '',
        //       invitedBy: user.id,
        //       invite: 0,
        //       paid: 1,
        //       users: user.id,
        //       joinedOn: today.toLocaleDateString('en-US', options),
        //     })
            .then(() => {
              console.log('RESPONSE 3: ', res.id);
              setLoading(false);
              db.collection('employers')
                .doc(user.id)
                .update({
                  cooler: [res.id],
                })
                .then((resp) => {
                  console.log('Resp ', resp);
                  notifySuccessFxn('Group Created');
                  setLoading(false);
                  navigate('/dashboard/home', { replace: true });
                })
                .catch((err) => {
                  console.error('Error creating group: ', err);
                  var errorMessage = err.message;
                  notifyErrorFxn(errorMessage);
                  setLoading(false);
                });
            });
        });
    // });
};

export const uploadGroupImage = (groupData, file, user, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`group_images/${imageName}`).put(file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      // setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref('group_images')
        .child(imageName)
        .getDownloadURL()
        .then((url) => {
          console.log('Image URL: ', url);
          dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
        });
    }
  );
};

export const fetchGroups = (user) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection('groups')
    .where('admin', '==', user)
    .get()
    .then((snapshot) => {
      const myGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (myGroups.length) {
        dispatch(isItLoading(false));
        console.log('My Groups Data:', myGroups);
        dispatch(saveMyGroup(myGroups));
      } else {
        dispatch(isItLoading(false));
        console.log('You have no group!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  dispatch(isItLoading(true));
  if(groupMembers.length){
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log("Group Members is: ", groupMembers);
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        dispatch(saveGroupMembers(groupMembers));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
  }else{
    dispatch(isItLoading(false));
    dispatch(saveGroupMembers(groupMembers));
  }
};

export const payoutMember5 = (groupId, members, fee, payoutIndex, groupBal, filteredData) => async (dispatch) => {
  console.log({groupId, members, fee});
    
  db.collection('employees').doc(members[payoutIndex]).get()
     db.collection('employees').doc(members[payoutIndex])
     .get().then((employeesDoc)=> {
      const userBal = employeesDoc.data().walletBalance;
      const sumBalOfSameID = filteredData.filter(item => item.members[payoutIndex] === members[payoutIndex]).reduce((acc, cur) => acc + cur.accountBalance, 0);
      const countOfSameID = filteredData.filter(item => item.members[payoutIndex] === members[payoutIndex]).length 
      const newBal = groupBal + userBal;
      const newBal2 = sumBalOfSameID + userBal;


        console.log(members[payoutIndex], "-groupBal: ", groupBal);
        console.log("Group Bal Sum: ", sumBalOfSameID);


        // return

     db.collection('employees')
     .doc(members[payoutIndex])
     .update({
       walletBalance: countOfSameID > 1 ? newBal2 : newBal,
     }).then(() => {
       console.log("Payout success!");
       notifySuccessFxn("Payout successful!")
     }).catch((err) => {
       console.log("Error occured on payout...", err.message);
     })
     })
};
export const payoutMember = (groupId, members, fee, payoutIndex, groupBal, numOfBatchPayment, payoutDate, filteredData, groupName) => async (dispatch) => {

  console.log({groupId, members, fee});
  if(groupBal >= fee){
  const date = new Date(payoutDate);
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  date.setMonth(currentMonth + 1);
  if (date.getMonth() !== currentMonth + 1) {
    date.setDate(0);
  }
  date.setDate(Math.min(currentDate, date.getDate()));
  const newDate = date.toISOString().slice(0, 10);
  // console.log(newDate); 

  let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const dateTransactions = today.toISOString();  


 const payIndexMembers = filteredData.map(m => m.members[m.payoutIndex]);

 console.log("payIndexMembers", payIndexMembers);

// const array = ['yxtvkj6ckme10wmsdQqmqQwkB0I3', 'hgngawqnzke10wmsdQqmqQwkB0I3', 'yxtvkj6ckme10wmsdQqmqQwkB0I3'];
const count = payIndexMembers.reduce((acc, curr) => {
  if (curr === members[payoutIndex]) {
    acc++;
  }
  return acc;
}, 0);
console.log(members[payoutIndex], count); // Output: 2


  // return;
  db.collection('groups')
            .doc(groupId)
            .collection('membersCollection')
            .get()
            .then((snapshot) => {
              const payouts = snapshot.docs.map((doc) => ({ ...doc.data() }));
              let total = payouts.map(p => parseInt(p.paid)).reduce((acc, paid) => acc + paid, 0);
              const resetCondition = payoutIndex + 1 < members.length;
            //  console.log("total", total);
              const amountToPay = total * fee;
              const newGroupBal = groupBal - groupBal
              // const newGroupBal = groupBal - amountToPay
              // console.log("newGroupBal", newGroupBal);
              console.log("amountToPay", groupBal);
              console.log("payoutIndex", members[payoutIndex]);

              // return
              //Before updating payout index check if group length <= payoutIndex
              //if yes
              //update numOfBatchPayment +1 & reset payoutIndex to 0
             
              db.collection('groups')
              .doc(groupId)
              .update({
                isMonthPayout: true,
                numOfBatchPayment: resetCondition ? numOfBatchPayment : numOfBatchPayment + 1,
                payoutIndex: resetCondition ? payoutIndex + 1 : 0,
                payoutDate: newDate,
                accountBalance: newGroupBal
              }).then((resp) => {
                db.collection('employers').doc(members[payoutIndex])
               .get()
               .then((employerDoc) => {
                if (employerDoc.exists) {
                  const employerBal = employerDoc.data().walletBalance;
                  const sumBalOfSameID = filteredData.filter(item => item.members[payoutIndex] === members[payoutIndex]).reduce((acc, cur) => acc + cur.accountBalance, 0);
                  const newBal = groupBal + employerBal;
                  const newBal2 = sumBalOfSameID + employerBal;
                  console.log("New Bal: ", count > 1 ? newBal2 : newBal);
                  console.log("countOfSameID: ", count);
                  // return
                  db.collection('employers')
                  .doc(members[payoutIndex])
                  .update({
                    walletBalance: count > 1 ? newBal2 : newBal,
                  }).then(() => {
                    console.log("Payout success!");
                    notifySuccessFxn("Payout successful!")
                  }).catch((err) => {
                    console.log("Error occured on payout...", err.message);
                  })
                }else{
                  db.collection('employees').doc(members[payoutIndex])
                  .get().then((employeesDoc)=> {
                   const userBal = employeesDoc.data().walletBalance;
                   const sumBalOfSameID = filteredData.filter(item => item.members[payoutIndex] === members[payoutIndex]).reduce((acc, cur) => acc + cur.accountBalance, 0);
                   const newBal = groupBal + userBal;
                   const newBal2 = sumBalOfSameID + userBal;
                   console.log("New Bal2: ", count > 1 ? newBal2 : newBal);
                   console.log("countOfSameID2: ", count);
                  // return
                  db.collection('employees')
                  .doc(members[payoutIndex])
                  .update({
                    walletBalance: count > 1 ? newBal2 : newBal,
                  }). then(() => {
                  
    
                    db.collection('transactions')
                      .add({
                          userID:members[payoutIndex],
                          coolerID: groupId,
                          type: `Monthly Payout from ${groupName} cooler`,
                          amount: groupBal,
                          date: todaysDate,
                          createdAt: today.toLocaleDateString("en-US", options),
                      })
                  })
                   
                  .then(() => {
                    console.log("Payout success!");
                    notifySuccessFxn("Payout successful!");
                    window.location.href = '/dashboard/home';
                  }).catch((err) => {
                    console.log("Error occured on payout...", err.message);
                  })
                  })
                }
               })
              })
            
            }).catch((err) => {
              console.log('Error getting payoutMember:', err);
            })

         return;
          }else{
            notifyErrorFxn(`Cannot process payout for ${groupName} due to insufficient balance`);
          }
};


export const fetchAllGroups = () => async (dispatch) => {
  db.collection("groups")
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
    //  console.log("All Groups Data:", allGroups);
     dispatch(saveGroups(allGroups));
   } else {
       dispatch(saveGroups(allGroups));
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };
