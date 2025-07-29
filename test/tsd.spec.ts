import { expectType } from "tsd";
import { NEA } from "../src/util";
import { offices, buildings, fullBuildings } from "./grouped";

expectType<
  {
    officeFloorNumber: number;
    employees: NEA<{
      employeeId: string;
      employeePhoneNumber: string | null;
    }>;
  }[]
>(offices);

expectType<
  {
    buildingAddress: string;
    janitors: {
      janitorStartDate: Date;
    }[];
  }[]
>(buildings);

expectType<
  {
    buildingAddress: string;
    janitors: {
      janitorStartDate: Date;
    }[];
    offices: NEA<{
      officeFloorNumber: number;
      employees: NEA<{
        employeeId: string;
        employeePhoneNumber: string | null;
      }>;
    }>;
  }[]
>(fullBuildings);
