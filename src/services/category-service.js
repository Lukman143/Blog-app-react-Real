import { myAxios } from "./Helper";
export const loadAllCategories = () => {
  return myAxios.get(`/categories/`).then((respone) => {
    return respone.data;
  });
};