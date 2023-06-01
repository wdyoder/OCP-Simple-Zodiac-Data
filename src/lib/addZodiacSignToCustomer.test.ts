import 'jest';
import {addZodiacSignToCustomer} from './addZodiacSignToCustomer';

const mockIncomingCustomer = {
  node: {
    email: 'test1@example.com',
    name: 'Foo Bar',
    dob_day: 1,
    dob_month: 1,
    dob_year: 2000
  }
};

describe('addZodiacSignToCustomer', () => {
  it('transforms an incoming customer into a Zaius customer with a Zodiac sign', () => {
    expect(addZodiacSignToCustomer(mockIncomingCustomer)).toEqual({
      identifiers: {
        email: 'test1@example.com',
      },
      attributes: {
        simple_zodiac_data_sign: 'Capricorn'
      }
    });
  });
});
