import ipfs from './ipfs';

const uploadIpfs = async (name, imageData) => {
  console.log(name);
  console.log(imageData);
  const imageHash = await uploadImageIpfs(imageData);
  const imageURI = process.env.REACT_APP_IPFS_BASE_URL + imageHash
  console.log(imageURI);
  const content = JSON.stringify({
    name: name,
    description: "",
    image: imageURI
  });
  var result = [];
  for await (var res of ipfs.add(content)) {
    result.push(res);
  }
  const hash = await result[0].cid.string;
  console.log(hash);
  return hash;
};

const uploadImageIpfs = async (content) => {
  var result = [];
  for await (const res of ipfs.add(content)) {
    result.push(res);
  }
  const hash = await result[0].cid.string;
  return hash;

};

export default uploadIpfs;