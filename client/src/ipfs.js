const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: '127.0.0.1', port: 5001 });

export default ipfs;