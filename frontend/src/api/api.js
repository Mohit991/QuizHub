import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export const verifyToken = async (token) => {
  try {
    const response = await api.get("/users/verifyToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    const err = new Error(error.response?.data?.message || error.message);
    err.code = error.response?.status;
    throw err;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await api.post("/public/login", { email, password });
    return response.data;
  } catch (error) {
    const err = new Error(error.response?.data?.message || error.message);
    err.code = error.response?.status;
    throw err;
  }
};

export const signUp = async (name, age, gender, email, password) => {
  try {
    const response = await api.post("/public/signup", { name, age, gender, email, password });
    return response.data;
  } catch (error) {
    const err = new Error(error.response?.data?.message || error.message);
    err.code = error.response?.status;
    throw err;
  }
};

export const fetchCategories = async (token) => {
  try {
    const response = await api.get("/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const err = new Error(`HTTP error! status: ${error.response?.status}`);
    err.code = error.response?.status;
    throw err;
  }
};

export const fetchTopicsOfCategory = async (token, selectedCategoryId) => {
  console.log(selectedCategoryId);
  try {
    const response = await api.get(`/categories/${selectedCategoryId}/topics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const err = new Error(`HTTP error! status: ${error.response?.status}`);
    err.code = error.response?.status;
    throw err;
  }
};

export const fetchLevels = async (token) => {
  try {
    const response = await api.get('/levels', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    const err = new Error(`HTTP error! status: ${error.response?.status}`);
    err.code = error.response?.status;
    throw err;
  }
};

export const fetchQuestionCounts = async (token) => {
  try {
    const response = await api.get('/question-counts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const err = new Error(error.response?.data?.message || error.message);
    err.code = error.response?.status;
    throw err;
  }
};

export const fetchQuiz = async (token, selectedTopicId, selectedNoOfQuestions, selectedLevel) => {
  try {
    const response = await api.get(`/topic/${selectedTopicId}/questions?noOfQuestions=${selectedNoOfQuestions}&level=${selectedLevel}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const err = new Error(`HTTP error! status: ${error.response?.status}`);
    err.code = error.response?.status;
    throw err;
  }
};

export const getUserProgress = async (userId, token) => {
  try {
    const response = await api.get(`/user-progress/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

export const postUserProgress = async (userProgress, token) => {
  try {
    const response = await api.post('/user-progress', userProgress, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting user progress:', error);
    throw error;
  }
};

