import { Injectable } from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
  constructor(private metaTagService: Meta,
              private titleService: Title) {}

  public updateMetadata(metadata: Partial<PageMetadata>): void {
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(metadata);

    if(metadata.title){
        this.titleService.setTitle(metadata.title);
    }
    this.metaTagService.addTags(metatags.filter(tag => Boolean(tag.content)));
  }

  private generateMetaDefinitions(metadata: Partial<PageMetadata>): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },
      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },
      { property: 'og:image', content: metadata.image },
      { property: 'og:type', content: metadata.type || 'article' },
    ];
  }
}
