function withdraw(amount, balance) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than zero.');
    }
    if (amount > balance) {
        throw new Error('Insufficient funds.');
    }
    balance -= amount;
    return balance;
}

function deposit(amount, balance) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than zero.');
    }
    balance += amount;
    return balance;
}

function checkBalance(balance) {
    return balance;
}

export { withdraw, deposit, checkBalance };