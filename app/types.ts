// ===== 뷰티/헤어 AI SaaS 타입 정의 =====

export interface GalleryItem {
  beforeImage: string;
  afterImage: string;
  category: string;
  label?: string;
  caption?: string;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { name: string; included: boolean; detail?: string }[];
  highlighted?: boolean;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface HairFeature {
  icon: string;
  title: string;
  description: string;
  sellerPhrase: string;
}

export interface ModelPreset {
  id: string;
  name: string;
  gender: 'female' | 'male';
}

export interface HairStylePreset {
  id: string;
  name: string;
  category: 'cut' | 'perm' | 'color' | 'upstyle';
}

export interface SNSFormat {
  id: string;
  name: string;
  platform: string;
  ratio: string;
  width: number;
  height: number;
}
