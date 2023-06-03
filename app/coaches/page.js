"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [coaches, setCoaches] = useState([]);
  const { push } = useRouter();
  useEffect(() => {
    const getCoaches = async () => {
      const res = await axios.get(`${process.env.SERVER_URI}api/getCoaches`);
      if (res) setCoaches(Object.entries(res.data.coaches));
    };
    getCoaches();
  }, []);

  return (
    <div className="p-16">
      {coaches.map((coach, index) => (
        <div key={index} onClick={() => push(`/profile/${coach[1]._id}`)}>
          {coach[1].firstName} {coach[1].lastName}
        </div>
      ))}
    </div>
  );
}
