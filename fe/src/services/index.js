const buyProductService = async (productName) => {
  const url = `${import.meta.env.VITE_BASE_URL}/buy`;
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

export default buyProductService;
