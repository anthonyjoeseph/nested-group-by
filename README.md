# nested-group-by 🪆


Emulates ORM-like objects & array structure without the overhead

***Pure data transformation*** - performes a series of nested group-by operations.

***Type Safe*** - complete type inference

***Low Footprint*** - no dependencies, fewer than 100 lines of generated code

```ts
import { nestedGroupBy } from 'nested-group-by';
import { unprocessedBuildingData } from './database';

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
const flat2DArray: Building[] = await unprocessedBuildingData();

const hierarchical = nestedGroupBy(flat2DArray, {
  id: "buildingId",
  fields: ['buildingAddress'],
  joins: {
    // the names for 'joins' are up to you
    janitors: {
      id: "janitorId",
      fields: ["janitorPhoneNumber"]
    },
    offices: {
      id: "officeId",
      fields: ['officeFloorNumber'],
      joins: {
        employees: {
          id: "employeeId",
          fields: ['employeeStartDate']
        }
      }
    }
  }
})

const firstEmployeeStartDate: Date = 
  hierarchical[0].offices[0].employees[0].employeeStartDate;

// here's the full auto-inferred type
// NEA stands for 'non-empty-array'
// `janitors` is potentially empty, since it's a LEFT JOIN

// hierarchical: NEA<{
//     buildingAddress: string;
//     janitors: {
//         janitorPhoneNumber: string | null;
//     }[];
//     offices: NEA<{
//         officeFloorNumber: number;
//         employees: NEA<{
//             employeeStartDate: Date;
//         }>;
//     }>;
// }>
```

```ts
// database.ts
import { Client } from 'pg';
const client = new Client()
await client.connect()

export function unprocessedBuildingData() {
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