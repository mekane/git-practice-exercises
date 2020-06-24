'use strict'

function updateCart() {
    updateProductRowTotalCosts();
    updateCartGrandTotal();
}

function updateProductRowTotalCosts() {
    const products = document.querySelectorAll('.cart__product-name');
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

    const costAsNumber = parseCost(cost);
    const quantityAsNumber = parseInt(quantity);
    const totalCost = quantityAsNumber * costAsNumber;

    setCost(totalCostEl, totalCost);
}

function updateCartGrandTotal() {
    let grandTotal = 0;

    const totals = document.querySelectorAll('.cart__product-total');
    totals.forEach(total => {
        const productTotal = parseCost(total.textContent);
        grandTotal += productTotal;
    });

    const grandTotalEl = document.querySelector('.cart__total-cost');
    setCost(grandTotalEl, grandTotal);
}

function parseCost(costAsStringWithDollarSign) {
    const costWithoutDollarSign = costAsStringWithDollarSign.slice(1);
    return parseFloat(costWithoutDollarSign);
}

function setCost(el, cost) {
    el.textContent = `$${cost.toFixed(2)}`;
}

if (document.readyState !== 'loading') {
    updateCart();
}
else {
    document.addEventListener('DOMContentLoaded', updateCart());
}