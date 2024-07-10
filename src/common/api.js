export const BASE_URL = 'https://yanoshi-stokis.web.id/app/api/';

export const get = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`);
  return response;
};

export const destroy = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST' // Can't use DELETE method
  });
  return response;
};

// form-data/multipart
export const postFormData = async (path, formData) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    body: formData
  });
  return response;
}

// x-www-form-urlencoded
export const postForm = async (path, object) => {
  let formBody = [];
  for (let property in object) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(object[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log(formBody);
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });
  return response;
}