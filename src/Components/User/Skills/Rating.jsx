import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaStar } from 'react-icons/fa';
import { addRatingAndFeedback } from '../../../services/allApis';
import { addSkillRatingContext } from '../../../Context/ContextApi';

function Rating({ item }) {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const skills = item?.Skill;
  const { setAddSkillRatingResponse } = useContext(addSkillRatingContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRatingClick = (index) => setRating(index + 1);

  const handleSubmit = async () => {
    const reviewData = {
      skill: selectedService,
      rating,
      review,
      addedTo: item?.user.userId,
    };

    const header = {
      'Content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    };

    const res = await addRatingAndFeedback(reviewData, header);
    setAddSkillRatingResponse(res);

    setSelectedService('');
    setRating(0);
    setReview('');
    handleClose();
  };

  return (
    <>
      <Button className="btn-primary-custom mb-3" onClick={handleShow}>
        Add Rating/Review
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="text-purple">
          <Modal.Title>Add Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className="content-box">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-purple">Select Service</Form.Label>
              <Form.Select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="form-control"
              >
                <option value="">Choose...</option>
                {skills.map((item) => (
                  <option key={item.skillName} value={item.skillName}>
                    {item.skillName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-purple">Rate the Service</Form.Label>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={30}
                    className="star"
                    onClick={() => handleRatingClick(index)}
                    color={index < rating ? "#FFD700" : "#C0C0C0"}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-purple">Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-warning" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-primary-custom" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Rating;
