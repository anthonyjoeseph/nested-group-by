import * as assert from "assert";
import { offices, buildings, fullBuildings } from "./grouped";

describe("transforms flat data into hierarchical data", () => {
  it("inner joins", () => {
    assert.deepStrictEqual(offices, [
      {
        employees: [
          { employeeId: "EMP001", employeePhoneNumber: "1 (800) 555-5555" },
          { employeeId: "EMP002", employeePhoneNumber: null },
        ],
        officeFloorNumber: 1,
      },
      {
        employees: [
          { employeeId: "EMP003", employeePhoneNumber: "1 (800) 666-5555" },
          { employeeId: "EMP004", employeePhoneNumber: null },
        ],
        officeFloorNumber: 2,
      },
      {
        employees: [
          { employeeId: "EMP005", employeePhoneNumber: "1 (800) 777-5555" },
          { employeeId: "EMP006", employeePhoneNumber: null },
        ],
        officeFloorNumber: 1,
      },
      {
        employees: [
          { employeeId: "EMP007", employeePhoneNumber: "1 (800) 888-5555" },
          { employeeId: "EMP008", employeePhoneNumber: "1 (800) 888-6666" },
          { employeeId: "EMP009", employeePhoneNumber: "1 (800) 888-7777" },
          { employeeId: "EMP010", employeePhoneNumber: null },
        ],
        officeFloorNumber: 2,
      },
    ]);
  });

  it("left joins", () => {
    assert.deepStrictEqual(buildings, [
      {
        buildingAddress: "123 Main St",
        janitors: [{ janitorStartDate: new Date("2015-05-29T05:00:00.000Z") }],
      },
      {
        buildingAddress: "456 Oak Blvd",
        janitors: [{ janitorStartDate: new Date("2016-05-29T05:00:00.000Z") }],
      },
      { buildingAddress: "789 Park Ave", janitors: [] },
    ]);
  });

  it("inner & left joins", () => {
    assert.deepStrictEqual(fullBuildings, [
      {
        buildingAddress: "123 Main St",
        janitors: [{ janitorStartDate: new Date("2015-05-29T05:00:00.000Z") }],
        offices: [
          {
            employees: [
              { employeeId: "EMP001", employeePhoneNumber: "1 (800) 555-5555" },
              { employeeId: "EMP002", employeePhoneNumber: null },
            ],
            officeFloorNumber: 1,
          },
          {
            employees: [
              { employeeId: "EMP003", employeePhoneNumber: "1 (800) 666-5555" },
              { employeeId: "EMP004", employeePhoneNumber: null },
            ],
            officeFloorNumber: 2,
          },
        ],
      },
      {
        buildingAddress: "456 Oak Blvd",
        janitors: [{ janitorStartDate: new Date("2016-05-29T05:00:00.000Z") }],
        offices: [
          {
            employees: [
              { employeeId: "EMP005", employeePhoneNumber: "1 (800) 777-5555" },
              { employeeId: "EMP006", employeePhoneNumber: null },
            ],
            officeFloorNumber: 1,
          },
          {
            employees: [
              { employeeId: "EMP007", employeePhoneNumber: "1 (800) 888-5555" },
              { employeeId: "EMP008", employeePhoneNumber: "1 (800) 888-6666" },
            ],
            officeFloorNumber: 2,
          },
        ],
      },
      {
        buildingAddress: "789 Park Ave",
        janitors: [],
        offices: [
          {
            employees: [
              { employeeId: "EMP009", employeePhoneNumber: "1 (800) 888-7777" },
              { employeeId: "EMP010", employeePhoneNumber: null },
            ],
            officeFloorNumber: 1,
          },
        ],
      },
    ]);
  });
});
