import React, { useContext, useState } from 'react'
import { AuthContext } from './Integration With Backend/Auth'
import instance from './Integration With Backend/Components/Intance';

const Home = () => {
  const [avatarId, setAvatarId] = useState('')
  console.log(avatarId);
  const [selectedImage, setSelectedImage] = useState('');
  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const credentials = {oldPassword,newPassword}
  const {changePassword} = useContext(AuthContext)
  const {update} = useContext(AuthContext)
  const  [name, setName] = useState('')
  const  [surName, setSurName] = useState('')
  const handleChangePassword = (e)=>{
    e.preventDefault()
    changePassword(credentials)
  }
  const updateCreditionals = {name,surName,selectedImage}

  const handleImageChange = async (event) => {
    const formData = new FormData
    const file = event.target.files[0];
    formData.append('file',file)
    console.log(file);
    if (file) {
      setSelectedImage(formData);
    }
    const token = localStorage.getItem('token');
    const response = await instance.post('/file/upload/folder_name',formData,{
      headers:{
        Authorization:token
      }
    })
    setAvatarId(response.data[0]._id)
    console.log(response);
  };
  const handleUpdate = (e)=>{
    e.preventDefault()
    update(updateCreditionals)
  }
  return (
<section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
        <br class="hidden lg:inline-block" />readymade gluten
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
      </div>
    </div>
  </div>
  <div className="div">
    <input type="text" value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)} placeholder='password'/>
    <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='newpassowrd'/>
    <button onClick={handleChangePassword}>change</button>
  </div>
  <div className="update mt-32">
    <input type="text" value={name} placeholder='name' onChange={(e)=>setName(e.target.value)}/>
    <input type="text" value={surName} placeholder='surname' onChange={(e)=>setSurName(e.target.value)}/>
    <input type="file" placeholder='avatar' onChange={handleImageChange}/>
    <button onClick={handleUpdate}>Update</button>
    
  </div>
</section>
    )
}

export default Home