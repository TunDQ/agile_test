import api from "./api";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  desctiption: string;
}
export const fetchGalleries = async (): Promise<GalleryImage[]> => {
  const res = await api.get("/galleries");
  return res.data;
};
