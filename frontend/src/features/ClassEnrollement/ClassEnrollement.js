import React, { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { enrollClass } from "../auth/authSlice";

export default function ClassEnrollment() {
  const [studentEmails, setStudentEmails] = useState("");
  const [cohortNumber, setCohortNumber] = useState("");
  const emails = studentEmails.split("\n");
  const emailCount = emails.filter((email) => email.slice(-11) === "pursuit.org").length;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(enrollClass({ studentEmails, cohortNumber }));
      toast.success(`Added ${emailCount} students to ${cohortNumber}`)
      setCohortNumber("")
      setStudentEmails("")
    } catch (error) {
      toast.error("Unable to process request")
      console.log(error)

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
        <button>Enroll {emailCount} Student(s) to Class</button>
      </form>
      <ToastContainer />
    </section>
  );
}
