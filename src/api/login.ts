import fetch from '../utils/fetch';

export const getImgList = (sort: string) => {
  return fetch(`https://api.uomg.com/api/rand.img1?sort=${sort}&format=json`);
};

export const getPublicKey = () => {
  const pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCebVoUgQwN04eylpdAtm/jgg1zcu3apuprKvP0ionF5yG/k0ta+xIy6AzPCgGglXUcYnLhuOZD9qj1qxHTnzX0DXHafIe8biZAS4uXk9gfa0McaU8JjWF5mZ8m3zj0Wv5tPSbusT9QWCH+qwCeLbXLdfA0iJyjbUxNYTgNVKmBQIDAQAB'
  return Promise.resolve(pubKey);
};

export const userLogin = (obj: any) => {
  return Promise.resolve(obj);
};

export const userRegister = (obj: any) => {
  return Promise.resolve(obj);
};