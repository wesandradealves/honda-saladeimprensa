import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { ReleasesComponent } from './pages/releases/releases.component';
import { RacingSpiritComponent } from './pages/racing-spirit/racing-spirit.component';
import { DetailsReleaseComponent } from './pages/details-release/details-release.component';
import { MotorcycleComponent } from './pages/motorcycle/motorcycle.component'
import { ProductModelComponent } from './pages/product-model/product-model.component';
import { ProductGalleryComponent } from './pages/product-gallery/product-gallery.component';
import { PowerProductComponent } from './pages/power-product/power-product.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AutomobileComponent } from './pages/automobile/automobile.component';
import { ProductAutomobileComponent } from './pages/product-automobile/product-automobile.component';
import { EventComponent } from './pages/event/event.component';
import { SearchComponent } from './pages/search/search.component';
import { HondaCorporativeComponent } from './pages/honda-corporative/honda-corporative.component';
import { HondaGlobalComponent } from './pages/honda-global/honda-global.component';
import { ProductPowerModelComponent } from './pages/product-power-model/product-power-model.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '404', component: ErrorComponent },
    { path: 'ultimos-releases/:id', component: ReleasesComponent },
    { path: 'ultimos-releases/:id/:parentId', component: ReleasesComponent },
    { path: 'releases/:slug', component: DetailsReleaseComponent },
    { path: 'racing-spirit', component: RacingSpiritComponent },
    { path: 'motocicletas', component: MotorcycleComponent },
    { path: 'automoveis', component: AutomobileComponent },
    { path: 'galeria/:type/:parent', component: ProductGalleryComponent },
    { path: 'galeria/:type/:parent/:parentId', component: ProductGalleryComponent },
    { path: 'motocicletas/:category/:slug', component: ProductModelComponent },
    { path: 'automoveis/:slug', component: ProductAutomobileComponent },
    { path: 'motores-e-maquinas', component: PowerProductComponent },
    { path: 'motores-e-maquinas/:category/:slug', component: ProductPowerModelComponent },
    { path: 'corporative/:slug', component: HondaCorporativeComponent },
    { path: 'honda-global/:id', component: HondaGlobalComponent },
    { path: 'contatos', component: ContactsComponent },
    { path: 'evento/:slug', component: EventComponent },
    { path: 'busca', component: SearchComponent },
    { path: 'busca/:term', component: SearchComponent },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled'
})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
