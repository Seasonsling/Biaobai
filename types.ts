export interface JournalState {
  recipientName: string;
  senderName: string;
  date: string;
}

export enum SlideType {
  INTRO = 'INTRO',
  GROWTH = 'GROWTH',
  CORE = 'CORE',
  PROMISE = 'PROMISE',
  ACTION = 'ACTION',
  BOND = 'BOND',
  FINALE = 'FINALE',
}
