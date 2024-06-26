import getSettings from "@/app/actions/getSettings";

const MenuData = async () => {
  const settings = await getSettings();

  let MenuData = [];

  if (settings && settings.header) {
    const sortedArray =
      [...settings.header].sort((a, b) => a.index - b.index) || [];

    sortedArray.forEach((item) => {
      if (item.name !== "" && item.header) {
        const cat = {
          name: item.name,
          href: item.url,
          children: item.header.map((items) => {
            return {
              name: items.name,
              href: `/boutique/${items.url}`,
            };
          }),
        };
        MenuData.push(cat);
      }
    });
  }

  return MenuData;
};
export default MenuData;
