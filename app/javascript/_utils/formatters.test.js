import {
  formatPhoneNumberExt,
  phoneNumberFormatter,
  formatDate,
} from './formatters';

describe('#formatPhoneNumberExt', () => {
  describe('When phone & extension exists ', () => {
    it('returns phone & Extension with Ext text ', () => {
      const details = {
        phone_number: '1112222333',
        phone_extension_number: '011',
      };
      expect(formatPhoneNumberExt(details)).toEqual('(111) 222-2333 Ext 011');
    });
  });

  describe('When phone_number exists without extension', () => {
    it('returns phone with ext ', () => {
      const details = {
        phone_number: '1114445555',
        phone_extension_number: undefined,
      };
      expect(formatPhoneNumberExt(details)).toEqual('(111) 444-5555 Ext');
    });
  });

  describe('When phone_extension_number exists without phone_number ', () => {
    it('returns just empty ', () => {
      const details = {
        phone_number: null,
        phone_extension_number: '111',
      };
      expect(formatPhoneNumberExt(details)).toEqual('');
    });
  });

  describe('When no phone and no extension', () => {
    it('returns just empty ', () => {
      const details = {};
      expect(formatPhoneNumberExt(details)).toEqual('');
    });
  });

  describe('#phoneNumberFormatter ', () => {
    it('processes an empty string', () => {
      expect(phoneNumberFormatter('')).toEqual(null);
    });

    it('should return formatted number when given a 10 digit number', () => {
      expect(phoneNumberFormatter('1234567890')).toEqual('(123) 456-7890');
    });

    it('should return null when given a less than 10 digit number', () => {
      expect(phoneNumberFormatter('12345')).toEqual(null);
    });

    it('should return null when given a greater than 10 digit number', () => {
      expect(phoneNumberFormatter('12345678901')).toEqual(null);
    });

    it('should return null when used alphabets', () => {
      expect(phoneNumberFormatter('abcd')).toEqual(null);
    });
  });
});

describe('#formatDate', () => {
  describe('When date exists ', () => {
    it('with different format', () => {
      const details = {
        start_date: '2001-09-01',
      };
      expect(formatDate(details.start_date)).toEqual('09/01/2001');
    });
  });

  describe('When date not exists ', () => {
    it('returns just empty ', () => {
      const details = {
        start_date: null,
      };
      expect(formatDate(details.start_date)).toEqual('');
    });
  });
});