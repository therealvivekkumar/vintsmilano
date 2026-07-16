import rainMossImg from "@/assets/Rain_Moss_Product_Shoot.png";
import blueMoonImg from "@/assets/BM_White.png";
import cloudHeavenImg from "@/assets/VM_CH_New_Label1.png";
import magicShroomImg from "@/assets/MS_White.png";
import midnightKodaiImg from "@/assets/MK_White.png";

import rainMossModelImg from "@/assets/Model_With_perfume_RM_2.png";
import magicShroomModelImg from "@/assets/MS_Model_1.png";
import cloudHeavenModelImg from "@/assets/CH_Model_1.png";
import midnightKodaiModelImg from "@/assets/MK_With_New_Model.png";
import blueMoonModelImg from "@/assets/BM_with_Model.png";

import rainMossDetail1 from "@/assets/VM_RM_New_Label.png";
import blueMoonDetail1 from "@/assets/VM_BM_New_Label.png";
import cloudHeavenDetail1 from "@/assets/VM_CH_New_Label1.png";
import midnightKodaiDetail1 from "@/assets/VM_MK_New_Label.png";

import rainMossMaleModelImg from "@/assets/Rain_Moss_Male_Model.png";
import blueMoonMaleModelImg from "@/assets/BlueMoon_Male_Model.png";
import magicShroomMaleModelImg from "@/assets/MagicShroom_Male_Model.png";
import midnightKodaiMaleModelImg from "@/assets/Midnight_Kodai_Male_Model.png";

import northernLightsImg from "@/assets/Northern_Lights_Label.png";
import northernLightsModelImg from "@/assets/Northern_Lights_Model.png";

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
  outOfStock?: boolean;
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
    additionalImages: [rainMossMaleModelImg, rainMossDetail1],
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
    additionalImages: [blueMoonMaleModelImg, blueMoonDetail1],
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
    description: "A bold, avant-garde scent that defies convention. Earthy mushroom meets oriental spice, for those who dare to be different.",
    price: 2499,
    size: "100 ml",
    productImage: magicShroomImg,
    modelImage: magicShroomModelImg,
    additionalImages: [magicShroomMaleModelImg],
    topNotes: ["Black Pepper", "Cardamom", "Grapefruit"],
    middleNotes: ["Truffle", "Patchouli", "Dark Rose"],
    baseNotes: ["Oud", "Benzoin", "Dark Musk"],
    longevity: "12-20 hours",
    projection: "Soft",
    occasion: "Evening, Special Occasions"
  },
  {
    id: "midnight-kodai",
    name: "Midnight Kodai",
    tagline: "A starlit journey through sacred hills",
    description: "Deep, mysterious, and commanding. Inspired by the silence of Kodaikanal night sky, where stars whisper and valleys dream.",
    price: 2499,
    size: "100 ml",
    productImage: midnightKodaiImg,
    modelImage: midnightKodaiModelImg,
    additionalImages: [midnightKodaiMaleModelImg, midnightKodaiDetail1],
    topNotes: ["Black Cardamom", "Saffron", "Aldehydes"],
    middleNotes: ["Dark Oud", "Leather", "Smoky Accord"],
    baseNotes: ["Amber", "Labdanum", "Deep Musk"],
    longevity: "12-20 hours",
    projection: "Strong to Intense",
    occasion: "Formal, Night, Special Events"
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    tagline: "The sky's rarest performance.",
    description: "Radiant with cool elegance and lasting depth. A fragrance that captures the magic of fleeting light against an endless night.",
    price: 2499,
    size: "100 ml",
    productImage: northernLightsImg,
    modelImage: northernLightsModelImg,
    topNotes: ["Bergamot", "Juniper", "Icy Mint"],
    middleNotes: ["Violet", "Ambroxan", "Frozen Pine"],
    baseNotes: ["Amber", "Vetiver", "Musk"],
    longevity: "12-20 hours",
    projection: "Strong to Intense",
    occasion: "Evening, Special Events, Winter, Signature Wear",
    outOfStock: true
  }
];
