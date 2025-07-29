/**
  SELECT
    o.id as officeId,
    o.floor_number as officeFloorNumber,
    e.id as employeeId,
    e.start_date as employeeStartDate
  FROM offices o
  INNER JOIN employees e on e.officeId = o.id
 */

export type Office = {
  officeId: string;
  officeFloorNumber: number;

  employeeId: string;
  employeePhoneNumber: string | null;
};

export const flatOffices: Office[] = [
  {
    officeId: "OFC001",
    officeFloorNumber: 1,
    employeeId: "EMP001",
    employeePhoneNumber: "1 (800) 555-5555",
  },
  {
    officeId: "OFC001",
    officeFloorNumber: 1,
    employeeId: "EMP002",
    employeePhoneNumber: "1 (800) 555-6666",
  },
  {
    officeId: "OFC002",
    officeFloorNumber: 2,
    employeeId: "EMP003",
    employeePhoneNumber: "1 (800) 555-7777",
  },
  {
    officeId: "OFC002",
    officeFloorNumber: 2,
    employeeId: "EMP004",
    employeePhoneNumber: "1 (800) 555-8888",
  },
  {
    officeId: "OFC003",
    officeFloorNumber: 1,
    employeeId: "EMP005",
    employeePhoneNumber: "1 (800) 555-9999",
  },
  {
    officeId: "OFC003",
    officeFloorNumber: 1,
    employeeId: "EMP006",
    employeePhoneNumber: null,
  },
];

/**
  SELECT 
    b.id as buildingId,
    b.address as buildingAddress,
    j.id as janitorId,
    j.start_date as janitorStartDate
  FROM buildings b
  LEFT JOIN janitors j on j.building_id = b.id
 */
export type Building = {
  buildingId: string;
  buildingAddress: string;

  // some buildings don't have a janitor
  // thus, the LEFT JOIN
  // that's why these values might be null
  janitorId: string | null;
  janitorStartDate: Date | null;
};

export const flatBuildings: Building[] = [
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorStartDate: new Date("2015-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL002",
    buildingAddress: "123 Main St",
    janitorId: "JAN002",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL002",
    buildingAddress: "123 Main St",
    janitorId: "JAN002",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL003",
    buildingAddress: "456 Oak Blvd",
    janitorId: null,
    janitorStartDate: null,
  },
  {
    buildingId: "BUL003",
    buildingAddress: "456 Oak Blvd",
    janitorId: null,
    janitorStartDate: null,
  },
];

/**
  SELECT 
    b.id as buildingId,
    b.address as buildingAddress,
    j.id as janitorId,
    j.phone_number as janitorPhoneNumber,
    o.id as officeId,
    o.floor_number as officeFloorNumber,
    e.id as employeeId,
    e.start_date as employeeStartDate
  FROM buildings b
  LEFT JOIN janitors j on j.building_id = b.id
  INNER JOIN offices o on o.building_id = b.id
  INNER JOIN employees e on e.officeId = o.id
 */
export type FullBuilding = {
  buildingId: string;
  buildingAddress: string;

  janitorId: string | null;
  janitorStartDate: Date | null;

  officeId: string;
  officeFloorNumber: number;

  employeeId: string;
  employeePhoneNumber: string | null;
};

export const flatFullBuildings: FullBuilding[] = [
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorStartDate: new Date("2015-05-29T05:00:00.000Z"),
    officeId: "OFC001",
    officeFloorNumber: 1,
    employeeId: "EMP001",
    employeePhoneNumber: "1 (800) 555-5555",
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorStartDate: new Date("2015-05-29T05:00:00.000Z"),
    officeId: "OFC001",
    officeFloorNumber: 1,
    employeeId: "EMP002",
    employeePhoneNumber: null,
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorStartDate: new Date("2015-05-29T05:00:00.000Z"),
    officeId: "OFC002",
    officeFloorNumber: 2,
    employeeId: "EMP003",
    employeePhoneNumber: "1 (800) 666-5555",
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorStartDate: new Date("2015-05-29T05:00:00.000Z"),
    officeId: "OFC002",
    officeFloorNumber: 2,
    employeeId: "EMP004",
    employeePhoneNumber: null,
  },
  {
    buildingId: "BUL002",
    buildingAddress: "456 Oak Blvd",
    janitorId: "JAN002",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
    officeId: "OFC003",
    officeFloorNumber: 1,
    employeeId: "EMP005",
    employeePhoneNumber: "1 (800) 777-5555",
  },
  {
    buildingId: "BUL002",
    buildingAddress: "456 Oak Blvd",
    janitorId: "JAN002",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
    officeId: "OFC003",
    officeFloorNumber: 1,
    employeeId: "EMP006",
    employeePhoneNumber: null,
  },
  {
    buildingId: "BUL002",
    buildingAddress: "456 Oak Blvd",
    janitorId: "JAN002",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
    officeId: "OFC004",
    officeFloorNumber: 2,
    employeeId: "EMP007",
    employeePhoneNumber: "1 (800) 888-5555",
  },
  {
    buildingId: "BUL002",
    buildingAddress: "456 Oak Blvd",
    janitorId: "JAN002",
    janitorStartDate: new Date("2016-05-29T05:00:00.000Z"),
    officeId: "OFC004",
    officeFloorNumber: 2,
    employeeId: "EMP008",
    employeePhoneNumber: "1 (800) 888-6666",
  },
  {
    buildingId: "BUL003",
    buildingAddress: "789 Park Ave",
    janitorId: null,
    janitorStartDate: null,
    officeId: "OFC004",
    officeFloorNumber: 1,
    employeeId: "EMP009",
    employeePhoneNumber: "1 (800) 888-7777",
  },
  {
    buildingId: "BUL003",
    buildingAddress: "789 Park Ave",
    janitorId: null,
    janitorStartDate: null,
    officeId: "OFC004",
    officeFloorNumber: 1,
    employeeId: "EMP010",
    employeePhoneNumber: null,
  },
];
