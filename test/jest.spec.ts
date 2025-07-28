import * as assert from "assert";
import { hierarchical } from "./util";

describe("transforms data", () => {
  it("returns correct values", () => {
    assert.deepStrictEqual(hierarchical, [
      {
        buildingAddress: "123 Main St",
        janitors: [{ janitorPhoneNumber: "18005555555" }],
        offices: [
          {
            employees: [
              { employeeStartDate: new Date("2017-05-29T05:00:00.000Z") },
              { employeeStartDate: new Date("2018-05-29T05:00:00.000Z") },
            ],
            officeFloorNumber: 1,
          },
          {
            employees: [
              { employeeStartDate: new Date("2019-05-29T05:00:00.000Z") },
              { employeeStartDate: new Date("2020-05-29T05:00:00.000Z") },
            ],
            officeFloorNumber: 2,
          },
        ],
      },
      {
        buildingAddress: "456 Oak Blvd",
        janitors: [{ janitorPhoneNumber: null }],
        offices: [
          {
            employees: [
              { employeeStartDate: new Date("2021-05-29T05:00:00.000Z") },
              { employeeStartDate: new Date("2022-05-29T05:00:00.000Z") },
            ],
            officeFloorNumber: 1,
          },
        ],
      },
    ]);
  });
});
