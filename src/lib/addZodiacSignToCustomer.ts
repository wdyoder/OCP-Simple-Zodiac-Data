import { Zaius } from '@zaiusinc/node-sdk';
import { GqlCustomerEdge } from '../data/IncomingCustomer';
import { getZodiacSign } from './getZodiacSign';

export function addZodiacSignToCustomer(customer: GqlCustomerEdge): Zaius.CustomerPayload {
  return {
    identifiers: {
      email: customer.node.email,
    },
    attributes: {
      simple_zodiac_data_sign: getZodiacSign(customer.node.dob_month, customer.node.dob_day)
    }
  };
}
