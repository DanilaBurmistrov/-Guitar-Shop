import { Comment, Guitar } from '../../types/types';
import {random, name, image} from 'faker';

export const makeFakeGuitar = (): Guitar => ({

  id: Math.floor(Math.random() * 100),
  name: name.title(),
  vendorCode: 'AA666666',
  type: 'ukulele',
  description: random.words(),
  previewImg: image.imageUrl(),
  stringCount: Math.floor(Math.random() * 7),
  rating: Math.floor(Math.random() * 5),
  price: Math.floor(Math.random() * 10000),
  comments: [makeFakeReview(), makeFakeReview()],

} as Guitar);

export const makeFakeReview = (): Comment => ({

  id: random.words(),
  userName: name.title(),
  advantage: random.words(),
  disadvantage: random.words(),
  comment: random.words(),
  rating: Math.floor(Math.random() * 5),
  createAt: '2022-05-22T21:48:13.678Z',
  guitarId: Math.floor(Math.random() * 100),
} as Comment);
