import { nestedGroupBy } from "../src";
import { flatBuildings, flatFullBuildings, flatOffices } from "./data";

export const offices = nestedGroupBy(flatOffices, {
  groupBy: ["officeId"],
  select: ["officeFloorNumber"],
  joins: {
    employees: {
      groupBy: ["employeeId"],
      select: ["employeeId", "employeePhoneNumber"],
    },
  },
});

export const buildings = nestedGroupBy(flatBuildings, {
  groupBy: ["buildingId"],
  select: ["buildingAddress"],
  joins: {
    janitors: {
      groupBy: ["janitorId", "janitorStartDate"],
      select: ["janitorStartDate"],
    },
  },
});

export const fullBuildings = nestedGroupBy(flatFullBuildings, {
  groupBy: ["buildingId"],
  select: ["buildingAddress"],
  joins: {
    janitors: {
      groupBy: ["janitorId", "janitorStartDate"],
      select: ["janitorStartDate"],
    },
    offices: {
      groupBy: ["officeId"],
      select: ["officeFloorNumber"],
      joins: {
        employees: {
          groupBy: ["employeeId"],
          select: ["employeeId", "employeePhoneNumber"],
        },
      },
    },
  },
});
