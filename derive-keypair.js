

const fs = require('fs');
const bip39 = require('bip39');
const bs58 = require('bs58');
const { Keypair } = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key');

async function tryRecover(mnemonic, passphrase, outfile = './cli-keypair.json') {
  const seed = await bip39.mnemonicToSeed(mnemonic, passphrase);

  // Solana CLI default derivation path:
  const { key } = derivePath("m/44'/501'/0'/0'", seed.toString('hex'));
  const kp = Keypair.fromSeed(key);

  fs.writeFileSync(outfile, JSON.stringify(Array.from(kp.secretKey)), { mode: 0o600 });

  console.log('✅ Keypair saved to:', outfile);
  console.log('🎯 Public Key:', kp.publicKey.toBase58());
}

const MNEMONIC  ='enter your mneumoniic phrase her';
tryRecover(MNEMONIC);

