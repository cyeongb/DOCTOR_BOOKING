import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null); //해당 의사 정보

  // 예약시스템
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);

    //현재날짜
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //예약날짜를 오늘~일주일 뒤, 시간은 10시~21시 전 까지 설정 가능.
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      console.log("currentDate:::" + currentDate);

      let endTime = new Date(); //운영 마감 시간 21:00
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      console.log("endTime:::" + endTime);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes()>30? 30:0); //분을 30분 단위로 설정하기 위함.
      }else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      let timeSlots = [];
      
      while(currentDate < endTime){ //currentDate 가 마감시간보다 전 이면
        let formatTime = currentDate.toTimeString([],{hour:'2-digit',minute:'2-digit'})
        console.log("formatTime::"+formatTime)
        //slot을 배열에 넣음
        timeSlots.push({
          datetime : new Date(currentDate),
          time : formatTime
        })
        //currentdate 의 시간을 30분씩 증가 시킴.
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      
      setDocSlot(prev => ([...prev,timeSlots]))
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);


  useEffect(() => {
    console.log(docSlot)
  }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* doctor details  */}

        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* doctor info */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* doctor about  */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee :{" "}
              <span className="text-gray-800 font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
              <span>(per Hour)</span>
            </p>
          </div>
        </div>

           {/* 2.48.11,, */}
        {/* Booking slot  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p> <p className=" flex font-light text-sm">scroll the time!</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {
              docSlot.length && docSlot.map((item,i)=>(
                <div onClick={()=>setSlotIndex(i)} className={`text-center py-6 min-w-16 rounded-2xl cursor-pointer ${slotIndex === i ? 'bg-primary text-white' : 'border border-gray-200' }`} key={i}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlot.length && docSlot[slotIndex].map((item,i)=>(
              <p onClick={()=>setSlotTime(item.time)} key={i} className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.substr(0,5)}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
