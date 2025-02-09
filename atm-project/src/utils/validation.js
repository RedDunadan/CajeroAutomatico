function isValidAmount(amount) {
    return !isNaN(amount) && amount > 0;
}

function isValidWithdrawal(balance, amount) {
    return isValidAmount(amount) && amount <= balance;
}

function isValidDeposit(amount) {
    return isValidAmount(amount);
}

export { isValidAmount, isValidWithdrawal, isValidDeposit };