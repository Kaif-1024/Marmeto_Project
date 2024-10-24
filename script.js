function getItems() {
    const storedData = localStorage.getItem('cartItems');
    
    if (storedData) {
        const data = JSON.parse(storedData);
        display(data.items); // Access items property from the stored data
    } else {
        fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                localStorage.setItem('cartItems', JSON.stringify(data)); // Store data locally
                display(data.items); // Call display function with the items from the fetched data
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

function display(items) {
    if (items.length !== 0) {
        let eachItem = '';
        for (let itm of items) {
            eachItem += `<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><img src="${itm.image}" alt="${itm.title}" class="rounded" style="height: 70px; width: auto;"/></td>
                <td>${itm.title}</td>
                <td>Rs. ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(itm.price/100)}</td>
                <td class="text-center">
                    <input type="number" value="${itm.quantity}" min="1" style="width: 60px;" class="form-control text-center ms-5" onchange="updateQuantity(${itm.id}, this.value)">
                </td>
                <td>Rs. ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((itm.price*itm.quantity)/100)}</td>
                <td><i class="fa-solid fa-trash" style="color:red;"></i></td>
            </tr>`;
        }
        document.querySelector('#display').innerHTML = eachItem;
    }
}

// Call the function to fetch items
getItems();

let data = {
    "original_total_price": 250000,
    "items": [
        {
            "price": 250000.00,
            "quantity": 1
        }]
    };
// Assuming the JSON data is already defined and available as `data`
document.addEventListener("DOMContentLoaded", function() {
    // Make sure the `data` variable is accessible and contains the expected structure
    if (data && data.items && data.items.length > 0 && data.items[0].price) {
        // Fetch the price of the first item in the items array
        let sofa_price = data.items[0].price;
        let sofa_quantity = data.items[0].quantity;


        // Display the price in the <p> element with the id "sofa-price"
        document.getElementById("sub-price").textContent = `Rs. ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((sofa_price)/100)}`;

        document.getElementById("total-price").textContent = `Rs. ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((sofa_price*sofa_quantity)/100)}`;
            
        // Optional: log the price to the console for debugging
        console.log(sofa_price);
    } else {
        console.log("Data structure is not as expected or missing required fields.");
    }
});