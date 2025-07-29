import { expectType } from "tsd";
import { NEA } from "../src/util";
import { offices, buildings, fullBuildings } from "./grouped";

expectType<
  NEA<{
    officeFloorNumber: number;
    employees: NEA<{
      employeePhoneNumber: string | null;
    }>;
  }>
>(offices);

expectType<
  NEA<{
    buildingAddress: string;
    janitors: {
      janitorStartDate: Date;
    }[];
  }>
>(buildings);

expectType<
  NEA<{
    buildingAddress: string;
    janitors: {
      janitorStartDate: Date;
    }[];
    offices: NEA<{
      officeFloorNumber: number;
      employees: NEA<{
        employeePhoneNumber: string | null;
      }>;
    }>;
  }>
>(fullBuildings);
