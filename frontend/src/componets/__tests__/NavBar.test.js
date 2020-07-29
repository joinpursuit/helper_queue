import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import NavBar from "../NavBar";
import { AuthContext } from "../../providers/AuthProvider";
