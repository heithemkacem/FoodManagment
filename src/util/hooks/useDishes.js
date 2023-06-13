import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message";
import { API_URL } from "../consts";

export const useDishes = ({ routeName = null }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [allDishes, setAllDishes] = useState([]);
  useEffect(() => {
    const newDishes = allDishes.filter((dish) => {
      if (!selectedCategoryId)
        return dish?.name
          ?.toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim());
      return (
        dish?.name?.toLowerCase().trim().includes(query.toLowerCase().trim()) &&
        dish.cat_id == selectedCategoryId
      );
    });
    setDishes(newDishes);
  }, [selectedCategoryId, query]);

<<<<<<< HEAD
  let dependecies = [];
  if (routeName) dependecies.push(routeName);

=======
  //get dishes from api  whenever the user navigates to the dishes screen or when the user changes the selected category
>>>>>>> 20978615aadbf6ad547a72d9e8e3f51706e0356e
  useEffect(() => {
    getDishes();
  }, dependecies);

  const getDishes = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/getDishes`);
      setDishes(res.data.dish);
      setAllDishes(res.data.dish);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
    setIsLoading(false);
  };
  return {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    getDishes,
  };
};

export default useDishes;
