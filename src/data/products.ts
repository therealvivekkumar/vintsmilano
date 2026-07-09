import rainMossImg from "@assets/Rain&Moss_Product_Shoot_1782995731126.png";
import blueMoonImg from "@assets/BM_White_1783514581888.png";
import cloudHeavenImg from "@assets/VM_CH_New_Label1_1783514738083.png";
import magicShroomImg from "@assets/image_1783514849838.png";
import midnightKodaiImg from "@assets/MK_White_1783514910448.png";

import rainMossModelImg from "@assets/Model_With_perfume_RM.2_1782995811864.png";
import magicShroomModelImg from "@assets/MS_Model_1782995857667.png";
import cloudHeavenModelImg from "@assets/CH_Model_2_1782995891793.png";
import midnightKodaiModelImg from "@assets/MK_With_New_Model_1783515689542.png";
import blueMoonModelImg from "@assets/image_1783000611590.png";

import rainMossDetail1 from "@assets/VM_RM_New_Label_1783514501368.png";
import blueMoonDetail1 from "@assets/VM_BM_New_Label_1783514633847.png";
import cloudHeavenDetail1 from "@assets/VM_CH_New_Label_1783514791752.png";
import midnightKodaiDetail1 from "@assets/VM_MK_New_Label_1783515032262.png";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  size: string;
  productImage: string;
  modelImage: string;
  additionalImages?: string[];
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  longevity: string;
  projection: string;
  occasion: string;
};

export const products: Product[] = [
  {
    id: "rain-and-moss",
    name: "Rain & Moss",
    tagline: "Inspired by misty forests & earthy grounds",
    description: "A raw, earthy fragrance that transports you to the heart of a monsoon forest. Petrichor and forest floors awakened by rain.",
    price: 2499,
    size: "100 ml",
    productImage: rainMossImg,
    modelImage: rainMossModelImg,
    additionalImages: [rainMossDetail1],
    topNotes: ["Petrichor", "Green Leaves", "Bergamot"],
    middleNotes: ["Oakmoss", "Vetiver", "Cedar"],
    baseNotes: ["Sandalwood", "Musk", "Amber"],
    longevity: "12-20 hours",
    projection: "Moderate",
    occasion: "Casual, Outdoors"
  },
  {
    id: "blue-moon",
    name: "Blue Moon",
    tagline: "Inspired by moonlit hills & cold mountain air",
    description: "The crisp silence of a mountain night. Cool, aquatic, and undeniably magnetic.",
    price: 2499,
    size: "100 ml",
    productImage: blueMoonImg,
    modelImage: blueMoonModelImg,
    additionalImages: [blueMoonDetail1],
    topNotes: ["Aquatic", "Bergamot", "Mint"],
    middleNotes: ["Jasmine", "Blue Iris", "Sea Salt"],
    baseNotes: ["Cedarwood", "Musk", "White Amber"],
    longevity: "12-20 hours",
    projection: "Moderate to Strong",
    occasion: "Evening, Night"
  },
  {
    id: "cloud-heaven",
    name: "Cloud Heaven",
    tagline: "Inspired by serene skies & comforting clouds",
    description: "Soft, celestial, and gentle. Like lying on warm clouds at golden hour, wrapped in pure light.",
    price: 2499,
    size: "100 ml",
    productImage: cloudHeavenImg,
    modelImage: cloudHeavenModelImg,
    additionalImages: [cloudHeavenDetail1],
    topNotes: ["White Peach", "Freesia", "Lemon Zest"],
    middleNotes: ["Muguet", "Peony", "Sheer Rose"],
    baseNotes: ["White Musk", "Cashmere", "Sandalwood"],
    longevity: "12-20 hours",
    projection: "Soft",
    occasion: "Daily, Office, Gifting"
  },
  {
    id: "magic-shroom",
    name: "Magic Shroom",
    tagline: "Bold, psychedelic, unforgettable",
    description: "A bold, avant-garde scent that defies convention. Earthy mushroom meets oriental spice — for those who dare to be different.",
    price: 2499,
    size: "100 ml",
    productImage: magicShroomImg,
    modelImage: magicShroomModelImg,
    topNotes: ["Black Pepper", "Cardamom", "Grapefruit"],
    middleNotes: ["Truffle", "Patchouli", "Dark Rose"],
    baseNotes: ["Oud", "Benzoin", "Dark Musk"],
    longevity: "12-20 hours",
    projection: "Strong",
    occasion: "Evening, Special Occasions"
  },
  {
    id: "midnight-kodai",
    name: "Midnight Kodai",
    tagline: "A starlit journey through sacred hills",
    description: "Deep, mysterious, and commanding. Inspired by the silence of Kodaikanal night sky — where stars whisper and valleys dream.",
    price: 2499,
    size: "100 ml",
    productImage: midnightKodaiImg,
    modelImage: midnightKodaiModelImg,
    additionalImages: [midnightKodaiDetail1],
    topNotes: ["Black Cardamom", "Saffron", "Aldehydes"],
    middleNotes: ["Dark Oud", "Leather", "Smoky Accord"],
    baseNotes: ["Amber", "Labdanum", "Deep Musk"],
    longevity: "12-20 hours",
    projection: "Strong to Intense",
    occasion: "Formal, Night, Special Events"
  }
];
