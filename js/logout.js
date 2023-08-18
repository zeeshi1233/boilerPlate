import { auth,db } from "./firebase.js";
import { collection,onSnapshot,query,where} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
function show(){

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const q = query(collection(db, "users"),where("uid","==",uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
            document.getElementById("uname").innerHTML=change.doc.data().name;
            document.getElementById("logout").style.display="block"

                });
            });
            
        } else {
            location.replace('../login.html');
        }
    });
}
show()    

document.getElementById("logout").addEventListener("click",()=>{
    signOut(auth).then(() => {
        location.replace('../login.html');
      }).catch((error) => {
console.log(error);
    });
      

})