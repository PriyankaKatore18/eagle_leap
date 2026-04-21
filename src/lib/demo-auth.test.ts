import { afterEach, describe, expect, it } from "vitest";

import { buildRedirectPath, createDemoUser, findDemoUser, getDemoUsers, resetDemoUsers } from "./demo-auth";
import { getAdminTestingBundle } from "./testing-data";

afterEach(() => {
  resetDemoUsers();
});

describe("demo auth fixtures", () => {
  it("seeds only the admin account by default", () => {
    const users = getDemoUsers();

    expect(users).toHaveLength(1);
    expect(users[0]?.role).toBe("admin");
    expect(users[0]?.email).toBe("admin@eagleleap.in");
  });

  it("requires public roles to be registered before login works", () => {
    expect(findDemoUser("buyer.testing@eagleleap.in", "buyer")).toBeUndefined();

    const buyer = createDemoUser({
      role: "buyer",
      name: "Buyer Test",
      email: "buyer.testing@eagleleap.in",
      password: "buyer123",
    });

    expect(findDemoUser("buyer.testing@eagleleap.in", "buyer")).toMatchObject({
      id: buyer.id,
      role: "buyer",
    });
  });

  it("builds role redirects including admin", () => {
    expect(buildRedirectPath("buyer")).toBe("/buyer");
    expect(buildRedirectPath("author")).toBe("/author");
    expect(buildRedirectPath("distributor")).toBe("/distributor");
    expect(buildRedirectPath("admin")).toBe("/admin");
  });
});

describe("admin testing bundle", () => {
  it("includes the protected testing json link and registration rules", () => {
    const bundle = getAdminTestingBundle();

    expect(bundle.auth.publicRegistrationRequired).toBe(true);
    expect(bundle.links.some((link) => link.href === "/api/testing-data")).toBe(true);
    expect(bundle.auth.fixtures.admin.loginPayload.email).toBe("admin@eagleleap.in");
    expect(bundle.auth.fixtures.buyer.registerPayload?.email).toBe("buyer.testing@eagleleap.in");
  });
});
