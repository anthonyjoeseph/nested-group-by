# nested-group-by-ts 🪆


ORM-like object structure, without the ORM

***Pure data transformation*** - performes a series of nested group-by operations.

***Type Safe*** - complete type inference

***Low Footprint*** - no dependencies, fewer than 100 lines of generated code

```ts
import { nestedGroupBy } from 'nested-group-by-ts';
import { client } from './database';

type Office = {
  officeId: string;
  officeFloorNumber: number;
  employeeId: string;
  employeePhoneNumber: string | null;
};
const flatOffices: Office[] = await client.query(`
  SELECT
    o.id as officeId,
    o.floor_number as officeFloorNumber,
    e.id as employeeId,
    e.phone_number as employeePhoneNumber
  FROM office o
  INNER JOIN employees e on e.officeId = o.id
`);

const offices = nestedGroupBy(flatOffices, {
  groupBy: ["officeId"],
  select: ["officeFloorNumber"],
  joins: {
    // this custom name - 'employees' - is
    // passed along into the output
    employees: {
      groupBy: ["employeeId"],
      select: ["employeePhoneNumber"],
    },
  },
});

// here's the full auto-inferred type
// NEA stands for 'non-empty-array'

// offices: {
//   officeFloorNumber: number;
//   employees: NEA<{
//     employeePhoneNumber: string | null;
//   }>;
// }[]

```

## Left Joins

Left joins tend to yield nullable values

```ts
type Building = {
  buildingId: string;
  buildingAddress: string;

  // some buildings don't have a janitor
  // thus, the LEFT JOIN
  // that's why these values might be null
  janitorId: string | null;
  janitorStartDate: Date | null;
};
const flatBuildings: Office[] = await client.query(`
  SELECT 
    b.id as buildingId,
    b.address as buildingAddress,
    j.id as janitorId,
    j.start_date as janitorStartDate
  FROM building b
  LEFT JOIN janitors j on j.building_id = b.id
`);

const buildings = nestedGroupBy(flatBuildings, {
  groupBy: ["buildingId"],
  select: ["buildingAddress"],
  joins: {
    janitors: {
      // each janitor, if they exist, should have
      // a start date - so, group by start date as well
      groupBy: ["janitorId", "janitorStartDate"],
      select: ["janitorStartDate"],
    },
  },
});

// buildings: {
//   buildingAddress: string;
//   janitors: {
//     janitorStartDate: Date;
//   }[];
// }[]

// ^^^
// `janitors` is a "normal" array (not a non-empty-array)
// because `janitorId` is nullable
// `janitorStartDate` is non-null because we
// grouped by start date as well
```

## Multiple Joins

```tsx
type FullBuilding = {
  buildingId: string;
  buildingAddress: string;

  janitorId: string | null;
  janitorStartDate: Date | null;

  officeId: string;
  officeFloorNumber: number;

  employeeId: string;
  employeePhoneNumber: string | null;
};
const flatFullBuildings: Office[] = await client.query(`
  SELECT 
    b.id as buildingId,
    b.address as buildingAddress,
    j.id as janitorId,
    j.start_date as janitorStartDate,
    o.id as officeId,
    o.floor_number as officeFloorNumber,
    e.id as employeeId,
    e.phone_number as employeePhoneNumber
  FROM building b
  LEFT JOIN janitor j on j.building_id = b.id
  INNER JOIN office o on o.building_id = b.id
  INNER JOIN employee e on e.officeId = o.id
`);

const fullBuildings = nestedGroupBy(flatFullBuildings, {
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
          select: ["employeePhoneNumber"],
        },
      },
    },
  },
});

// fullBuildings: NEA<{
//   buildingAddress: string;
//   janitors: {
//     janitorStartDate: Date;
//   }[];
//   offices: NEA<{
//     officeFloorNumber: number;
//     employees: NEA<{
//       employeePhoneNumber: string | null;
//     }>;
//   }>;
// }>
```
