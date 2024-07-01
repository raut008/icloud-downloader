const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error("API Error:", error);
  // alert(`Error: ${error.message}`);
  return {
    error: true,
  };
};

export const get = (url) => request(url, { method: "GET" });

export const post = (url, data) =>
  request(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const put = (url, data) =>
  request(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const del = (url) => request(url, { method: "DELETE" });
