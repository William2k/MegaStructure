import {
  trigger,
  style,
  animate,
  transition,
  query
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const slideInOutAnimation = trigger('slideInOutAnimation', [
  transition('* => *', [
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(
      ':leave',
      [style({ right: 0 }), animate('0.15s', style({ right: '-100%' }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ left: '-100%' }), animate('0.15s', style({ left: 0 }))],
      { optional: true }
    )
  ])
]);
