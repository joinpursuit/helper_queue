import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { enrollClass } from "../authSlice";

export default function ClassEnrollment() {
  const [studentEmails, setStudentEmails] = useState("");
  const [cohortNumber, setCohortNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(enrollClass({ studentEmails, cohortNumber }));
  };
  return (
    <section className="adminContainer">
      <h1>Enroll Class</h1>
      <form onSubmit={handleSubmit} className={"createPairList"}>
        <input
          value={cohortNumber}
          onChange={(e) => setCohortNumber(e.target.value)}
          placeholder={"Cohort Number"}
          required
        />
        <textarea
          value={studentEmails}
          onChange={(e) => setStudentEmails(e.target.value)}
          placeholder={"Enter each email on a new line"}
          required
        />
        <button>Enroll Class</button>
      </form>
    </section>
  );
}
