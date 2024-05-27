import Image from "next/image";
import ser1 from "../../../../public/assets/img/common/sert1.png";
import ser2 from "../../../../public/assets/img/common/sert2.png";
import ser3 from "../../../../public/assets/img/common/sert3.png";
import ser4 from "../../../../public/assets/img/common/sert4.png";
import ser5 from "../../../../public/assets/img/common/sert5.png";
const index = () => {
  return (
    <>
      <section style={{ backgroundColor: "#404040" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="tw-flex tw-items-center tw-justify-center tw-py-2">
                <h4 className="tw-text-3xl tw-font-bold tw-text-white">
                  NOS CERTIFICATS
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="certificas" style={{ backgroundColor: "#262626" }}>
        <div className="container">
          <div className="row tw-py-6 ">
            <div className="col-12 tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-3 ">
              <Image
                src={ser1}
                alt="sertifika1"
                width={500}
                height={500}
                loading="eager"
                className="tw-w-[55px] tw-h-[55px] md:tw-w-[135px] md:tw-h-[135px]  tw-object-contain"
              />

              <Image
                src={ser2}
                alt="sertifika2"
                width={500}
                height={500}
                loading="eager"
                className="tw-w-[55px] tw-h-[55px] md:tw-w-[135px] md:tw-h-[135px]  tw-object-contain"
              />
              <Image
                src={ser3}
                alt="sertifika3"
                width={500}
                height={500}
                loading="eager"
                className="tw-w-[55px] tw-h-[55px] md:tw-w-[135px] md:tw-h-[135px]  tw-object-contain"
              />
              <Image
                src={ser4}
                alt="sertifika4"
                width={500}
                height={500}
                loading="eager"
                className="tw-w-[55px] tw-h-[55px] md:tw-w-[135px] md:tw-h-[135px]  tw-object-contain"
              />
              <Image
                src={ser5}
                alt="sertifika5"
                width={500}
                height={500}
                loading="eager"
                className="tw-w-[55px] tw-h-[55px] md:tw-w-[135px] md:tw-h-[135px]  tw-object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
