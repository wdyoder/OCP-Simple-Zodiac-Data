import 'jest';
import {getZodiacSign} from './getZodiacSign';

describe('getZodiacSign', () => {
  it('returns the correct zodiac sign for a given date', () => {
    expect(getZodiacSign(1, 1)).toEqual('Capricorn');
    expect(getZodiacSign(1, 20)).toEqual('Aquarius');
    expect(getZodiacSign(2, 18)).toEqual('Aquarius');
    expect(getZodiacSign(2, 19)).toEqual('Pisces');
    expect(getZodiacSign(3, 20)).toEqual('Pisces');
    expect(getZodiacSign(3, 21)).toEqual('Aries');
    expect(getZodiacSign(4, 19)).toEqual('Aries');
    expect(getZodiacSign(4, 20)).toEqual('Taurus');
    expect(getZodiacSign(5, 20)).toEqual('Taurus');
    expect(getZodiacSign(5, 21)).toEqual('Gemini');
    expect(getZodiacSign(6, 20)).toEqual('Gemini');
    expect(getZodiacSign(6, 21)).toEqual('Cancer');
    expect(getZodiacSign(7, 22)).toEqual('Cancer');
    expect(getZodiacSign(7, 23)).toEqual('Leo');
    expect(getZodiacSign(8, 22)).toEqual('Leo');
    expect(getZodiacSign(8, 23)).toEqual('Virgo');
    expect(getZodiacSign(9, 22)).toEqual('Virgo');
    expect(getZodiacSign(9, 23)).toEqual('Libra');
    expect(getZodiacSign(10, 22)).toEqual('Libra');
    expect(getZodiacSign(10, 23)).toEqual('Scorpio');
    expect(getZodiacSign(11, 21)).toEqual('Scorpio');
    expect(getZodiacSign(11, 22)).toEqual('Sagittarius');
    expect(getZodiacSign(12, 21)).toEqual('Sagittarius');
    expect(getZodiacSign(12, 22)).toEqual('Capricorn');
    expect(getZodiacSign(99, 1)).toEqual('Invalid month');
    expect(getZodiacSign(-99, 1)).toEqual('Invalid month');
  });
});
