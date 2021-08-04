import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Grid, AppBar, Toolbar, Typography, Paper,
} from '@material-ui/core';
import Search, { TCategory } from './Search';
import Listing from './Listing';
import './YABApp.css';

// export type TCategory = Readonly<{
//   id: number,
//   alias: string,
//   title: string,
//   parents: string,
//   whitelist: string,
//   blacklist: string
// }>;

const bizListTemp = [{
  alias: 'lapis-washington',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'cocktailbars', title: 'Cocktail Bars' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.9213, longitude: -77.04392 },
  display_phone: '(202) 299-9630',
  distance: 6213.657380054281,
  id: 'xeOXTasySvPyKTZC6-BxFQ',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/B4kvI5MntU1BW9j1UDlrUw/o.jpg',
  is_closed: false,
  location: {
    address1: '1847 Columbia Rd NW', address2: '', address3: '', city: 'Washington, DC', country: 'US', display_address: ['1847 Columbia Rd NW', 'Washington, DC 20009'], state: 'DC', zip_code: '20009',
  },
  name: 'Lapis',
  phone: '+12022999630',
  price: '$$',
  rating: 4.5,
  review_count: 588,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/lapis-washington?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'fresh-afghan-cuisine-washington-dc',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'foodtrucks', title: 'Food Trucks' }],
  coordinates: { latitude: 38.8746332954787, longitude: -76.9945468381047 },
  display_phone: '(703) 283-5498',
  distance: 1622.8067571463273,
  id: 'VfH-ZFEoSD0MjRfi7C7-uA',
  image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/U-6dZGayxWxhNacqLc0AIA/o.jpg',
  is_closed: false,
  location: {
    address1: 'Navy Yard', address2: '', address3: '', city: 'Washington DC', country: 'US', display_address: ['Navy Yard', 'Washington DC, AL 20003'], state: 'AL', zip_code: '20003',
  },
  name: 'Fresh Afghan Cuisine',
  phone: '+17032835498',
  price: '$',
  rating: 5,
  review_count: 40,
  transactions: [],
  url: 'https://www.yelp.com/biz/fresh-afghan-cuisine-washington-dc?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'bistro-aracosia-washington',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'wine_bars', title: 'Wine Bars' }],
  coordinates: { latitude: 38.92493, longitude: -77.10172 },
  display_phone: '(202) 363-0400',
  distance: 10789.537728332898,
  id: '1JRBSzV2NEo-b72ZVm6qXg',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/YOLVQAu1MmBLb5fmlpCR_A/o.jpg',
  is_closed: false,
  location: {
    address1: '5100 MacArthur Blvd', address2: null, address3: '', city: 'Washington, DC', country: 'US', display_address: ['5100 MacArthur Blvd', 'Washington, DC 20016'], state: 'DC', zip_code: '20016',
  },
  name: 'Bistro Aracosia',
  phone: '+12023630400',
  price: '$$$',
  rating: 4.5,
  review_count: 227,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/bistro-aracosia-washington?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'arlington-kabob-arlington',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.8963272, longitude: -77.1310229 },
  display_phone: '(703) 531-1498',
  distance: 12541.649381260564,
  id: 'dpdxywxqeMpUXSPvjHKDQA',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/0OtzjP37Hv0F9w8mG2C44Q/o.jpg',
  is_closed: false,
  location: {
    address1: '5046 Lee Hwy', address2: '', address3: '', city: 'Arlington', country: 'US', display_address: ['5046 Lee Hwy', 'Arlington, VA 22207'], state: 'VA', zip_code: '22207',
  },
  name: 'Arlington Kabob',
  phone: '+17035311498',
  price: '$$',
  rating: 4.5,
  review_count: 301,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/arlington-kabob-arlington?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'aracosia-mclean-mclean',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'steak', title: 'Steakhouses' }, { alias: 'whiskeybars', title: 'Whiskey Bars' }],
  coordinates: { latitude: 38.93501, longitude: -77.1794281 },
  display_phone: '(703) 269-3820',
  distance: 17495.979375905146,
  id: '1i0gf9awbeXMkrkpjWOaJg',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/g5d8czwRD73kdepEbvpkGA/o.jpg',
  is_closed: false,
  location: {
    address1: '1381 Beverly Rd', address2: '', address3: null, city: 'McLean', country: 'US', display_address: ['1381 Beverly Rd', 'McLean, VA 22101'], state: 'VA', zip_code: '22101',
  },
  name: 'Aracosia - McLean',
  phone: '+17032693820',
  rating: 5,
  review_count: 143,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/aracosia-mclean-mclean?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'afghan-grill-washington',
  categories: [{ alias: 'mideastern', title: 'Middle Eastern' }, { alias: 'afghani', title: 'Afghan' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.9237899, longitude: -77.0509299 },
  display_phone: '(202) 234-5095',
  distance: 6853.608990533224,
  id: 'DFgOdg--L1IxUksefKtqWg',
  image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/QpuEobfI4-x3othd59vH3Q/o.jpg',
  is_closed: false,
  location: {
    address1: '2309 Calvert St NW', address2: '', address3: '', city: 'Washington, DC', country: 'US', display_address: ['2309 Calvert St NW', 'Washington, DC 20008'], state: 'DC', zip_code: '20008',
  },
  name: 'Afghan Grill',
  phone: '+12022345095',
  price: '$$',
  rating: 4,
  review_count: 290,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/afghan-grill-washington?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'bamian-falls-church-2',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'buffets', title: 'Buffets' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.84939, longitude: -77.12618 },
  display_phone: '(703) 820-7880',
  distance: 12824.43101283189,
  id: '48jBfe5_HSt-_QxodywBHg',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/ZA2PIJhWRZpBv9tx-fY_0A/o.jpg',
  is_closed: false,
  location: {
    address1: '5634 Leesburg Pike', address2: '', address3: '', city: 'Falls Church', country: 'US', display_address: ['5634 Leesburg Pike', 'Falls Church, VA 22041'], state: 'VA', zip_code: '22041',
  },
  name: 'Bamian',
  phone: '+17038207880',
  price: '$$',
  rating: 4,
  review_count: 404,
  transactions: ['pickup'],
  url: 'https://www.yelp.com/biz/bamian-falls-church-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'kabobistan-annandale-2',
  categories: [{ alias: 'afghani', title: 'Afghan' }],
  coordinates: { latitude: 38.813007, longitude: -77.183929 },
  display_phone: '(703) 866-8615',
  distance: 19011.58796126056,
  id: 'RYWCyp2ovDktgSwnR5Qmxw',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/lYamJPnCcb7_nh0EQK9BXQ/o.jpg',
  is_closed: false,
  location: {
    address1: '6920 Braddock Rd', address2: 'Ste G', address3: '', city: 'Annandale', country: 'US', display_address: ['6920 Braddock Rd', 'Ste G', 'Annandale, VA 22003'], state: 'VA', zip_code: '22003',
  },
  name: 'Kabobistan',
  phone: '+17038668615',
  price: '$$',
  rating: 4.5,
  review_count: 181,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/kabobistan-annandale-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'kabul-kabob-house-express-alexandria-5',
  categories: [{ alias: 'mideastern', title: 'Middle Eastern' }, { alias: 'afghani', title: 'Afghan' }],
  coordinates: { latitude: 38.805964, longitude: -77.1326722204685 },
  display_phone: '(703) 751-1833',
  distance: 15589.906718975144,
  id: 'ccg9V0RG6V43gKmwV7edPA',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/DWSizpZgOwatCAPxoid18w/o.jpg',
  is_closed: false,
  location: {
    address1: '514A S Van Dorn St', address2: '', address3: '', city: 'Alexandria', country: 'US', display_address: ['514A S Van Dorn St', 'Alexandria, VA 22304'], state: 'VA', zip_code: '22304',
  },
  name: 'Kabul Kabob House Express',
  phone: '+17037511833',
  price: '$$',
  rating: 4,
  review_count: 207,
  transactions: ['delivery'],
  url: 'https://www.yelp.com/biz/kabul-kabob-house-express-alexandria-5?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'va-kabob-house-springfield-2',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'mideastern', title: 'Middle Eastern' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.773548, longitude: -77.184793 },
  display_phone: '(703) 866-7834',
  distance: 21364.03251434387,
  id: 'br6NjAEd2oeZoryqNMB2LA',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/TiskHnDc_C4fBzHpdajpGQ/o.jpg',
  is_closed: false,
  location: {
    address1: '7031 Brookfield Plz', address2: '', address3: '', city: 'Springfield', country: 'US', display_address: ['7031 Brookfield Plz', 'Springfield, VA 22150'], state: 'VA', zip_code: '22150',
  },
  name: 'VA kabob House',
  phone: '+17038667834',
  price: '$$',
  rating: 4,
  review_count: 364,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/va-kabob-house-springfield-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'courthouse-kabob-arlington',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.8919, longitude: -77.08391 },
  display_phone: '(703) 294-9999',
  distance: 8448.26934528185,
  id: 'mLSAhqqaU1otru0XKa_CBg',
  image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dI8fL3ZkEwXHyA41Vl57-A/o.jpg',
  is_closed: false,
  location: {
    address1: '2045 Wilson Blvd', address2: null, address3: '', city: 'Arlington', country: 'US', display_address: ['2045 Wilson Blvd', 'Arlington, VA 22201'], state: 'VA', zip_code: '22201',
  },
  name: 'Courthouse Kabob',
  phone: '+17032949999',
  price: '$$',
  rating: 4.5,
  review_count: 63,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/courthouse-kabob-arlington?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'panjshir-falls-church',
  categories: [{ alias: 'afghani', title: 'Afghan' }],
  coordinates: { latitude: 38.8803, longitude: -77.17166 },
  display_phone: '(703) 536-4566',
  distance: 16051.569677205562,
  id: 'RgofqLNm_ZyJv50ryRFoDA',
  image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/tpx6ofeCdiaH263-QlCn4A/o.jpg',
  is_closed: false,
  location: {
    address1: '114 E Fairfax St', address2: null, address3: '', city: 'Falls Church', country: 'US', display_address: ['114 E Fairfax St', 'Falls Church, VA 22046'], state: 'VA', zip_code: '22046',
  },
  name: 'Panjshir',
  phone: '+17035364566',
  price: '$$',
  rating: 4,
  review_count: 184,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/panjshir-falls-church?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'grill-kabob-washington-2',
  categories: [{ alias: 'mideastern', title: 'Middle Eastern' }, { alias: 'halal', title: 'Halal' }, { alias: 'afghani', title: 'Afghan' }],
  coordinates: { latitude: 38.90331, longitude: -77.03294 },
  display_phone: '(202) 347-6460',
  distance: 4369.717481225815,
  id: '3OlVolEBO01GrqXGCfWV9Q',
  image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/G_npDzqGWxxj1Dk2ibUtiQ/o.jpg',
  is_closed: false,
  location: {
    address1: '1025 Vermont Ave NW', address2: '', address3: '', city: 'Washington, DC', country: 'US', display_address: ['1025 Vermont Ave NW', 'Washington, DC 20005'], state: 'DC', zip_code: '20005',
  },
  name: 'Grill Kabob',
  phone: '+12023476460',
  price: '$$',
  rating: 3.5,
  review_count: 146,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/grill-kabob-washington-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'big-red-halal-springfield',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'halal', title: 'Halal' }, { alias: 'falafel', title: 'Falafel' }],
  coordinates: { latitude: 38.7487523, longitude: -77.1867819 },
  display_phone: '(571) 378-0973',
  distance: 23241.019851225465,
  id: 'GJ49cfc_in2l5FMvWSC8kQ',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/eloBckrBLLSaVHOw4Cragg/o.jpg',
  is_closed: false,
  location: {
    address1: '7700 Backlick Rd', address2: 'Ste D', address3: null, city: 'Springfield', country: 'US', display_address: ['7700 Backlick Rd', 'Ste D', 'Springfield, VA 22150'], state: 'VA', zip_code: '22150',
  },
  name: 'Big Red Halal',
  phone: '+15713780973',
  rating: 4.5,
  review_count: 85,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/big-red-halal-springfield?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'mazza-kitchen-lorton-2',
  categories: [{ alias: 'foodtrucks', title: 'Food Trucks' }, { alias: 'halal', title: 'Halal' }, { alias: 'afghani', title: 'Afghan' }],
  coordinates: { latitude: 38.731742, longitude: -77.194795 },
  display_phone: '(703) 270-8886',
  distance: 25037.37440621193,
  id: 'zdsN4OmabvEEAIlK8WhWFw',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/-CWR-Imban4q2nefIzxiKg/o.jpg',
  is_closed: false,
  location: {
    address1: '8352 Terminal Rd', address2: 'Ste B', address3: null, city: 'Lorton', country: 'US', display_address: ['8352 Terminal Rd', 'Ste B', 'Lorton, VA 22079'], state: 'VA', zip_code: '22079',
  },
  name: 'Mazza Kitchen',
  phone: '+17032708886',
  price: '$',
  rating: 5,
  review_count: 34,
  transactions: [],
  url: 'https://www.yelp.com/biz/mazza-kitchen-lorton-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'dunya-banquet-and-restaurant-alexandria',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'catering', title: 'Caterers' }, { alias: 'venues', title: 'Venues & Event Spaces' }],
  coordinates: { latitude: 38.813948, longitude: -77.135632 },
  display_phone: '(703) 212-8511',
  distance: 15303.822944590247,
  id: '1pxkg3o9fRPDDYtWIXEpyQ',
  image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/9vDDlKaOBIiddDRhCBlDUQ/o.jpg',
  is_closed: false,
  location: {
    address1: '5951 Stevenson Ave', address2: '', address3: '', city: 'Alexandria', country: 'US', display_address: ['5951 Stevenson Ave', 'Alexandria, VA 22304'], state: 'VA', zip_code: '22304',
  },
  name: 'Dunya Banquet & Restaurant',
  phone: '+17032128511',
  price: '$$',
  rating: 3.5,
  review_count: 181,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/dunya-banquet-and-restaurant-alexandria?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'flame-kabob-springfield',
  categories: [{ alias: 'afghani', title: 'Afghan' }],
  coordinates: { latitude: 38.7820793081531, longitude: -77.1869266650124 },
  display_phone: '(703) 569-4006',
  distance: 20965.68388576975,
  id: 'XGD1XkdqqD6j4z5mUwia2A',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/whPBqf4cTh0dcXjFAJZCJQ/o.jpg',
  is_closed: false,
  location: {
    address1: '6328 Springfield Plz', address2: '', address3: '', city: 'Springfield', country: 'US', display_address: ['6328 Springfield Plz', 'Springfield, VA 22150'], state: 'VA', zip_code: '22150',
  },
  name: 'Flame Kabob',
  phone: '+17035694006',
  price: '$$',
  rating: 3.5,
  review_count: 178,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/flame-kabob-springfield?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'food-corner-kabob-house-annandale-2',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'mideastern', title: 'Middle Eastern' }],
  coordinates: { latitude: 38.82826, longitude: -77.18926 },
  display_phone: '(703) 750-2185',
  distance: 18747.09957352491,
  id: 'kHZjhZmXcFTqq0X3twXi-w',
  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/D-zf8d671tLGexhFAF0lzQ/o.jpg',
  is_closed: false,
  location: {
    address1: '7031 Little River Turnpike', address2: '', address3: null, city: 'Annandale', country: 'US', display_address: ['7031 Little River Turnpike', 'Annandale, VA 22003'], state: 'VA', zip_code: '22003',
  },
  name: 'Food Corner Kabob House',
  phone: '+17037502185',
  rating: 4,
  review_count: 42,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/food-corner-kabob-house-annandale-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'kabobistan-arlington-arlington-2',
  categories: [{ alias: 'afghani', title: 'Afghan' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 38.860921331355456, longitude: -77.09251795767136 },
  display_phone: '(703) 888-1723',
  distance: 9651.068993592256,
  id: 'koQk909gy99O0LtabL4oYw',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/7w1YEt-NcvRdgeNKMVTHQw/o.jpg',
  is_closed: false,
  location: {
    address1: '3400 Columbia Pike', address2: '', address3: null, city: 'Arlington', country: 'US', display_address: ['3400 Columbia Pike', 'Arlington, VA 22204'], state: 'VA', zip_code: '22204',
  },
  name: 'Kabobistan Arlington',
  phone: '+17038881723',
  rating: 4.5,
  review_count: 19,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/kabobistan-arlington-arlington-2?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}, {
  alias: 'grill-kabob-bethesda',
  categories: [{ alias: 'mideastern', title: 'Middle Eastern' }, { alias: 'afghani', title: 'Afghan' }, { alias: 'halal', title: 'Halal' }],
  coordinates: { latitude: 39.025025244798, longitude: -77.1467246117783 },
  display_phone: '(301) 365-3741',
  distance: 20606.701293145743,
  id: 'cCOliBy1_NvQkyg8ghtsKA',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/Uq_cZClo7Ue1mb0Lun6qzw/o.jpg',
  is_closed: false,
  location: {
    address1: '7101 Democracy Blvd', address2: 'Ste 2367', address3: '', city: 'Bethesda', country: 'US', display_address: ['7101 Democracy Blvd', 'Ste 2367', 'Bethesda, MD 20817'], state: 'MD', zip_code: '20817',
  },
  name: 'Grill Kabob',
  phone: '+13013653741',
  price: '$$',
  rating: 3.5,
  review_count: 75,
  transactions: ['delivery', 'pickup'],
  url: 'https://www.yelp.com/biz/grill-kabob-bethesda?adjust_creative=UBP9-ctBfIQcQ_5xVmk5UA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UBP9-ctBfIQcQ_5xVmk5UA',
}];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'aliceblue',
    minHeight: '100vh',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  gridItem: {
    backgroundColor: '#819595',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  fixedHeight: {
    height: 240,
  },
}));

const YABApp = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [categoryList, setCategoryList] = useState<TCategory[]>([] as TCategory[]);
  // Fetch category list upon initial load
  useEffect(() => {
    console.log('fetching categories');
    fetch('/categories')
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data === {}) {
          return;
        }
        const { categories } = data;
        console.log(categories);
        setCategoryList(categories);
      });
  }, []);

  const [businessList, setBusinessList] = useState(bizListTemp);
  // Fetch businessList?

  const handleSearch = (category: string, address: string) => {
    console.log('Attempting to hit /search');
    const body = { category, address };
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    fetch('/search', request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.businesses);
        setBusinessList(data.businesses);
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper id="search-box-wrapper" className={classes.paper}>
                <Search categories={categoryList} handleSearch={handleSearch} />
              </Paper>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <Listing businessList={businessList} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default YABApp;
