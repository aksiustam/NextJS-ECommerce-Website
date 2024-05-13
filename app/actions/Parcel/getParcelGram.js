"use server";

export default async function getParcelGram(id, gram) {
  try {
    const username = process.env.SEND_PUBLICKEY;
    const password = process.env.SEND_PRIVATEKEY;
    const credentials = btoa(`${username}:${password}`);
    ///////////////////////////////////////////////////////////////
    const baseUrl1 = "https://panel.sendcloud.sc/api/v2/shipping-products";
    const params1 = new URLSearchParams();
    params1.append("from_country", "FR");
    params1.append("carrier", "colissimo");
    params1.append("to_country", id);
    params1.append("weight", gram);
    params1.append("weight_unit", "gram");
    const urlWithParams1 = new URL(baseUrl1);
    urlWithParams1.search = params1;
    const sendres1 = await fetch(urlWithParams1, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });
    const response1 = await sendres1.json();
    const colid = response1[0]?.methods[0]?.id;
    ///////////////////////////////////////////////////////////
    const baseUrl2 = "https://panel.sendcloud.sc/api/v2/shipping-price";
    const params2 = new URLSearchParams();
    params2.append("from_country", "FR");
    params2.append("shipping_method_id", colid);
    params2.append("to_country", id);
    params2.append("weight", gram);
    params2.append("weight_unit", "gram");
    const urlWithParams2 = new URL(baseUrl2);
    urlWithParams2.search = params2;
    const sendres2 = await fetch(urlWithParams2, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });
    const response2 = await sendres2.json();
    //////////////////////////////////////////////////////////
    const baseUrl3 = "https://panel.sendcloud.sc/api/v2/shipping-products";
    const params3 = new URLSearchParams();
    params3.append("from_country", "FR");
    params3.append("carrier", "chronopost");
    params3.append("to_country", id);
    params3.append("weight", gram);
    params3.append("weight_unit", "gram");
    const urlWithParams3 = new URL(baseUrl3);
    urlWithParams3.search = params3;
    const sendres3 = await fetch(urlWithParams3, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });
    const response3 = await sendres3.json();
    let chroid = 0;
    if (id === "FR") {
      const sorted = response3.map((item) => item.methods);
      let minId = Number.MAX_SAFE_INTEGER;
      let minIdItem;
      sorted.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item.id < minId) {
            minId = item.id;
            minIdItem = item;
          }
        });
      });
      chroid = minIdItem?.id;
    } else {
      const sorted = response3.map((item) => item.methods);

      let minIdItem;
      sorted.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item.shipping_product_code === "chronopost:classic") {
            minIdItem = item;
            return;
          } else if (
            !minIdItem &&
            item.shipping_product_code === "chronopost:express"
          ) {
            minIdItem = item;
          }
        });
      });
      chroid = minIdItem?.id;
    }

    ///////////////////////////////////////////////////////////
    const baseUrl4 = "https://panel.sendcloud.sc/api/v2/shipping-price";
    const params4 = new URLSearchParams();
    params4.append("from_country", "FR");
    params4.append("shipping_method_id", chroid);
    params4.append("to_country", id);
    params4.append("weight", gram);
    params4.append("weight_unit", "gram");
    const urlWithParams4 = new URL(baseUrl4);
    urlWithParams4.search = params4;
    const sendres4 = await fetch(urlWithParams4, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });
    const response4 = await sendres4.json();
    ///////////////////////////////////////////////////////////
    const formData = {
      colissimo: response2[0]?.price,
      chronopost: response4[0]?.price,
    };

    return formData;
  } catch (error) {
    throw new Error(error);
  }
}
