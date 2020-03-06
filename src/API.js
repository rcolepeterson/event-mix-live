import {searchByString} from './firebase/FireQuery';
export const searchVideos = (curDocuments, strArray) =>
  searchByString(curDocuments, strArray);
