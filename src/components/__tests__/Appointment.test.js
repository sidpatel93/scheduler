import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("Appointment Component", ()=> {
  it("renders without error", ()=> {
    render(<Appointment />)
  })
})
