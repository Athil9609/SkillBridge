import React, { useContext, useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import { deleteMySkill, updateUserDetails, userDetailsApi, viewMySkill } from "../../../services/allApis";
import baseUrl from "../../../services/baseUrl";
import EditSkills from './EditSkills';
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { editSkillContext } from "../../../Context/ContextApi";

const Portfolio = () => {
  const [preview, setPreview] = useState("");
  const [skillDetails, setSkillDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({
    profile: "", userName: "", email: "", phone: ""
  });

const{editSkillResponse,setEditSkillResponse}=useContext(editSkillContext)
  useEffect(() => {
    getUserData();
    getSkillDetails();
  }, [editSkillResponse]);

  useEffect(() => {
    if (userDetails.profile instanceof File) {
      setPreview(URL.createObjectURL(userDetails.profile)); 
    } else {
      setPreview(""); 
    }
  }, [userDetails.profile]);

  const handleUpdate = async () => {
    const { profile, userName, email, phone } = userDetails;

    if (typeof profile === "string") {
      const header = {
        'Content-type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      };
      const res = await updateUserDetails(header, userDetails);
      console.log(res)
      if (res.status === 200) {
        getUserData();
        toast.success("Updation successful!");
      } else {
        toast.error("Updation failed!");
      }
    }

    if (profile instanceof File) {
      const header = {
        'Content-type': 'multipart/form-data',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      };
      const fd = new FormData();
      fd.append('userName', userName);
      fd.append('email', email);
      fd.append('phone', phone);
      fd.append('profile', profile);

      const res = await updateUserDetails(header, fd);
      if (res.status === 200) {
        getUserData();
        toast.success("Updation successful!");
      } else {
        toast.error("Updation failed!");
      }
    }
  };

  const getUserData = async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    };
    const res = await userDetailsApi(header);
    setUserDetails(res.data);
    console.log(res.data)
  };

  const getSkillDetails = async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    };
    const res = await viewMySkill(header);
    console.log(res)
    if (res.status === 200) {
      setSkillDetails(res.data);
    }
  };

  const handleDelete=async(id)=>{
  
    const res=await deleteMySkill(id)
    if(res.status==200){
      getSkillDetails()
    }
  }
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="user-details border p-4 mb-4 rounded">
            <h4 className="text-center mb-4">User Details</h4>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  onChange={(e) => setUserDetails({ ...userDetails, profile: e.target.files[0] })}
                  style={{ display: "none" }}
                />
                <img
                  className="rounded-circle mb-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  src={preview ? preview : userDetails.profile ? `${baseUrl}/uploads/${userDetails.profile}` : "https://cdn-icons-png.flaticon.com/512/17/17004.png"}
                 
                />
              </label>
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name: {sessionStorage.getItem('userName')}</label>
                <input
                  defaultValue={userDetails.userName}
                  onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  defaultValue={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone:</label>
                <input
                  defaultValue={userDetails.phone}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                  id="phone"
                  type="text"
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
              <button type="button" className="btn btn-custom w-100" onClick={handleUpdate}>Update</button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-8">
<div>
            <h2>Skills</h2>
            {skillDetails.length > 0 ? (
                <Accordion defaultActiveKey="0">
    {skillDetails.map((item, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>{item.skillName}</Accordion.Header>
        <Accordion.Body>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Category:</strong> {item.categoryName}</p>
          <p><strong>Rate:</strong> {item.rate}</p>
          <p><strong>Expertise:</strong> {item.expertise}</p>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <EditSkills skill={item} />
              <button
                className="btn btn-custom"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash className="me-1" /> 
              </button>
            </div>
            <a href={`${baseUrl}/uploads/videos/${item.demoVideoURL}`} target="_blank" className="btn btn-custom"><span className="me-2">Watch demo</span><i className="fa-solid fa-play " style={{color: "white",}} /></a>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
  
            ) : (
                <h2 className="text-center text-danger">No Skills Added Yet!</h2>
    
            )}
            </div>
            {/* <div className="mt-5">
              <h2>Certifications</h2>
              <div className="d-flex flex-wrap gap-2">
              <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Certification 1</Card.Title>
        
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
              </div>
            </div> */}
          </div>

      </div>
    </div>
  );
};

export default Portfolio;
