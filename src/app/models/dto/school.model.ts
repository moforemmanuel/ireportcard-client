export interface School {
  id: number,
  name: string,
  curr_year_id?: number,
  curr_term?: string,
  curr_seq_id?: number,
  max_grade: number,
  application_open: boolean,
  number_of_sections?: number
}
