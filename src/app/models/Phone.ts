export enum PhoneType {
  Residencial,
  Trabajo,
  Movil,
  Otros
}

export interface Phone {
  phone: string;
  type: PhoneType;
  main?: boolean;
}
