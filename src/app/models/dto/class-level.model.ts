export interface ClassLevel {
  id: number;
  name: string;
  sectionId: number;
  classLevelSubs?: ClassLevel[]
}
