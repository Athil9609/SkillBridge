import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editMySkill, viewCategories } from '../../../services/allApis';
import { editSkillContext } from '../../../Context/ContextApi';
import { toast } from 'react-toastify';

function EditSkills({ skill }) {
  const [allSkills, setAllSkills] = useState({ ...skill });
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const { editSkillResponse, setEditSkillResponse } = useContext(editSkillContext);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    const res = await viewCategories(header);
    if (res.status === 200) {
      setCategories(res.data);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    const { skillName, categoryId, categoryName, expertise, rate, demoVideoURL, description, _id } = allSkills;

    const formData = new FormData();
    formData.append('skillName', skillName);
    formData.append('categoryId', categoryId);
    formData.append('categoryName', categoryName);
    formData.append('expertise', expertise);
    formData.append('rate', parseFloat(rate));
    formData.append('description', description);
    formData.append('_id', _id);

    if (demoVideoURL instanceof File) {
      formData.append('demoVideoURL', demoVideoURL);
    }

    const header = {
      'Content-Type': demoVideoURL instanceof File ? 'multipart/form-data' : 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    const res = await editMySkill(header, demoVideoURL instanceof File ? formData : allSkills);
    if (res.status === 200) {
      toast.success('Skill updated successfully!');
      setEditSkillResponse(res);
      handleClose();
    } else {
      toast.warn('Skill update failed.');
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find((category) => category._id === selectedCategoryId);
    setAllSkills((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      categoryName: selectedCategory ? selectedCategory.categoryName : '',
    }));
  };

  return (
    <div>
      <button
        className="btn btn-custom"
        onClick={handleShow}
      >
        <i className="fa-regular fa-pen-to-square" />
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Edit Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="form-group">
            {/* Category Dropdown */}
            <label htmlFor="categoryName" className="label-custom">Category</label>
            <select
              name="categoryId"
              className="form-control input-custom"
              value={allSkills.categoryId || ''}
              onChange={handleCategoryChange}
            >
              <option value="" hidden>Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>

            {/* Skill Name */}
            <label htmlFor="SkillName" className="label-custom">Skill</label>
            <input
              type="text"
              id="SkillName"
              className="form-control input-custom"
              placeholder="Skill Name"
              value={allSkills.skillName || ''}
              onChange={(e) => setAllSkills({ ...allSkills, skillName: e.target.value })}
            />

            {/* Description */}
            <label htmlFor="Description" className="label-custom">Description</label>
            <textarea
              id="Description"
              className="form-control input-custom"
              placeholder="Enter Description"
              rows="3"
              value={allSkills.description || ''}
              onChange={(e) => setAllSkills({ ...allSkills, description: e.target.value })}
            />

            {/* Expertise */}
            <label htmlFor="expertise" className="label-custom">Expertise</label>
            <select
              id="expertise"
              name="expertise"
              className="form-select input-custom"
              value={allSkills.expertise || ''}
              onChange={(e) => setAllSkills({ ...allSkills, expertise: e.target.value })}
            >
              <option value="" hidden>Select Expertise</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>

            {/* Rate */}
            <label htmlFor="rate" className="label-custom">Rate (Hours)</label>
            <input
              type="number"
              id="rate"
              className="form-control input-custom"
              placeholder="Rate per hour"
              value={allSkills.rate || ''}
              onChange={(e) => setAllSkills({ ...allSkills, rate: e.target.value })}
            />

            {/* Demo Video */}
            <label htmlFor="video" className="label-custom">Demo Video</label>
            <input
              type="file"
              id="video"
              className="form-control input-custom"
              onChange={(e) => setAllSkills({ ...allSkills, demoVideoURL: e.target.files[0] })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleClose} className="btn-custom">
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate} className="btn-custom">
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styled CSS */}
      <style>{`
        .btn-custom {
          background-color: #3B1E54;
          color: white;
          border-radius: 8px;
          padding: 10px 15px;
          transition: all 0.3s ease-in-out;
        }

        .btn-custom:hover {
          background-color: #3b1e54cc;
          color: white;
        }

        .modal-header-custom {
          background: #3B1E54;
          color: white;
        }

        .modal-body-custom {
          background: #F8F9FA;
          padding: 20px;
          border-radius: 10px;
        }

        .modal-footer-custom {
          background: #F8F9FA;
        }

        .label-custom {
          font-weight: 600;
          color: #3B1E54;
          margin-bottom: 5px;
        }

        .input-custom {
          border-radius: 8px;
          border: 1px solid #3B1E54;
          padding: 10px;
        }

        .input-custom:focus {
          border-color: #3b1e54cc;
          box-shadow: 0 0 5px rgba(59, 30, 84, 0.5);
        }
      `}</style>
    </div>
  );
}

export default EditSkills;
