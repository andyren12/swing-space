"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function page() {
  const searchParams = useSearchParams().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function search() {
      const res = await axios.get(
        `${process.env.SERVER_URI}api/search/${searchParams}`
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
          <div key={index}>
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
