export interface Grade {
  key: GradeKey;
  score: number;
  description: string;
  graderId: number;
  histories?: GradeHistory[];
}

export interface GradeKey {
  registrationId: number;
  sequenceId: number;
}

export interface GradeHistory {
  id: number;
  score: number;
  createdAt: string;
  graderId: number;
}
