const BASE_URL = 'http://localhost:8000/api/saving/';

export const get = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`);
  return response;
};

export const postFormData = async (path, formData) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    body: formData
  });
  return response;
}