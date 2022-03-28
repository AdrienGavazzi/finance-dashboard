import { TooltipPoint } from "@progress/kendo-react-charts";

export interface FundInfo {
  managers: [
    {
      firstName: string;
      lastName: string;
      position: string;
    }
  ];
  quarters: [
    {
      title: string;
      details: [
        {
          name: string;
          value: string;
        }
      ];
    }
  ];
}

export interface Allocation {
  category: string;
  value: number;
}

export interface DonutData {
  series: [];
  labels: [];
}

export interface Position {
  symbol: string;
  name: string;
  currency: string;
  price: number;
  variation: string;
  number: number;
  value: number;
}

export interface Page {
  name: string;
  path: string;
}
