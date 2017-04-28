import { fromWei } from '../api/web3Api';

export function getAccountString(account) {
    return account.address + " (" + fromWei(account.balance) + " ETH)"
}

export function getFormattedUserAccount(account) {
    let userBalance = parseFloat(fromWei(account.balance)).toFixed(3);
    return `${account.address} (${userBalance} ETH)`;
}
