import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignUp from "./../Signup";

describe("SignUp", () => {
  test("renders correctly", () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <SignUp />
    );

    expect(getByText("Créer un compte")).toBeTruthy();
    expect(getByLabelText("Nom et Prenom")).toBeTruthy();
    expect(getByPlaceholderText("Entrer votre nom et prenom")).toBeTruthy();
    // Add more assertions for other elements
  });

  test("submits the form with valid data", () => {
    // Mock dependencies and setup
    const mockNavigation = { navigate: jest.fn() };
    const mockSignupAction = jest.fn();
    const { getByLabelText, getByText } = render(
      <SignUp navigation={mockNavigation} />
    );

    // Interact with the component
    fireEvent.changeText(getByLabelText("Nom et Prenom"), "John Doe");
    fireEvent.changeText(getByLabelText("Addresse Email"), "john@example.com");
    // Fill in other fields with valid data

    fireEvent.press(getByText("Créer votre compte"));

    // Assert the expected behavior
    expect(mockSignupAction).toHaveBeenCalledWith(
      expect.objectContaining({
        nom_prenom: "John Doe",
        email: "john@example.com",
        // Check other form field values
      }),
      expect.any(Function), // setSubmitting
      expect.any(Function), // moveTo
      mockNavigation
    );
  });

  // Add more test cases to cover different scenarios
});
