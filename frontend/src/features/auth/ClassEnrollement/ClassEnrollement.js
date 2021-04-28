import React, { useState } from "react";
import axios from 'axios';
import { apiURL } from '../../../util/apiURL';
import { signUp } from "../../../util/firebaseFunctions";
export default function ClassEnrollment() {
  const [studentEmails, setStudentEmails] = useState("");
  const [cohortNumber, setCohortNumber] = useState("");
    const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emails = studentEmails.split("\n");
    emails = emails.filter(email => email.slice(-11) === "pursuit.org")
    try {
      const newUsers = await Promise.all(
        emails.map((email) => {
          return signUp(email, "password");
        })
      );
      await Promise.all(
        newUsers.map((res) => {
          axios.post(`${API}/api/users`, {
            id: res.user.uid,
            email: res.user.email.toLowerCase(),
            class: cohortNumber.trim(),
          });
        })
      );
    } catch (error) {
      debugger;
    }
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
