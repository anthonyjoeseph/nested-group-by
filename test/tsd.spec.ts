import { expectType } from "tsd";
import { NEA } from "../src/util";
import { hierarchical } from "./util";

expectType<
  NEA<{
    buildingAddress: string;
    janitors: {
      janitorPhoneNumber: string | null;
    }[];
    offices: NEA<{
      officeFloorNumber: number;
      employees: NEA<{
        employeeStartDate: Date;
      }>;
    }>;
  }>
>(hierarchical);
