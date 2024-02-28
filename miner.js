const Web3 = require('web3');

const web3 = new Web3('https://bsc-dataseed1.binance.org');

function generateRandomPrivateKey() {
    return web3.utils.randomHex(32); // Generate 32 bytes of random data as a hex string
}

async function checkBalance(address) {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.toBN(balance);
}

async function main() {
    let privateKey;

    while (true) {
        privateKey = generateRandomPrivateKey();

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const address = account.address;

        console.log('Address:', address);

        const balance = await checkBalance(address);

        if (!balance.isZero()) {
            console.log('Balance is greater than zero:', balance.toString());
            console.log('Private key:', privateKey);
            break;
        } else {
            console.log('Balance is zero, generating a new private key...');
        }
    }
}

main().catch(console.error);
