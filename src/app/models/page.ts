export interface Page {
    title: string;
    external?: boolean,
    absolute: string,
    field_link_extra: string,
    field_tid_pagina: number,
    alias?: string;
    relative?: string;
    below?: Page[]
}
