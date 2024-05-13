"use client";
import { useEffect, useState } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import Swal from "sweetalert2";
import ReactGA from "react-ga4";
import UseCart from "@/hooks/useCart";
import createOrder from "../../actions/Order/createOrder";
import finishOrder from "../../actions/Order/finishOrder";
const Payment = (props) => {
  const { userInfo, setSteps, setfinishBasket, shipping, user } = props;
  const [message, setMessage] = useState("");
  const { basket } = UseCart();

  const [formdata, setFormData] = useState(null);
  useEffect(() => {
    function getFormData() {
      const userid = user ? user.id : "invité";

      const total = basket.reduce((acc, item) => {
        if (item.indirim === true) {
          return acc + item.quantity * item.inprice;
        } else {
          return acc + item.quantity * item.price;
        }
      }, 0);
      const totalzero = (total * 100).toFixed(0);

      let shipprice = 0;

      if (shipping.country === "FR" && shipping.name === "colissimo") {
        if (totalzero > 10000) shipprice = 0;
        else shipprice = parseFloat(shipping.price);
      } else {
        shipprice = parseFloat(shipping.price);
      }
      const subtotal = ((total + shipprice) * 100).toFixed(0);

      const data = {
        data: {
          amount: subtotal,
          currency: "EUR",
          customer: {
            email: userInfo.data.email,
            billingDetails: {
              category: userInfo.bill.category,
              firstName: userInfo.data.firstname,
              lastName: userInfo.data.lastname,
              phoneNumber: userInfo.data.tel,
              country: userInfo.bill.country,
              language: userInfo.bill.country,
              address: userInfo.bill.adress,
              city: userInfo.bill.state,
              zipCode: userInfo.bill.zipcode,
            },
            shippingDetails: {
              firstName: userInfo.data.firstname,
              lastName: userInfo.data.lastname,
              phoneNumber: userInfo.data.tel,
              category: userInfo.send.category,
              country: userInfo.send.country,
              address: userInfo.send.adress,
              shippingMethod: "PACKAGE_DELIVERY_COMPANY",
              city: userInfo.send.state,
              zipCode: userInfo.send.zipcode,
            },
            reference: userid,
            shoppingCart: {
              insuranceAmount: "300",
              shippingAmount:
                shipprice !== 0 ? (shipprice * 100).toFixed(0) : null,
              taxAmount: 300,
              cartItemInfo: [],
            },
          },
          orderId: null,
        },
        basket: basket,
        note: userInfo.data.note ? userInfo.data.note : "Yok",
        shipping: shipping,
        billcategory: userInfo.bill,
        sendcategory: userInfo.send,
      };

      setFormData(data);
    }

    getFormData();
  }, [userInfo, basket, user, shipping]);
  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://static-sogecommerce.societegenerale.eu/";
      // const testpublicKey =
      //   "19075209:testpublickey_F45LebcsnRdEgf2EHvQlAmI7Uiw5Q90wcuaF0oylC9Xsz";
      // const publicKey =
      //   "19075209:publickey_tZUFMqYGIDKe3Wt627q6pjmJK8WPdQD8Gezgi1aXviE4B";
      const publicKey =
        "19075209:testpublickey_F45LebcsnRdEgf2EHvQlAmI7Uiw5Q90wcuaF0oylC9Xsz";
      let formToken;
      try {
        if (formdata === null) {
          return;
        }

        if (basket.length === 0) {
          setMessage("Votre panier est vide");
          return;
        }

        const res = await createOrder(formdata);
        if (res?.message) {
          setMessage(res?.message);
          return;
        } else formToken = res;

        if (basket.length > 0) {
          const { KR } = await KRGlue.loadLibrary(
            endpoint,
            publicKey
          ); /* Load the remote library */

          await KR.setFormConfig({
            /* set the minimal configuration */ formToken: formToken,
            "kr-language": "fr-FR" /* to update initialization parameter */,
          });

          await KR.renderElements(
            "#myPaymentForm"
          ); /* Render the payment form into myPaymentForm div*/
          await KR.onError((error) => {
            setMessage(error.detailedErrorMessage);
          });
          await KR.onSubmit(async (paymentResponse) => {
            if (paymentResponse.clientAnswer.orderStatus !== "PAID") {
              setMessage("Karttan Para çekilemedi");
              return;
            }

            ReactGA.event({
              category: "event",
              action: "SatınAldı",
              label: "Satın Alma Başarılı Oldu",
              value: formdata.data.amount,
              currency: "EUR",
            });

            const findata = await finishOrder(formdata);
            setfinishBasket(findata);
            setSteps(2);
          });
        }
      } catch (error) {
        setMessage(error);
      }
    }
    async function checkbasket() {
      if (basket.length === 0) {
        await Swal.fire({
          icon: "error",
          title: "Votre panier est vide",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      }
    }
    checkbasket();
    setupPaymentForm();
  }, [basket, setSteps, setfinishBasket, formdata]);
  return (
    <>
      <div className="order_review bg-white">
        <div className="check-heading tw-text-center">
          <h3>Paiement</h3>
        </div>

        <div className="payment_method tw-flex tw-flex-col tw-items-center tw-justify-center">
          {basket.length > 0 ? (
            <>
              <div id="myPaymentForm">
                <div
                  className="kr-smart-form"
                  kr-card-form-expanded="true"
                ></div>
              </div>
              <div data-test="payment-message" className="tw-text-red-600">
                *{message}
              </div>
            </>
          ) : (
            <div data-test="payment-message" className="tw-text-red-600">
              *{message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
