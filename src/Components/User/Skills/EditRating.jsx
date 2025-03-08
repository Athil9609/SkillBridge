import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaStar } from 'react-icons/fa';
import { updateRatingAndFeedback } from '../../../services/allApis';
import { editSkillContext } from '../../../Context/ContextApi';

function EditRating({ item, item2 }) {
  const [show, setShow] = useState(false);
  const { setEditSkillRatingResponse } = useContext(editSkillContext);
  const [reviewData, setReviewData] = useState({
    rating: item2.rating,
    review: item2.review,
    skill: item2.skill,
  });

  const skills = item?.Skill;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRatingClick = (index) => setReviewData({ ...reviewData, rating: index + 1 });

  const handleSubmit = async () => {
    const id = item2.id;
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    const res = await updateRatingAndFeedback(reviewData, header, id);
    if (res.status === 200) {
      setEditSkillRatingResponse(res);
    }

    setReviewData({
      rating: item2.rating,
      review: item2.review,
      skill: item2.skill,
    });

    handleClose();
  };

  return (
    <>
      <Button
        style={{
          border: '2px solid #462061',
          color: '#462061',
          backgroundColor: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}
        onClick={handleShow}
        className='btn'
      >
        <i className="fa-solid fa-pen-to-square"></i> 
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#462061' }}>Edit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#462061' }}>Select Service</Form.Label>
              <Form.Select
                value={reviewData.skill}
                onChange={(e) => setReviewData({ ...reviewData, skill: e.target.value })}
              >
                <option value={item2.skill}>{item2.skill}</option>
                {skills
                  .filter((skill) => skill.skillName !== item2.skill)
                  .map((skill) => (
                    <option key={skill.skillName} value={skill.skillName}>
                      {skill.skillName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#462061' }}>Rate the Service</Form.Label>
              <div>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={30}
                    color={index < reviewData.rating ? "#FFD700" : "#C0C0C0"}
                    onClick={() => handleRatingClick(index)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#462061' }}>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewData.review}
                onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                placeholder="Write your review here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{
              backgroundColor: '#462061',
              border: 'none',
              padding: '8px 16px',
              fontWeight: 'bold',
            }}
            onClick={handleSubmit}
          >
            Update Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditRating;
