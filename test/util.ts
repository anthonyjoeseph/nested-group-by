import { nestedGroupBy } from "../src";

export type Building = {
  buildingId: string;
  buildingAddress: string;

  // some buildings don't have a janitor
  janitorId: string | null;
  janitorPhoneNumber: string | null;

  officeId: string;
  officeFloorNumber: number;

  employeeId: string;
  employeeStartDate: Date;
};

export const flat: Building[] = [
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorPhoneNumber: "18005555555",
    officeId: "OFC001",
    officeFloorNumber: 1,
    employeeId: "EMP001",
    employeeStartDate: new Date("2017-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorPhoneNumber: "18005555555",
    officeId: "OFC001",
    officeFloorNumber: 1,
    employeeId: "EMP002",
    employeeStartDate: new Date("2018-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorPhoneNumber: "18005555555",
    officeId: "OFC002",
    officeFloorNumber: 2,
    employeeId: "EMP003",
    employeeStartDate: new Date("2019-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL001",
    buildingAddress: "123 Main St",
    janitorId: "JAN001",
    janitorPhoneNumber: "18005555555",
    officeId: "OFC002",
    officeFloorNumber: 2,
    employeeId: "EMP004",
    employeeStartDate: new Date("2020-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL002",
    buildingAddress: "456 Oak Blvd",
    janitorId: null,
    janitorPhoneNumber: null,
    officeId: "OFC003",
    officeFloorNumber: 1,
    employeeId: "EMP005",
    employeeStartDate: new Date("2021-05-29T05:00:00.000Z"),
  },
  {
    buildingId: "BUL002",
    buildingAddress: "456 Oak Blvd",
    janitorId: null,
    janitorPhoneNumber: null,
    officeId: "OFC003",
    officeFloorNumber: 1,
    employeeId: "EMP006",
    employeeStartDate: new Date("2022-05-29T05:00:00.000Z"),
  },
];

export const hierarchical = nestedGroupBy(flat, {
  id: "buildingId",
  fields: ["buildingAddress"],
  joins: {
    // the names for 'joins' are up to you
    janitors: {
      id: "janitorId",
      fields: ["janitorPhoneNumber"],
    },
    offices: {
      id: "officeId",
      fields: ["officeFloorNumber"],
      joins: {
        employees: {
          id: "employeeId",
          fields: ["employeeStartDate"],
        },
      },
    },
  },
});
