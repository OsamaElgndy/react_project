import React from 'react'
import { Link } from 'react-router-dom';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState, useEffect } from 'react';
import { IoAdd } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function view() {

   let [form_data, setForm_data] = useState([])
   let [seach, setsearcht] = useState("");
   let [count, setcount] = useState(1)
   let [Delete , setdelete] = useState(false)
   let [Click  , setClick] = useState(0)

   function Check(Number_vlue) {
 console.log(count);
 console.log(form_data.length / 2);

      if (Number_vlue == 0 || Number_vlue < 1) {

         setcount((form_data.length / 2 ) )
      }
      if (Number_vlue == form_data.length / 2 || Number_vlue > form_data.length / 2 ) {


         setcount(1)


      }
   }

   localStorage.setItem("slider", JSON.stringify(count));
   localStorage.setItem("length", form_data.length)
let poinet = localStorage.getItem("slider")
   let end = 2
   let data_full = []
   let search_end = end * poinet;
   let search_start = end * poinet - 2;

   if (seach != "") {


      for (let index = 0; index < form_data.length; index++) {

         if (form_data[index].firstName.includes(seach)) {
            console.log("this is index ", index);
            data_full.push(form_data[index])
          console.log(index);
         }

      }
      end += Click;
      search_start =0;
      search_end =2;

   }
   
   
   // let search_bar = data_full.slice(end * localStorage.getItem("slider") - 2, end * localStorage.getItem("slider"))
   
   // let Data_new = form_data.slice()
   
   
   let Data_new = form_data.slice(search_start, search_end)
   let search_bar = data_full.slice(search_start, search_end)

   if (seach != "") {
      Data_new = search_bar

   }




   const Fech_data = async (url) => {
      let res = await axios.get(url, {
         headers: {
            "app-id": "64fc4a747b1786417e354f31"
         }
      })
      setForm_data(res.data.data)
   }
   const notify = (text) => toast(text);

   const Fech_delete = async (url) => {
      try{

         let res = await axios.delete(url, {
            headers: {
               "app-id": "64fc4a747b1786417e354f31"
            }
         })
         notify("The operation is successful")
        location.reload()
      }catch{
         notify("The operation is failed")

      }
   }

   let URL = "https://dummyapi.io/data/v1/user"
   useEffect(() => {

      Fech_data(URL)
      localStorage.removeItem("edit")
   }, [])




   Fech_data(URL)
   return (
      <>
    {Delete &&
            <ToastContainer />


         }
         <input type="Search" className='input-search  mt-4 w-full p-2 rounded-lg' placeholder='Search By Name' onChange={(search) => {
            setsearcht(search.target.value)
         }} />





         <div onClick={() => {
            localStorage.setItem("edit", JSON.stringify({}))
         }} className=' pt-16    mb-11  font-normal flex pb-21 justify-end'>
            <Link to={"/post"} onClick={() => {
               document.querySelector("box-model").style = "white";
               localStorage.removeItem("edit")

            }} >

               <div className='btn rounded-lg text-white flex text-lg h-16  w-f items-center justify-between bg-blue-500 p-[10px] p'>
                  <i className='text-white text-[25px] font-bold'>

                     <IoAdd />
                  </i>
                  <span>

                     Add new Contact
                  </span>
               </div>
            </Link>
         </div>




         {Data_new.map((item, index) => {

            let { firstName, lastName, picture, id } = item
            return (

               <>
                  <main key={id} className='card_info pt-16 h-24 flex w-full justify-between items-center'>
                     <div className='info-card flex justify-between w-[420px]'>
                        <div className='img-profiol w-24 h-24 overflow-hidden'>
                           <img src={picture} className='w-[100%] h-[100%] overflow-hidden rounded-[50%] mr-6' alt="" />
                        </div>
                        <div className='info-details flex items-center justify-center flex-col'>
                           <h1 className='w-[300px] text-[20px]  flex items-center justify-center   text-white p-2'> {firstName}</h1>
                           <p className='w-32 text-xl text-white'>{lastName}</p>
                        </div>



                     </div>

                     <div className='edit_delete  flex justify-around  w-40'>


                        <Link to={"/put"} onClick={() => {
                           document.querySelector("box-model").style = "white";
                        }}>


                           <button onClick={() => {
                              localStorage.setItem("edit", JSON.stringify({ firstName, lastName, picture, id }))


                           }
                           } className='edit text-green-900    bg-slate-50 text-3xl p-3 rounded'>

                              <FaEdit />
                           </button>
                        </Link>

                        <button onClick={() => {
                         
                         setdelete(true)
                           Fech_delete(`${URL}/${id}`)
                        }} className='delete text-red-700   bg-slate-50 text-3xl p-3 rounded'>

                           <MdDelete />
                        </button>
                     </div>


                  </main>
                  {index % 2 == 0 &&

                     <div className='line mt-16 h-[1px] bg-white'></div>

                  }







               </>
            )


         })}

         <div className='slider flex items-center justify-center absolute bottom-0 right-0 m-4 text-white'>
            <button className='next text-5xl' onClick={() => {
          
               setcount(count -= 1)
               Check(count)

               if (seach) {
                  setClick( Click -= 2)
                  
               }
            }}


            >
               <span>

                  <MdNavigateBefore />
               </span>
            </button>
            <span className='active text-3xl'> { Math.floor(count)} /{Math.floor( form_data.length / 2)}</span>
            <button className='pre text-5xl' onClick={() => {
               setcount(count += 1)
      
               Check(count)

               if(seach += 2){
                  setClick( Click += 2)

               }
            }}>
               <span>

                  <MdNavigateNext />
               </span>
            </button>
         </div>

      </>
   )



}

export default view
