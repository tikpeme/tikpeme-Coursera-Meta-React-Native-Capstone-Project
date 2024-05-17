export const fetchMenuItems = async () => {
  const menuURL =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
  try {
    const response = await fetch(menuURL);
    const data = await response.json();
    //console.log(data.menu);

    return data.menu;
  } catch (error) {
    console.log("error fetching menu data", error);
  }
};
