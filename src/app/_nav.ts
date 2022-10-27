import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer'
  // },
  {
    title: true,
    name: "Sample"
  },
  {
    name: "Sample",
    url: "/sample",
    icon: "icon-pencil"
  },
  {
    name:"Student",
    url:"./students",
    icon:"icon-pencil"
  },
  {
    name:"Clinic",
    url:"./clinic",
    icon:"icon-pencil"
  },
  {
    name:"Product",
    url:"./product",
    icon:"icon-pencil"
  },
  {
    name:"Calender",
    url:"./calender",
    icon:"icon-pencil"
  },
  {
    name:"Heatmap",
    url:"./heatmap",
    icon:"icon-pencil"
  },
/*
  {
    name:"Grid application",
    url:"/grid",
    icon:"icon-pencil"
  },
  {
    name:"Coupon",
    url:"/coupon",
    icon:"icon-pencil"
  },
  {
    name:"Payment",
    url:"/payment",
    icon:"icon-pencil"
  },
  {
    name:"Job Opening",
    url:"/job",
    icon:"icon-pencil"
  },
  {
    name:"Address",
    url:"/address",
    icon:"icon-star"
  },
  {
    name:"Sale",
    url:"/sale",
    icon:"icon-pencil"
  },
  {
    name:"Order",
    url:"/order",
    icon:"icon-pencil",
    children:[
      
      {
        name:"OrderPipeLine",
        url:"/orderpipeline",
        icon:"icon-layers",
      },
      {
        name:"OrderLedger",
        url:"/orderledger",
        icon:"icon-layers"

      }
    ]
  }
*/
];
