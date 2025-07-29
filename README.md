# nested-group-by-ts 🪆


ORM-like object structure, without the ORM

***Pure data transformation*** - performes a series of nested group-by operations.

***Type Safe*** - complete type inference

***Low Footprint*** - no dependencies, fewer than 100 lines of generated code

```ts
import { nestedGroupBy } from 'nested-group-by-ts';
import { selectBuildingsFromDB } from './database';

type Building = {
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
const flatBuildingData: Building[] = 
  // see bottom of this README for this SQL query
  await selectBuildingsFromDB();

export const buildings = nestedGroupBy(flatBuildingData, {
  groupBy: ["buildingId"],
  select: ["buildingAddress"],
  joins: {
    // join names - 'janitors', 'offices', 'employees' -
    // are passed along into the output
    janitors: {
      // each janitor, if they exist, should have
      // a phone number - so, group by phone number as well
      groupBy: ["janitorId", "janitorPhoneNumber"],
      select: ["janitorId", "janitorPhoneNumber"],
    },
    offices: {
      groupBy: ["officeId"],
      select: ["officeFloorNumber"],
      joins: {
        employees: {
          groupBy: ["employeeId"],
          select: ["employeeStartDate"],
        },
      },
    },
  },
});

// here's the full auto-inferred type
// NEA stands for 'non-empty-array'

// buildings: NEA<{
//   buildingAddress: string;
//   janitors: {
//     janitorPhoneNumber: string;
//   }[];
//   offices: NEA<{
//     officeFloorNumber: number;
//     employees: NEA<{
//       employeeStartDate: Date;
//     }>;
//   }>;
// }>
```

## Type Subtleties

```ts
// Non-empty arrays
// their `groupBy` fields are non-nullable in `type Building`
// (in SQL, these are all INNER JOINs)
const firstEmployeeStartDate: Date = 
  buildings[0].offices[0].employees[0].employeeStartDate;

// "Normal" array
// 'janitorId' is nullable in `type Building`
// (in SQL, this is a LEFT JOIN)
const firstJanitors: { janitorPhoneNumber: string }[] =
  buildings[0].janitors;

// Phone numbers are non-nullish,
// even though they're nullable in `type Building` (!)
// this is because we did `group by` on both id *and* phone nuber
const firstJanitorId: string[] = 
  buildings[0].janitors.map(j => j.janitorPhoneNumber);
```

## Example DB Query

```ts
// database.ts
import { Client } from 'pg';
const client = new Client()
await client.connect()

export function selectBuildingsFromDB() {
  return client.query(`
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
  `)
}
```