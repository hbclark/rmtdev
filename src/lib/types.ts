export type TJobItem = {
  id: number;
  title: string;
  company: string;
  daysAgo: number;
  badgeLetters: string;
  relevanceScore: number;
};

export type TJobItemContent = TJobItem & {
  description: string;
  duration: string;
  salary: string;
  location: string;
  qualifications: string[];
  reviews: string[];
  companyURL: string;
  coverImgURL: string;
};
