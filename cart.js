'use strict'

function updateCart() {
    const products = document.querySelectorAll('.cart__product-name');
    console.log('update', products);

    products.forEach(updateTotalCostForProduct);
}

function updateTotalCostForProduct(productEl) {
    const costEl = productEl.nextElementSibling;
    const quantityEl = costEl.nextElementSibling;
    const totalCostEl = quantityEl.nextElementSibling;

    const name = productEl.textContent;
    const cost = costEl.textContent;
    const quantity = quantityEl.textContent;

    console.log(`compute product ${name}: ${cost} * ${quantity}`);

    const costWithoutDollarSign = cost.slice(1);
    const costAsNumber = parseFloat(costWithoutDollarSign);
    const quantityAsNumber = parseInt(quantity);
    const totalCost = quantityAsNumber * costAsNumber;

    totalCostEl.textContent = `$${totalCost.toFixed(2)}`;
}


if (document.readyState !== 'loading') {
    updateCart();
}
else {
    document.addEventListener('DOMContentLoaded', updateCart());
}