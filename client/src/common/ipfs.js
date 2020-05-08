const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({
  host: process.env.REACT_APP_IPFS_HOST,
  port: 5001,
  protocol: process.env.REACT_APP_IPFS_PROTOCOL
});

export default ipfs;