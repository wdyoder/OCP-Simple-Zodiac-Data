export interface IncomingCustomer {
  email: string;
  name: string;
  dob_day: number;
  dob_month: number;
  dob_year: number;
}

export interface GqlCustomers {
  edges: GqlCustomerEdge[];
}

export interface GqlCustomerEdge {
  node: IncomingCustomer;
}
