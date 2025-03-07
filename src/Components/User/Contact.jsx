import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addComplaintOrFeedback, getComplaintsAndFeedback } from "../../services/allApis";
import { FaStar } from "react-icons/fa";
import { Button, Form, Card, ListGroup, Badge, Spinner, Row, Col, Container } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    type: "complaint",
    subject: "",
    message: "",
    rating: null,
  });

  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const username = sessionStorage.getItem('uname');  

  useEffect(() => {
    fetchUserComplaints();
  }, []);

  const fetchUserComplaints = async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    const res = await getComplaintsAndFeedback(header, { type: "complaint" });

    if (res.status === 200) {
      const userComplaints = res.data.filter((complaint) => complaint.username === username);
      setComplaints(userComplaints);
    } else {
      console.error("Failed to fetch complaints");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      subject: formData.type === "complaint" ? formData.subject : null,
      rating: formData.type === "feedback" ? formData.rating : null,
      username, 
    };

    if (updatedData.type === "complaint" && !updatedData.subject) {
      toast.error("Subject is required for complaints.");
      return;
    }

    if (updatedData.type === "feedback" && (updatedData.rating === null || updatedData.rating === "")) {
      toast.error("Rating is required for feedback.");
      return;
    }

    setLoading(true);

    try {
      const header = {
        'Content-type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      };

      const res = await addComplaintOrFeedback(header, updatedData);

      if (res.status === 201) {
        toast.success(`${updatedData.type} submitted successfully!`);
        setFormData({
          type: "complaint",
          subject: "",
          message: "",
          rating: null,
        });

        fetchUserComplaints();
      } else {
        toast.error("Submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center content-box">
      <Row className="w-100 justify-content-center g-4">
        
        <Col xs={12} md={6} lg={5}>
          <Card className="p-4 shadow rounded content-box">
            <h2 className="mb-4 text-center text-purple">
              {formData.type === "complaint" ? "Submit a Complaint" : "Give Feedback"}
            </h2>

            <div className="mb-3 d-flex justify-content-center gap-3">
              <Button 
                className={formData.type === "complaint" ? "btn-primary-custom" : "btn-outline-custom"} 
                onClick={() => setFormData({ type: "complaint", subject: "", message: "", rating: null })}
              >
                Complaint
              </Button>
              <Button 
                className={formData.type === "feedback" ? "btn-primary-custom" : "btn-outline-custom"} 
                onClick={() => setFormData({ type: "feedback", subject: null, message: "", rating: null })}
              >
                Feedback
              </Button>
            </div>

            <Form onSubmit={handleSubmit}>
              {formData.type === "complaint" && (
                <Form.Group className="mb-3 text-start">
                  <Form.Label className="text-purple"><strong>Subject</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    value={formData.subject || ""} 
                    onChange={handleChange} 
                    required 
                    className="form-control"
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3 text-start">
                <Form.Label className="text-purple"><strong>Message</strong></Form.Label>
                <Form.Control 
                  as="textarea" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows={3}
                  required 
                  className="form-control"
                />
              </Form.Group>

              {formData.type === "feedback" && (
                <Form.Group className="mb-3 text-center">
                  <Form.Label className="text-purple"><strong>Rating</strong></Form.Label>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star} 
                        className="me-1 star"
                        color={star <= formData.rating ? "#9b59b6" : "#e4e5e9"} 
                        onClick={() => handleRating(star)} 
                      />
                    ))}
                  </div>
                </Form.Group>
              )}

              <Button className="btn-primary-custom w-100 mt-3" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={5}>
          <Card className="p-4 shadow rounded content-box">
            <h3 className="mb-4 text-center text-purple">Your Complaints & Responses</h3>

            {complaints.length > 0 ? (
              <ListGroup>
                {complaints.map((complaint) => (
                  <ListGroup.Item key={complaint._id} className="text-start p-3">
                    <p><strong>Subject:</strong> {complaint.subject}</p>
                    <p><strong>Message:</strong> {complaint.message}</p>
                    <p><small className="text-muted">{new Date(complaint.createdAt).toLocaleDateString()}</small></p>
                    
                    {complaint.adminResponse ? (
                      <Badge className="p-2 mt-2 bg-success">Admin Response: {complaint.adminResponse}</Badge>
                    ) : (
                      <Badge className="p-2 mt-2 bg-warning text-dark">No Response Yet</Badge>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted text-center">No complaints submitted yet.</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
