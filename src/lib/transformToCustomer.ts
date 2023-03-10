import { Zaius } from '@zaiusinc/node-sdk';
import { IncomingCustomer } from '../data/IncomingEvents';

/**
 * Example transformer to convert an incoming payload into a Zaius customer
 * @param customer incoming representation of a customer
 */
export function transformToCustomer(customer: IncomingCustomer): Zaius.CustomerPayload {
  return {
    identifiers: {
      email: customer.email,
    },
    attributes: {
      first_name: customer.firstName,
      last_name: customer.lastName,
      ocp_sample_1_example_points: customer.points
    }
  };
}

// Function to return the name of a Zodiac sign based on the month and day of birth
export function getZodiacSign(month: number, day: number): string {
  if (month == 1) {
    return (day < 20) ? "Capricorn" : "Aquarius";
  } else if (month == 2) {
    return (day < 19) ? "Aquarius" : "Pisces";
  } else if (month == 3) {
    return (day < 21) ? "Pisces" : "Aries";
  } else if (month == 4) {
    return (day < 20) ? "Aries" : "Taurus";
  } else if (month == 5) {
    return (day < 21) ? "Taurus" : "Gemini";
  } else if (month == 6) {
    return (day < 21) ? "Gemini" : "Cancer";
  } else if (month == 7) {
    return (day < 23) ? "Cancer" : "Leo";
  } else if (month == 8) {
    return (day < 23) ? "Leo" : "Virgo";
  } else if (month == 9) {
    return (day < 23) ? "Virgo" : "Libra";
  } else if (month == 10) {
    return (day < 23) ? "Libra" : "Scorpio";
  } else if (month == 11) {
    return (day < 22) ? "Scorpio" : "Sagittarius";
  } else if (month == 12) {
    return (day < 22) ? "Sagittarius" : "Capricorn";
  } else {
    return "Invalid month";
  }
}
