import { render, screen } from '@testing-library/react';
import * as React from 'react'
import Select from "./Select";

test("Select component renders correctly", () => {
  const data = ["Option 1", "Option 2", "Option 3"];
  const label = "Select an option";
  const error = { message: "Error message" };

  // Render the Select component
  const ref = React.createRef() as any;
  render(<Select data={data} label={label} error={error} ref={ref} />);

  // Verify label
  const labelElement = screen.getByText(label);
  expect(labelElement).toBeInTheDocument();

  // Verify options
  const optionElements = screen.getAllByRole("option");
  expect(optionElements).toHaveLength(data.length + 1); // Account for the "Choose" option

  // Verify error message
  const errorMessage = screen.getByText(`*${error.message}`);
  expect(errorMessage).toBeInTheDocument();

});
