"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import ReactGA from "react-ga4";
const OfferTime = (props) => {
  const { settings } = props;
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  const data = settings?.discountset;
  const datapage = settings?.discountpage;

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(data.date).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop Our Timer
        clearInterval(interval.current);
      } else {
        // update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <>
      <section
        id="offer_timer_one"
        className="tw-mt-2 tw-mb-1 tw-py-2 md:tw-py-[130px] tw-hidden md:tw-block"
        style={{ backgroundImage: `url(${datapage?.bannerImageUrl})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-4 col-md-8 offset-md-4 col-sm-8 col-12">
              <div className="offer_time_flex  ">
                <div className="count_down tw-pr-8 lg:tw-pr-0">
                  <div id="countdown">
                    <ul>
                      <li
                        className="tw-rounded-2xl"
                        style={{
                          color: datapage?.bannerColor,
                          borderColor: datapage?.bannerColor,
                        }}
                      >
                        <span>{timerDays}</span>
                        Jours
                      </li>
                      <li
                        className="tw-rounded-2xl"
                        style={{
                          color: datapage?.bannerColor,
                          borderColor: datapage?.bannerColor,
                        }}
                      >
                        <span>{timerHours}</span>
                        Heures
                      </li>
                      <li
                        className="tw-rounded-2xl"
                        style={{
                          color: datapage?.bannerColor,
                          borderColor: datapage?.bannerColor,
                        }}
                      >
                        <span>{timerMinutes}</span>
                        Minutes
                      </li>
                      <li
                        className="tw-rounded-2xl"
                        style={{
                          color: datapage?.bannerColor,
                          borderColor: datapage?.bannerColor,
                        }}
                      >
                        <span>{timerSeconds}</span>
                        Seconde
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="offer_timer_text">
                  <h2 style={{ color: datapage?.bannerColor }}>
                    {datapage?.bannerUst}
                  </h2>
                  <p style={{ color: datapage?.bannerColor }}>
                    {datapage?.bannerAlt}
                  </p>

                  <Link
                    href={datapage?.buttonUrl}
                    onClick={() => {
                      ReactGA.event({
                        category: "event",
                        action: "indirimtıkla",
                        label: "Anasayfa İndirimi Tıklandı",
                      });
                    }}
                    className="theme-btn-one  btn_md tw-border-[3px] tw-rounded-2xl"
                    style={{
                      color: datapage?.bannerColor,
                      borderColor: datapage?.bannerColor,
                    }}
                  >
                    {datapage?.buttonName}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="offer_timer_mobile"
        className="tw-mt-2 tw-mb-1 tw-py-2 tw-block md:tw-hidden"
        style={{ backgroundImage: `url(${datapage?.bannerImageUrl})` }}
      >
        <div className="container">
          <div className="row">
            <div className=" offset-4 col-8">
              <div className="offer_time_flex tw-ml-3 ">
                <div id="countdown_mobile">
                  <ul>
                    <li
                      className="tw-rounded-2xl"
                      style={{
                        color: datapage?.bannerColor,
                        borderColor: datapage?.bannerColor,
                      }}
                    >
                      <span>{timerDays}</span>
                      Jours
                    </li>
                    <li
                      className="tw-rounded-2xl"
                      style={{
                        color: datapage?.bannerColor,
                        borderColor: datapage?.bannerColor,
                      }}
                    >
                      <span>{timerHours}</span>
                      Heures
                    </li>
                    <li
                      className="tw-rounded-2xl"
                      style={{
                        color: datapage?.bannerColor,
                        borderColor: datapage?.bannerColor,
                      }}
                    >
                      <span>{timerMinutes}</span>
                      Minutes
                    </li>
                    <li
                      className="tw-rounded-2xl"
                      style={{
                        color: datapage?.bannerColor,
                        borderColor: datapage?.bannerColor,
                      }}
                    >
                      <span>{timerSeconds}</span>
                      Seconde
                    </li>
                  </ul>
                </div>
                <div className="offer_timer_text_mobile">
                  <h2 style={{ color: datapage?.bannerColor }}>
                    {datapage?.bannerUst}
                  </h2>
                  <p style={{ color: datapage?.bannerColor }}>
                    {datapage?.bannerAlt}
                  </p>

                  <Link
                    href={datapage?.buttonUrl}
                    className="theme-btn-one tw-w-32 tw-text-center tw-py-1  tw-text-xs tw-border-[2px] tw-rounded-2xl"
                    style={{
                      color: datapage?.bannerColor,
                      borderColor: datapage?.bannerColor,
                    }}
                  >
                    {datapage?.buttonName}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferTime;
