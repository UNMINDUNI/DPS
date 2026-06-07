/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AlbumCut {
  id: string;
  title: string;
  date: string;
  subtitle: string;
  desc: string;
  image: string;
}

export interface Character {
  id: string;
  name: string;
  symbol: string;
  meta: string;
  age: string;
  height: string;
  appearance: {
    hair: string;
    eyes: string;
    clothes: string;
    notable: string;
  };
  surface: string; // 표면 특징
  hiddenInner: string; // 내면 (잠재적 속내)
  quote: string; // 시그니처 독백
  tags: string[];
  relationships: {
    target: string;
    text: string;
  }[];
  album: AlbumCut[];
}

export interface ClassTier {
  tier: string;
  name: string;
  desc: string;
  context: string;
  active: boolean;
  highlight?: boolean;
  fallen?: boolean;
}

export interface TimelineEvent {
  date: string;
  event: string;
  note: string;
  isKey?: boolean;
  isLoss?: boolean;
  type: 'meeting' | 'loss' | 'shift' | 'current';
}

export interface LocationIndex {
  id: string;
  icon: string;
  name: string;
  address: string;
  desc: string;
  who: string[];
}
