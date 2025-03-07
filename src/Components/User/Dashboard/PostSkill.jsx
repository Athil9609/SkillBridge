import React, { useEffect, useState } from "react";
import { postSkillApi, viewCategories } from "../../../services/allApis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostSkill = () => {
  const [categories, setCategories] = useState([]);
  const [skilldata, setSkillData] = useState({
    skillName: "",
    description: "",
    categoryId: "",
    categoryName: "",
    demoVideoURL: "",
    rate: "",
    expertise: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const header = {
        "Content-type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      };
      const res = await viewCategories(header);

      if (res.status === 200) {
        setCategories(res.data);
        console.log("Categories Fetched:", res.data);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  const handleAdd = async () => {
    const {
      skillName,
      categoryId,
      categoryName,
      demoVideoURL,
      rate,
      description,
      expertise,
    } = skilldata;

    if (!skillName || !categoryId || !rate || !description || !expertise) {
      toast.warning("Enter valid inputs");
      return;
    }

    const header = {
      "Content-type": demoVideoURL instanceof File ? "multipart/form-data" : "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    let data = new FormData();
    if (demoVideoURL instanceof File) {
      data.append("skillName", skillName);
      data.append("categoryId", categoryId);
      data.append("categoryName", categoryName);
      data.append("demoVideoURL", demoVideoURL);
      data.append("rate", rate);
      data.append("description", description);
      data.append("expertise", expertise);
    } else {
      data = {
        skillName,
        categoryId,
        categoryName,
        demoVideoURL,
        rate,
        description,
        expertise,
      };
    }

    console.log("Data being sent:", data);

    try {
      const res = await postSkillApi(header, data);
      if (res.status === 200) {
        setSkillData({
          skillName: "",
          description: "",
          categoryId: "",
          categoryName: "",
          demoVideoURL: "",
          rate: "",
          expertise: "",
        });
        toast.success("Skill posted successfully");
        nav("/user/dash");
      } else {
        toast.error("Skill posting failed");
      }
    } catch (error) {
      console.error("Error posting skill:", error);
      toast.error("Skill posting failed");
    }
  };

  return (
    <div className="post-skill-form mb-4">
      <div className="mb-3">
        <label htmlFor="skillName" className="form-label">
          Skill Name
        </label>
        <input
          type="text"
          id="skillName"
          name="skillName"
          placeholder="Enter skill name"
          className="form-control"
          value={skilldata.skillName}
          onChange={(e) =>
            setSkillData({ ...skilldata, skillName: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your skill"
          className="form-control"
          rows="3"
          value={skilldata.description}
          onChange={(e) =>
            setSkillData({ ...skilldata, description: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rate" className="form-label">
          Rate (in hours)
        </label>
        <input
          type="text"
          id="rate"
          name="rate"
          placeholder="Enter your rate"
          className="form-control"
          value={skilldata.rate}
          onChange={(e) => setSkillData({ ...skilldata, rate: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={skilldata.categoryId}
          onChange={(e) => {
            console.log("Selected Category ID:", e.target.value);

            const selectedCategory = categories.find(
              (item) => item.categoryId === e.target.value
            );

            console.log("Selected Category Object:", selectedCategory);

            setSkillData({
              ...skilldata,
              categoryId: e.target.value,
              categoryName: selectedCategory ? selectedCategory.categoryName : "",
            });
          }}
        >
          <option value="" hidden>
            Select Category
          </option>
          {categories.map((item) => (
            <option key={item.categoryId} value={item.categoryId}>
              {item.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="expertise" className="form-label">
          Expertise
        </label>
        <select
          id="expertise"
          name="expertise"
          className="form-select"
          value={skilldata.expertise}
          onChange={(e) =>
            setSkillData({ ...skilldata, expertise: e.target.value })
          }
        >
          <option value="" hidden>
            Select Expertise
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          Upload Demo (optional)
        </label>
        <input
          type="file"
          id="file"
          className="form-control"
          name="file"
          onChange={(e) =>
            setSkillData({ ...skilldata, demoVideoURL: e.target.files[0] })
          }
        />
      </div>

      <button onClick={handleAdd} className="btn btn-custom">
        Post Skill
      </button>
    </div>
  );
};

export default PostSkill;
