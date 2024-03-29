export const PROTOCOL_CONTRACTS = {
  80001: "0xFfe8B49e11883De88e110604DA018572b93f9f24",
  5: "0x87148553f8D5c32Ec2358Ab1f3b2eF9C3bBd0f6D",
};

export const metaversesJson = [
  {
    id: "0",
    icon: "decentraland.svg",
    name: "Decentraland",
    slug: "decentraland",
    price: 600,
    availabilityRange: 100000,
  },
  // {
  //   id: '1',
  //   icon: 'sandbox.svg',
  //   name: 'The Sandbox',
  //   slug: 'sandbox',
  //   price: 200,
  //   availabilityRange: 1500,
  // },
  {
    id: "1",
    icon: "somnium.svg",
    name: "Somnium Space",
    slug: "somnium_space",
    price: 200,
    availabilityRange: 20,
  },
  {
    id: "2",
    icon: "cryptovoxels.svg",
    name: "Cryptovoxels",
    slug: "cryptovoxels",
    price: 170.01,
    availabilityRange: 1024,
  },
  {
    id: "3",
    icon: "monaverse.svg",
    name: "Monaverse",
    slug: "monaverse",
    price: 199,
    availabilityRange: 1024,
  },
  {
    id: "4",
    icon: "fabwelt.svg",
    name: "Fabwelt",
    slug: "fabwelt",
    price: 199,
    availabilityRange: 1024,
  },
];

export const ENDPOINTS = {
  5: process.env.NEXT_PUBLIC_GOERLI_ENDPOINT,
};

export const GATEWAY = "styleprotocol.mypinata.cloud";

export const DEFAULT_IMAGE = "/assets/images/default_nft.svg";
export const DEFAULT_IMAGE_3D = "/assets/images/derivative.png";

export const STORAGE_MESSAGE = "STYLE Protocol\r\nI am a human";
export const STORAGE_PREFIX = "STYLE_PROTOCOL_";

export const API_HOST = "style-protocol-api.vercel.app";

export const MODEL_IDS = {
  AVATAR_null: 0,
  WEARABLE_Head: 1,
  "WEARABLE_Upper Body": 2,
  "WEARABLE_Lower Body": 3,
  WEARABLE_Feet: 4,
  WEARABLE_Earring: 5,
  WEARABLE_Eyewear: 6,
  WEARABLE_Hat: 7,
  WEARABLE_Helmet: 8,
  WEARABLE_Mask: 9,
  WEARABLE_Tiara: 10,
  "WEARABLE_Top Head": 11,
  MISC_Pet: 12,
  MISC_Artifact: 13,
  MISC_Weapon: 14,
  MISC_Other: 15,
};

export let MODEL_NAMES = {};
for (const key in MODEL_IDS) {
  MODEL_NAMES[MODEL_IDS[key]] = key;
}
