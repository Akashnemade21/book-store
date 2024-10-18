import { USERTYPE } from './constants';

export interface userInterface {
  id: string;
  name: string;
  email: string;
  userType: USERTYPE;
  profilePic: string;
}

export interface bookInterface {
  id: string;
  title: string;
  author: string;
  publicationDate: string;
  rating: string;
  reviewNum: number;
  imageLink?: string;
  bookCover: string;
}

export interface reviewInterface {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  reviewText: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
