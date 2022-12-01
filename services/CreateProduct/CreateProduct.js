export const createProduct = async (newProduct, file) => {
    try {
        // Combine product data and file.name
        const product = { ...newProduct, ...file };
        console.log('Sending product to api', product);
        const response = await fetch('../api/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        if (response.status === 200) {
            alert('Product added!');
        } else {
            alert('Unable to add product: ', data.error);
        }
    } catch (error) {
        console.log(error);
    }
};
