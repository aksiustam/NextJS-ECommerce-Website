"use client";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Link from "next/link";
import setContact from "../../actions/Contact/setContact";

const ContactClient = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = { ...data };
      const res = await setContact(formData);
      if (res === true)
        Swal.fire("Merci", "Merci, votre message a bien été envoyé", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: JSON.stringify(error.response.data),
      });
    }
  };
  return (
    <>
      <section id="contact_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 ">
              <div className="contact_form_one contact_info_wrapper">
                <div className="tw-flex tw-flex-col tw-justify-center tw-h-full">
                  <h3 className="text-center tw-font-bold">
                    En quoi pouvons-nous vous aider ?
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            placeholder="Nom"
                            {...register("name")}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder=" Prenom"
                            {...register("lastname")}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <span className="tw-text-red-600 tw-text-sm">
                            {errors?.email?.message}
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="E-mail"
                            {...register("email", {
                              required: "Remplissez l'e-mail",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i,
                                message: "E-mail incorrect",
                              },
                            })}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            placeholder="Objet"
                            {...register("konu")}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <textarea
                            rows="7"
                            className="form-control"
                            name="message"
                            {...register("not")}
                            placeholder="Votre message"
                            required
                          ></textarea>
                        </div>
                        <div className="submit_bitton_contact_one">
                          <button
                            value="Submit"
                            className="theme-btn-one btn-black-overlay btn_md"
                          >
                            Valider
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="left_side_contact contact_info_wrapper">
                <ul>
                  <li className="address_location">
                    <div className="contact_widget ">
                      <i className="fa fa-map-marker"></i>
                      <p>
                        6 rue de Palestro
                        <br /> 93500 Pantin
                      </p>
                    </div>
                  </li>

                  <li className="address_location">
                    <div className="contact_widget">
                      <i className="fa fa-lg fa-whatsapp"></i>
                      <a href="https://api.whatsapp.com/send?phone=33781825139">
                        +33 7 8182 51 39
                      </a>
                    </div>
                  </li>
                  <li className="address_location">
                    <div className="contact_widget">
                      <i className="fa fa-envelope"></i>
                      <a href="#!">nilrio.info@gmail.com</a>
                    </div>
                    <div className="contact_widget">
                      <i className="fa fa-globe"></i>
                      <Link href="/" scroll={false}>
                        www.nilrio.com
                      </Link>
                    </div>
                  </li>
                </ul>
                <div className="col-lg-12">
                  <div className="map_area">
                    <iframe
                      title="Google Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.1348270500957!2d2.4186303!3d48.8937676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d01c818e3e9%3A0x8abe67da35f1795f!2s6%20Rue%20de%20Palestro%2C%2093500%20Pantin%2C%20France!5e0!3m2!1sfr!2str!4v1708334145480!5m2!1sfr!2str"
                      width="400"
                      height="300"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactClient;
