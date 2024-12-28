const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProductAmountService = async (productName) => {
  const url = `${BASE_URL}/my-purchase/${productName}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MOCKED_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { message: data.error, status: response.status };
    }

    return data;
  } catch (error) {
    if (error) throw error;
  }
};

const buyProductService = async (productName) => {
  const url = `${BASE_URL}/buy`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MOCKED_TOKEN}`,
      },
      body: JSON.stringify({ product_name: productName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { message: data.error, status: response.status };
    }

    return data;
  } catch (error) {
    if (error.status === 429) {
      throw error;
    }
    console.error(error);
  }
};

export { buyProductService, getProductAmountService };
