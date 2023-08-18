import { db,auth,storage } from "./firebase.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword   }  from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

window.signup = () => {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (name.length > 10) {
        alert("Name must be at most 10 characters");
        return;
    }

    if (!/^\d{11}$/.test(phone)) {
        alert("Phone number must be exactly 11 digits");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
        return;
    }

  
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(password)) {
        alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character and be at least 8 characters long");
        return;
    }
createUserWithEmailAndPassword(auth, email, password)
.then(async(userCredential) => {
    const user = userCredential.user;
    await setDoc(doc(db,"users", user.uid), {
        name:name,
        phone:phone,
        email:email,
        uid:user.uid
    });
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: 'Signup successfully'
    }).then(()=>{
        location.replace('login.html');
    })
    
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'error',
        title: errorMessage
    })
});
}



// Login
window.login=()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
        return;
    }

  
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(password)) {
        alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character and be at least 8 characters long");
        return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: 'Login successfully'
    }).then(()=>{
        location.replace('index.html');
    })
    
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'error',
        title: errorMessage
    })
})

}
