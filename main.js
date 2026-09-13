/* =========================
   NAVIGATION
========================== */

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navWrapper = document.getElementById("nav-wrapper");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================
   SCROLL HEADER
========================== */

function handleScroll() {

    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

handleScroll();

window.addEventListener("scroll", handleScroll);


/* =========================
   MOBILE MENU
========================== */

if (menuToggle && navWrapper) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navWrapper.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });

}


/* =========================
   CLOSE MENU AFTER CLICK
========================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navWrapper) {
            navWrapper.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        document.body.classList.remove(
            "menu-open"
        );

    });

});
/* CLOSE MENU AFTER RESERVE BUTTON CLICK */
const navOrder = document.querySelector(".nav-order");

if (navOrder) {
    navOrder.addEventListener("click", () => {
        if (navWrapper) navWrapper.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
}


/* =========================================
   RESERVATION FORM
========================================= */


/* =========================
   WHATSAPP NUMBER
========================== */

/*
   TEST NUMBER

   09126122448
   Nigerian international format:
   2349126122448

   CHANGE THIS NUMBER LATER
   TO THE RESTAURANT'S WHATSAPP NUMBER.
*/

const WHATSAPP_NUMBER =
    "2349126122448";


/* =========================
   RESERVATION ELEMENTS
========================== */

const reservationForm =
    document.getElementById(
        "reservationForm"
    );

const reservationSuccess =
    document.getElementById(
        "reservationSuccess"
    );

const reservationReset =
    document.getElementById(
        "reservationReset"
    );

const reservationDate =
    document.getElementById(
        "reservationDate"
    );


/* =========================
   SET MINIMUM DATE
========================== */

if (reservationDate) {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    reservationDate.min =
        `${year}-${month}-${day}`;

}


/* =========================================
   RESERVATION SUBMISSION
========================================= */

if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================
               GET FORM FIELDS
            ========================== */

            const nameField =
                document.getElementById(
                    "guestName"
                );

            const phoneField =
                document.getElementById(
                    "guestPhone"
                );

            const dateField =
                document.getElementById(
                    "reservationDate"
                );

            const timeField =
                document.getElementById(
                    "reservationTime"
                );

            const guestsField =
                document.getElementById(
                    "guestCount"
                );

            const requestField =
                document.getElementById(
                    "specialRequest"
                );


            /* =========================
               GET VALUES
            ========================== */

            const name =
                nameField.value.trim();

            const phone =
                phoneField.value.trim();

            const date =
                dateField.value;

            const time =
                timeField.value;

            const guests =
                guestsField.value;

            const request =
                requestField.value.trim() ||
                "None";


            /* =========================
               VALIDATION
            ========================== */

            let formIsValid = true;


            const requiredFields = [
                nameField,
                phoneField,
                dateField,
                timeField,
                guestsField
            ];


            requiredFields.forEach(
                function (field) {

                    const group =
                        field.closest(
                            ".form-group"
                        );

                    const error =
                        group?.querySelector(
                            ".form-error"
                        );


                    if (!field.value.trim()) {

                        formIsValid = false;

                        group?.classList.add(
                            "has-error"
                        );

                        if (error) {
                            error.textContent =
                                "Please complete this field.";
                        }

                    } else {

                        group?.classList.remove(
                            "has-error"
                        );

                        if (error) {
                            error.textContent = "";
                        }

                    }

                }
            );


            /* =========================
               DATE VALIDATION
            ========================== */

            if (
                dateField.value &&
                dateField.value <
                    dateField.min
            ) {

                formIsValid = false;

                const group =
                    dateField.closest(
                        ".form-group"
                    );

                const error =
                    group?.querySelector(
                        ".form-error"
                    );

                group?.classList.add(
                    "has-error"
                );

                if (error) {
                    error.textContent =
                        "Please choose a future date.";
                }

            }


            /* =========================
               STOP IF INVALID
            ========================== */

            if (!formIsValid) {
                return;
            }


            /* =========================
               FORMAT DATE
            ========================== */

            const selectedDate =
                new Date(
                    `${date}T00:00:00`
                );

            const formattedDate =
                selectedDate.toLocaleDateString(
                    "en-NG",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            /* =========================
               FORMAT TIME
            ========================== */

            const [hours, minutes] =
                time.split(":");

            const timeDate =
                new Date();

            timeDate.setHours(
                Number(hours),
                Number(minutes),
                0,
                0
            );

            const formattedTime =
                timeDate.toLocaleTimeString(
                    "en-NG",
                    {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    }
                );


            /* =========================
               CREATE WHATSAPP MESSAGE
            ========================== */

            const message = `
🍽️ *LAGOS BISTRO RESERVATION REQUEST*

*Name:* ${name}
*Phone:* ${phone}
*Date:* ${formattedDate}
*Time:* ${formattedTime}
*Guests:* ${guests}
*Special Request:* ${request}

Hello Lagos Bistro, I would like to request a reservation with the details above.

Please confirm availability. Thank you.
            `.trim();


            /* =========================
               CREATE WHATSAPP LINK
            ========================== */

            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}` +
                `?text=${encodeURIComponent(message)}`;


            /* =========================
               OPEN WHATSAPP
            ========================== */

            window.location.href =
                whatsappURL;


            /* =========================
               UPDATE SUCCESS MESSAGE
            ========================== */

            if (reservationSuccess) {

                reservationForm.style.display =
                    "none";

                reservationSuccess.classList.add(
                    "active"
                );

                reservationSuccess.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }

        }
    );

}


/* =========================================
   RESET RESERVATION
========================================= */

if (
    reservationReset &&
    reservationForm &&
    reservationSuccess
) {

    reservationReset.addEventListener(
        "click",
        function () {

            reservationForm.reset();

            reservationForm.style.display =
                "flex";

            reservationSuccess.classList.remove(
                "active"
            );

            reservationSuccess.setAttribute(
                "aria-hidden",
                "true"
            );


            /* Clear errors */

            reservationForm
                .querySelectorAll(
                    ".form-group"
                )
                .forEach(
                    function (group) {

                        group.classList.remove(
                            "has-error"
                        );

                        const error =
                            group.querySelector(
                                ".form-error"
                            );

                        if (error) {
                            error.textContent =
                                "";
                        }

                    }
                );

        }
    );

}


/* =========================================
   REMOVE ERROR WHEN USER CORRECTS FIELD
========================================= */

if (reservationForm) {

    reservationForm
        .querySelectorAll(
            "input, select, textarea"
        )
        .forEach(
            function (field) {

                field.addEventListener(
                    "input",
                    function () {

                        const group =
                            field.closest(
                                ".form-group"
                            );

                        if (
                            group &&
                            field.value.trim()
                        ) {

                            group.classList.remove(
                                "has-error"
                            );

                            const error =
                                group.querySelector(
                                    ".form-error"
                                );

                            if (error) {
                                error.textContent =
                                    "";
                            }

                        }

                    }
                );

            }
        );

}
