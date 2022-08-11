export interface Sequence {
  id: number; name: string; type: SequenceType, termId: number;}

export enum SequenceType {
  OPENING = "OPENING",
  MID = "MID",
  CLOSING = "CLOSING"
}
