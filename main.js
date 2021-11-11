//LOGIN CHECKING
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const formPublicacion = document.querySelectorAll('.formPublicacion');
const postS = document.querySelector('.postss');


const loginCheck = user =>{
    if (user){
        loggedInLinks.forEach(link =>{
            link.style.display = 'block';
        });
        loggedOutLinks.forEach(link =>{
            link.style.display = 'none';
        });
        formPublicacion.forEach(link => {
          link.style.display = 'block';
          console.log('form visible');
        });
        postS.style.display= 'block';


   
    }else{
        loggedInLinks.forEach(link =>{
            link.style.display = 'none';
        });
        loggedOutLinks.forEach(link =>{
            link.style.display = 'block';
        });
        formPublicacion.forEach(link => {
          link.style.display = 'none';
          console.log('form no visible');
        });
        postS.style.display= 'none';
       
    

    }
}




//REGISTRO FORM
const obtenerForm = document.querySelector("#registro-form");

obtenerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const obtenerEmail = document.querySelector("#idEmail").value;
  const obtenerContra = document.querySelector("#idContra").value;

  console.log(obtenerEmail, obtenerContra);

  auth
    .createUserWithEmailAndPassword(obtenerEmail, obtenerContra)
    .then((userCredential) => {
      obtenerForm.reset();

      $("#loginUsuaario").modal("hide");
      $('.modal-backdrop').remove();
      Swal.fire({
        icon: "success",
        title: `REGISTRO EXITOSO, :)`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("REGISTRADO");
    })
    .catch((err) => {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops!!!...",
        text: "Algo no salió como se esperaba...",
      });
    });
});

//TERMINO REGISTRO

//LOGIN USUARIO

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const contra = document.querySelector("#login-contra").value;

  console.log(email, contra);

  auth
    .signInWithEmailAndPassword(email, contra)
    .then((userCredential) => {
      loginForm.reset();

      $("#logeandoUsuario").modal("hide");
      $('.modal-backdrop').remove();
      Swal.fire({
        icon: "success",
        title: `HOLA  ${ email } bienvenid@, :)`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("LOGUEADO");
    })
    .catch((err) => {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops!!!...",
        text: "Usuario o Contraseña incorrectos...",
      });
    });
});

//TERMINO

//SALIR

const exit = document.querySelector("#exit");
exit.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      Swal.fire({
        icon: "success",
        title: `SESION CERRADA, :)`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("SALIR EXITOSO");
    })
    .catch((err) => {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops!!!...",
        text: "La sesion no se cerró...",
      });
    });
});
//GOOGLE LOGIN
const googleButton= document.querySelector('#googleLogin');
googleButton.addEventListener("click", (e) =>{
    console.log('logueando con google');
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
        loginForm.reset();

      $("#logeandoUsuario").modal("hide");
      $('.modal-backdrop').remove();

        Swal.fire({
            icon: "success",
            title: "Excelente!!!...",
            text: "Usuario logueado...",
          });

    }).catch(err =>{
        Swal.fire({
            icon: "error",
            title: "Oops!!!...",
            text: "Ah Ocurrido un error Uusuario no logueado...",
            showConfirmButton: false,
            timer: 4500,
          });
        console.log('ha ocurrido un error: '+err);
        
    });
});

//FACEBOOK LOGIN 

const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log('logueando con facebook');
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
        console.log(result);
        loginForm.reset();

        $("#logeandoUsuario").modal("hide");
        $('.modal-backdrop').remove();
  
          Swal.fire({
              icon: "success",
              title: "Excelente!!!...",
              text: "Usuario logueado...",
            });
        
        

        console.log('facebook logueado');
    }).catch(err =>{
        Swal.fire({
            icon: "error",
            title: "Oops!!!...",
            text: "Ah Ocurrido un error Uusuario no logueado...",
            showConfirmButton: false,
            timer: 4500,
          });
        console.log(err);
    })
});


//LOGIN TWITTER

// const twitterButton = document.querySelector('#twitterLogin');
// twitterButton.addEventListener('click', (e) =>{
//   e.preventDefault();
//   console.log("logueando con twitter");
//   const provider = new firebase.auth.TwitterAuthProvider();
//   auth.signInWithPopup(provider).then(result =>{
//     console.log(result);
//     loginForm.reset();

//     $("#logeandoUsuario").modal("hide");
//     $('.modal-backdrop').remove();
    
//     Swal.fire({
//       icon: "success",
//       title: "Excelente!!!...",
//       text: "Usuario Twitter logueado!...",
//     });

//     console.log('twitter logueado');
//   }).catch(err =>{

//   });

// });


const twitterButton = document.querySelector('#twitterLogin');
twitterButton.addEventListener('click', (e) =>{
  loginForm.reset();

  $("#logeandoUsuario").modal("hide");
  $('.modal-backdrop').remove();

    Swal.fire({
        icon: "info",
        title: "IMPORTANTE!!!...",
        text: "El uso de este recurso está en desarrollo...",
        showConfirmButton: true,
        timer: 4500,
      });
})

//PUBLICACIONES POSTS

const postList = document.querySelector('.posts');
//PARA CREAR HTML DESDE JAVASCRIPT
const setUpPosts = data => {
    if (data.length ) {
        let html = '';
        data.forEach(doc => {

            const posts = doc.data();

            let color= ""; 

            for(let i=0; i <= 6; i ++){
              let a = Math.round(Math.random()*7);
              
              switch(a){
                case 0:
                  color="primary";
                  break;
                case 1:
                  color="secondary";
                  break;
                case 2:
                  color="success";
                  break;
                case 3:
                  color="danger";
                  break;
                case 4: 
                  color="warning";
                  break;
                case 5:
                  color="info";
                  break;
                case 6:
                  color="dark";
                  break;
          
              }

            }


            const li = ``;
            html += li;
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = '<p class="text-center">Logueate para ver las publicaciones y poder publicar...</p>'
    }
}

//FORM POSTEOS ...
const taskForm = document.querySelector('#task-form');
const postContainer= document.querySelector('#posts-container');

 const saveTask = (title, description)=>
  fs.collection('posts').doc().set({
  titulo: title,
  descripcion: description
});

const getPosts = ()=> fs.collection('posts').get();
const onGetPost = (callback) => fs.collection('posts').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async (e) =>{
  onGetPost((querySnapshot)=>{
    postContainer.innerHTML ='';
    querySnapshot.forEach(doc =>{

      console.log(doc.data());
  
      let color= ""; 
  
              for(let i=0; i <= 6; i ++){
                let a = Math.round(Math.random()*7);
                
                switch(a){
                  case 0:
                    color="primary";
                    break;
                  case 1:
                    color="secondary";
                    break;
                  case 2:
                    color="success";
                    break;
                  case 3:
                    color="danger";
                    break;
                  case 4: 
                    color="warning";
                    break;
                  case 5:
                    color="info";
                    break;
                  case 6:
                    color="dark";
                    break;
            
                }
  
              }
  
  
      postContainer.innerHTML += `<div class="card card-body mt-4 border-${color} " id="carId" >
            <div class="card-header border-${color} text-${color}">
            <h5 class="card-title">
              ${doc.data().titulo}
            </h5>  
            
            </div>
            
        <div class="card-body  text-${color}">
  
          ${doc.data().descripcion}
        </div>
        <div>
          <button class="btn btn-info " id="btn-edit">EDITAR</button>
          <button class="btn btn-danger " id="btn-delete">ELIMINAR</button>
        </div>
        
      </div>`
          
        const btnEliminar = document.querySelectorAll('#btn-delete');
        const btnEditar = document.querySelectorAll('#btn-edit');
        
        btnEliminar.forEach(btn =>{
          btn.addEventListener('click', (e)=>{
            
          })
        })
  
    });
  });

  

});


taskForm.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const title = taskForm['task-title'].value;
  const description = taskForm['task-description'].value;

 await saveTask(title, description);

  taskForm.reset();
  console.log('task-form');

  await getPosts();

})




//EVENTOS
//LISTAR POR USUAIRO AUTENTICADOS
auth.onAuthStateChanged(user =>{
    if (user){
        // Swal.fire({
        //     icon: "success",
        //     title: "Excelente!!!...",
        //     text: "Usuario ya está logueado...",
        //   });
          console.log('auth: usuario logueado');
          fs.collection('posts').get().then((snapshot) =>{
              console.log(snapshot.docs);
              setUpPosts(snapshot.docs);
              loginCheck(user);
          })
    }else{
        // Swal.fire({
        //     icon: "error",
        //     title: "Oops!!!...",
        //     text: "Usuario no está logueado...",
        //   });
          console.log('auth: usuario no logueado');
          setUpPosts([]);
          loginCheck(user);
    }
})




