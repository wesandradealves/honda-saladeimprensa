import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'texttransform'})
export class TextTransformPipe implements PipeTransform {
  transform(value: string): string {
    const splittedText = value.split("", 4);
    return `${ splittedText[0] }`;
  }
}