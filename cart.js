'use strict'

function updateCart() {
    updateProductRowTotalCosts();
    updateCartCostTotal();
    updateShippingTotalWeight();
    updateTotalShippingCost();
    updateCartGrandTotal();
}

function updateProductRowTotalCosts() {
    const products = document.querySelectorAll('.cart__product-name');
    products.forEach(updateTotalCostForProduct);
}

function updateTotalCostForProduct(productEl) {
    const costEl = productEl.nextElementSibling;
    const quantityEl = costEl.nextElementSibling;
    const quantityInput = quantityEl.querySelector('.cart__product-qty-input');
    const totalCostEl = quantityEl.nextElementSibling;

    const name = productEl.textContent;
    const cost = costEl.textContent;
    const quantity = quantityInput.value;

    console.log(`compute product ${name}: ${cost} * ${quantity}`);

    const costAsNumber = parseCost(cost);
    const quantityAsNumber = parseInt(quantity);
    const totalCost = quantityAsNumber * costAsNumber;

    setCost(totalCostEl, totalCost);
}

function updateCartCostTotal() {
    let cartTotal = 0;

    const totals = document.querySelectorAll('.cart__product-total');
    totals.forEach(total => {
        const productTotal = parseCost(total.textContent);
        cartTotal += productTotal;
    });

    const cartTotalEl = document.querySelector('.cart__total-cost');
    setCost(cartTotalEl, cartTotal);
}

function parseCost(costAsStringWithDollarSign) {
    const costWithoutDollarSign = costAsStringWithDollarSign.slice(1);
    return parseFloat(costWithoutDollarSign);
}

function setCost(el, cost) {
    el.textContent = `$${cost.toFixed(2)}`;
}

function updateShippingTotalWeight() {
    let totalWeight = 0;

    const weights = document.querySelectorAll('.cart__product-weight');
    weights.forEach(weightEl => {
        const weight = parseFloat(weightEl.textContent);
        totalWeight += isNaN(weight) ? 0 : weight;
    });

    const totalWeightEl = document.querySelector('.cart__total-weight');
    totalWeightEl.textContent = totalWeight + 'lb';
}

function updateTotalShippingCost() {
    const totalWeightEl = document.querySelector('.cart__total-weight');
    const totalWeightStr = totalWeightEl.textContent;
    const totalWeight = parseFloat(totalWeightStr);

    const totalShippingCost = isNaN(totalWeight) ? 0 : totalWeight * .25;
    const shippingTotalEl = document.querySelector('.cart__shipping-cost');
    setCost(shippingTotalEl, totalShippingCost);
}

function updateCartGrandTotal() {
    const cartTotalEl = document.querySelector('.cart__total-cost');
    const shippingTotalEl = document.querySelector('.cart__shipping-cost');

    const cartTotal = parseCost(cartTotalEl.textContent);
    const shippingTotal = parseCost(shippingTotalEl.textContent);
    const grandTotal = cartTotal + shippingTotal;

    const grandTotalEl = document.querySelector('.cart__grand-total-cost');
    setCost(grandTotalEl, grandTotal);
}

function initUpdateButton() {
    const button = document.querySelector('.update-cart-button');
    button.addEventListener('click', updateCart);
}


if (document.readyState !== 'loading') {
    initUpdateButton();
}
else {
    document.addEventListener('DOMContentLoaded', initUpdateButton());
}
