export type PublicAuthRole = "buyer" | "author" | "distributor";
export type DemoAuthRole = PublicAuthRole | "admin";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  businessName?: string;
  role: DemoAuthRole;
  createdAt: string;
};

export type DemoSessionUser = Omit<DemoUser, "password">;

type DemoUserFixture = {
  role: DemoAuthRole;
  registerFirst: boolean;
  registerPayload?: {
    role: PublicAuthRole;
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    password: string;
  };
  loginPayload: {
    role: DemoAuthRole;
    email: string;
    password: string;
  };
  redirectTo: string;
};

const initialSeededUsers = (): DemoUser[] => [
  {
    id: "demo_admin_1",
    name: "Eagle Leap Admin",
    email: "admin@eagleleap.in",
    password: "admin123",
    phone: "+91 9000000000",
    role: "admin",
    createdAt: "2026-04-21T09:00:00.000Z",
  },
];

const registrationFixtures: Record<DemoAuthRole, DemoUserFixture> = {
  buyer: {
    role: "buyer",
    registerFirst: true,
    registerPayload: {
      role: "buyer",
      name: "Rohan Joshi",
      email: "buyer.testing@eagleleap.in",
      phone: "+91 9888822222",
      password: "buyer123",
    },
    loginPayload: {
      role: "buyer",
      email: "buyer.testing@eagleleap.in",
      password: "buyer123",
    },
    redirectTo: "/buyer",
  },
  author: {
    role: "author",
    registerFirst: true,
    registerPayload: {
      role: "author",
      name: "Dr. Priya Kulkarni",
      email: "author.testing@eagleleap.in",
      phone: "+91 9898911111",
      password: "author123",
    },
    loginPayload: {
      role: "author",
      email: "author.testing@eagleleap.in",
      password: "author123",
    },
    redirectTo: "/author",
  },
  distributor: {
    role: "distributor",
    registerFirst: true,
    registerPayload: {
      role: "distributor",
      name: "Campus Distribution Hub",
      email: "distributor.testing@eagleleap.in",
      phone: "+91 9777733333",
      businessName: "Campus Distribution Hub",
      password: "distributor123",
    },
    loginPayload: {
      role: "distributor",
      email: "distributor.testing@eagleleap.in",
      password: "distributor123",
    },
    redirectTo: "/distributor",
  },
  admin: {
    role: "admin",
    registerFirst: false,
    loginPayload: {
      role: "admin",
      email: "admin@eagleleap.in",
      password: "admin123",
    },
    redirectTo: "/admin",
  },
};

const globalStore = globalThis as typeof globalThis & {
  __eagleLeapDemoUsers__?: DemoUser[];
};

export const demoUsers = globalStore.__eagleLeapDemoUsers__ ?? initialSeededUsers();

if (!globalStore.__eagleLeapDemoUsers__) {
  globalStore.__eagleLeapDemoUsers__ = demoUsers;
}

export function buildRedirectPath(role: DemoAuthRole) {
  return role === "admin" ? "/admin" : `/${role}`;
}

export function sanitizeDemoUser(user: DemoUser): DemoSessionUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export function getDemoUsers() {
  return demoUsers.map((user) => ({ ...user }));
}

export function getRegisteredPublicUsers() {
  return demoUsers.filter((user) => user.role !== "admin").map(sanitizeDemoUser);
}

export function getTestingFixtures() {
  return structuredClone(registrationFixtures);
}

export function findDemoUser(email: string, role: DemoAuthRole) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.role === role);
}

export function findDemoUserById(id: string) {
  return demoUsers.find((user) => user.id === id);
}

export function hasDemoUser(email: string) {
  return demoUsers.some((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function createDemoUser(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  businessName?: string;
  role: PublicAuthRole;
}) {
  const user: DemoUser = {
    id: `demo_${input.role}_${demoUsers.length + 1}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    phone: input.phone?.trim() || undefined,
    businessName: input.businessName?.trim() || undefined,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  demoUsers.unshift(user);
  return user;
}

export function resetDemoUsers() {
  demoUsers.splice(0, demoUsers.length, ...initialSeededUsers());
}
