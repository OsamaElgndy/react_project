import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
console.log("vvvvvvvvvvvvvv", );
function Post() {
   let firstName, lastName, picture, id, upload = "Upload photo";;

   if (localStorage.getItem("edit") != null) {

      ({ firstName, lastName, picture, id } = JSON.parse(localStorage.getItem("edit")))
   }


   if (JSON.parse(localStorage.getItem("edit")) == null) {
      firstName = " "
      lastName = " ";
      picture = " "
   


   }
   if (JSON.parse(localStorage.getItem("edit")) != null) {
      picture = JSON.parse(localStorage.getItem("edit")).picture
      upload = JSON.parse(localStorage.getItem("edit")).firstName
   }


   let [first_Name, setfirst_Name] = useState(firstName)
   let [Last_Name, setLaset_Name] = useState(lastName)
   let [email, setEamil] = useState("Upskilling_EG@gmail.com ")
   let [image, setimge] = useState(picture)
   let [error, seterror] = useState(false)
   if (location.pathname == "/post" ) {
      picture = "./src/assets/Desk_top.jpg"
   }
   let body =
   {
      "firstName": first_Name,
      "lastName": Last_Name,
      "email": email,
      "picture": image
   }

   const notify = (text) => toast(text);
   async function POST_item(ID) {
      console.log(body);

      if ( location.pathname == "/put") {
         try {
            let res = await axios.put(`https://dummyapi.io/data/v1/user/${ID}`, body,

               {
                  headers: {
                     "app-id": "64fc4a747b1786417e354f31"
                  }


               }
            )
            location.pathname = "/home"
         } catch (error) {
            seterror(true)
            notify(error.message)

         }


      } else {
         try {


            let res = await axios.post("https://dummyapi.io/data/v1/user/create", body,

               {
                  headers: {
                     "app-id": "64fc4a747b1786417e354f31"
                  }


               }
            )
            location.pathname = "/home"

         }
         catch (error) {
            seterror(true)
            notify(error.message)
            console.log(error);

         }
      }
   }


   return (

      <>
         {error &&
            <ToastContainer />


         }
         <article className='pt-8 w-full flex justify-center items-center '>
            <div className='flex flex-col gap-5 justify-center items-center overflow-hidden'>
               <img src={picture} className='w-24 h-24 rounded-[50%] ' alt="" />
               <h1 className='text-xl'> {upload}</h1>

            </div>
         </article>







         <div className='Form-section form  pt-20 w-full flex flex-wrap justify-center items-center gap-10' >
            <input type="text" className='outline-none w-[500px] rounded-lg bg-gray-200 p-4' placeholder='First Name' value={first_Name} onChange={(name) => {
               setfirst_Name(name.target.value)
            }} />
            <input type="number" placeholder='Last Name' className='outline-none w-[500px] p-4 rounded-lg bg-gray-200' value={Last_Name} onChange={(last) => {
               setLaset_Name(last.target.value)

            }} />
            <input type="text" placeholder='Pleace enter url Image' className='outline-none w-[500px] p-4 rounded-lg bg-gray-200' value={image} onChange={(imge) => { setimge(imge.target.value) }} />
            <input type="email" placeholder='email' value={email} className='outline-none w-[500px] p-4 rounded-lg bg-gray-200' onChange={(email) => {
               setEamil(email.target.value)
            }} />


         </div>




         <footer className='w-full flex justify-center items-center absolute bottom-[30px]'>
            <div className='w-full flex justify-between'>



               <Link to={"/home"} onClick={() => {
                  document.querySelector("box-model").style = "transparent";
               }}>

                  <button className='cancel ml[-40px] bg-gray-400 w-40 text-xl flex justify-center items-center rounded-lg p-3'>cancel</button>
               </Link>
               <button className='save bg-blue-500 rounded w-40 mr-20 p-3 text-xl flex justify-center items-center' onClick={() => {


                  POST_item(id)

               }}> save </button>
            </div>
         </footer>

      </>
   )


}

export default Post
