import { Pipe, PipeTransform } from '@angular/core';
import jss from 'jss';

@Pipe({ name: 'jssStyle' })
export class JssPipe implements PipeTransform {
  transform(value: number, styleObj: object): any {
    const sheet = jss
      .createStyleSheet(styleObj, { link: true })
      .attach() as any;

    return sheet.classes.main;
  }
}
