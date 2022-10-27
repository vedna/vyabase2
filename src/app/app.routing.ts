import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

export const routes: Routes = [ 
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "sample",
        loadChildren: () =>
          import("./module/sample/sample.module").then((m) => m.SampleModule),
      },
      {
        path:'students',
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
      },
      {
        path:'clinic',
        loadChildren: () => import('./clinic/clinic.module').then(m=>m.ClinicModule)
      },
      {
        path:'product',
        loadChildren:()=>import("./product/product.module").then(m=>m.ProductModule)
      },
      {
        path:'calender',
        loadChildren:()=>import("./calender/calender.module").then(m=>m.CalenderModule)
      },
      {
        path:'heatmap',
        loadChildren:()=>import("./heatmap/heatmap.module").then(m=>m.HeatmapModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
