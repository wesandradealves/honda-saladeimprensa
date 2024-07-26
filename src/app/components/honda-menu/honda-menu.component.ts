import { Component } from '@angular/core';

@Component({
    selector: 'honda-menu',
    templateUrl: './honda-menu.component.html',
    styleUrls: ['./honda-menu.component.scss']
})
export class HondaMenuComponent {
    isOpen = false;
    showSubmenus = false;
    subMenus = {
        showSubmenu:false,
        showSubmenuPos:false,
        showSubmenuFinanceiro:false,
        showSubmenuInstitucional:false,
        showSubmenuConcessionarias:false
    }
    
    openSubmenu(subMenu: string) {
        this.showSubmenus = false;

        setTimeout(() => {
            Object.keys(this.subMenus).forEach(key => {
                if(key === subMenu) {
                    this.subMenus[key] = !this.subMenus[key];
                    this.showSubmenus =  this.subMenus[key];
                } else {
                    this.subMenus[key] = false;
                }
            })
        }, 25);
    }

    openMenu() {
        document.body.classList.remove('backdrop');
        document.body.style.overflow = "auto";
        this.isOpen = !this.isOpen;
        if(!this.isOpen && this.showSubmenus) {
            this.showSubmenus = false;
            this.subMenus = {
                showSubmenu:false,
                showSubmenuPos:false,
                showSubmenuFinanceiro:false,
                showSubmenuInstitucional:false,
                showSubmenuConcessionarias:false
            }
        } 

        if(this.isOpen) {
            document.body.style.overflow = "hidden";
            document.body.classList.add('backdrop');
        }
    } 

    redirect(path: string, blank: boolean) {
        this.isOpen = false;
        this.showSubmenus = false;
        this.subMenus = {
            showSubmenu:false,
            showSubmenuPos:false,
            showSubmenuFinanceiro:false,
            showSubmenuInstitucional:false,
            showSubmenuConcessionarias:false
        }
        document.body.classList.remove('backdrop');
        document.body.style.overflow = "auto";

        if(blank) {
            (window as any).open(path, "_blank");
        } else  {
            window.location.href = path;
        }
    }
  
}
