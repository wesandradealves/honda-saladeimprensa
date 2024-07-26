import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Meta } from '@angular/platform-browser';
import {
    BrowserAnimationsModule,
    NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsroomMenuComponent } from './components/newsroom-menu/newsroom-menu.component';
import { PageService } from './services/page.service';
import { BannerService } from './services/banner.service';
import { HomeService } from './services/home.service';
import { FooterComponent } from './components/footer/footer.component';
import { LastReleasesComponent } from './components/last-releases/last-releases.component';
import { StepsHomeComponent } from './components/steps-home/steps-home.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { MoreContentsComponent } from './components/more-contents/more-contents.component';
import { SocialMediasComponent } from './components/social-medias/social-medias.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './pages/error/error.component';
import { ReleasesComponent } from './pages/releases/releases.component';
import { LastReleasesListComponent } from './components/last-releases-list/last-releases-list.component';
import { HomeGalleryComponent } from './components/home-gallery/home-gallery.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailsReleaseComponent } from './pages/details-release/details-release.component';
import { RacingSpiritComponent } from './pages/racing-spirit/racing-spirit.component';
import { RacingBannerComponent } from './components/racing-banner/racing-banner.component';
import { RacingSocialMediaComponent } from './components/racing-social-media/racing-social-media.component';
import { RacingMoreContentsComponent } from './components/racing-more-contents/racing-more-contents.component';
import { FooterService } from './services/footer.service';
import { FooterSocialsComponent } from './components/footer-socials/footer-socials.component';
import { ReleaseService } from './services/release.service';
import { TextTransformPipe } from './shared/text-pipe';
import { ModalGalleryComponent } from './components/modal-gallery/modal-gallery.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { PlatformModule } from '@angular/cdk/platform';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SafeHtmlPipe } from './components/more-contents/more-contents.component';
import { HondaMenuComponent } from './components/honda-menu/honda-menu.component';
import { MotorcycleComponent } from './pages/motorcycle/motorcycle.component';
import { LazyImgDirective } from './shared/lazyLoader';
import {
    LazyLoadImageModule,
    LAZYLOAD_IMAGE_HOOKS,
    ScrollHooks,
} from 'ng-lazyload-image';
import { ProductBannerComponent } from './components/product-banner/product-banner.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductReleasesComponent } from './components/product-releases/product-releases.component';
import { ProductGalleryInsideComponent } from './components/product-gallery-inside/product-gallery-inside.component';
import { ProductRelatedContentComponent } from './components/product-related-content/product-related-content.component';
import { ProductSocialMediaComponent } from './components/product-social-media/product-social-media.component';
import { SafePipe } from './safe.pipe';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { ProductModelComponent } from './pages/product-model/product-model.component';
import { ProductReleaseComponent } from './components/product-release/product-release.component';
import { ProductModelGalleryComponent } from './components/product-model-gallery/product-model-gallery.component';
import { ProductGalleryComponent } from './pages/product-gallery/product-gallery.component';
import { PowerProductComponent } from './pages/power-product/power-product.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { InfoNotificationComponent } from './components/info-notification/info-notification.component';
import { NgxPrintModule } from 'ngx-print';
import { AutomobileComponent } from './pages/automobile/automobile.component';
import { ProductAutomobileComponent } from './pages/product-automobile/product-automobile.component';
import { ModalGalleryReleaseComponent } from './components/modal-gallery-release/modal-gallery-release.component';
import { EventComponent } from './pages/event/event.component';
import { EventService } from './services/event.service';
import { ProductRelatedProductComponent } from './components/product-related-product/product-related-product.component';
import { ModalCorpMenuComponent } from './components/modal-corp-menu/modal-corp-menu.component';
import { HondaCorporativeComponent } from './pages/honda-corporative/honda-corporative.component';
import { HondaGlobalComponent } from './pages/honda-global/honda-global.component';
import { ProductPowerModelComponent } from './pages/product-power-model/product-power-model.component';
import { SearchComponent } from './pages/search/search.component';
import { ModalFiltersComponent } from './pages/search/modal-filters/modal-filters.component';
import { SearchService } from './services/search.service';
import { DatepickerInputComponent } from './components/datepicker-input/datepicker-input.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { ModalFileSizeComponent } from './components/modal-file-size/modal-file-size.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { GtmEventDirective } from './directives/gtm-event.directive';
import { AddCartButtonComponent } from './components/add-cart-button/add-cart-button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NewsroomMenuComponent,
        FooterComponent,
        FooterMenuComponent,
        HomeBannerComponent,
        LastReleasesComponent,
        StepsHomeComponent,
        FooterMenuComponent,
        MoreContentsComponent,
        SocialMediasComponent,
        ErrorComponent,
        ReleasesComponent,
        LastReleasesListComponent,
        HomeGalleryComponent,
        HeaderComponent,
        ConfirmationModalComponent,
        DetailsReleaseComponent,
        RacingSpiritComponent,
        RacingBannerComponent,
        RacingSocialMediaComponent,
        RacingMoreContentsComponent,
        FooterSocialsComponent,
        TextTransformPipe,
        ModalGalleryComponent,
        SafeHtmlPipe,
        HondaMenuComponent,
        MotorcycleComponent,
        LazyImgDirective,
        ProductBannerComponent,
        ProductCarouselComponent,
        ProductReleasesComponent,
        ProductGalleryInsideComponent,
        ProductGalleryComponent,
        ProductRelatedContentComponent,
        ProductSocialMediaComponent,
        SafePipe,
        BreadcrumbComponent,
        ProductModelComponent,
        ProductReleaseComponent,
        ProductModelGalleryComponent,
        PowerProductComponent,
        ContactsComponent,
        InfoNotificationComponent,
        AutomobileComponent,
        ProductAutomobileComponent,
        ModalGalleryReleaseComponent,
        EventComponent,
        ProductRelatedProductComponent,
        ModalCorpMenuComponent,
        HondaCorporativeComponent,
        HondaGlobalComponent,
        ProductPowerModelComponent,
        SearchComponent,
        ModalFiltersComponent,
        DatepickerInputComponent,
        DownloadButtonComponent,
        AddCartButtonComponent,
        ModalFileSizeComponent,
        GtmEventDirective,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ShareButtonsModule.withConfig({
            theme: 'circles-light',
        }),
        ShareIconsModule,
        PlatformModule,
        ClipboardModule,
        SlickCarouselModule,
        LazyLoadImageModule,
        NgxPrintModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            maxOpened: 1,
            autoDismiss: true,
        }),
        NgxMaskModule.forRoot(),
        NgxLoadingModule.forRoot({}),
        NgxFilesizeModule,
        AngularSvgIconModule.forRoot()
    ],
    providers: [
        PageService,
        BannerService,
        HomeService,
        FooterService,
        ReleaseService,
        EventService,
        SearchService,
        Meta,
        {
            provide: LAZYLOAD_IMAGE_HOOKS,
            useClass: ScrollHooks,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
