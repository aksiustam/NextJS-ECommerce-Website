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
            const type = items.type === "acc" ? "accessoires" : "vetements";
            return {
              type: items.type,
              name: items.name,
              href: `/boutique/${items.url}?type=${type}`,
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
