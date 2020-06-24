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

    totalCostEl.textContent = `$${totalCost.toFixed(2)}`;
}

function updateCartGrandTotal() {
    let grandTotal = 0;

    const totals = document.querySelectorAll('.cart__product-total');
    totals.forEach(total => {
        const productTotal = parseCost(total.textContent);
        console.log(total.textContent + ' + ' + productTotal);
        grandTotal += productTotal;
    });

    const grandTotalEl = document.querySelector('.cart__total-cost');
    console.log('grand total: ' + grandTotal);
    grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
}

function parseCost(costAsStringWithDollarSign) {
    const costWithoutDollarSign = costAsStringWithDollarSign.slice(1);
    return parseFloat(costWithoutDollarSign);
}

if (document.readyState !== 'loading') {
    updateCart();
}
else {
    document.addEventListener('DOMContentLoaded', updateCart());
}