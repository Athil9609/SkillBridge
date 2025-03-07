import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaStar } from 'react-icons/fa';
import { addRatingAndFeedback, updateRatingAndFeedback } from '../../../services/allApis';
import { editSkillContext } from '../../../Context/ContextApi';

function EditRating({ item, item2 }) {
  const [show, setShow] = useState(false);
  const{editSkillRatingResponse, setEditSkillRatingResponse}=useContext(editSkillContext)
  const [reviewData, setReviewData] = useState({
    rating:item2.rating,review:item2.review,skill:item2.skill
  });
  

  // console.log(item2)

  const skills = item?.Skill

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleRatingClick = (index) => setReviewData({...reviewData,rating:index + 1});

  const handleSubmit = async () => {
   

    const id = item2.id

    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

     const res = await updateRatingAndFeedback(reviewData, header, id)
     console.log(res)
     if(res.status==200){
      setEditSkillRatingResponse(res)
     }
    //  console.log('Review Submitted:', reviewData);
    // Reset fields after submission
   setReviewData(
    {
      rating:item2.rating,review:item2.review,skill:item2.skill

    }
   )
    handleClose();
  };

  return (
    <>
      <button className='btn ' onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square text-primary" />      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Service Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Select Service</Form.Label>
              <Form.Select
                value={reviewData.skill}
                onChange={(e) => setReviewData({...reviewData,skill:e.target.value})}
              >
                {/* Default selected option */}
                <option value={item2.skill} >{item2.skill}</option>

                {/* Filtering out the already selected skill */}
                {
                  skills
                    .filter(item => item.skillName !== item2.skill) // Remove the selected skill
                    .map(item => (
                      <option key={item.skillName} value={item.skillName}>
                        {item.skillName}
                      </option>
                    ))
                }
              </Form.Select>

            </Form.Group>

            {/* Rating Bar */}
            <Form.Group className="mb-3">
              <Form.Label>Rate the Service</Form.Label>
              <div>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={30}
                    color={index < reviewData.rating ? '#ffc107' : '#e4e5e9'}
                    onClick={() => handleRatingClick(index)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </Form.Group>

            {/* Review Input */}
            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={item2.review}
                onChange={(e) => setReviewData({...reviewData,review:e.target.value})}
                placeholder="Write your review here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditRating;
