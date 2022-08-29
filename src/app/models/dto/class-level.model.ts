export interface ClassLevel {
  id: number;
  name: string;
  order: number;
  sectionId: number;
  classLevelSubs?: ClassLevel[]
}
