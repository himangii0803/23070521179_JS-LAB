const calcBtn = document.getElementById("calcBtn");
const billOutput = document.getElementById("billOutput");

// Product list as objects in an array
const products = [
  { name: "Lipstick", price: 500 },
  { name: "Perfume", price: 1500 },
  { name: "Sunscreen", price: 2200 }
];

calcBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".product input");

  // Build cart array with quantities
  let cart = Array.from(inputs)
    .map((input, index) => {
      return {
        ...products[index], // spread product object
        qty: Number(input.value)
      };
    })
    .filter(item => item.qty > 0); // only keep selected items

  if (cart.length === 0) {
    billOutput.innerHTML = "No items selected.";
    return;
  }

  // Calculate item totals with map()
  let itemDetails = cart.map(item => {
    let itemTotal = item.qty * item.price;
    return `${item.qty} * ${item.name} (₹${item.price}) = ₹${itemTotal}`;
  }).join("<br>");

  // Calculate grand total using reduce()
  let total = cart.reduce((acc, item) => acc + (item.qty * item.price), 0);

  // Apply discount logic
  let discount = 0;

  // Cart value based discount
  if (total >= 5000) {
    discount = total * 0.20;
  } else if (total >= 3000) {
    discount = total * 0.10;
  }

  // Special offer: Buy 2+ Lipsticks ₹100 off
  let lipstickItem = cart.find(item => item.name === "Lipstick");
  if (lipstickItem && lipstickItem.qty >= 2) {
    discount += 100;
  }

  let finalTotal = total - discount;

  // Show summary
  billOutput.innerHTML = `
    ${itemDetails}<br><br>
    <b>Subtotal:</b> ₹${total}<br>
    <b>Discount:</b> -₹${discount}<br>
    <b>Final Total:</b> ₹${finalTotal}
  `;
});