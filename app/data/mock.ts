import { GalleryItem, PricingPlan, Testimonial, HairFeature, ModelPreset, HairStylePreset, SNSFormat } from '../types';

export const galleryItems: GalleryItem[] = [
  { beforeImage: '', afterImage: '', category: '커트', label: '레이어드 커트', caption: '여성 미디엄 레이어드' },
  { beforeImage: '', afterImage: '', category: '펌', label: 'C컬 펌', caption: '볼륨 C컬 디지털 펌' },
  { beforeImage: '', afterImage: '', category: '염색', label: '애쉬 브라운', caption: '애쉬 브라운 염색' },
  { beforeImage: '', afterImage: '', category: '커트', label: '댄디컷', caption: '남성 댄디컷' },
  { beforeImage: '', afterImage: '', category: '펌', label: '히피 펌', caption: '남성 히피 펌' },
  { beforeImage: '', afterImage: '', category: '염색', label: '하이라이트', caption: '블론드 하이라이트' },
  { beforeImage: '', afterImage: '', category: '여성', label: '허쉬컷', caption: '허쉬컷 + 에어터치' },
  { beforeImage: '', afterImage: '', category: '남성', label: '리프컷', caption: '남성 리프컷' },
  { beforeImage: '', afterImage: '', category: '커트', label: '보브 커트', caption: '클래식 보브' },
  { beforeImage: '', afterImage: '', category: '펌', label: '볼드 펌', caption: '뿌리 볼드 펌' },
  { beforeImage: '', afterImage: '', category: '염색', label: '핑크 옴브레', caption: '핑크 그라데이션' },
  { beforeImage: '', afterImage: '', category: '여성', label: '레이어드 롱', caption: '롱 레이어드 커트' },
];

export const galleryCategories = ['전체', '커트', '펌', '염색', '남성', '여성'];

export const pricingPlans: PricingPlan[] = [
  {
    name: '기본',
    monthlyPrice: 29900,
    yearlyPrice: 299000,
    features: [
      { name: 'AI 헤어 모델 생성', included: true, detail: '월 20장' },
      { name: '스타일 시뮬레이션', included: false },
      { name: 'SNS 콘텐츠 변환', included: true, detail: '월 10건' },
      { name: '고해상도 다운로드', included: false },
      { name: '워터마크', included: true, detail: '있음' },
      { name: '래퍼럴 초대권', included: true, detail: '3개' },
    ],
  },
  {
    name: '프로',
    monthlyPrice: 79900,
    yearlyPrice: 799000,
    highlighted: true,
    badge: 'BEST',
    features: [
      { name: 'AI 헤어 모델 생성', included: true, detail: '월 100장' },
      { name: '스타일 시뮬레이션', included: true },
      { name: 'SNS 콘텐츠 변환', included: true, detail: '월 50건' },
      { name: '고해상도 다운로드', included: true },
      { name: '워터마크', included: true, detail: '없음' },
      { name: '래퍼럴 초대권', included: true, detail: '5개' },
    ],
  },
  {
    name: '프리미엄',
    monthlyPrice: 149000,
    yearlyPrice: 1490000,
    features: [
      { name: 'AI 헤어 모델 생성', included: true, detail: '무제한' },
      { name: '스타일 시뮬레이션', included: true },
      { name: 'SNS 콘텐츠 변환', included: true, detail: '무제한' },
      { name: '고해상도 다운로드', included: true },
      { name: '워터마크', included: true, detail: '없음' },
      { name: '래퍼럴 초대권', included: true, detail: '10개' },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: '모델 구하느라 반나절 날리던 시간이 사라졌어요. 시술 끝나면 바로 사진 찍어서 AI로 돌리면 끝!',
    author: '김○○',
    role: '헤어살롱 원장',
  },
  {
    quote: '고객 사진 모자이크 안 해도 되니까 인스타 퀄리티가 확 올라갔어요. 팔로워도 눈에 띄게 늘었습니다.',
    author: '박○○',
    role: '뷰티샵 디자이너',
  },
  {
    quote: '월 3만원으로 매주 새 스타일 포트폴리오를 올릴 수 있게 됐습니다. 1인샵엔 이만한 게 없어요.',
    author: '이○○',
    role: '1인 헤어샵 운영자',
  },
  {
    quote: '고객한테 "이 스타일 하면 이렇게 됩니다" 보여주니까 시술 동의율이 체감 30%는 올라간 것 같아요.',
    author: '최○○',
    role: '프리랜서 헤어 디자이너',
  },
  {
    quote: '프랜차이즈 전 지점에 도입했는데, 마케팅 콘텐츠 제작 비용이 1/10로 줄었습니다.',
    author: '정○○',
    role: '뷰티 프랜차이즈 마케팅 팀장',
  },
];

export const hairFeatures: HairFeature[] = [
  {
    icon: '💇',
    title: 'AI 헤어 모델 생성',
    description: '시술 사진만 올리면 초상권 걱정 없는 AI 모델컷이 10초 만에 완성',
    sellerPhrase: '모델 없이 인스타용 사진 완성',
  },
  {
    icon: '✨',
    title: '헤어 스타일 시뮬레이션',
    description: '"이 스타일 하면 이렇게 됩니다" — 고객 상담에 바로 활용 가능',
    sellerPhrase: '고객 상담 시 시각적 설득 도구',
  },
  {
    icon: '📱',
    title: 'SNS 콘텐츠 자동 변환',
    description: '인스타 피드, 릴스, 네이버 플레이스 최적화 사이즈로 자동 변환',
    sellerPhrase: '바로 올릴 수 있는 콘텐츠',
  },
];

export const femaleModels: ModelPreset[] = [
  { id: 'f-1', name: '모델 A', gender: 'female' },
  { id: 'f-2', name: '모델 B', gender: 'female' },
  { id: 'f-3', name: '모델 C', gender: 'female' },
  { id: 'f-4', name: '모델 D', gender: 'female' },
  { id: 'f-5', name: '모델 E', gender: 'female' },
  { id: 'f-6', name: '모델 F', gender: 'female' },
];

export const maleModels: ModelPreset[] = [
  { id: 'm-1', name: '모델 G', gender: 'male' },
  { id: 'm-2', name: '모델 H', gender: 'male' },
  { id: 'm-3', name: '모델 I', gender: 'male' },
  { id: 'm-4', name: '모델 J', gender: 'male' },
];

export const hairStyles: HairStylePreset[] = [
  { id: 'hs-1', name: '레이어드 커트', category: 'cut' },
  { id: 'hs-2', name: '보브 커트', category: 'cut' },
  { id: 'hs-3', name: '허쉬컷', category: 'cut' },
  { id: 'hs-4', name: '댄디컷', category: 'cut' },
  { id: 'hs-5', name: 'C컬 펌', category: 'perm' },
  { id: 'hs-6', name: '히피 펌', category: 'perm' },
  { id: 'hs-7', name: '볼드 펌', category: 'perm' },
  { id: 'hs-8', name: '뿌리 펌', category: 'perm' },
  { id: 'hs-9', name: '애쉬 브라운', category: 'color' },
  { id: 'hs-10', name: '핑크 옴브레', category: 'color' },
  { id: 'hs-11', name: '하이라이트', category: 'color' },
  { id: 'hs-12', name: '발레아쥬', category: 'color' },
];

export const snsFormats: SNSFormat[] = [
  { id: 'sns-1', name: '인스타 피드', platform: 'Instagram', ratio: '1:1', width: 1080, height: 1080 },
  { id: 'sns-2', name: '인스타 릴스', platform: 'Instagram', ratio: '9:16', width: 1080, height: 1920 },
  { id: 'sns-3', name: '네이버 플레이스', platform: 'Naver', ratio: '4:3', width: 1200, height: 900 },
  { id: 'sns-4', name: '카카오톡 프로필', platform: 'KakaoTalk', ratio: '1:1', width: 640, height: 640 },
];
