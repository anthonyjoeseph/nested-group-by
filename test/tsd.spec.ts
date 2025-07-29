import { expectType } from "tsd";
import { NEA } from "../src/util";
import { buildings } from "./util";

expectType<
  NEA<{
    buildingAddress: string;
    janitors: {
      janitorPhoneNumber: string;
    }[];
    offices: NEA<{
      officeFloorNumber: number;
      employees: NEA<{
        employeeStartDate: Date;
      }>;
    }>;
  }>
>(buildings);
