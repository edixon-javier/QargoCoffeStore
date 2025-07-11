import { User, BillingInfo } from '../lib/types';

// Mock data para franquiciados
export const mockFranchisees: (User & { billingInfo?: BillingInfo, status: string, orders: number })[] = [
  {
    id: "f1",
    name: "Prestige Cafe",
    email: "dearborn-22022@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 132,
    createdAt: "2023-01-15T08:00:00Z",
    billingInfo: {
      companyName: "Prestige Cafe",
      dba: "Qargo Connect Dearborne",
      billingAddress: {
        street: "22022 Michigan Ave Unit C",
        city: "Dearborn",
        state: "MI",
        zipCode: "48124-2889"
      },
      shippingAddress: {
        street: "22022 Michigan Ave Unit C",
        city: "Dearborn",
        state: "MI",
        zipCode: "48124-2889"
      },
      email: "dearborn-22022@qargocoffee.com",
      phone: "(734) 686-1192",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 4242",
        expiryDate: "12/25",
        cvv: "***",
        cardholderName: "JOHN NORT"
      }
    }
  },
  {
    id: "f2",
    name: "Coffee Central",
    email: "chicagocentral@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 97,
    createdAt: "2023-03-22T10:30:00Z",
    billingInfo: {
      companyName: "Coffee Central LLC",
      dba: "Qargo Connect Chicago Central",
      billingAddress: {
        street: "322 N Michigan Ave",
        city: "Chicago",
        state: "IL",
        zipCode: "60601"
      },
      shippingAddress: {
        street: "322 N Michigan Ave",
        city: "Chicago",
        state: "IL",
        zipCode: "60601"
      },
      email: "chicagocentral@qargocoffee.com",
      phone: "(312) 555-1234",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 5678",
        expiryDate: "09/24",
        cvv: "***",
        cardholderName: "SARAH JOHNSON"
      }
    }
  },
  {
    id: "f3",
    name: "Urban Brews",
    email: "newark-downtown@qargocoffee.com",
    role: "franchisee",
    status: "inactive",
    orders: 64,
    createdAt: "2023-05-10T09:15:00Z",
    billingInfo: {
      companyName: "Urban Brews Inc.",
      dba: "Qargo Connect Newark",
      billingAddress: {
        street: "744 Broad Street",
        city: "Newark",
        state: "NJ",
        zipCode: "07102"
      },
      shippingAddress: {
        street: "744 Broad Street",
        city: "Newark",
        state: "NJ",
        zipCode: "07102"
      },
      email: "newark-downtown@qargocoffee.com",
      phone: "(973) 555-9876",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 9012",
        expiryDate: "03/26",
        cvv: "***",
        cardholderName: "MICHAEL CHEN"
      }
    }
  },
  {
    id: "f4",
    name: "Sunset Roasters",
    email: "sunset-blvd@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 215,
    createdAt: "2023-06-14T11:00:00Z",
    billingInfo: {
      companyName: "Sunset Roasters LLC",
      dba: "Qargo Connect Los Angeles",
      billingAddress: {
        street: "8033 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90046"
      },
      shippingAddress: {
        street: "8033 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90046"
      },
      email: "sunset-blvd@qargocoffee.com",
      phone: "(213) 555-4321",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 1111",
        expiryDate: "11/25",
        cvv: "***",
        cardholderName: "AMANDA LEE"
      }
    }
  },
  {
    id: "f5",
    name: "Harbor Beans",
    email: "seattle-harbor@qargocoffee.com",
    role: "franchisee",
    status: "inactive",
    orders: 42,
    createdAt: "2023-07-03T08:45:00Z",
    billingInfo: {
      companyName: "Harbor Beans Co.",
      dba: "Qargo Connect Seattle Harbor",
      billingAddress: {
        street: "1916 Pike Place",
        city: "Seattle",
        state: "WA",
        zipCode: "98101"
      },
      shippingAddress: {
        street: "1916 Pike Place",
        city: "Seattle",
        state: "WA",
        zipCode: "98101"
      },
      email: "seattle-harbor@qargocoffee.com",
      phone: "(206) 555-8899",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 2222",
        expiryDate: "01/27",
        cvv: "***",
        cardholderName: "DEREK SANDERS"
      }
    }
  },
  {
    id: "f6",
    name: "River Roast",
    email: "austin-river@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 155,
    createdAt: "2023-08-12T12:10:00Z",
    billingInfo: {
      companyName: "River Roast LLC",
      dba: "Qargo Connect Austin River",
      billingAddress: {
        street: "1401 S Congress Ave",
        city: "Austin",
        state: "TX",
        zipCode: "78704"
      },
      shippingAddress: {
        street: "1401 S Congress Ave",
        city: "Austin",
        state: "TX",
        zipCode: "78704"
      },
      email: "austin-river@qargocoffee.com",
      phone: "(512) 555-7722",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 3333",
        expiryDate: "05/26",
        cvv: "***",
        cardholderName: "TINA DAVIS"
      }
    }
  },
  {
    id: "f7",
    name: "North Roast",
    email: "boston-north@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 189,
    createdAt: "2023-09-25T09:30:00Z",
    billingInfo: {
      companyName: "North Roast Inc.",
      dba: "Qargo Connect Boston North",
      billingAddress: {
        street: "135 Causeway St",
        city: "Boston",
        state: "MA",
        zipCode: "02114"
      },
      shippingAddress: {
        street: "135 Causeway St",
        city: "Boston",
        state: "MA",
        zipCode: "02114"
      },
      email: "boston-north@qargocoffee.com",
      phone: "(617) 555-5656",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 4444",
        expiryDate: "07/25",
        cvv: "***",
        cardholderName: "MARK EVANS"
      }
    }
  },
  {
    id: "f8",
    name: "Desert Bean",
    email: "phoenix-desert@qargocoffee.com",
    role: "franchisee",
    status: "inactive",
    orders: 58,
    createdAt: "2023-10-19T14:50:00Z",
    billingInfo: {
      companyName: "Desert Bean Cafe",
      dba: "Qargo Connect Phoenix Desert",
      billingAddress: {
        street: "2222 E Camelback Rd",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85016"
      },
      shippingAddress: {
        street: "2222 E Camelback Rd",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85016"
      },
      email: "phoenix-desert@qargocoffee.com",
      phone: "(602) 555-3322",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 5555",
        expiryDate: "06/26",
        cvv: "***",
        cardholderName: "LINDA MORALES"
      }
    }
  },
  {
    id: "f9",
    name: "Capital Coffee",
    email: "dc-capital@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 77,
    createdAt: "2023-11-05T11:20:00Z",
    billingInfo: {
      companyName: "Capital Coffee Group",
      dba: "Qargo Connect DC Capital",
      billingAddress: {
        street: "1600 Pennsylvania Ave NW",
        city: "Washington",
        state: "DC",
        zipCode: "20500"
      },
      shippingAddress: {
        street: "1600 Pennsylvania Ave NW",
        city: "Washington",
        state: "DC",
        zipCode: "20500"
      },
      email: "dc-capital@qargocoffee.com",
      phone: "(202) 555-0001",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 6666",
        expiryDate: "08/27",
        cvv: "***",
        cardholderName: "DAVID WRIGHT"
      }
    }
  },
  {
    id: "f10",
    name: "Bay Area Brews",
    email: "sanfran-bay@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 201,
    createdAt: "2023-12-15T15:45:00Z",
    billingInfo: {
      companyName: "Bay Area Brews",
      dba: "Qargo Connect San Francisco",
      billingAddress: {
        street: "1 Market St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105"
      },
      shippingAddress: {
        street: "1 Market St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105"
      },
      email: "sanfran-bay@qargocoffee.com",
      phone: "(415) 555-9090",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 7777",
        expiryDate: "10/27",
        cvv: "***",
        cardholderName: "EMILY NGUYEN"
      }
    }
  },
   {
    id: "f11",
    name: "Maple Street Coffee",
    email: "maple-denver@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 121,
    createdAt: "2024-01-10T08:30:00Z",
    billingInfo: {
      companyName: "Maple Street Coffee Co.",
      dba: "Qargo Connect Denver",
      billingAddress: {
        street: "1234 Maple Street",
        city: "Denver",
        state: "CO",
        zipCode: "80205"
      },
      shippingAddress: {
        street: "1234 Maple Street",
        city: "Denver",
        state: "CO",
        zipCode: "80205"
      },
      email: "maple-denver@qargocoffee.com",
      phone: "(720) 555-3344",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 8888",
        expiryDate: "02/26",
        cvv: "***",
        cardholderName: "NATALIE BAKER"
      }
    }
  },
  {
    id: "f12",
    name: "Brickhouse Beans",
    email: "brickhouse-brooklyn@qargocoffee.com",
    role: "franchisee",
    status: "inactive",
    orders: 37,
    createdAt: "2024-01-28T13:10:00Z",
    billingInfo: {
      companyName: "Brickhouse Beans Ltd.",
      dba: "Qargo Connect Brooklyn",
      billingAddress: {
        street: "98 Flatbush Ave",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11217"
      },
      shippingAddress: {
        street: "98 Flatbush Ave",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11217"
      },
      email: "brickhouse-brooklyn@qargocoffee.com",
      phone: "(718) 555-7865",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 9999",
        expiryDate: "04/26",
        cvv: "***",
        cardholderName: "RAFAEL TORRES"
      }
    }
  },
  {
    id: "f13",
    name: "Palm City Roasters",
    email: "palm-miami@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 144,
    createdAt: "2024-02-12T11:45:00Z",
    billingInfo: {
      companyName: "Palm City Roasters",
      dba: "Qargo Connect Miami",
      billingAddress: {
        street: "567 Ocean Dr",
        city: "Miami",
        state: "FL",
        zipCode: "33139"
      },
      shippingAddress: {
        street: "567 Ocean Dr",
        city: "Miami",
        state: "FL",
        zipCode: "33139"
      },
      email: "palm-miami@qargocoffee.com",
      phone: "(305) 555-7711",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 1122",
        expiryDate: "08/25",
        cvv: "***",
        cardholderName: "JASMINE RAMIREZ"
      }
    }
  },
  {
    id: "f14",
    name: "Midtown Brews",
    email: "midtown-atlanta@qargocoffee.com",
    role: "franchisee",
    status: "inactive",
    orders: 52,
    createdAt: "2024-03-04T10:00:00Z",
    billingInfo: {
      companyName: "Midtown Brews LLC",
      dba: "Qargo Connect Atlanta Midtown",
      billingAddress: {
        street: "101 Peachtree St NE",
        city: "Atlanta",
        state: "GA",
        zipCode: "30303"
      },
      shippingAddress: {
        street: "101 Peachtree St NE",
        city: "Atlanta",
        state: "GA",
        zipCode: "30303"
      },
      email: "midtown-atlanta@qargocoffee.com",
      phone: "(404) 555-2929",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 3344",
        expiryDate: "12/25",
        cvv: "***",
        cardholderName: "TYRELL SMITH"
      }
    }
  },
  {
    id: "f15",
    name: "Pacific Grounds",
    email: "pacific-portland@qargocoffee.com",
    role: "franchisee",
    status: "active",
    orders: 183,
    createdAt: "2024-03-28T16:20:00Z",
    billingInfo: {
      companyName: "Pacific Grounds Co.",
      dba: "Qargo Connect Portland",
      billingAddress: {
        street: "600 SE Grand Ave",
        city: "Portland",
        state: "OR",
        zipCode: "97214"
      },
      shippingAddress: {
        street: "600 SE Grand Ave",
        city: "Portland",
        state: "OR",
        zipCode: "97214"
      },
      email: "pacific-portland@qargocoffee.com",
      phone: "(503) 555-4040",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 5566",
        expiryDate: "11/26",
        cvv: "***",
        cardholderName: "KAREN YANG"
      }
    }
  }
];
