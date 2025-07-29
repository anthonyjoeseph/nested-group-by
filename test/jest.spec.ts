import * as assert from "assert";
import { offices, buildings, fullBuildings } from "./grouped";

describe("transforms flat data into hierarchical data", () => {
  it("inner joins", () => {
    assert.deepStrictEqual(offices, [
      {
        employees: [{ employeePhoneNumber: "1 (800) 555-5555" }, { employeePhoneNumber: "1 (800) 555-6666" }],
        officeFloorNumber: 1,
      },
      {
        employees: [{ employeePhoneNumber: "1 (800) 555-7777" }, { employeePhoneNumber: "1 (800) 555-8888" }],
        officeFloorNumber: 2,
      },
      { employees: [{ employeePhoneNumber: "1 (800) 555-9999" }, { employeePhoneNumber: null }], officeFloorNumber: 1 },
    ]);
  });
  it("left joins", () => {
    assert.deepStrictEqual(buildings, [
      {
        buildingAddress: "123 Main St",
        janitors: [
          { janitorStartDate: new Date("2015-05-29T05:00:00.000Z") },
          { janitorStartDate: new Date("2016-05-29T05:00:00.000Z") },
        ],
      },
      { buildingAddress: "123 Main St", janitors: [{ janitorStartDate: new Date("2016-05-29T05:00:00.000Z") }] },
      { buildingAddress: "456 Oak Blvd", janitors: [] },
    ]);
  });

  it("inner & left joins", () => {
    assert.deepStrictEqual(fullBuildings, [
      {
        buildingAddress: "123 Main St",
        janitors: [{ janitorStartDate: new Date("2015-05-29T05:00:00.000Z") }],
        offices: [
          {
            employees: [{ employeePhoneNumber: "1 (800) 555-5555" }, { employeePhoneNumber: null }],
            officeFloorNumber: 1,
          },
          {
            employees: [{ employeePhoneNumber: "1 (800) 666-5555" }, { employeePhoneNumber: null }],
            officeFloorNumber: 2,
          },
        ],
      },
      {
        buildingAddress: "456 Oak Blvd",
        janitors: [{ janitorStartDate: new Date("2016-05-29T05:00:00.000Z") }],
        offices: [
          {
            employees: [{ employeePhoneNumber: "1 (800) 777-5555" }, { employeePhoneNumber: null }],
            officeFloorNumber: 1,
          },
          {
            employees: [{ employeePhoneNumber: "1 (800) 888-5555" }, { employeePhoneNumber: "1 (800) 888-6666" }],
            officeFloorNumber: 2,
          },
        ],
      },
      {
        buildingAddress: "789 Park Ave",
        janitors: [],
        offices: [
          {
            employees: [{ employeePhoneNumber: "1 (800) 888-7777" }, { employeePhoneNumber: null }],
            officeFloorNumber: 1,
          },
        ],
      },
    ]);
  });
});
