const user = {
  firstName: 'John', // string
  lastName: 'Doe', // string
  rate: 0.86, // number in range 0..1
  address: { // not empty object or null
    line1: '15 Macon St', // string
    line2: '', // string
    city: 'Gotham' // string
  },
  phoneNumbers: [ // array containing at least 1 element
    {
      type: 'MOBILE', // string, limited to MOBILE | LINE | VOIP
      number: '(555) 555-1234' // string in specific format
    },
    {
      type: 'LINE',
      number: '(555) 555-5678'
    }
  ]
};

function check(obj) {
  typeof obj.firstName !== 'string' ? console.log("First name isn't string") : true;
  typeof obj.lastName !== 'string' ? console.log("Last name isn't string") : true;
  (obj.rate >= 0 && obj.rate <= 1) ? true : console.log("Rate should be number in range 0..1");
  if (obj.address === null || Object.keys(obj.address).length === 0) {
    console.log("Address does not exist or is empty")
  } else {
    (typeof obj.address.line1 !== 'string' ||
    typeof obj.address.line2 !== 'string'||
    typeof obj.address.city !== 'string') ? console.log("Address isn't string") : true;
  }
  if (obj.phoneNumbers.some(elementPhoneNumbers => elementPhoneNumbers !== null && typeof elementPhoneNumbers === 'object')) {
    let arrTypes = ['MOBILE','LINE','VOIP'],
      specificNumber = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    for(let i=0; i < obj.phoneNumbers.length; i++) {
      arrTypes.some(value => value === obj.phoneNumbers[i].type) ? true : console.log("Wrong type");
      specificNumber.test(obj.phoneNumbers[i].number) ? true : console.log("Wrong number format. Try some like this: (123) 123-1234")
    }
  } else {
    console.log('The array does not contain any elements');
  }
}

check(user);