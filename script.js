document.getElementById("prediction-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get input values
    const area = parseFloat(document.getElementById("area").value);
    const bedrooms = parseInt(document.getElementById("bedrooms").value);
    const bathrooms = parseInt(document.getElementById("bathrooms").value);
    const stories = parseInt(document.getElementById("stories").value);
    const parking = parseInt(document.getElementById("parking").value);

    // Send data to backend
    const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            area, bedrooms, bathrooms, stories, parking
        })
    });

    // Handle response
    const data = await response.json();
    document.getElementById("result").innerText = `Predicted Price: $${data.predicted_price.toFixed(2)}`;
});
