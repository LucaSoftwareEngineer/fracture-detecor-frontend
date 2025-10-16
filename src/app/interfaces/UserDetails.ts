export interface UserDetails {
  id: number;
  username: string;
  name: string;
  surname: string;
  type: string;
  numeroAnalisiTotali: number;
  numeroAnalisiConFrattura: number;
  numeroAnalisiSenzaFrattura: number;
  conteggiAnalisi: number[];
}
