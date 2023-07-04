"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function page() {
  const searchParams = useSearchParams().get("search");
  const [results, setResults] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    async function search() {
      const res = await axios.get(
        `${process.env.SERVER_URI}api/search?search=${searchParams}`
      );
      setResults(res.data.users);
    }
    search();
  }, [searchParams]);

  return (
    <div>
      <div>Search: {searchParams}</div>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} onClick={() => push(`/profile/${result._id}`)}>
            {result.firstName} {result.lastName}
            {result.email}
          </div>
        ))
      ) : (
        <div>no results</div>
      )}
    </div>
  );
}

export default page;
