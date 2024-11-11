import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null); //해당 의사 정보

  // booking slot
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
      //날짜를 오늘~일주일 뒤, 시간은 10시~21시 까지 설정 가능.
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      console.log("currentDate:::" + currentDate);

      let endTime = new Date(); //운영 마감 시간
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      console.log("endTime:::" + endTime);

      if (today.getDate() === currentDate.getDate()) { //오늘이면
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes()>30? 30:0);
      }else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      let timeSlots = [];
      
      while(currentDate < endTime){ //current date 가 마감시간보다 전 이면
        let formatTime = currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        
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
    console.log("docSlot:::"+docSlot)
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
      </div>
    )
  );
};

export default Appointment;
