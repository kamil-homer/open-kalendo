/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../app/[locale]/(public)/sign-in/[[...sign-in]]/page";

test("Sign In Page", () => {
  const { container } = render(<Page />);
  expect(container).toBeDefined();
});
