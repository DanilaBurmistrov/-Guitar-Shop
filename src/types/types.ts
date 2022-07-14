import { GUITAR_TYPE } from '../const';

export type Guitar = {
  id: number
  name: string
  vendorCode: string
  type: keyof typeof GUITAR_TYPE
  description: string
  previewImg: string
  stringCount: number
  rating: 1 | 2 | 3 | 4 | 5
  price: number
  comments: Comments
};

export type Guitars = Guitar[];

export type Comment = {
  id: string
  userName: string
  advantage: string
  disadvantage: string
  comment: string
  rating: 1 | 2 | 3 | 4 | 5
  createAt: string
  guitarId: number
};

export type Comments = Comment[];

export type ErrorType = unknown;

export type NewComment = {

  comment: {
   guitarId: number
   userName: string
   advantage: string
   disadvantage: string
   comment: string
   rating: number
  }
  setIsSaving:  React.Dispatch<React.SetStateAction<boolean>>
  setIsSuccessReviewModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export type InitialGuitar = {
  id: number
  name: string
  vendorCode: string
  type: string
  description: string
  previewImg: string
  stringCount: number
  rating: number
  price: number
  comments: Comments
  count: number
}

export type InitialGuitars = InitialGuitar[];

