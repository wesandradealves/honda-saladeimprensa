import { ContentRelease } from './content-release';
import { TagsRelease } from './tags-release';

export interface ReleaseDetail {
    release_id: number;
    title: string;
    product_id: number;
    file_id: string;
    file_desc?: string;
    created_at: string;
    body: string;
    featured_image: string;
    datasheet_file_id: number;
    datasheet_desc?: string;
    colors_file_id: number;
    colors_desc?: string;
    field_imagem_desktcolors_file_idop: number;
    content: Array<ContentRelease>;
    tags: Array<TagsRelease>;
    content_url: string;
    Image_gallery: Array<any>;
    video_gallery: Array<any>;
    related_content: Array<any>;
    segment_title: string;
    featured_gallery_image: {
        field_releases_embed: string;
        field_releases_embed_gallery: string;
        field_releases_embed_item_id: string;
    }[];
    release_image_gallery: Array<any>;
    release_video_gallery: Array<any>;
    release_image_gallery_id: number;
    release_video_gallery_id: number;
    corporate_content_id: number;
    corporate_content_title: string;
    corporative_content_slug?: string;
    excerpt?: string;
    field_releases_featured_image_1?: any;
    field_releases_featured_image_export?: any;
    image_preview?: any;
}
