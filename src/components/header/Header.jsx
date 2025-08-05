import { useState } from "react";


export default function Header(props) {

    let notifications = true;

    // open notification

    const openeNotification = () => {

        close(notification)
        notifications = true

        console.log("notification is open");
    }

    // close notifications 

    const closeNotification = () => {

        close(
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor"
                className="size-8 text-white" onClick={openeNotification}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
            </svg>
        )

        notifications = false;

        console.log("notification is closed");

    }

    // notification icons

    const [notification, close] = useState(

        <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="size-8 text-white" onClick={closeNotification}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>

    )


    let date = new Date();
    let [weekday, day] = useState(date.getDay())

    switch (weekday) {

        case 0: day("Saturday")

            break;

        case 1: day("Sunday")

            break;

        case 2: day("Monday")

            break;

        case 3: day("Tuesday")

            break;

        case 4: day("Wednesday")

            break;

        case 5: day("Thursday")

            break;

        case 6: day("Friday")

            break;

        default: "not found"
            break;
    }


    return (

        <div className='w-full h-1/4 rounded-xl bg-white/15'>


            {/* icons , top part */}

            <div className="w-full h-1/3 flex px-5">


                {/* profile icon */}

                <div className="w-1/2 h-full flex items-center justify-start">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </div>


                {/* notification icon */}

                <div className="w-1/2 h-full  flex items-center justify-end">

                    {notification}

                </div>

            </div>


            {/* date and weekday  , bottom part */}

            <div className="w-full h-2/3 px-2">

                <h1 className='text-3xl text-white pl-4 pt-6'> {weekday} </h1>
                <p className='text-sm text-white pl-6 pt-2'> {props?.note} </p>

            </div>

        </div>
    )
}