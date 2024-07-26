import { ImageTextRelease } from './image-text-release';

export interface ContentRelease {
    text_body: string;
    text_title: string;
    para_img_text_img: Array<ImageTextRelease>;
    field_para_img_text_text: Array<any>;
    field_para_img_text_title: Array<any>;
    field_text_body: string;
    field_text_title: string;
}
