

export default interface custumer {
    name: string;
    email: string;
    tax_id: string;
    phones: {
      country: string;
      area: string;
      number: string;
      type: string;
    }[]
}
  