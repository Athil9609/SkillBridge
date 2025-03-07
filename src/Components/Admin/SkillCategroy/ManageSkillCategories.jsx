import React, { useContext, useEffect, useState, useCallback } from 'react';
import AddSkill from './AddSkillCategory';
import EditSkillCategory from './EditSkillCategory';
import { deleteCategory, viewCategories } from '../../../services/allApis';
import UserCard from './UserCard';
import { addSkillCategoryContext, editSkillCategoryContext } from '../../../Context/ContextApi';
import { toast } from 'react-toastify';

function ManageSkillCategories() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { addSkillCategoryResponse } = useContext(addSkillCategoryContext);
  const { editSkillCategoryResponse } = useContext(editSkillCategoryContext);

  useEffect(() => {
    getData();
  }, [addSkillCategoryResponse, editSkillCategoryResponse]);

  // Fetch categories from API
  const getData = useCallback(async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };
    try {
      const res = await viewCategories(header);
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong. Try again later.");
    }
  }, []);

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await deleteCategory(id);
        if (res.status === 200) {
          toast.success("Category deleted successfully!");
          getData();
        } else {
          toast.error("Failed to delete category.");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  // Filter categories based on search query
  const filteredData = data.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="p-5">
        <h2 className="mb-4">Manage Skill Categories</h2>
        <input
          type="text"
          placeholder="Search Category"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="px-5">
        <AddSkill />
      </div>

      <div className="p-5">
        <div className="container-fluid">
          {filteredData.length > 0 ? (
            filteredData.map((category) => (
              <div key={category.categoryId} className="mb-5 border p-4 rounded-3">
                {/* Category Title */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2>{category.categoryName}</h2>
                  <div className="d-flex gap-2">
                    <EditSkillCategory data={category} />
                    <button className="btn btn-danger" onClick={() => handleDelete(category.categoryId)}>
                      Delete
                    </button>
                  </div>
                </div>

                {/* Users List */}
                <div className="d-flex flex-wrap gap-3">
                  {category.userList && category.userList.length > 0 ? (
                    category.userList.map((user) => <UserCard key={user._id} user={user} />)
                  ) : (
                    <p className="text-muted">No users in this category.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-center text-muted">No skill categories available.</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageSkillCategories;
