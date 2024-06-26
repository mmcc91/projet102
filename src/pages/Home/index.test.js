import { fireEvent, render, screen,waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await waitFor(() => screen.queryByText("Envoyer")),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        }), { timeout: 3000 }
      );
      
      await waitFor(() => screen.queryByText("En cours"), { timeout: 3000 });
      
      await waitFor(() => {
        screen.queryByText("Message envoyé !");
      }, { timeout: 3000 });
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
