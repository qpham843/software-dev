import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { ReplaceLineBreaksPipe } from './replace-line-breaks.pipe';
import { BuzzQueriesComponent } from './buzz-queries/buzz-queries.component';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'utilities', component: UtilitiesComponent },
  { path: 'queries', component: BuzzQueriesComponent },
  { path: '', redirectTo: '/logout', pathMatch: 'full' },  
  { path: '**', redirectTo: '/logout'},

]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    MenuComponent,
    UtilitiesComponent,
    ReplaceLineBreaksPipe,
    BuzzQueriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
