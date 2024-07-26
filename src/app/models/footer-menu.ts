import { FooterOptions } from './footer-options';

export interface FooterMenu {
    key?: string,
    title: string,
    alias?: string,
    absolute?: string,
    relative?: string,
    below: Array<any>,
    options: Array<any>,
}
